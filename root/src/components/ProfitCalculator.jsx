// =================================================================
// DOSYA: root/src/components/ProfitCalculator.js (GÜNCELLENDİ)
// AÇIKLAMA: Güncellenmiş saveCalculation fonksiyonu kullanıldı.
// =================================================================
import React, { useState, useEffect, useRef } from 'react';
import { saveCalculation } from '../firebaseConfig';

const ProfitCalculator = ({ styles, calculation, user }) => {
  const [alisFiyati, setAlisFiyati] = useState('');
  const [satisFiyati, setSatisFiyati] = useState('');
  const [adet, setAdet] = useState('1');
  const [kdvOrani, setKdvOrani] = useState('0');
  const [sonucTutar, setSonucTutar] = useState(0);
  const [sonucOran, setSonucOran] = useState(0);
  const [toplamSonucTutar, setToplamSonucTutar] = useState(0);

  const timeoutRef = useRef(null);

  useEffect(() => {
    if (calculation && calculation.title === 'Kâr/Zarar Hesaplama') {
      setAlisFiyati(calculation.inputs.alisFiyati !== undefined ? calculation.inputs.alisFiyati : '');
      setSatisFiyati(calculation.inputs.satisFiyati !== undefined ? calculation.inputs.satisFiyati : '');
      setAdet(calculation.inputs.adet !== undefined ? calculation.inputs.adet : '1');
      setKdvOrani(calculation.inputs.kdvOrani !== undefined ? calculation.inputs.kdvOrani : '0');
    }
  }, [calculation]);

  useEffect(() => {
    const alis = parseFloat(alisFiyati) || 0;
    const satis = parseFloat(satisFiyati) || 0;
    const kdv = parseFloat(kdvOrani) || 0;
    const miktar = parseInt(adet, 10) || 1;

    if (alis > 0) {
      const satisKdvHaric = satis / (1 + kdv / 100);
      const tutar = satisKdvHaric - alis;
      const oran = (tutar / alis) * 100;
      setSonucTutar(tutar);
      setSonucOran(oran);
      setToplamSonucTutar(tutar * miktar);
    } else {
      setSonucTutar(0);
      setSonucOran(0);
      setToplamSonucTutar(0);
    }

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (user && user.uid && alis > 0 && satis > 0) {
        saveCalculation(user.uid, {
          title: 'Kâr/Zarar Hesaplama',
          inputs: {
            alisFiyati,
            satisFiyati,
            adet,
            kdvOrani,
          },
          outputs: {
            'Birim Başına Net Kâr/Zarar': `${sonucTutar.toFixed(2)} ₺`,
            'Birim Başına Net Kâr/Zarar Oranı': `${sonucOran.toFixed(2)} %`,
            'Toplam Net Kâr/Zarar Tutarı': `${toplamSonucTutar.toFixed(2)} ₺`,
          },
        });
      }
    }, 3000);

    return () => clearTimeout(timeoutRef.current);
  }, [alisFiyati, satisFiyati, kdvOrani, adet, user, sonucTutar, sonucOran, toplamSonucTutar]);

  const getResultColor = (value) => {
    if (value > 0) return '#28a745';
    if (value < 0) return '#dc3545';
    return styles.resultValue.color;
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.cardTitle}>Kâr/Zarar Hesaplama</h2>
      <p style={styles.label}>Alış Fiyatı (₺)</p>
      <input style={styles.input} type="number" placeholder="Örn: 100" value={alisFiyati} onChange={(e) => setAlisFiyati(e.target.value)} />
      <p style={styles.label}>Satış Fiyatı (KDV Dahil) (₺)</p>
      <input style={styles.input} type="number" placeholder="Örn: 150" value={satisFiyati} onChange={(e) => setSatisFiyati(e.target.value)} />
      <p style={styles.label}>Adet</p>
      <input style={styles.input} type="number" placeholder="Örn: 1" value={adet} onChange={(e) => setAdet(e.target.value)} />
      <p style={styles.label}>KDV Oranı (%)</p>
      <input style={styles.input} type="number" placeholder="Örn: 20" value={kdvOrani} onChange={(e) => setKdvOrani(e.target.value)} />
      
      <div style={{...styles.resultContainer, margin: '8px auto 0 auto', paddingTop: '10px'}}>
          <p style={styles.resultLabel}>Birim Başına Net Kâr/Zarar:</p>
          <p style={{ ...styles.resultValue, color: getResultColor(sonucTutar) }}>{sonucTutar.toFixed(2).replace('.',',')} ₺</p>
      </div>
      <div style={{...styles.resultContainer, margin: '8px auto'}}>
          <p style={styles.resultLabel}>Birim Başına Net Kâr/Zarar Oranı:</p>
          <p style={{ ...styles.resultValue, color: getResultColor(sonucOran) }}>{sonucOran.toFixed(2).replace('.',',')} %</p>
      </div>
      <div style={{...styles.resultContainer, ...styles.highlightedResult}}>
          <p style={{...styles.highlightedResultLabel, fontWeight: 'bold'}}>Toplam Net Kâr/Zarar Tutarı ({adet} adet):</p>
          <p style={{ ...styles.highlightedResultValue, color: getResultColor(toplamSonucTutar), fontWeight: 'bold' }}>{toplamSonucTutar.toFixed(2).replace('.',',')} ₺</p>
      </div>
    </div>
  );
};

export default ProfitCalculator;
