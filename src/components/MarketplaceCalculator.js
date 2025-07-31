// =================================================================
// DOSYA: src/components/MarketplaceCalculator.js
// AÇIKLAMA: Pazaryeri fiyat hesaplayıcı component'i.
// =================================================================
import React, { useState, useEffect } from 'react';

const MarketplaceCalculator = ({ styles }) => {
  const [gelisFiyati, setGelisFiyati] = useState('');
  const [kargo, setKargo] = useState('');
  const [paketleme, setPaketleme] = useState('');
  const [reklam, setReklam] = useState('');
  const [iadeOrani, setIadeOrani] = useState('5');
  const [komisyon, setKomisyon] = useState('15');
  const [kdv, setKdv] = useState('20');
  const [kar, setKar] = useState('30');
  const [satisFiyati, setSatisFiyati] = useState(0);
  const [toplamMaliyet, setToplamMaliyet] = useState(0);
  const [karMiktari, setKarMiktari] = useState(0);
  const [komisyonTutari, setKomisyonTutari] = useState(0);

  useEffect(() => {
    const pGelisFiyati = parseFloat(gelisFiyati) || 0;
    const pKargo = parseFloat(kargo) || 0;
    const pPaketleme = parseFloat(paketleme) || 0;
    const pReklam = parseFloat(reklam) || 0;
    const pIadeOrani = parseFloat(iadeOrani) || 0;
    const pKomisyon = parseFloat(komisyon) || 0;
    const pKdv = parseFloat(kdv) || 0;
    const pKar = parseFloat(kar) || 0;

    const komisyonDecimal = pKomisyon / 100;
    const kdvDecimal = pKdv / 100;
    const karDecimal = pKar / 100;
    const iadeDecimal = pIadeOrani / 100;

    const reklamKdvHaric = pReklam / 1.20;
    const baseCost = pGelisFiyati + pPaketleme + reklamKdvHaric;
    const returnCostPerItem = (iadeDecimal > 0 && iadeDecimal < 1) ? (iadeDecimal * (pKargo / 2)) / (1 - iadeDecimal) : 0;
    const inputVat = pGelisFiyati * kdvDecimal;
    const serviceVat = (pKargo + pPaketleme) * 0.20 + (pReklam - reklamKdvHaric);
    const totalDeductibleVat = inputVat + serviceVat;
    const netCostBeforeProfit = baseCost + pKargo + returnCostPerItem - totalDeductibleVat;
    const denominator = 1 - komisyonDecimal - kdvDecimal - karDecimal;
    
    let calculatedSatisFiyati = 0;
    if (pGelisFiyati > 0 && denominator > 0) {
      const priceBeforeRounding = netCostBeforeProfit / denominator;
      calculatedSatisFiyati = Math.round(priceBeforeRounding / 5) * 5 - 0.01;
      if (calculatedSatisFiyati < 0) calculatedSatisFiyati = 0;
    }
    setSatisFiyati(calculatedSatisFiyati);

    const finalCommission = calculatedSatisFiyati * komisyonDecimal;
    const outputVat = calculatedSatisFiyati * kdvDecimal;
    const totalOutflow = baseCost + pKargo + returnCostPerItem + finalCommission + outputVat;
    const netTotalCost = totalOutflow - totalDeductibleVat;
    const finalProfit = calculatedSatisFiyati - netTotalCost;

    setToplamMaliyet(netTotalCost);
    setKarMiktari(finalProfit);
    setKomisyonTutari(finalCommission);

  }, [gelisFiyati, kargo, paketleme, reklam, iadeOrani, komisyon, kdv, kar]);

  return (
    <div style={styles.card}>
      <h2 style={styles.cardTitle}>Pazaryeri Fiyat Hesaplama</h2>
      <p style={styles.label}>Ürün Alış Fiyatı (KDV Hariç) (₺)</p>
      <input style={styles.input} type="number" placeholder="Örn: 100" value={gelisFiyati} onChange={(e) => setGelisFiyati(e.target.value)} />
      <p style={styles.label}>Kargo Gideri (KDV Hariç) (₺)</p>
      <input style={styles.input} type="number" placeholder="Örn: 30" value={kargo} onChange={(e) => setKargo(e.target.value)} />
      <p style={styles.label}>Paketleme Gideri (KDV Hariç) (₺)</p>
      <input style={styles.input} type="number" placeholder="Örn: 5" value={paketleme} onChange={(e) => setPaketleme(e.target.value)} />
      <p style={styles.label}>Reklam Gideri (Ürün başı) (Opsiyonel) (₺)</p>
      <input style={styles.input} type="number" placeholder="Örn: 12" value={reklam} onChange={(e) => setReklam(e.target.value)} />
      <p style={styles.label}>İade Oranı (%)</p>
      <input style={styles.input} type="number" placeholder="Örn: 5" value={iadeOrani} onChange={(e) => setIadeOrani(e.target.value)} />
      <p style={styles.label}>Pazaryeri Komisyon Oranı (%)</p>
      <input style={styles.input} type="number" value={komisyon} onChange={(e) => setKomisyon(e.target.value)} />
      <p style={styles.label}>KDV Oranı (%)</p>
      <input style={styles.input} type="number" value={kdv} onChange={(e) => setKdv(e.target.value)} />
      <p style={styles.label}>İstenen Net Kâr Oranı (%)</p>
      <input style={styles.input} type="number" placeholder="Örn: 30" value={kar} onChange={(e) => setKar(e.target.value)} />
      
      <div style={{...styles.resultContainer, ...styles.highlightedResult}}>
          <p style={styles.highlightedResultLabel}>Önerilen Satış Fiyatı:</p>
          <p style={styles.highlightedResultValue}>{satisFiyati.toFixed(2).replace('.',',')} ₺</p>
      </div>
       <div style={{...styles.resultContainer, marginTop: '10px'}}>
          <p style={styles.resultLabel}>Ürün Başına Toplam Net Maliyet:</p>
          <p style={styles.resultValue}>{toplamMaliyet.toFixed(2).replace('.',',')} ₺</p>
      </div>
      <div style={{...styles.resultContainer, marginTop: '10px'}}>
          <p style={styles.resultLabel}>Beklenen Kâr Miktarı:</p>
          <p style={styles.resultValue}>{karMiktari.toFixed(2).replace('.',',')} ₺</p>
      </div>
      <div style={{...styles.resultContainer, marginTop: '10px'}}>
          <p style={styles.resultLabel}>Pazaryerine Ödenen Komisyon:</p>
          <p style={styles.resultValue}>{komisyonTutari.toFixed(2).replace('.',',')} ₺</p>
      </div>
    </div>
  );
};

export default MarketplaceCalculator;
