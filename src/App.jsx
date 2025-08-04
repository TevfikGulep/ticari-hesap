// =================================================================
// DOSYA: src/App.js (GÜNCELLENDİ)
// AÇIKLAMA: Merkezi Firebase auth servisi kullanıldı.
// =================================================================
import React, { useState, useEffect } from 'react';

// Firebase ve Auth imports
import { auth } from './firebaseConfig'; // Merkezi auth servisini import et
import { onAuthStateChanged } from "firebase/auth";

// Stil ve Component imports
import getStyles from './styles/getStyles';
import { MenuIcon, CloseIcon } from './components/Icons';
import Auth from './components/Auth';
import ProfitCalculator from './components/ProfitCalculator';
import SalesPriceCalculator from './components/SalesPriceCalculator';
import MarketplaceCalculator from './components/MarketplaceCalculator';
import SalaryCalculator from './components/SalaryCalculator';
import Placeholder from './components/Placeholder';

const App = () => {
  const [activeView, setActiveView] = useState('profitCalculator');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState(null); // Kullanıcı state'i

  // Firebase auth state dinleyicisi
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    // Component unmount olduğunda dinleyiciyi kaldır
    return () => unsubscribe();
  }, []);

  // Cihazın renk şemasına göre tema belirle
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setTheme(mediaQuery.matches ? 'dark' : 'light');
    const handler = (e) => setTheme(e.matches ? 'dark' : 'light');
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const styles = getStyles(theme);
  
  const menuItems = [
    { id: 'profitCalculator', title: 'Kâr Zarar Hesaplama' },
    { id: 'salesPriceCalculator', title: 'Satış Fiyatı Hesaplama' },
    { id: 'marketplaceCalculator', title: 'Pazaryeri Fiyat Hesaplama' },
    { id: 'salaryCalculator', title: 'Eleman Brüt/Net Maaş Hesaplama' },
    { id: 'expenseCalculator', title: 'İşyeri Gider Hesaplama' },
    { id: 'unitCostCalculator', title: 'Ürün Başı İşletme Maliyeti Hesaplama' },
  ];
  
  const handleMenuClick = (viewId) => {
    setActiveView(viewId);
    setIsMenuOpen(false);
  };
  
  const renderActiveView = () => {
    switch(activeView) {
      case 'profitCalculator':
        return <ProfitCalculator styles={styles} />;
      case 'salesPriceCalculator':
        return <SalesPriceCalculator styles={styles} />;
      case 'marketplaceCalculator':
        return <MarketplaceCalculator styles={styles} />;
      case 'salaryCalculator':
        return <SalaryCalculator styles={styles} />;
      case 'expenseCalculator':
        return <Placeholder title="İşyeri Gider Hesaplama" styles={styles} />;
      case 'unitCostCalculator':
        return <Placeholder title="Ürün Başı İşletme Maliyeti Hesaplama" styles={styles} />;
      default:
        return <ProfitCalculator styles={styles} />;
    }
  };

  return (
    <div style={styles.safeArea}>
      {isMenuOpen && <div style={styles.overlay} onClick={() => setIsMenuOpen(false)}></div>}
      
      <div style={{...styles.sideMenu, left: isMenuOpen ? '0' : '-300px'}}>
        <div style={styles.sideMenuHeader}>
          <h2 style={styles.sideMenuTitle}>Hesaplama Araçları</h2>
          <button style={styles.menuButton} onClick={() => setIsMenuOpen(false)}>
            <CloseIcon style={styles.menuIcon} />
          </button>
        </div>
        {menuItems.map(item => (
          <button 
            key={item.id} 
            style={activeView === item.id ? {...styles.menuItem, ...styles.menuItemActive} : styles.menuItem} 
            onClick={() => handleMenuClick(item.id)}
          >
            {item.title}
          </button>
        ))}
      </div>
      
      <div style={styles.header}>
        <div style={styles.headerLeft}>
            <button style={styles.menuButton} onClick={() => setIsMenuOpen(true)}>
              <MenuIcon style={styles.menuIcon} />
            </button>
            <h1 style={styles.headerTitle}>Ticari Hesaplayıcı</h1>
        </div>
        <Auth user={user} styles={styles} />
      </div>
      
      <div style={styles.container}>
        {renderActiveView()}
      </div>
    </div>
  );
};

export default App;
