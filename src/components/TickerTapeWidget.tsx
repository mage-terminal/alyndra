import React, { useEffect, useRef, memo } from 'react';

const TradingViewTickerTape: React.FC = () => {
    const container = useRef<HTMLDivElement | null>(null);
    const symbols = [
        { description: 'BTC/USDT', proName: 'BINANCE:BTCUSDT' },
        { description: 'ETH/USDT', proName: 'BINANCE:ETHUSDT' },
        { description: 'SOL/USDT', proName: 'BINANCE:SOLUSDT' },
        { description: 'DOGE/USDT', proName: 'BINANCE:DOGEUSDT' },
        { description: 'PEPE/USDT', proName: 'BINANCE:PEPEUSDT' },
        { description: 'PENGU/USDT', proName: 'BINANCE:PENGUUSDT' },
        { description: 'SHIB/USDT', proName: 'BINANCE:SHIBUSDT' },
    ];

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
        script.type = 'text/javascript';
        script.async = true;
        script.innerHTML = JSON.stringify({
            symbols,
            showSymbolLogo: false,
            isTransparent: true,
            displayMode: 'adaptive',
            colorTheme: 'dark',
            locale: 'en',
        });
        if (container.current) {
            container.current.innerHTML = '';
            container.current.appendChild(script);
        }
    }, [symbols]);

    return (
        <div className="tradingview-widget-container-ticker-tape" ref={container} />
    );
};

export default memo(TradingViewTickerTape);