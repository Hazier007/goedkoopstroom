import { NextResponse } from 'next/server';

// ENTSO-E area codes for different countries
const AREA_CODES: Record<string, string> = {
  BE: '10YBE----------2',
  NL: '10YNL----------L',
  DE: '10Y1001A1001A82H',
  FR: '10YFR-RTE------C',
};

interface PriceData {
  hour: number;
  price: number;
  time: string;
  isPast: boolean;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const country = searchParams.get('country') || 'BE';
  const areaCode = AREA_CODES[country] || AREA_CODES.BE;

  const now = new Date();
  const currentHour = now.getHours();

  // Try to fetch from ENTSO-E API
  const apiKey = process.env.ENTSOE_API_KEY;
  
  let prices: PriceData[] = [];

  if (apiKey) {
    try {
      // Format dates for ENTSO-E API
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      const periodStart = today.toISOString().replace(/[-:]/g, '').slice(0, 12) + '00';
      const periodEnd = tomorrow.toISOString().replace(/[-:]/g, '').slice(0, 12) + '00';

      const url = `https://web-api.tp.entsoe.eu/api?documentType=A44&in_Domain=${areaCode}&out_Domain=${areaCode}&periodStart=${periodStart}&periodEnd=${periodEnd}&securityToken=${apiKey}`;
      
      const response = await fetch(url);
      
      if (response.ok) {
        const xmlText = await response.text();
        prices = parseEntsoeXml(xmlText, currentHour);
      }
    } catch (error) {
      console.error('ENTSO-E API error:', error);
    }
  }

  // If no API data, generate realistic simulated prices
  if (prices.length === 0) {
    prices = generateSimulatedPrices(currentHour, country);
  }

  // Calculate statistics
  const validPrices = prices.map(p => p.price);
  const averagePrice = validPrices.reduce((a, b) => a + b, 0) / validPrices.length;
  const cheapestHour = prices.reduce((min, p) => p.price < min.price ? p : min).hour;
  const expensiveHour = prices.reduce((max, p) => p.price > max.price ? p : max).hour;
  const currentPrice = prices.find(p => p.hour === currentHour)?.price || averagePrice;

  return NextResponse.json({
    prices,
    currency: 'EUR',
    area: country,
    cheapestHour,
    expensiveHour,
    averagePrice: Math.round(averagePrice * 100) / 100,
    currentHour,
    currentPrice: Math.round(currentPrice * 100) / 100,
  });
}

function parseEntsoeXml(xml: string, currentHour: number): PriceData[] {
  const prices: PriceData[] = [];
  
  // Simple XML parsing for price points
  const pointRegex = /<Point>[\s\S]*?<position>(\d+)<\/position>[\s\S]*?<price\.amount>([\d.]+)<\/price\.amount>[\s\S]*?<\/Point>/g;
  
  let match;
  while ((match = pointRegex.exec(xml)) !== null) {
    const position = parseInt(match[1]) - 1; // Position is 1-indexed
    const priceEurMwh = parseFloat(match[2]);
    const priceCentKwh = priceEurMwh / 10; // Convert €/MWh to cent/kWh
    
    prices.push({
      hour: position,
      price: Math.round(priceCentKwh * 100) / 100,
      time: `${position.toString().padStart(2, '0')}:00`,
      isPast: position < currentHour,
    });
  }
  
  return prices.sort((a, b) => a.hour - b.hour);
}

function generateSimulatedPrices(currentHour: number, country: string): PriceData[] {
  const prices: PriceData[] = [];
  
  // Base price varies by country (in cent/kWh)
  const basePrices: Record<string, number> = {
    BE: 8.5,
    NL: 9.0,
    DE: 7.5,
    FR: 6.0,
  };
  
  const basePrice = basePrices[country] || 8.0;
  
  // Typical daily price pattern (multipliers)
  const hourlyPattern = [
    0.70, // 00:00 - night low
    0.65, // 01:00
    0.60, // 02:00 - lowest
    0.62, // 03:00
    0.65, // 04:00
    0.75, // 05:00 - starting to rise
    0.90, // 06:00
    1.15, // 07:00 - morning peak starts
    1.30, // 08:00 - morning peak
    1.25, // 09:00
    1.10, // 10:00
    0.95, // 11:00
    0.85, // 12:00 - solar dip (varies by season)
    0.80, // 13:00
    0.85, // 14:00
    0.95, // 15:00
    1.10, // 16:00
    1.35, // 17:00 - evening peak starts
    1.45, // 18:00 - evening peak
    1.40, // 19:00
    1.25, // 20:00
    1.05, // 21:00
    0.90, // 22:00
    0.80, // 23:00
  ];

  // Add some randomness to make it realistic
  const today = new Date();
  const seed = today.getDate() + today.getMonth() * 31;
  
  for (let hour = 0; hour < 24; hour++) {
    // Deterministic "random" variation based on date and hour
    const variation = (Math.sin(seed * hour * 0.1) * 0.15) + 1;
    const price = basePrice * hourlyPattern[hour] * variation;
    
    prices.push({
      hour,
      price: Math.round(price * 100) / 100,
      time: `${hour.toString().padStart(2, '0')}:00`,
      isPast: hour < currentHour,
    });
  }
  
  return prices;
}
