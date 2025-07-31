import React, { useState, useEffect } from 'react';

// --- Ikonlar için SVG Componentleri ---
const MenuIcon = ({ style }) => (
  <svg style={style} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
  </svg>
);

const CloseIcon = ({ style }) => (
  <svg style={style} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
  </svg>
);

// --- Hesaplayıcı Componentleri ---

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

const SalaryCalculator = ({ styles }) => {
  const [calculationType, setCalculationType] = useState('grossToNet');
  const [salaryInput, setSalaryInput] = useState('');
  const [engellilikDurumu, setEngellilikDurumu] = useState('yok');
  const [monthlyBreakdown, setMonthlyBreakdown] = useState([]);
  const [yearlyTotals, setYearlyTotals] = useState(null);

  const formatLocale = (number) => {
    if (typeof number !== 'number') return '0,00';
    return new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(number);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    const rawValue = value.replace(/\./g, '');
    if (/^[\d,]*$/.test(rawValue)) {
      const parts = rawValue.split(',');
      const integerPart = parts[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
      const formattedValue = parts.length > 1 ? `${integerPart},${parts[1].slice(0, 2)}` : integerPart;
      setSalaryInput(formattedValue);
    }
  };

  useEffect(() => {
    const calculate = () => {
      const pSalaryInput = parseFloat(salaryInput.replace(/\./g, '').replace(',', '.')) || 0;
      if (pSalaryInput === 0) {
        setMonthlyBreakdown([]);
        setYearlyTotals(null);
        return;
      }

      const ASGARI_UCRET_BRUT = 26005.50;
      const SGK_TAVAN = ASGARI_UCRET_BRUT * 7.5;
      const ENGELLILIK_INDIRIMI = { yok: 0, derece1: 6900, derece2: 4000, derece3: 1700 };
      const VERGI_DILIMLERI = [
        { limit: 110000, rate: 0.15 }, { limit: 230000, rate: 0.20 },
        { limit: 870000, rate: 0.27 }, { limit: 3000000, rate: 0.35 },
        { limit: Infinity, rate: 0.40 },
      ];

      const calculateIncomeTax = (matrah, kumulatif) => {
        let tax = 0;
        let previousLimit = 0;
        for (const dilim of VERGI_DILIMLERI) {
            if (matrah <= 0) break;
            const currentLimit = dilim.limit;
            const applicableMatrahInBracket = Math.min(matrah, currentLimit - kumulatif);

            if (applicableMatrahInBracket > 0) {
                tax += applicableMatrahInBracket * dilim.rate;
                matrah -= applicableMatrahInBracket;
                kumulatif += applicableMatrahInBracket;
            }
            if (kumulatif >= currentLimit) {
                previousLimit = currentLimit;
            }
        }
        return tax;
      };
      
      const calculateGrossFromNet = (targetNet, kumulatif) => {
        let guessBrut = targetNet * 1.4;
        for(let i = 0; i < 20; i++) {
            const sgkIsciPayi = Math.min(guessBrut, SGK_TAVAN) * 0.14;
            const issizlikIsciPayi = Math.min(guessBrut, SGK_TAVAN) * 0.01;
            const gelirVergisiMatrahi = guessBrut - sgkIsciPayi - issizlikIsciPayi;
            const engellilikIndirimiTutari = ENGELLILIK_INDIRIMI[engellilikDurumu];
            const indirimliMatrah = Math.max(0, gelirVergisiMatrahi - engellilikIndirimiTutari);
            
            const asgariUcretGvMatrahi = ASGARI_UCRET_BRUT - (ASGARI_UCRET_BRUT * 0.15);
            const gelirVergisiIstisnasi = calculateIncomeTax(asgariUcretGvMatrahi, kumulatif);
            const damgaVergisiIstisnasi = ASGARI_UCRET_BRUT * 0.00759;
            
            const hesaplananGelirVergisi = calculateIncomeTax(indirimliMatrah, kumulatif);
            const nihaiGelirVergisi = Math.max(0, hesaplananGelirVergisi - gelirVergisiIstisnasi);
            const hesaplananDamgaVergisi = guessBrut * 0.00759;
            const nihaiDamgaVergisi = Math.max(0, hesaplananDamgaVergisi - damgaVergisiIstisnasi);
            const toplamKesinti = sgkIsciPayi + issizlikIsciPayi + nihaiGelirVergisi + nihaiDamgaVergisi;
            const calculatedNet = guessBrut - toplamKesinti;
            
            if (Math.abs(calculatedNet - targetNet) < 0.01) break;
            guessBrut = guessBrut * (targetNet / calculatedNet);
        }
        return guessBrut;
      };

      let kumulatif = 0;
      let asgariUcretKumulatif = 0;
      const breakdown = [];
      for (let i = 0; i < 12; i++) {
        let brutUcret;
        if (calculationType === 'grossToNet') {
          brutUcret = pSalaryInput;
        } else {
          brutUcret = calculateGrossFromNet(pSalaryInput, kumulatif);
        }

        const sgkIsciPayi = Math.min(brutUcret, SGK_TAVAN) * 0.14;
        const issizlikIsciPayi = Math.min(brutUcret, SGK_TAVAN) * 0.01;
        const gelirVergisiMatrahi = brutUcret - sgkIsciPayi - issizlikIsciPayi;
        
        const asgariUcretGvMatrahi = ASGARI_UCRET_BRUT - (ASGARI_UCRET_BRUT * 0.14) - (ASGARI_UCRET_BRUT * 0.01);
        const gelirVergisiIstisnasi = calculateIncomeTax(asgariUcretGvMatrahi, asgariUcretKumulatif);
        const damgaVergisiIstisnasi = ASGARI_UCRET_BRUT * 0.00759;

        const engellilikIndirimiTutari = ENGELLILIK_INDIRIMI[engellilikDurumu];
        const indirimliMatrah = Math.max(0, gelirVergisiMatrahi - engellilikIndirimiTutari);
        
        const hesaplananGelirVergisi = calculateIncomeTax(indirimliMatrah, kumulatif);
        const nihaiGelirVergisi = brutUcret <= ASGARI_UCRET_BRUT ? 0 : Math.max(0, hesaplananGelirVergisi - gelirVergisiIstisnasi);
        
        const hesaplananDamgaVergisi = brutUcret * 0.00759;
        const nihaiDamgaVergisi = brutUcret <= ASGARI_UCRET_BRUT ? 0 : Math.max(0, hesaplananDamgaVergisi - damgaVergisiIstisnasi);
        
        const toplamKesinti = sgkIsciPayi + issizlikIsciPayi + nihaiGelirVergisi + nihaiDamgaVergisi;
        
        const nihaiNetUcret = brutUcret - toplamKesinti;
        
        const sgkIsverenPayi = Math.min(brutUcret, SGK_TAVAN) * 0.155; // 5 puan indirimli
        const issizlikIsverenPayi = Math.min(brutUcret, SGK_TAVAN) * 0.02;
        const isvereneMaliyet = brutUcret + sgkIsverenPayi + issizlikIsverenPayi;

        kumulatif += gelirVergisiMatrahi;
        asgariUcretKumulatif += asgariUcretGvMatrahi;
        
        breakdown.push({
          month: i + 1, brut: brutUcret, sgk: sgkIsciPayi, issizlik: issizlikIsciPayi,
          gelirVergisi: nihaiGelirVergisi, damgaVergisi: nihaiDamgaVergisi,
          kesinti: toplamKesinti, net: nihaiNetUcret, kumulatif, isvereneMaliyet
        });
      }
      setMonthlyBreakdown(breakdown);

      const totals = breakdown.reduce((acc, row) => {
        acc.brut += row.brut; acc.net += row.net; acc.sgk += row.sgk;
        acc.issizlik += row.issizlik; acc.gelirVergisi += row.gelirVergisi;
        acc.damgaVergisi += row.damgaVergisi; acc.isvereneMaliyet += row.isvereneMaliyet;
        return acc;
      }, { brut: 0, net: 0, sgk: 0, issizlik: 0, gelirVergisi: 0, damgaVergisi: 0, isvereneMaliyet: 0 });
      setYearlyTotals(totals);
    };
    calculate();
  }, [salaryInput, calculationType, engellilikDurumu]);

  return (
    <div style={styles.card}>
      <h2 style={styles.cardTitle}>Brüt/Net Maaş Hesaplama</h2>
      <p style={{...styles.label, fontSize: '12px', fontStyle: 'italic'}}>*Hesaplamalar 2025 yılı parametrelerine göredir.</p>
      
      <div style={styles.toggleContainer}>
        <button onClick={() => setCalculationType('grossToNet')} style={calculationType === 'grossToNet' ? styles.toggleButtonActive : styles.toggleButton}>Brütten Nete</button>
        <button onClick={() => setCalculationType('netToGross')} style={calculationType === 'netToGross' ? styles.toggleButtonActive : styles.toggleButton}>Netten Brüte</button>
      </div>

      <p style={styles.label}>{calculationType === 'grossToNet' ? 'Brüt Ücret' : 'Net Ücret'}</p>
      <input style={styles.input} type="text" placeholder={calculationType === 'grossToNet' ? 'Örn: 30.000' : 'Örn: 25.000'} value={salaryInput} onChange={handleInputChange} />
      
      <p style={styles.label}>Engellilik Durumu</p>
      <select style={styles.input} value={engellilikDurumu} onChange={(e) => setEngellilikDurumu(e.target.value)}>
        <option value="yok">Yok</option>
        <option value="derece3">3. Derece</option>
        <option value="derece2">2. Derece</option>
        <option value="derece1">1. Derece</option>
      </select>
      
      {monthlyBreakdown.length > 0 && (
        <div style={{marginTop: '20px', overflowX: 'auto'}}>
          <h3 style={{...styles.cardTitle, fontSize: '18px'}}>Yıllık Maaş Tablosu</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Ay</th><th style={styles.th}>Brüt Maaş</th><th style={styles.th}>Net Maaş</th>
                <th style={styles.th}>SGK</th><th style={styles.th}>İşsizlik</th><th style={styles.th}>Gelir V.</th>
                <th style={styles.th}>Damga V.</th><th style={styles.th}>Kümülatif</th><th style={styles.th}>İşverene Maliyet</th>
              </tr>
            </thead>
            <tbody>
              {monthlyBreakdown.map(row => (
                <tr key={row.month}>
                  <td style={styles.td}>{row.month}</td><td style={styles.td}>{formatLocale(row.brut)}</td><td style={styles.tdHighlighted}>{formatLocale(row.net)}</td>
                  <td style={styles.td}>{formatLocale(row.sgk)}</td><td style={styles.td}>{formatLocale(row.issizlik)}</td><td style={styles.td}>{formatLocale(row.gelirVergisi)}</td>
                  <td style={styles.td}>{formatLocale(row.damgaVergisi)}</td><td style={styles.td}>{formatLocale(row.kumulatif)}</td><td style={styles.tdHighlighted}>{formatLocale(row.isvereneMaliyet)}</td>
                </tr>
              ))}
            </tbody>
            {yearlyTotals && (
              <tfoot>
                <tr style={styles.tfootTr}>
                  <td style={styles.tfootTd}><b>Toplam</b></td><td style={styles.tfootTd}><b>{formatLocale(yearlyTotals.brut)}</b></td><td style={styles.tfootTd}><b>{formatLocale(yearlyTotals.net)}</b></td>
                  <td style={styles.tfootTd}><b>{formatLocale(yearlyTotals.sgk)}</b></td><td style={styles.tfootTd}><b>{formatLocale(yearlyTotals.issizlik)}</b></td><td style={styles.tfootTd}><b>{formatLocale(yearlyTotals.gelirVergisi)}</b></td>
                  <td style={styles.tfootTd}><b>{formatLocale(yearlyTotals.damgaVergisi)}</b></td><td style={styles.tfootTd}>-</td><td style={styles.tfootTd}><b>{formatLocale(yearlyTotals.isvereneMaliyet)}</b></td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      )}
    </div>
  );
};

const Placeholder = ({ title, styles }) => (
    <div style={styles.card}>
        <h2 style={styles.cardTitle}>{title}</h2>
        <p style={styles.label}>Bu özellik yakında eklenecektir.</p>
    </div>
);


const App = () => {
  const [activeView, setActiveView] = useState('profitCalculator');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setTheme(mediaQuery.matches ? 'dark' : 'light');
    const handler = (e) => setTheme(e.matches ? 'dark' : 'light');
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const styles = getStyles(theme);
  
  const menuItems = [
    { id: 'profitCalculator', title: 'Kâr Zarar Hesaplama' },
    { id: 'salesPriceCalculator', title: 'Satış Fiyatı Hesaplama' },
    { id: 'marketplaceCalculator', title: 'Pazaryeri Fiyat Hesaplama' },
    { id: 'salaryCalculator', title: 'Eleman Brüt/Net Maaş Hesaplama' },
    { id: 'expenseCalculator', title: 'İşyeri Gider Hesaplama' },
    { id: 'unitCostCalculator', title: 'Ürün Başı İşletme Maliyeti Hesaplama' },
  ];
  
  const handleMenuClick = (viewId) => {
    setActiveView(viewId);
    setIsMenuOpen(false);
  };
  
  const renderActiveView = () => {
    switch(activeView) {
      case 'profitCalculator':
        return <ProfitCalculator styles={styles} />;
      case 'salesPriceCalculator':
        return <SalesPriceCalculator styles={styles} />;
      case 'marketplaceCalculator':
        return <MarketplaceCalculator styles={styles} />;
      case 'salaryCalculator':
        return <SalaryCalculator styles={styles} />;
      case 'expenseCalculator':
        return <Placeholder title="İşyeri Gider Hesaplama" styles={styles} />;
      case 'unitCostCalculator':
        return <Placeholder title="Ürün Başı İşletme Maliyeti Hesaplama" styles={styles} />;
      default:
        return <ProfitCalculator styles={styles} />;
    }
  };

  return (
    <div style={styles.safeArea}>
      {isMenuOpen && <div style={styles.overlay} onClick={() => setIsMenuOpen(false)}></div>}
      
      <div style={{...styles.sideMenu, left: isMenuOpen ? '0' : '-300px'}}>
        <div style={styles.sideMenuHeader}>
          <h2 style={styles.sideMenuTitle}>Hesaplama Araçları</h2>
          <button style={styles.menuButton} onClick={() => setIsMenuOpen(false)}>
            <CloseIcon style={styles.menuIcon} />
          </button>
        </div>
        {menuItems.map(item => (
          <button 
            key={item.id} 
            style={activeView === item.id ? {...styles.menuItem, ...styles.menuItemActive} : styles.menuItem} 
            onClick={() => handleMenuClick(item.id)}
          >
            {item.title}
          </button>
        ))}
      </div>
      
      <div style={styles.header}>
        <button style={styles.menuButton} onClick={() => setIsMenuOpen(true)}>
          <MenuIcon style={styles.menuIcon} />
        </button>
        <h1 style={styles.headerTitle}>Ticari Hesaplayıcı</h1>
      </div>
      
      <div style={styles.container}>
        {renderActiveView()}
      </div>
    </div>
  );
};

const getStyles = (theme) => {
  const isLight = theme === 'light';
  const colors = {
    background: isLight ? '#f4f7f9' : '#121212',
    text: isLight ? '#1a202c' : '#e9ecef',
    card: isLight ? '#ffffff' : '#1e1e1e',
    cardTitle: isLight ? '#2d3748' : '#f8f9fa',
    label: isLight ? '#4a5568' : '#adb5bd',
    inputBg: isLight ? '#edf2f7' : '#2c2c2c',
    inputBorder: isLight ? '#e2e8f0' : '#424242',
    inputText: isLight ? '#1a202c' : '#f8f9fa',
    resultBg: isLight ? '#f8f9fa' : '#2a2a2a',
    resultLabel: isLight ? '#495057' : '#adb5bd',
    navActiveText: '#3b82f6',
    icon: isLight ? '#1a202c' : '#e9ecef',
    menuBg: isLight ? '#ffffff' : '#1e1e1e',
    menuItemHover: isLight ? '#f1f5f9' : '#334155',
    toggleBorder: isLight ? '#d1d5db' : '#4b5563',
    toggleActiveBg: isLight ? '#3b82f6' : '#3b82f6',
    toggleText: isLight ? '#374151' : '#d1d5db',
  };

  return {
    safeArea: { flex: 1, backgroundColor: colors.background, fontFamily: 'sans-serif', minHeight: '100vh', position: 'relative', overflowX: 'hidden' },
    container: { padding: 20, maxWidth: '800px', margin: 'auto', paddingTop: '80px' },
    header: { position: 'fixed', top: 0, left: 0, right: 0, display: 'flex', alignItems: 'center', padding: '0 20px', height: '60px', backgroundColor: colors.card, boxShadow: `0 2px 4px rgba(0, 0, 0, ${isLight ? 0.05 : 0.2})`, zIndex: 1000 },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: colors.text, textAlign: 'center', flex: 1 },
    menuButton: { background: 'none', border: 'none', cursor: 'pointer', padding: '10px' },
    menuIcon: { color: colors.icon },
    overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1001 },
    sideMenu: { position: 'fixed', top: 0, bottom: 0, width: '300px', backgroundColor: colors.menuBg, zIndex: 1002, boxShadow: '2px 0 10px rgba(0,0,0,0.1)', transition: 'left 0.3s ease-in-out' },
    sideMenuHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', borderBottom: `1px solid ${colors.inputBorder}` },
    sideMenuTitle: { fontSize: 18, fontWeight: '600', color: colors.text, margin: 0 },
    menuItem: { display: 'block', width: '100%', padding: '15px 20px', border: 'none', backgroundColor: 'transparent', textAlign: 'left', fontSize: 16, color: colors.text, cursor: 'pointer' },
    menuItemActive: { backgroundColor: colors.menuItemHover, fontWeight: 'bold', color: colors.navActiveText },
    card: { backgroundColor: colors.card, borderRadius: 12, padding: 20, marginBottom: 20, boxShadow: `0 2px 8px rgba(0, 0, 0, ${isLight ? 0.1 : 0.3})`, border: isLight ? 'none' : `1px solid ${colors.inputBorder}` },
    cardTitle: { fontSize: 20, fontWeight: '600', color: colors.cardTitle, marginBottom: 16 },
    label: { fontSize: 14, color: colors.label, marginBottom: 8 },
    input: { backgroundColor: colors.inputBg, borderRadius: 8, padding: '12px 16px', fontSize: 16, color: colors.inputText, marginBottom: 16, border: `1px solid ${colors.inputBorder}`, width: '100%', boxSizing: 'border-box' },
    resultContainer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.resultBg, padding: '16px', borderRadius: 8, marginTop: 8 },
    resultLabel: { fontSize: 16, color: colors.resultLabel },
    resultValue: { fontSize: 20, fontWeight: 'bold', color: colors.text },
    highlightedResult: { backgroundColor: isLight ? '#e6f7ff' : '#032f4a', border: `1px solid ${isLight ? '#91d5ff' : '#054569'}` },
    highlightedResultLabel: { fontSize: 16, color: isLight ? '#0050b3' : '#91d5ff', fontWeight: '500' },
    highlightedResultValue: { fontSize: 20, fontWeight: 'bold', color: isLight ? '#0050b3' : '#91d5ff' },
    toggleContainer: { display: 'flex', border: `1px solid ${colors.toggleBorder}`, borderRadius: '8px', marginBottom: '16px' },
    toggleButton: { flex: 1, padding: '10px', border: 'none', background: 'none', cursor: 'pointer', color: colors.toggleText, fontWeight: '500' },
    toggleButtonActive: { flex: 1, padding: '10px', border: 'none', background: colors.toggleActiveBg, color: '#fff', borderRadius: '7px', cursor: 'pointer', fontWeight: 'bold' },
    table: { width: '100%', borderCollapse: 'collapse', fontSize: '12px' },
    th: { padding: '8px', border: `1px solid ${colors.inputBorder}`, backgroundColor: colors.resultBg, color: colors.label, textAlign: 'right' },
    td: { padding: '8px', border: `1px solid ${colors.inputBorder}`, textAlign: 'right', color: colors.text },
    tdHighlighted: { padding: '8px', border: `1px solid ${colors.inputBorder}`, textAlign: 'right', fontWeight: 'bold', color: colors.navActiveText },
    tfootTr: { backgroundColor: colors.resultBg, borderTop: `2px solid ${colors.inputBorder}` },
    tfootTd: { padding: '10px 8px', border: `1px solid ${colors.inputBorder}`, textAlign: 'right', color: colors.text },
  };
};

export default App;
