// =================================================================
// DOSYA: src/components/SalesPriceCalculator.js
// AÇIKLAMA: Satış fiyatı hesaplayıcı component'i. Firestore entegrasyonu eklendi.
// =================================================================
import React, { useState, useEffect, useRef } from 'react';
import { getFirestore, doc, setDoc, deleteDoc, serverTimestamp } from "firebase/firestore";

const SalesPriceCalculator = ({ styles, user, calculation, history }) => {
  const [alisFiyati, setAlisFiyati] = useState('');
  const [karOrani, setKarOrani] = useState('');
  const [sonucSatisFiyati, setSonucSatisFiyati] = useState(0);

  const db = getFirestore();
  const timeoutRef = useRef(null);

  // Geçmişten bir hesaplama seçildiğinde verileri yükle
  useEffect(() => {
    if (calculation && calculation.type === 'sales_price') {
      setAlisFiyati(calculation.inputs.alisFiyati !== undefined ? calculation.inputs.alisFiyati : '');
      setKarOrani(calculation.inputs.karOrani !== undefined ? calculation.inputs.karOrani : '');
    }
  }, [calculation]);

  // Hesaplama yap ve sonucu state'e yaz
  useEffect(() => {
    const alis = parseFloat(alisFiyati) || 0;
    const kar = parseFloat(karOrani) || 0;
    const satisFiyati = alis * (1 + kar / 100);
    setSonucSatisFiyati(satisFiyati);
  }, [alisFiyati, karOrani]);
    
  // Kullanıcı yazmayı bıraktıktan 3 saniye sonra veriyi kaydet
  useEffect(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(async () => {
      const isAlisFiyatiValid = alisFiyati !== '' && !isNaN(parseFloat(alisFiyati));
      const isKarOraniValid = karOrani !== '' && !isNaN(parseFloat(karOrani));

      if (user && isAlisFiyatiValid && isKarOraniValid) {
        const currentInputs = {
          alisFiyati,
          karOrani,
        };

        const existingCalc = history?.find(
          (h) =>
            h.type === 'sales_price' &&
            JSON.stringify(h.inputs) === JSON.stringify(currentInputs)
        );

        if (existingCalc) {
          const oldDocRef = doc(db, `calculations/${user.uid}/items`, existingCalc.id);
          await deleteDoc(oldDocRef);
        }

        const calculationData = {
          type: 'sales_price',
          timestamp: serverTimestamp(),
          inputs: currentInputs,
          results: {
            sonucSatisFiyati,
          }
        };
        const docId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const docRef = doc(db, `calculations/${user.uid}/items`, docId);
        await setDoc(docRef, calculationData);
      }
    }, 3000);

    return () => clearTimeout(timeoutRef.current);
  }, [alisFiyati, karOrani, sonucSatisFiyati, user, db, history]);

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
