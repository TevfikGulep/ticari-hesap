import React, { useState, useEffect } from 'react';

const CurrencyConverter = ({ styles, rates, loading, error }) => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('TRY');
  const [result, setResult] = useState('');

  useEffect(() => {
    if (rates && rates[fromCurrency] && rates[toCurrency]) {
      const convertedAmount = (amount * rates[fromCurrency] / rates[toCurrency]).toFixed(4);
      setResult(convertedAmount);
    } else {
      setResult('');
    }
  }, [amount, fromCurrency, toCurrency, rates]);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setAmount(value);
    }
  };

  const swapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  const currencyOptions = ['USD', 'EUR', 'TRY'];

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Döviz Çevirici</h2>

      {error && <p style={{ color: '#c0392b', ...styles.label }}>Hata: {error}</p>}
      {loading && <p style={styles.label}>Kur verileri yükleniyor...</p>}

      {!loading && !error && rates && (
        <>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Miktar</label>
            <input
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={handleAmountChange}
              style={styles.input}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', margin: '20px 0' }}>
            <div style={{ ...styles.inputGroup, flex: 1 }}>
              <label style={styles.label}>Kaynak Para Birimi</label>
              <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)} style={styles.input}>
                {currencyOptions.map(currency => (
                  <option key={currency} value={currency}>{currency}</option>
                ))}
              </select>
            </div>

            <button onClick={swapCurrencies} style={{ ...styles.button, padding: '10px', marginTop: '20px' }}>
              ↔
            </button>

            <div style={{ ...styles.inputGroup, flex: 1 }}>
              <label style={styles.label}>Hedef Para Birimi</label>
              <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)} style={styles.input}>
                {currencyOptions.map(currency => (
                  <option key={currency} value={currency}>{currency}</option>
                ))}
              </select>
            </div>
          </div>

          {result && amount > 0 && (
            <div style={styles.resultContainer}>
              <h3 style={styles.resultTitle}>Sonuç</h3>
              <p style={styles.resultText}>
                {amount || 0} {fromCurrency} = {result} {toCurrency}
              </p>
              {rates[fromCurrency] && rates[toCurrency] &&
                <p style={{ ...styles.label, fontSize: '0.9em', marginTop: '10px' }}>
                  1 {fromCurrency} = {(rates[fromCurrency] / rates[toCurrency]).toFixed(4)} {toCurrency}
                </p>
              }
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CurrencyConverter;
