import React from 'react';
import './CurrencyDisplay.css';

const CurrencyDisplay = ({ rates, loading, error, onClick }) => {
    const renderContent = () => {
        if (loading) {
            return <span>Kurlar yükleniyor...</span>;
        }
        if (error) {
            return <span style={{ color: '#ffcccc' }}>{error}</span>;
        }
        if (rates && rates.USD && rates.EUR) {
            return (
                <>
                    <div className="currency-item">
                        <img src="https://flagcdn.com/w20/us.png" alt="USD Flag" className="currency-flag" />
                        <span>USD/TRY:</span>
                        <span className="currency-value" style={{ marginLeft: '5px' }}>{parseFloat(rates.USD).toFixed(4)}</span>
                    </div>
                    <div className="currency-item">
                        <img src="https://flagcdn.com/w20/eu.png" alt="EUR Flag" className="currency-flag" />
                        <span>EUR/TRY:</span>
                        <span className="currency-value" style={{ marginLeft: '5px' }}>{parseFloat(rates.EUR).toFixed(4)}</span>
                    </div>
                </>
            );
        }
        return null;
    };

    return (
        <div className="currency-container" onClick={onClick} style={{ cursor: 'pointer' }}>
            {renderContent()}
        </div>
    );
};

export default CurrencyDisplay;
