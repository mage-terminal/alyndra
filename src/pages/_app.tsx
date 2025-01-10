import '@/i18n';

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@charcoal-ui/icons";
import { ConfigProvider } from 'antd';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
        <ConfigProvider
            theme={{
                token:{
                    colorTextDisabled:"#8e8e92",
                },
                components: {
                    Menu: {
                        darkItemSelectedBg:"none",
                        horizontalItemHoverBg:"#1f2023",
                        horizontalItemBorderRadius:8,
                    },
                    Slider: {
                        handleColorDisabled:"#fff",
                        trackBgDisabled:"#fff",
                        railBg:"#444556",
                        handleActiveOutlineColor:"none"
                    },
                    Tabs: {
                        inkBarColor:"#f4f5f7",
                        itemActiveColor:"#f4f5f7",
                        itemColor:"#8e8e92",
                        itemHoverColor:"#f4f5f7",
                        itemSelectedColor:"#f4f5f7"
                    },
                },
            }}
        >
            <Component {...pageProps} />
        </ConfigProvider>

    </>
  );
}
