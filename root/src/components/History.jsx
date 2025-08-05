// =================================================================
// DOSYA: root/src/components/History.jsx (GÜNCELLENDİ)
// AÇIKLAMA: "Geçmişi Temizle" butonu ve onay diyaloğu eklendi.
// =================================================================
import React, { useState, useEffect } from 'react';
import { auth, db, clearHistory } from '../firebaseConfig';
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

const History = ({ user, styles, onClose, onCalculationSelect }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const q = query(collection(db, "users", user.uid, "calculations"), orderBy("timestamp", "desc"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const calculations = [];
        querySnapshot.forEach((doc) => {
          calculations.push({ id: doc.id, ...doc.data() });
        });
        setHistory(calculations);
        setLoading(false);
      });
      return () => unsubscribe();
    }
  }, [user]);

  const handleLogout = () => {
    auth.signOut();
    onClose();
  };
  
  const handleClearHistory = () => {
    if (window.confirm("Geçmişi temizlemek istediğinizden emin misiniz? Bu işlem geri alınamaz.")) {
      clearHistory(user.uid);
    }
  };

  const handleSelect = (calc) => {
    onCalculationSelect(calc);
    onClose();
  }

  const renderSummary = (calc) => {
    const outputs = calc.outputs;
    let summary = "";

    switch (calc.title) {
      case 'Kâr/Zarar Hesaplama':
        summary = `Kâr/Zarar: ${outputs['Birim Başına Net Kâr/Zarar Oranı'] || 'N/A'}`;
        break;
      case 'Satış Fiyatı Hesaplama':
        summary = `Satış Fiyatı: ${outputs['Olması Gereken Satış Fiyatı'] || 'N/A'}`;
        break;
      case 'Pazaryeri Fiyat Hesaplama':
        summary = `Satış Fiyatı: ${outputs['Önerilen Satış Fiyatı'] || 'N/A'}`;
        break;
      case 'Brüt/Net Maaş Hesaplama':
        summary = `Net Maaş: ${outputs['Yıllık Net Maaş'] || 'N/A'}`;
        break;
      default:
        summary = "Hesaplama";
    }
    return summary;
  }

  return (
    <div style={styles.historyPanel}>
      <div style={styles.historyHeader}>
        <h2 style={styles.historyTitle}>Geçmiş Hesaplamalar</h2>
        <button style={styles.closeButton} onClick={onClose}>
          &times;
        </button>
      </div>
      <div style={styles.historyContent}>
        {loading ? (
          <p>Yükleniyor...</p>
        ) : history.length === 0 ? (
          <p>Geçmiş hesaplama bulunmamaktadır.</p>
        ) : (
          history.map((calc) => (
            <div key={calc.id} style={styles.historyItem} onClick={() => handleSelect(calc)}>
              <p style={styles.historyItemTitle}>{renderSummary(calc)}</p>
              <p style={styles.historyItemTimestamp}>
                {new Date(calc.timestamp?.toDate()).toLocaleString('tr-TR', {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          ))
        )}
      </div>
      <div style={styles.historyFooter}>
        <button style={{...styles.logoutButton, backgroundColor: '#6c757d', marginBottom: '10px'}} onClick={handleClearHistory}>
          Geçmişi Temizle
        </button>
        <button style={styles.logoutButton} onClick={handleLogout}>
          Çıkış Yap
        </button>
      </div>
    </div>
  );
};

export default History;
