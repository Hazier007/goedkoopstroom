'use client';

import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { usePathname } from 'next/navigation';

function btn(bg: string, size: number): CSSProperties {
  return {
    width: size,
    height: size,
    borderRadius: 999,
    background: bg,
    color: 'white',
    display: 'grid',
    placeItems: 'center',
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
    fontWeight: 700,
    fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
    lineHeight: 1,
  };
}

export default function FloatingShare() {
  const pathname = usePathname();
  const [url, setUrl] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setUrl(typeof window !== 'undefined' ? window.location.href : '');
  }, [pathname]);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 640);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const text = 'Check de goedkoopste stroom per uur op goedkoopstroom.be';

  const links = useMemo(() => {
    const encodedUrl = encodeURIComponent(url);
    const encodedText = encodeURIComponent(text);
    return {
      whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      x: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    };
  }, [url]);

  const nativeShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Goedkoopste Stroom', text, url });
      }
    } catch {
      // ignore
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // ignore
    }
  };

  if (!url) return null;

  const size = isMobile ? 38 : 44;
  const gap = isMobile ? 6 : 8;

  return (
    <div
      style={
        isMobile
          ? {
              position: 'fixed',
              left: '50%',
              transform: 'translateX(-50%)',
              bottom: 14,
              zIndex: 50,
              display: 'flex',
              flexDirection: 'row',
              gap,
              padding: 8,
              borderRadius: 999,
              background: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.14)',
            }
          : {
              position: 'fixed',
              right: 16,
              bottom: 16,
              zIndex: 50,
              display: 'flex',
              flexDirection: 'column',
              gap,
            }
      }
      aria-label="Deel deze pagina"
    >
      <a href={links.whatsapp} target="_blank" rel="noreferrer" style={btn('#25D366', size)} aria-label="Deel via WhatsApp">
        WA
      </a>
      <a href={links.facebook} target="_blank" rel="noreferrer" style={btn('#1877F2', size)} aria-label="Deel op Facebook">
        f
      </a>
      <a href={links.x} target="_blank" rel="noreferrer" style={btn('#111111', size)} aria-label="Deel op X">
        X
      </a>
      <a href={links.linkedin} target="_blank" rel="noreferrer" style={btn('#0A66C2', size)} aria-label="Deel op LinkedIn">
        in
      </a>
      <button type="button" onClick={copyLink} style={btn('#6B7280', size)} aria-label="Kopieer link">
        Kopie
      </button>
      {typeof navigator !== 'undefined' && 'share' in navigator && (
        <button type="button" onClick={nativeShare} style={btn('#F97316', size)} aria-label="Delen">
          Deel
        </button>
      )}
    </div>
  );
}
