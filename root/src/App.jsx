// =================================================================
// DOSYA: src/App.js (GÜNCELLENDİ)
// AÇIKLAMA: Firebase ve Auth component'i entegre edildi.
// Kullanıcı oturum durumu yönetiliyor.
// Sidebar ve Firestore entegrasyonu eklendi.
// =================================================================
import React, { useState, useEffect } from 'react';
import './App.css';

// Firebase ve Auth imports
import app from './firebaseConfig';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, query, orderBy, onSnapshot, doc, getDoc, setDoc } from "firebase/firestore";

// Stil ve Component imports
import getStyles from './styles/getStyles';
import { MenuIcon, CloseIcon } from './components/Icons';
import Auth from './components/Auth';
import ProfitCalculator from './components/ProfitCalculator';
import SalesPriceCalculator from './components/SalesPriceCalculator';
import MarketplaceCalculator from './components/MarketplaceCalculator';
import SalaryCalculator from './components/SalaryCalculator';
import Placeholder from './components/Placeholder';
import Sidebar from './components/Sidebar';

const App = () => {
  const [activeView, setActiveView] = useState('profitCalculator');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);
  const [selectedCalculation, setSelectedCalculation] = useState(null);

  const db = getFirestore(app);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const q = query(collection(db, `calculations/${currentUser.uid}/items`), orderBy('timestamp', 'desc'));
        const unsubHistory = onSnapshot(q, (snapshot) => {
          const newHistory = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setHistory(newHistory);
        });
        return () => unsubHistory();
      } else {
        setHistory([]);
      }
    });
    return () => unsubscribe();
  }, [db]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setTheme(mediaQuery.matches ? 'dark' : 'light');
    const handler = (e) => setTheme(e.matches ? 'dark' : 'light');
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);
    
  const handleSelectCalculation = async (calc) => {
      if (!user) return;
      const docRef = doc(db, `calculations/${user.uid}/items`, calc.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
          const newSelectedCalculation = { id: docSnap.id, ...docSnap.data() };
          setSelectedCalculation(newSelectedCalculation);
          const viewId = {
              profit: 'profitCalculator',
              sales_price: 'salesPriceCalculator',
              marketplace: 'marketplaceCalculator',
              salary: 'salaryCalculator'
          }[docSnap.data().type];
          if(viewId) setActiveView(viewId);
      }
  };


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
    setSelectedCalculation(null); // Menüden yeni bir şey seçildiğinde seçimi temizle
  };
  
  const renderActiveView = () => {
    const key = selectedCalculation ? selectedCalculation.id : activeView;
    const commonProps = {
        styles,
        user,
        calculation: selectedCalculation,
        history,
    };

    switch(activeView) {
      case 'profitCalculator':
        return <ProfitCalculator key={key} {...commonProps} />;
      case 'salesPriceCalculator':
        return <SalesPriceCalculator key={key} {...commonProps} />;
      case 'marketplaceCalculator':
        return <MarketplaceCalculator key={key} {...commonProps} />;
      case 'salaryCalculator':
        return <SalaryCalculator key={key} {...commonProps} />;
      case 'expenseCalculator':
        return <Placeholder title="İşyeri Gider Hesaplama" styles={styles} />;
      case 'unitCostCalculator':
        return <Placeholder title="Ürün Başı İşletme Maliyeti Hesaplama" styles={styles} />;
      default:
        return <ProfitCalculator key={key} {...commonProps} />;
    }
  };

  return (
    <div style={styles.safeArea}>
      {isMenuOpen && <div style={styles.overlay} onClick={() => setIsMenuOpen(false)}></div>}
      {user && isSidebarOpen && <Sidebar history={history} onSelect={handleSelectCalculation} onClose={() => setIsSidebarOpen(false)} styles={styles} />}
      
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
        <Auth user={user} styles={styles} onProfileClick={() => setIsSidebarOpen(true)} />
      </div>
      
      <div style={styles.container}>
        {renderActiveView()}
      </div>
    </div>
  );
};

export default App;
