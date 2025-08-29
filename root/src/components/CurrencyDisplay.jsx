import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import './CurrencyDisplay.css';

const CurrencyDisplay = () => {
    const [rates, setRates] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRates = async () => {
            try {
                setLoading(true);
                setError(null);
                const docRef = doc(db, 'rates', 'latest');
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setRates({
                        USD: parseFloat(data.USD).toFixed(4),
                        EUR: parseFloat(data.EUR).toFixed(4)
                    });
                } else {
                    setError("Kur verisi bulunamadı.");
                    console.log("Firestore'da 'rates/latest' belgesi bulunamadı!");
                }
            } catch (err) {
                setError("Kurlar alınamadı.");
                console.error("Kur bilgisi çekilirken hata oluştu: ", err);
            } finally {
                setLoading(false);
            }
        };

        fetchRates(); // İlk yüklemede hemen çalıştır
        const interval = setInterval(fetchRates, 15 * 60 * 1000); // Her 15 dakikada bir veriyi tazele

        return () => clearInterval(interval); // Component kaldırıldığında interval'ı temizle
    }, []);

    const renderContent = () => {
        if (loading) {
            return <span>Kurlar yükleniyor...</span>;
        }
        if (error) {
            return <span style={{ color: '#ffcccc' }}>{error}</span>;
        }
        if (rates) {
            return (
                <>
                    <div className="currency-item">
                        <img src="https://flagcdn.com/w20/us.png" alt="USD Flag" className="currency-flag" />
                        <span>USD/TRY:</span>
                        <span className="currency-value" style={{ marginLeft: '5px' }}>{rates.USD}</span>
                    </div>
                    <div className="currency-item">
                        <img src="https://flagcdn.com/w20/eu.png" alt="EUR Flag" className="currency-flag" />
                        <span>EUR/TRY:</span>
                        <span className="currency-value" style={{ marginLeft: '5px' }}>{rates.EUR}</span>
                    </div>
                </>
            );
        }
        return null; // Hiçbir durum eşleşmezse (ilk render anı gibi) hiçbir şey gösterme
    };

    return (
        <div className="currency-container">
            {renderContent()}
        </div>
    );
};

export default CurrencyDisplay;
