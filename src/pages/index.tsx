import {
  Fragment,
  useContext,
  useEffect,
  useState,
} from "react";
import Link from "next/link";
import { Menu, Transition } from '@headlessui/react'
import { clsx } from "clsx";
import { M_PLUS_2, Montserrat } from "next/font/google";
import { useTranslation, Trans } from 'react-i18next';
import {
  ChatBubbleLeftIcon,
  ChatBubbleLeftRightIcon,
  CloudArrowDownIcon,
  CodeBracketSquareIcon,
  LanguageIcon,
  ShareIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  VideoCameraIcon,
  VideoCameraSlashIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { IconBrain } from '@tabler/icons-react';

import { AssistantText } from "@/components/assistantText";
import { SubconciousText } from "@/components/subconciousText";
import { AddToHomescreen } from "@/components/addToHomescreen";
import { Alert } from "@/components/alert";
import { UserText } from "@/components/userText";
import { ChatLog } from "@/components/chatLog";
import VrmViewer from "@/components/vrmViewer";
import { MessageInputContainer } from "@/components/messageInputContainer";
import { Introduction } from "@/components/introduction";
import { LoadingProgress } from "@/components/loadingProgress";
import { DebugPane } from "@/components/debugPane";
import { Settings } from "@/components/settings";
import { EmbeddedWebcam } from "@/components/embeddedWebcam";

import { ViewerContext } from "@/features/vrmViewer/viewerContext";
import { Message, Role } from "@/features/chat/messages";
import { ChatContext } from "@/features/chat/chatContext";
import { AlertContext } from "@/features/alert/alertContext";

import { generateNewSessionId } from "@/utils/session";
import { config, updateConfig } from '@/utils/config';
import { isTauri } from '@/utils/isTauri';
import { langs } from '@/i18n/langs';
import { VrmStoreProvider } from "@/features/vrmStore/vrmStoreContext";
import { AmicaLifeContext } from "@/features/amicaLife/amicaLifeContext";
import { ChatModeText } from "@/components/chatModeText";

import { VerticalSwitchBox } from "@/components/switchBox"
import { TimestampedPrompt } from "@/features/amicaLife/eventHandler";

import TradingViewWidget from '@/components/TradingViewWidget';
import TickerTapeWidget from '@/components/TickerTapeWidget';
import Tab from '@/components/Tab';
import { TradeBox } from "@/components/TradeBox";
import {
  GithubOutlined,
  XOutlined,
  GlobalOutlined,
  SunOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Layout, Flex, Space, Avatar } from 'antd';

const { Header, Content} = Layout;

const m_plus_2 = M_PLUS_2({
  variable: "--font-m-plus-2",
  display: "swap",
  preload: false,
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  display: "swap",
  subsets: ["latin"],
});


export default function Home() {
  const { t, i18n } = useTranslation();
  const currLang = i18n.resolvedLanguage;
  const { viewer } = useContext(ViewerContext);
  const { alert } = useContext(AlertContext);
  const { chat: bot } = useContext(ChatContext);
  const { amicaLife: amicaLife } = useContext(AmicaLifeContext);

  const [chatSpeaking, setChatSpeaking] = useState(false);
  const [chatProcessing, setChatProcessing] = useState(false);
  const [chatLog, setChatLog] = useState<Message[]>([]);
  const [assistantMessage, setAssistantMessage] = useState("");
  const [promptMessage, setPromptMessage] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [shownMessage, setShownMessage] = useState<Role>("system");
  const [subconciousLogs, setSubconciousLogs] = useState<TimestampedPrompt[]>([]);

  // showContent exists to allow ssr
  // otherwise issues from usage of localStorage and window will occur
  const [showContent, setShowContent] = useState(false);

  const [showSettings, setShowSettings] = useState(false);
  const [showChatLog, setShowChatLog] = useState(false);
  const [showMainMenu, setShowMainMenu] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  const [showChatMode, setShowChatMode] = useState(true);
  const [showSubconciousText, setShowSubconciousText] = useState(false);

  // null indicates havent loaded config yet
  const [muted, setMuted] = useState<boolean|null>(null);
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    amicaLife.checkSettingOff(!showSettings);
  }, [showSettings, amicaLife]);

  useEffect(() => {
    if (muted === null) {
      setMuted(config('tts_muted') === 'true');
    }

    if (config("bg_color") !== '') {
      document.body.style.backgroundColor = config("bg_color");
    } else {
      document.body.style.backgroundImage = `url(${config("bg_url")})`;
    }


    const newSessionId = generateNewSessionId();

  }, []);

  function toggleTTSMute() {
    updateConfig('tts_muted', config('tts_muted') === 'true' ? 'false' : 'true')
    setMuted(config('tts_muted') === 'true')
  }

  const toggleState = (
    setFunc: React.Dispatch<React.SetStateAction<boolean>>, 
    deps: React.Dispatch<React.SetStateAction<boolean>>[],
  ) => {
    setFunc(prev => {
      if (!prev) {
        deps.forEach(dep => dep(false));
      } 
      return !prev;
    });
  };
  
  const toggleChatLog = () => {
    toggleState(setShowChatLog, [setShowSubconciousText, setShowChatMode]);
  };
  
  const toggleSubconciousText = () => {
    if (subconciousLogs.length !== 0) {
      toggleState(setShowSubconciousText, [setShowChatLog, setShowChatMode]);
    }
  };
  
  const toggleChatMode = () => {
    toggleState(setShowChatMode, [setShowChatLog, setShowSubconciousText]);
  };

  useEffect(() => {
    bot.initialize(
      amicaLife,
      viewer,
      alert,
      setChatLog,
      setUserMessage,
      setAssistantMessage,
      setPromptMessage,
      setShownMessage,
      setChatProcessing,
      setChatSpeaking,
    );

    // TODO remove in future
    // this change was just to make naming cleaner
    if (config("tts_backend") === 'openai') {
      updateConfig("tts_backend", "openai_tts");
    }
  }, [bot, viewer]);

  useEffect(() => {
    amicaLife.initialize(
      viewer,
      bot,
      setSubconciousLogs,
      chatSpeaking,
    );
  }, [amicaLife, bot, viewer]);

  // this exists to prevent build errors with ssr
  useEffect(() => setShowContent(true), []);
  if (!showContent) return <></>;

  return (
    <div className={clsx(
      m_plus_2.variable,
      montserrat.variable,
    )}>
      { config("youtube_videoid") !== '' && (
        <div className="fixed video-container w-full h-full z-0">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${config("youtube_videoid")}?&autoplay=1&mute=1&playsinline=1&loop=1&controls=0&disablekb=1&fs=0&playlist=${config("youtube_videoid")}`}
            frameBorder="0"></iframe>
        </div>
      )}

      <Introduction open={config("show_introduction") === 'true'} />



      { webcamEnabled && <EmbeddedWebcam setWebcamEnabled={setWebcamEnabled} /> }
      { showDebug && <DebugPane onClickClose={() => setShowDebug(false) }/> }

      <Layout>
        {isLoading && <LoadingProgress />}
        <Header style={{ display: 'flex', alignItems: 'center',justifyContent:"space-between", zIndex:"1",background:"#151517" }}>
          <a href="https://alyndra.mage.fun/" style={{marginRight:"24px"}}>
            <img className="alyndra-logo" src="/logo.png"/>
          </a>
          <Space style={{lineHeight: "normal"}} size="middle">
            <a href="https://github.com/mage-terminal/alyndra" target="_blank">
              <GithubOutlined style={{fontSize: '20px', color: '#f4f5f7'}}/>
            </a>
            <a href="https://x.com/alyndra_bot" target="_blank">
              <XOutlined style={{fontSize: '20px', color: '#f4f5f7'}}/>
            </a>
            <a href="https://mage.fun/" target="_blank">
              <GlobalOutlined style={{fontSize: '20px', color: '#f4f5f7'}}/>
            </a>
            <SunOutlined style={{fontSize: '20px', color: '#f4f5f7'}}/>
            <UserOutlined style={{fontSize: '20px', color: '#f4f5f7'}}/>
          </Space>
        </Header>
        <TickerTapeWidget/>
        <Content style={{padding: '0'}}>
          <Flex vertical className={"ant-flex_box"}>
              <Flex gap="8px" vertical={false} className={"ant-flex_box"} style={{padding: "0 8px 8px"}}>
                <div style={{width: '20%',position: "relative",background:"#151517",borderRadius:"8px"}}>
                  <TradeBox/>
                  <div className="mask-div">Coming Soon</div>
                </div>
                <div style={{
                  width: '50%',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  gap: '8px'}}>
                  <TradingViewWidget/>
                  <Tab/>
                </div>
                <div style={{width: '30%',background:"#151517",borderRadius:"8px",zIndex:"1",position:"relative"}}>
                  <VrmStoreProvider>
                    <VrmViewer chatMode={showChatMode}
                               setIsLoading={setIsLoading}/>
                    {showSettings && (
                        <Settings
                            onClickClose={() => setShowSettings(false)}
                        />
                    )}
                  </VrmStoreProvider>

                  {/* Normal chat text */}
                  {!showSubconciousText && !showChatLog && !showChatMode && (
                      <>
                        {shownMessage === 'assistant' && (
                            <AssistantText message={assistantMessage}/>
                        )}
                        {shownMessage === 'prompt' && (
                            <>
                              <UserText message={userMessage} marginBottom={"12rem"}/>
                              <AssistantText message={promptMessage}/>
                            </>
                        )}
                        {shownMessage === 'user' && (
                            <UserText message={userMessage} marginBottom={"5rem"}/>
                        )}
                      </>
                  )}

                  {/* Chat mode text */}
                  {showChatMode && <ChatModeText messages={chatLog}/>}

                  <MessageInputContainer isChatProcessing={chatProcessing} />
                </div>
              </Flex>
            </Flex>
        </Content>
      </Layout>

      {/* main menu */}
      {showMainMenu && <div className="absolute z-10 m-2">
        <div
            className="grid grid-flow-col gap-[8px] place-content-end mt-2 bg-slate-800/40 rounded-md backdrop-blur-md shadow-sm">
          <div className='flex flex-col justify-center items-center p-1 space-y-3'>
            <div className="flex flex-row items-center space-x-2">
              <WrenchScrewdriverIcon
                  className="h-7 w-7 text-white opacity-50 hover:opacity-100 active:opacity-100 hover:cursor-pointer"
                  aria-hidden="true"
                  onClick={() => setShowSettings(true)}
              />
            </div>

            <div className="flex flex-row items-center space-x-2">
              {showChatLog ? (
                  <ChatBubbleLeftIcon
                      className="h-7 w-7 text-white opacity-50 hover:opacity-100 active:opacity-100 hover:cursor-pointer"
                      aria-hidden="true"
                      onClick={toggleChatLog}
                  />
              ) : (
                  <ChatBubbleLeftRightIcon
                      className="h-7 w-7 text-white opacity-50 hover:opacity-100 active:opacity-100 hover:cursor-pointer"
                      aria-hidden="true"
                      onClick={toggleChatLog}
                  />
              )}
            </div>

            <div className="flex flex-row items-center space-x-2">
              {muted ? (
                  <SpeakerXMarkIcon
                      className="h-7 w-7 text-white opacity-50 hover:opacity-100 active:opacity-100 hover:cursor-pointer"
                      aria-hidden="true"
                      onClick={toggleTTSMute}
                  />
              ) : (
                  <SpeakerWaveIcon
                      className="h-7 w-7 text-white opacity-50 hover:opacity-100 active:opacity-100 hover:cursor-pointer"
                      aria-hidden="true"
                      onClick={toggleTTSMute}
                  />
              )}
              <span className="text-white hidden">Mute / Unmute</span>
            </div>


            <div className="flex flex-row items-center space-x-2">
              {webcamEnabled ? (
                  <VideoCameraIcon
                      className="h-7 w-7 text-white opacity-50 hover:opacity-100 active:opacity-100 hover:cursor-pointer"
                      aria-hidden="true"
                      onClick={() => setWebcamEnabled(false)}
                  />
              ) : (
                  <VideoCameraSlashIcon
                      className="h-7 w-7 text-white opacity-50 hover:opacity-100 active:opacity-100 hover:cursor-pointer"
                      aria-hidden="true"
                      onClick={() => setWebcamEnabled(true)}
                  />
              )}
              <span className="text-white hidden">Webcam</span>
            </div>

            {/* 28px hack to force size */}
            <div className="flex flex-row items-center space-x-2 w-[28px] h-[28px]">
              <Menu as="div">
                <div>
                  <Menu.Button>
                    <LanguageIcon
                        className="h-7 w-7 text-white opacity-50 hover:opacity-100 active:opacity-100 hover:cursor-pointer"
                        aria-hidden="true"
                    />
                  </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items
                      className="absolute left-10 -mt-8 z-10 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-0">

                      {Object.keys(langs).map((lng) => (
                          <Menu.Item key={lng}>
                            <button
                                className={clsx(
                                    currLang === lng && 'bg-cyan-400 text-white',
                                    'group flex w-full items-center px-2 py-2 text-sm'
                                )}
                                onClick={() => i18n.changeLanguage(lng)}>
                              {langs[lng].nativeName}
                            </button>
                          </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>

            <div className="flex flex-row items-center space-x-2">
              <Link
                  href="/share"
                  target={isTauri() ? '' : '_blank'}
              >
                <ShareIcon
                    className="h-7 w-7 text-white opacity-50 hover:opacity-100 active:opacity-100 hover:cursor-pointer"
                    aria-hidden="true"
                />
              </Link>
              <span className="text-white hidden">Share</span>
            </div>

            <div className="flex flex-row items-center space-x-2">
              <Link href="/import">
                <CloudArrowDownIcon
                    className="h-7 w-7 text-white opacity-50 hover:opacity-100 active:opacity-100 hover:cursor-pointer"
                    aria-hidden="true"
                />
              </Link>
              <span className="text-white hidden">Import</span>
            </div>

            <div className="flex flex-row items-center space-x-2">
              {showSubconciousText ? (
                  <IconBrain
                      className="h-7 w-7 text-white opacity-100 hover:opacity-50 active:opacity-100 hover:cursor-pointer"
                      aria-hidden="true"
                      stroke={2}
                      onClick={toggleSubconciousText}
                  />
              ) : (
                  <IconBrain
                      className="h-7 w-7 text-white opacity-50 hover:opacity-100 active:opacity-100 hover:cursor-pointer"
                      aria-hidden="true"
                      stroke={2}
                      onClick={toggleSubconciousText}
                  />
              )}
            </div>

            {/*<div className="flex flex-row items-center space-x-2">
                <CodeBracketSquareIcon
                  className="h-7 w-7 text-white opacity-50 hover:opacity-100 active:opacity-100 hover:cursor-pointer"
                  aria-hidden="true"
                  onClick={() => setShowDebug(true)}
                />
                <span className="text-white hidden">Debug</span>
            </div>*/}

            <div className="flex flex-row items-center space-x-2">
              <VerticalSwitchBox
                  value={showChatMode}
                  label={""}
                  onChange={toggleChatMode}
              />
            </div>

          </div>
        </div>
      </div>}


      {showChatLog && <ChatLog messages={chatLog}/>}

      {/* Subconcious stored prompt text */}
      {showSubconciousText && <SubconciousText messages={subconciousLogs}/>}

      <AddToHomescreen/>

      <Alert/>
    </div>
  );
}
