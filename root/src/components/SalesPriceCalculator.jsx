// =================================================================
// DOSYA: root/src/components/SalesPriceCalculator.js (GÜNCELLENDİ)
// AÇIKLAMA: Güncellenmiş saveCalculation fonksiyonu kullanıldı.
// =================================================================
import React, { useState, useEffect, useRef } from 'react';
import { saveCalculation } from '../firebaseConfig';

const SalesPriceCalculator = ({ styles, calculation, user }) => {
  const [alisFiyati, setAlisFiyati] = useState('');
  const [karOrani, setKarOrani] = useState('');
  const [sonucSatisFiyati, setSonucSatisFiyati] = useState(0);

  const timeoutRef = useRef(null);

  useEffect(() => {
    if (calculation && calculation.title === 'Satış Fiyatı Hesaplama') {
      setAlisFiyati(calculation.inputs.alisFiyati !== undefined ? calculation.inputs.alisFiyati : '');
      setKarOrani(calculation.inputs.karOrani !== undefined ? calculation.inputs.karOrani : '');
    }
  }, [calculation]);

  useEffect(() => {
    const alis = parseFloat(alisFiyati) || 0;
    const kar = parseFloat(karOrani) || 0;
    const satisFiyati = alis * (1 + kar / 100);
    setSonucSatisFiyati(satisFiyati);

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (user && user.uid && alis > 0 && kar > 0) {
        saveCalculation(user.uid, {
          title: 'Satış Fiyatı Hesaplama',
          inputs: {
            alisFiyati,
            karOrani,
          },
          outputs: {
            'Olması Gereken Satış Fiyatı': `${satisFiyati.toFixed(2)} ₺`,
          },
        });
      }
    }, 3000);

    return () => clearTimeout(timeoutRef.current);
  }, [alisFiyati, karOrani, user, sonucSatisFiyati]);

  return (
    <div style={styles.card}>
      <h2 style={styles.cardTitle}>Satış Fiyatı Hesaplama</h2>
      <p style={styles.label}>Alış Fiyatı (₺)</p>
      <input style={styles.input} type="number" placeholder="Örn: 100" value={alisFiyati} onChange={(e) => setAlisFiyati(e.target.value)} />
      <p style={styles.label}>İstenen Kâr Oranı (%)</p>
      <input style={styles.input} type="number" placeholder="Örn: 50" value={karOrani} onChange={(e) => setKarOrani(e.target.value)} />
      <div style={{...styles.resultContainer, ...styles.highlightedResult}}>
          <p style={styles.highlightedResultLabel}>Olması Gereken Satış Fiyatı:</p>
          <p style={styles.highlightedResultValue}>{sonucSatisFiyati.toFixed(2).replace('.',',')} ₺</p>
      </div>
      <p style={{...styles.label, marginTop: '20px', fontStyle: 'italic', color: '#555'}}>Giriş yaptığınızda geçmiş işlemlerinizi görebilir ve daha fazla özelliğe erişebilirsiniz. Tamamen Ücretsiz.</p>
    </div>
  );
};

export default SalesPriceCalculator;
