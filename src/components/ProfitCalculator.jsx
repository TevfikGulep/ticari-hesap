// =================================================================
// DOSYA: src/components/ProfitCalculator.js
// AÇIKLAMA: Kâr/Zarar hesaplayıcı component'i.
// =================================================================
import React, { useState, useEffect } from 'react';

const ProfitCalculator = ({ styles }) => {
  const [alisFiyati, setAlisFiyati] = useState('');
  const [satisFiyati, setSatisFiyati] = useState('');
  const [kdvOrani, setKdvOrani] = useState('0');
  const [sonucTutar, setSonucTutar] = useState(0);
  const [sonucOran, setSonucOran] = useState(0);

  useEffect(() => {
    const alis = parseFloat(alisFiyati) || 0;
    const satis = parseFloat(satisFiyati) || 0;
    const kdv = parseFloat(kdvOrani) || 0;
    if (alis > 0) {
      const satisKdvHaric = satis / (1 + kdv / 100);
      const tutar = satisKdvHaric - alis;
      const oran = (tutar / alis) * 100;
      setSonucTutar(tutar);
      setSonucOran(oran);
    } else {
      setSonucTutar(0);
      setSonucOran(0);
    }
  }, [alisFiyati, satisFiyati, kdvOrani]);

  const getResultColor = () => {
    if (sonucTutar > 0) return '#28a745';
    if (sonucTutar < 0) return '#dc3545';
    return styles.resultValue.color;
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.cardTitle}>Kâr/Zarar Hesaplama</h2>
      <p style={styles.label}>Alış Fiyatı (₺)</p>
      <input style={styles.input} type="number" placeholder="Örn: 100" value={alisFiyati} onChange={(e) => setAlisFiyati(e.target.value)} />
      <p style={styles.label}>Satış Fiyatı (KDV Dahil) (₺)</p>
      <input style={styles.input} type="number" placeholder="Örn: 150" value={satisFiyati} onChange={(e) => setSatisFiyati(e.target.value)} />
      <p style={styles.label}>KDV Oranı (%)</p>
      <input style={styles.input} type="number" placeholder="Örn: 20" value={kdvOrani} onChange={(e) => setKdvOrani(e.target.value)} />
      <div style={styles.resultContainer}>
          <p style={styles.resultLabel}>Net Kâr/Zarar Tutarı:</p>
          <p style={{ ...styles.resultValue, color: getResultColor() }}>{sonucTutar.toFixed(2).replace('.',',')} ₺</p>
      </div>
      <div style={styles.resultContainer}>
          <p style={styles.resultLabel}>Net Kâr/Zarar Oranı:</p>
          <p style={{ ...styles.resultValue, color: getResultColor() }}>{sonucOran.toFixed(2).replace('.',',')} %</p>
      </div>
    </div>
  );
};

export default ProfitCalculator;
