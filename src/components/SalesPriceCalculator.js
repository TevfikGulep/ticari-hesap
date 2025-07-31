// =================================================================
// DOSYA: src/components/SalesPriceCalculator.js
// AÇIKLAMA: Satış fiyatı hesaplayıcı component'i.
// =================================================================
import React, { useState, useEffect } from 'react';

const SalesPriceCalculator = ({ styles }) => {
  const [alisFiyati, setAlisFiyati] = useState('');
  const [karOrani, setKarOrani] = useState('');
  const [sonucSatisFiyati, setSonucSatisFiyati] = useState(0);

  useEffect(() => {
    const alis = parseFloat(alisFiyati) || 0;
    const kar = parseFloat(karOrani) || 0;
    const satisFiyati = alis * (1 + kar / 100);
    setSonucSatisFiyati(satisFiyati);
  }, [alisFiyati, karOrani]);

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
    </div>
  );
};

export default SalesPriceCalculator;
