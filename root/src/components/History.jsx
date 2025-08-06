// =================================================================
// DOSYA: root/src/components/History.jsx (GÜNCELLENDİ)
// AÇIKLAMA: "Geçmişi Temizle" butonu ve onay diyaloğu eklendi.
// =================================================================
import React, { useState, useEffect } from 'react';
import { auth, db, clearHistory, updateCalculation } from '../firebaseConfig';
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

const History = ({ user, styles, onClose, onCalculationSelect }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedNote, setEditedNote] = useState('');


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

  const handleEdit = (calc) => {
    setEditingId(calc.id);
    setEditedTitle(calc.customTitle || '');
    setEditedNote(calc.customNote || '');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedTitle('');
    setEditedNote('');
  };

  const handleSaveEdit = async (calcId) => {
    await updateCalculation(user.uid, calcId, {
      customTitle: editedTitle,
      customNote: editedNote,
    });
    handleCancelEdit();
  };


  const renderSummary = (calc) => {
    if (calc.customTitle) {
      return calc.customTitle;
    }

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
            <div key={calc.id} style={styles.historyItem}>
              {editingId === calc.id ? (
                <div>
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    placeholder="Başlık Ekle"
                    style={{ ...styles.input, marginBottom: '5px' }}
                  />
                  <textarea
                    value={editedNote}
                    onChange={(e) => setEditedNote(e.target.value)}
                    placeholder="Not Ekle"
                    style={{ ...styles.textarea, marginBottom: '5px', width: '100%', minHeight: '60px' }}
                  />
                  <button onClick={() => handleSaveEdit(calc.id)} style={{...styles.button, marginRight: '5px'}}>Kaydet</button>
                  <button onClick={handleCancelEdit} style={styles.button}>İptal</button>
                </div>
              ) : (
                <div onClick={() => handleSelect(calc)}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <p style={styles.historyItemTitle}>{renderSummary(calc)}</p>
                    <button onClick={(e) => { e.stopPropagation(); handleEdit(calc); }} style={{...styles.editButton, padding: '2px 6px'}}>Düzenle</button>
                  </div>
                  {calc.customNote && <p style={{...styles.historyItemNote, marginTop: '4px'}}>{calc.customNote}</p>}
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
              )}
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
