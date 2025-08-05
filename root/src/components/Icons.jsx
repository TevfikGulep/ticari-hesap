// =================================================================
// DOSYA: root/src/components/Icons.jsx (GÜNCELLENDİ)
// AÇIKLAMA: Sol menüdeki hesaplama araçları için yeni ikonlar eklendi.
// =================================================================

export const MenuIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

export const CloseIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// Yeni ikonlar
export const ProfitLossIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="12" y1="1" x2="12" y2="23"/>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);

export const SalesPriceIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Z"/>
    <path d="M14 14.73V3.27a1.46 1.46 0 0 1 2 0v11.46"/>
    <path d="M12 18H4.5a1.5 1.5 0 0 1 0-3H12a1.5 1.5 0 0 1 0 3Z"/>
    <path d="m14 6 2.5 2.5-2.5 2.5"/>
  </svg>
);

export const MarketplaceIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m12 2-3 8 4 2 4-2-3-8Z"/>
    <path d="M12 2v20"/>
    <path d="m20 10-4 2-4-2"/>
    <path d="m4 10 4 2 4-2"/>
    <path d="M17.5 17.5 12 22l-5.5-4.5"/>
    <path d="m6 14 6 6 6-6"/>
  </svg>
);

export const SalaryIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M17 14h-1"/>
    <path d="M6 14h2"/>
    <path d="M12 14h2"/>
    <path d="M15.53 17.47 14 19"/>
    <path d="m8 19 1.53-1.53"/>
    <path d="M12 21v-3.5"/>
    <path d="M9.17 11.83 7 14"/>
    <path d="m17 14-2.17-2.17"/>
    <path d="M12 11V3"/>
    <path d="M7 3v2"/>
    <path d="M17 3v2"/>
    <path d="M3 7h4"/>
    <path d="M17 7h4"/>
    <circle cx="12" cy="11" r="5"/>
  </svg>
);

export const ExpensesIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z"/>
    <path d="M16 12h-4"/>
    <path d="M14 10v4"/>
    <path d="M12 18a4 4 0 0 0 4-4"/>
  </svg>
);

export const UnitCostIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16.5 9.4a4.5 4.5 0 1 0-9 0"/>
    <path d="M12 14.5a4.5 4.5 0 0 0 0-9"/>
    <path d="M12 1a2.828 2.828 0 1 0 4 4"/>
    <path d="M12 23a2.828 2.828 0 1 0 4-4"/>
    <path d="M4 12a2.828 2.828 0 1 0-4-4"/>
    <path d="M20 12a2.828 2.828 0 1 0 4 4"/>
  </svg>
);

export const HomeIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
);

export const HomeIconSolid = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
    </svg>
);

export const SunIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M12 12a5 5 0 100-10 5 5 0 000 10z" />
  </svg>
);

export const MoonIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

export const XIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
