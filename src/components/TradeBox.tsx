import { Slider } from 'antd';

export function TradeBox() {

    return (
        <>
            <div>
                <div data-qa="tradebox" className={`App-box SwapBox`}>

                    <div data-qa="trade-direction" className="Tab Tab__block SwapBox-option-tabs">
                        <div className="Tab-option flex items-center justify-center gmx-gap-8 muted active"
                             data-qa="trade-direction-tab-Long">Long
                        </div>
                        <div className="Tab-option flex items-center justify-center gmx-gap-8 muted"
                             data-qa="trade-direction-tab-Short">Short
                        </div>
                    </div>
                    <div data-qa="trade-mode" className="Tab Tab__inline SwapBox-asset-options-tabs">
                        <div className="Tab-option flex items-center justify-center gmx-gap-8 muted active"
                             data-qa="trade-mode-tab-Market">Market
                        </div>
                        <div className="Tab-option flex items-center justify-center gmx-gap-8 muted"
                             data-qa="trade-mode-tab-Limit">Limit
                        </div>
                    </div>

                    <form>

                        <div data-qa="pay">
                            <div className="Exchange-info-row SwapBox-info-row">
                                <div className="Exchange-info-label">Peice</div>
                            </div>
                            <div className="Exchange-info-input">Place order at market price</div>
                            <div className="Exchange-info-row SwapBox-info-row">
                                <div className="Exchange-info-label">Quantity</div>
                            </div>
                            <div className="Exchange-info-input"></div>
                            <div className="SwapBox-info-section">
                                <div className="Switch-toggle-wrapper Exchange-leverage-slider-settings"><span><span
                                    className="muted">Leverage slider</span></span>
                                    <div className="flex items-center gmx-gap-8">
                                        <div className="">
                                            <div className="Suggestion-input-wrapper">
                                                <div className="Suggestion-input">
                                                    <span className="input">0.1x</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Slider defaultValue={0} disabled={true} tooltip={{open: false}} style={{marginBottom:"12px"}}/>
                                <div className="Exchange-info-row SwapBox-info-row" style={{marginBottom:"12px"}}>
                                    <div className="Exchange-info-label">Margin</div>
                                    <div className="Exchange-info-value">
                                        <div data-headlessui-state="">
                                            <div className="SelectorBase-button group/selector-base"
                                                 data-qa="pool-selector-button" aria-expanded="false"
                                                 data-headlessui-state="" id="headlessui-popover-button-:r24:">--USDT
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="Exchange-info-row SwapBox-info-row" style={{marginBottom:"12px"}}>
                                    <div className="Exchange-info-label">Liq.price</div>
                                    <div className="Exchange-info-value">
                                        <div data-headlessui-state="">
                                            <div className="SelectorBase-button group/selector-base"
                                                 data-qa="pool-selector-button" aria-expanded="false"
                                                 data-headlessui-state="" id="headlessui-popover-button-:r24:">--
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*<div className="App-card-divider"></div>*/}
                            </div>
                            <div className="Exchange-swap-button-container">
                                <div data-qa="confirm-trade-button"
                                     className="button primary-action mt-4 w-full [text-decoration:inherit] center">Connect
                                    Wallet
                                </div>
                            </div>

                        </div>
                    </form>
                </div>
            </div>

        </>
    );
}