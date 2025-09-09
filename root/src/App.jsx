// =================================================================
// DOSYA: root/src/App.js (GÜNCELLENDİ)
// AÇIKLAMA: Sol menüdeki ikonlar kaldırıldı ve stil iyileştirmeleri yapıldı.
// =================================================================
import React, { useState, useEffect } from 'react';
import './App.css';
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from './firebaseConfig';
import { doc, getDoc, setDoc } from "firebase/firestore";

// Stil ve Component imports
import getStyles from './styles/getStyles';
import { MenuIcon, CloseIcon, HomeIcon, HomeIconSolid } from './components/Icons';
import Auth from './components/Auth';
import History from './components/History';
import ProfitCalculator from './components/ProfitCalculator';
import SalesPriceCalculator from './components/SalesPriceCalculator';
import MarketplaceCalculator from './components/MarketplaceCalculator';
import SalaryCalculator from '././components/SalaryCalculator';
import Placeholder from './components/Placeholder';
import CurrencyDisplay from './components/CurrencyDisplay';
import OptionPriceCalculator from './components/OptionPriceCalculator'; // Yeni import

const GoogleIcon = ({ style }) => (
  <svg style={style} viewBox="0 0 48 48" fill="white">
    <path d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
    <path d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
    <path d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
    <path d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
    <path fill="none" d="M0 0h48v48H0z"></path>
  </svg>
);

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
          setActiveView(homepage);
        }
      } else {
        setActiveView('profitCalculator');
      }
    });
    return () => unsubscribe();
  }, []);

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

  const handleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .catch(error => {
        console.error("Authentication Error:", error);
      });
  };

  const handleHistoryClick = () => {
    if (user) {
      setIsHistoryOpen(true);
    } else {
      handleSignIn();
    }
  };

  const styles = getStyles(theme);
  
  const menuItems = [
    { id: 'profitCalculator', title: 'Kâr Zarar Hesaplama' },
    { id: 'salesPriceCalculator', title: 'Satış Fiyatı Hesaplama' },
    { id: 'marketplaceCalculator', title: 'Pazaryeri Fiyat Hesaplama' },
    { id: 'salaryCalculator', title: 'Eleman Brüt/Net Maaş Hesaplama' },
    { id: 'optionPriceCalculator', title: 'Hisse Opsiyon Fiyat Hesaplama' }, // Yeni menü öğesi
    { id: 'expenseCalculator', title: 'İşyeri Gider Hesaplama' },
    { id: 'unitCostCalculator', title: 'Ürün Başı İşletme Maliyeti Hesaplama' },
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
      'Hisse Opsiyon Fiyat Hesaplama': 'optionPriceCalculator', // Yeni eşleme
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
      case 'optionPriceCalculator': // Yeni case
        return <OptionPriceCalculator {...props} />;
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
              <span style={styles.menuItemText}>{item.title}</span>
            </button>
            {user && (
              <button onClick={() => handleSetHomepage(item.id)} style={styles.homepageButton}>
                {homepage === item.id ? <HomeIconSolid style={styles.menuIcon} /> : <HomeIcon style={styles.menuIcon} />}
              </button>
            )}
          </div>
        ))}
        {!user && (
            <div style={styles.authIncentiveContainer}>
                <p style={styles.authIncentiveText}>Giriş yaparak hesaplamalarınızı kaydedin, geçmişinizi görüntüleyin ve daha fazla özelliğe erişin. Tamamen Ücretsiz!</p>
                <button onClick={handleSignIn} style={{...styles.signInButton, ...styles.authButton}}>
                  <GoogleIcon style={styles.googleIcon} />
                  Giriş Yap
                </button>
            </div>
        )}
      </div>
      
      <div style={styles.header}>
        <div style={styles.headerLeft}>
            <button style={styles.menuButton} onClick={() => setIsMenuOpen(true)}>
              <MenuIcon style={styles.menuIcon} />
            </button>
            <h1 style={styles.headerTitle}>Ticari Hesaplayıcı</h1>
        </div>
        <div style={styles.headerRight}>
          <button style={styles.historyButton} onClick={handleHistoryClick}>
            Geçmiş
          </button>
          <Auth 
            user={user} 
            styles={styles}
          />
        </div>
      </div>
      
      <CurrencyDisplay />

      {isHistoryOpen && (
        <History 
          user={user} 
          styles={styles} 
          onClose={() => setIsHistoryOpen(false)} 
          onCalculationSelect={handleCalculationSelect}
        />
      )}

      <div style={{...styles.container, paddingTop: '115px'}}>
        {renderActiveView()}
      </div>
    </div>
  );
};

export default App;
