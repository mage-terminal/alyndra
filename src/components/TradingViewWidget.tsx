import React, { useEffect, useRef, memo } from 'react';

const TradingViewWidget: React.FC = () => {
    const container = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
        script.type = 'text/javascript';
        script.async = true;
        script.innerHTML = `
      {
        "autosize": true,
        "symbol": "BINANCE:BTCUSDT",
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": "dark",
        "style": "1",
        "locale": "en",
        "withdateranges": true,
        "hide_side_toolbar": false,
        "allow_symbol_change": true,
        "calendar": false,
        "support_host": "https://www.tradingview.com"
      }`;
        if (container.current) {
            container.current.appendChild(script);
        }
    }, []);

    return (
        <div className="widget-container" style={{width:"100%",flex: '0 0 80%'}}>
            <div className="tradingview-widget-container" ref={container} style={{height: '100%', width: '100%'}}>
                <div className="tradingview-widget-container__widget"
                     style={{height: 'calc(100% - 32px)', width: '100%'}}></div>
            </div>
        </div>
    );
};

export default memo(TradingViewWidget);