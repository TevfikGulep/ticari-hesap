import React, { useState, useEffect } from 'react';

const OptionPriceCalculator = ({ styles }) => {
  const [stockPrice, setStockPrice] = useState('');
  const [premiumPrice, setPremiumPrice] = useState('');
  const [delta, setDelta] = useState('');
  const [gamma, setGamma] = useState('');
  const [stockChangePercent, setStockChangePercent] = useState('');
  const [shareCount, setShareCount] = useState('1');
  const [spread, setSpread] = useState(''); // State for the bid-ask spread
  
  // Initialize results with 0
  const [optionPriceChangeAmount, setOptionPriceChangeAmount] = useState(0);
  const [optionChangePercent, setOptionChangePercent] = useState(0);
  const [newOptionPrice, setNewOptionPrice] = useState(0);
  const [newBidPrice, setNewBidPrice] = useState(0); // State for the new bid price
  const [newAskPrice, setNewAskPrice] = useState(0); // State for the new ask price

  useEffect(() => {
    const S = parseFloat(stockPrice) || 0;
    const P = parseFloat(premiumPrice) || 0;
    const D = parseFloat(delta) || 0;
    const G = parseFloat(gamma) || 0;
    const SCP = parseFloat(stockChangePercent) || 0;
    const SC = parseInt(shareCount, 10) || 1;
    const SP = parseFloat(spread) || 0; // Parse the spread, default to 0

    if (S > 0 && P > 0) {
      const stockPriceChangeAmount = S * (SCP / 100);
      let optPriceChangeAmount = (D * stockPriceChangeAmount);

      if (G !== 0) {
        optPriceChangeAmount += (0.5 * G * (stockPriceChangeAmount * stockPriceChangeAmount));
      }
      
      const finalOptPriceChange = optPriceChangeAmount * SC;
      const newMidPrice = P + finalOptPriceChange; // This is the new mid-price
      const optChangePercent = (finalOptPriceChange / (P * SC)) * 100;

      // Calculate new bid and ask prices based on the spread
      const newBid = newMidPrice - (SP / 2);
      const newAsk = newMidPrice + (SP / 2);

      setOptionPriceChangeAmount(finalOptPriceChange);
      setOptionChangePercent(isNaN(optChangePercent) ? 0 : optChangePercent);
      setNewOptionPrice(newMidPrice);
      setNewBidPrice(newBid);
      setNewAskPrice(newAsk);

    } else {
      // Reset to 0 if core inputs are missing
      setOptionPriceChangeAmount(0);
      setOptionChangePercent(0);
      setNewOptionPrice(0);
      setNewBidPrice(0);
      setNewAskPrice(0);
    }
  }, [stockPrice, premiumPrice, delta, gamma, stockChangePercent, shareCount, spread]);

  return (
    <div style={styles.card}>
      <h2 style={styles.cardTitle}>Hisse Opsiyon Fiyat Hesaplama</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label style={styles.label}>Hisse Fiyatı</label>
          <input
            type="number"
            value={stockPrice}
            onChange={(e) => setStockPrice(e.target.value)}
            style={styles.input}
            placeholder="Örn: 100"
          />
        </div>
        <div>
          <label style={styles.label}>Premium Fiyatı</label>
          <input
            type="number"
            value={premiumPrice}
            onChange={(e) => setPremiumPrice(e.target.value)}
            style={styles.input}
            placeholder="Örn: 5"
          />
        </div>
        <div>
          <label style={styles.label}>Delta</label>
          <input
            type="number"
            value={delta}
            onChange={(e) => setDelta(e.target.value)}
            style={styles.input}
            placeholder="Örn: 0.6"
          />
        </div>
        <div>
          <label style={styles.label}>Gamma (Opsiyonel)</label>
          <input
            type="number"
            value={gamma}
            onChange={(e) => setGamma(e.target.value)}
            style={styles.input}
            placeholder="Örn: 0.05"
          />
        </div>
        <div>
          <label style={styles.label}>Hisse Yüzde Değişikliği (%)</label>
          <input
            type="number"
            value={stockChangePercent}
            onChange={(e) => setStockChangePercent(e.target.value)}
            style={styles.input}
            placeholder="Örn: 2 (artış), -3 (düşüş)"
          />
        </div>
        <div>
          <label style={styles.label}>Hisse Adedi</label>
          <input
            type="number"
            value={shareCount}
            onChange={(e) => setShareCount(e.target.value)}
            style={styles.input}
            placeholder="Örn: 100"
          />
        </div>
        {/* New Input for Spread */}
        <div className="md:col-span-2">
          <label style={styles.label}>Alış-Satış Farkı (Opsiyonel)</label>
          <input
            type="number"
            value={spread}
            onChange={(e) => setSpread(e.target.value)}
            style={styles.input}
            placeholder="Örn: 0.10"
          />
        </div>
      </div>

      <div style={{marginTop: '16px'}}>
        <div style={{...styles.resultContainer, margin: '8px auto 0 auto', paddingTop: '10px'}}>
            <p style={styles.resultLabel}>Opsiyon Fiyatındaki Toplam Değişim:</p>
            <p style={styles.resultValue}>{optionPriceChangeAmount.toFixed(2)} ₺</p>
        </div>
        <div style={{...styles.resultContainer, margin: '8px auto 0 auto'}}>
            <p style={styles.resultLabel}>Opsiyon Fiyatındaki Yüzdesel Değişim:</p>
            <p style={styles.resultValue}>%{optionChangePercent.toFixed(2)}</p>
        </div>
        <div style={{...styles.resultContainer, ...styles.highlightedResult, margin: '8px auto 0 auto'}}>
            <p style={styles.highlightedResultLabel}>Yeni Opsiyon Fiyatı (Orta):</p>
            <p style={styles.highlightedResultValue}>{newOptionPrice.toFixed(2)} ₺</p>
        </div>
        {/* Display new Bid and Ask prices if spread is entered */}
        {spread && (
          <>
            <div style={{...styles.resultContainer, margin: '8px auto 0 auto'}}>
                <p style={styles.resultLabel}>Yeni Alış Fiyatı (Bid):</p>
                <p style={styles.resultValue}>{newBidPrice.toFixed(2)} ₺</p>
            </div>
            <div style={{...styles.resultContainer, margin: '8px auto 0 auto'}}>
                <p style={styles.resultLabel}>Yeni Satış Fiyatı (Ask):</p>
                <p style={styles.resultValue}>{newAskPrice.toFixed(2)} ₺</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OptionPriceCalculator;
