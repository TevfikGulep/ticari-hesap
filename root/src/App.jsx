// =================================================================
// DOSYA: root/src/App.js (GÜNCELLENDİ)
// AÇIKLAMA: Sol menüye ikonlar eklendi ve varsayılan açılış sayfası
//             özelliği eklendi.
// =================================================================
import React, { useState, useEffect } from 'react';
import './App.css';
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from './firebaseConfig';
import { doc, getDoc, setDoc } from "firebase/firestore";

// Stil ve Component imports
import getStyles from './styles/getStyles';
import { MenuIcon, CloseIcon, ProfitLossIcon, SalesPriceIcon, MarketplaceIcon, SalaryIcon, ExpensesIcon, UnitCostIcon, HomeIcon, HomeIconSolid } from './components/Icons';
import Auth from './components/Auth';
import History from './components/History';
import ProfitCalculator from './components/ProfitCalculator';
import SalesPriceCalculator from './components/SalesPriceCalculator';
import MarketplaceCalculator from './components/MarketplaceCalculator';
import SalaryCalculator from './components/SalaryCalculator';
import Placeholder from './components/Placeholder';

const App = () => {
  const [activeView, setActiveView] = useState('profitCalculator');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState(null);
  const [selectedCalculation, setSelectedCalculation] = useState(null);
  const [homepage, setHomepage] = useState('profitCalculator');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists() && userDoc.data().homepage) {
          const savedHomepage = userDoc.data().homepage;
          setHomepage(savedHomepage);
          setActiveView(savedHomepage);
        } else {
          // Set default homepage if none is saved
          setActiveView(homepage);
        }
      } else {
        // Default view for logged-out users
        setActiveView('profitCalculator');
      }
    });
    return () => unsubscribe();
  }, [homepage]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setTheme(mediaQuery.matches ? 'dark' : 'light');
    const handler = (e) => setTheme(e.matches ? 'dark' : 'light');
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);
  
  const handleSetHomepage = async (viewId) => {
    if (user) {
      setHomepage(viewId);
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, { homepage: viewId }, { merge: true });
    }
  };

  const styles = getStyles(theme);
  
  const menuItems = [
    { id: 'profitCalculator', title: 'Kâr Zarar Hesaplama', icon: <ProfitLossIcon style={styles.menuItemIcon} /> },
    { id: 'salesPriceCalculator', title: 'Satış Fiyatı Hesaplama', icon: <SalesPriceIcon style={styles.menuItemIcon} /> },
    { id: 'marketplaceCalculator', title: 'Pazaryeri Fiyat Hesaplama', icon: <MarketplaceIcon style={styles.menuItemIcon} /> },
    { id: 'salaryCalculator', title: 'Eleman Brüt/Net Maaş Hesaplama', icon: <SalaryIcon style={styles.menuItemIcon} /> },
    { id: 'expenseCalculator', title: 'İşyeri Gider Hesaplama', icon: <ExpensesIcon style={styles.menuItemIcon} /> },
    { id: 'unitCostCalculator', title: 'Ürün Başı İşletme Maliyeti Hesaplama', icon: <UnitCostIcon style={styles.menuItemIcon} /> },
  ];
  
  const handleMenuClick = (viewId) => {
    setActiveView(viewId);
    setSelectedCalculation(null);
    setIsMenuOpen(false);
  };

  const handleCalculationSelect = (calc) => {
    const viewMap = {
      'Kâr/Zarar Hesaplama': 'profitCalculator',
      'Satış Fiyatı Hesaplama': 'salesPriceCalculator',
      'Pazaryeri Fiyat Hesaplama': 'marketplaceCalculator',
      'Brüt/Net Maaş Hesaplama': 'salaryCalculator',
    };
    const viewId = viewMap[calc.title];
    if (viewId) {
      setActiveView(viewId);
      setSelectedCalculation(calc);
    }
  };
  
  const renderActiveView = () => {
    const props = { styles, calculation: selectedCalculation, user };
    switch(activeView) {
      case 'profitCalculator':
        return <ProfitCalculator {...props} />;
      case 'salesPriceCalculator':
        return <SalesPriceCalculator {...props} />;
      case 'marketplaceCalculator':
        return <MarketplaceCalculator {...props} />;
      case 'salaryCalculator':
        return <SalaryCalculator {...props} />;
      case 'expenseCalculator':
        return <Placeholder title="İşyeri Gider Hesaplama" styles={styles} />;
      case 'unitCostCalculator':
        return <Placeholder title="Ürün Başı İşletme Maliyeti Hesaplama" styles={styles} />;
      default:
        return <ProfitCalculator {...props} />;
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
          <div key={item.id} style={{...styles.menuItemContainer, ...(activeView === item.id ? styles.menuItemActive : {})}}>
            <button 
              style={styles.menuItemButton} 
              onClick={() => handleMenuClick(item.id)}
            >
              {item.icon}
              <span style={styles.menuItemText}>{item.title}</span>
            </button>
            {user && (
              <button onClick={() => handleSetHomepage(item.id)} style={styles.homepageButton}>
                {homepage === item.id ? <HomeIconSolid style={styles.menuIcon} /> : <HomeIcon style={styles.menuIcon} />}
              </button>
            )}
          </div>
        ))}
      </div>
      
      <div style={styles.header}>
        <div style={styles.headerLeft}>
            <button style={styles.menuButton} onClick={() => setIsMenuOpen(true)}>
              <MenuIcon style={styles.menuIcon} />
            </button>
            <h1 style={styles.headerTitle}>Ticari Hesaplayıcı</h1>
        </div>
        <div style={styles.headerRight}>
          <Auth 
            user={user} 
            styles={styles} 
            onHistoryClick={() => setIsHistoryOpen(true)}
          />
        </div>
      </div>
      
      {isHistoryOpen && (
        <History 
          user={user} 
          styles={styles} 
          onClose={() => setIsHistoryOpen(false)} 
          onCalculationSelect={handleCalculationSelect}
        />
      )}

      <div style={styles.container}>
        {renderActiveView()}
      </div>
    </div>
  );
};

export default App;
