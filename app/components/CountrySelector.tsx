"use client";

import { countries } from "../lib/types";

interface Props {
  selected: string;
  onChange: (code: string) => void;
}

export default function CountrySelector({ selected, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {countries.map((country) => (
        <button
          key={country.code}
          onClick={() => onChange(country.code)}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
            selected === country.code
              ? "bg-primary-600 text-white shadow-md shadow-primary-600/25"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {country.name}
        </button>
      ))}
    </div>
  );
}
