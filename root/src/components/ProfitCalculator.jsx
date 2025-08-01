// =================================================================
// DOSYA: src/components/ProfitCalculator.js
// AÇIKLAMA: Kâr/Zarar hesaplayıcı component'i. Firestore entegrasyonu eklendi.
// =================================================================
import React, { useState, useEffect, useRef } from 'react';
import { getFirestore, doc, setDoc, deleteDoc, serverTimestamp } from "firebase/firestore";

const ProfitCalculator = ({ styles, user, calculation, history }) => {
  const [alisFiyati, setAlisFiyati] = useState('');
  const [satisFiyati, setSatisFiyati] = useState('');
  const [kdvOrani, setKdvOrani] = useState('20');
  const [sonucTutar, setSonucTutar] = useState(0);
  const [sonucOran, setSonucOran] = useState(0);

  const db = getFirestore();
  const timeoutRef = useRef(null);

  // Geçmişten bir hesaplama seçildiğinde verileri yükle
  useEffect(() => {
    if (calculation && calculation.type === 'profit') {
      setAlisFiyati(calculation.inputs.alisFiyati !== undefined ? calculation.inputs.alisFiyati : '');
      setSatisFiyati(calculation.inputs.satisFiyati !== undefined ? calculation.inputs.satisFiyati : '');
      setKdvOrani(calculation.inputs.kdvOrani !== undefined ? calculation.inputs.kdvOrani : '20');
    }
  }, [calculation]);

  // Hesaplama yap ve sonucu state'e yaz
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
    
  // Kullanıcı yazmayı bıraktıktan 3 saniye sonra veriyi kaydet
  useEffect(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(async () => {
      const isAlisFiyatiValid = alisFiyati !== '' && !isNaN(parseFloat(alisFiyati));
      const isSatisFiyatiValid = satisFiyati !== '' && !isNaN(parseFloat(satisFiyati));

      if (user && isAlisFiyatiValid && isSatisFiyatiValid) {
        const currentInputs = {
          alisFiyati,
          satisFiyati,
          kdvOrani,
        };

        // Mevcut girdilerle aynı olan eski bir kaydı bul
        const existingCalc = history?.find(
          (h) =>
            h.type === 'profit' &&
            JSON.stringify(h.inputs) === JSON.stringify(currentInputs)
        );

        // Eğer varsa, eski kaydı sil
        if (existingCalc) {
          const oldDocRef = doc(db, `calculations/${user.uid}/items`, existingCalc.id);
          await deleteDoc(oldDocRef);
        }
        
        const calculationData = {
          type: 'profit',
          timestamp: serverTimestamp(),
          inputs: currentInputs,
          results: {
            sonucTutar,
            sonucOran,
          }
        };
        const docId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const docRef = doc(db, `calculations/${user.uid}/items`, docId);
        await setDoc(docRef, calculationData);
      }
    }, 3000);

    return () => clearTimeout(timeoutRef.current);
  }, [alisFiyati, satisFiyati, kdvOrani, sonucTutar, sonucOran, user, db, history]);


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
      <div style={{...styles.resultContainer, margin: '8px auto 0 auto'}}>
          <p style={styles.resultLabel}>Net Kâr/Zarar Tutarı:</p>
          <p style={{ ...styles.resultValue, color: getResultColor() }}>{sonucTutar.toFixed(2).replace('.',',')} ₺</p>
      </div>
      <div style={{...styles.resultContainer, margin: '8px auto'}}>
          <p style={styles.resultLabel}>Net Kâr/Zarar Oranı:</p>
          <p style={{ ...styles.resultValue, color: getResultColor() }}>{sonucOran.toFixed(2).replace('.',',')} %</p>
      </div>
    </div>
  );
};

export default ProfitCalculator;
