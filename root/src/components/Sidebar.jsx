// =================================================================
// DOSYA: src/components/Sidebar.jsx
// AÇIKLAMA: Hesaplama geçmişini gösteren kenar çubuğu bileşeni.
// =================================================================
import React from 'react';

const Sidebar = ({ history, onSelect, onClose, styles }) => {
  if (!history) {
    return null;
  }

  const formatCurrency = (value) => {
    const number = parseFloat(String(value).replace(',', '.'));
    return isNaN(number) ? '' : new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(number);
  };

  const getCalculationTitle = (calc) => {
    try {
      switch (calc.type) {
        case 'profit':
          const profitRate = calc.results?.sonucOran;
          return `Kâr/Zarar: ${profitRate ? profitRate.toFixed(2).replace('.',',') + ' %' : ''}`;
        case 'sales_price':
          const salesPrice = calc.results?.satisFiyati;
          return `Satış Fiyatı: ${salesPrice ? formatCurrency(salesPrice) : ''}`;
        case 'marketplace':
          const marketplacePrice = calc.results?.satisFiyati;
          return `Pazaryeri Fiyatı: ${marketplacePrice ? formatCurrency(marketplacePrice) : ''}`;
        case 'salary':
          const salary = calc.inputs?.salaryInput;
          return `Maaş: ${salary || ''} ₺`;
        default:
          return 'Bilinmeyen Hesaplama';
      }
    } catch (error) {
        console.error("Error generating title:", error);
        return "Hatalı Hesaplama";
    }
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={{...styles.sideMenu, right: 0, left: 'auto' }} onClick={(e) => e.stopPropagation()}>
        <div style={styles.sideMenuHeader}>
          <h2 style={styles.sideMenuTitle}>Hesaplama Geçmişi</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: styles.text?.color }}>&times;</button>
        </div>
        {history.length === 0 ? (
          <p style={{ padding: '20px', color: styles.label?.color }}>Henüz bir hesaplama yapmadınız.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {history.map((calc) => (
              <li key={calc.id} style={{ borderBottom: `1px solid ${styles.inputBorder?.color}` }}>
                <button
                  onClick={() => {
                    onSelect(calc);
                    onClose();
                  }}
                  style={{
                    ...styles.menuItem,
                    width: '100%',
                    textAlign: 'left',
                    padding: '15px 20px',
                  }}
                >
                  <span style={{ fontWeight: 'bold', color: styles.cardTitle?.color }}>{getCalculationTitle(calc)}</span>
                  <br />
                  <span style={{ fontSize: 12, color: styles.label?.color }}>
                    {calc.timestamp ? new Date(calc.timestamp.toDate()).toLocaleString('tr-TR') : 'Tarih Yok'}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
