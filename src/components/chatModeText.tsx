import { useEffect, useRef, useState } from "react";
import { clsx } from "clsx";
import { config } from "@/utils/config";
import { IconButton } from "./iconButton";
import { useTranslation } from "react-i18next";
import { Message } from "@/features/chat/messages";

export const ChatModeText = ({ messages }: { messages: Message[] }) => {
    const chatScrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatScrollRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
        });
    }, [messages]);

    return (
        <div style={{
            position: "relative",
            marginTop: "12px",
            // paddingBottom: "90px",
            overflow: "hidden",
            width: "100%",
            height: "88%"
        }}>
            <div className="w-full h-full overflow-y-auto flex flex-col-reverse custom-scroll">

                <div className="w-full max-w-full mx-auto flex flex-col" style={{padding:"0 12px"}}>
                    {messages.map((msg, i) => {
                        return (
                            <div key={i} ref={messages.length - 1 === i ? chatScrollRef : null}>
                                <Chat
                                    role={msg.role}
                                    message={msg.content.replace(/\[(.*?)\]/g, "")}
                                    num={i}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>

    );
};

function Chat({
    role,
    message,
    num,
}: {
    role: string;
    message: string;
    num: number;
}) {
    const { t } = useTranslation();
    const scrollRef = useRef<HTMLDivElement>(null);
    const [unlimited, setUnlimited] = useState(false);

    // useEffect(() => {
    //     scrollRef.current?.scrollIntoView({
    //         behavior: "smooth",
    //         block: "center",
    //     });
    // });

    const regex = /https:\/\/([^\s]+)/;

    return (
        <div className={clsx(
            'mx-auto max-w-4xl chat-mode-text',
            role === "assistant"||role === "prompt"  ? "pr-10 sm:pr-20" : "pl-10 sm:pl-20",
        )}>
            <div className="backdrop-blur-lg rounded-lg" style={{backdropFilter:"blur(0px)"}}>
                <div className="shadow-lg backdrop-blur-lg rounded-lg bg-white/70">

                    <div className={clsx(
                        'bg-rose/90 rounded-t-lg text-white font-bold tracking-wider',
                        role === "assistant"||role === "prompt" ? "assistant-px-4" : "user-px-4",
                    )}>
                        <span className={clsx(
                            "rounded-lg rounded-tl-none rounded-tr-none shadow-sm",
                            role === "assistant"||role === "prompt" ? "bg-assistant" : "bg-user",
                        )}>
                            {role === "assistant" && config('name').toUpperCase()}
                            {role === "prompt" && config('name').toUpperCase()}
                            {role === "user" && t("YOU")}
                        </span>

                        {/*{role === "assistant" && (
                            <IconButton
                                iconName="24/FrameSize"
                                className="bg-transparent hover:bg-transparent active:bg-transparent disabled:bg-transparent float-right"
                                isProcessing={false}
                                onClick={() => setUnlimited(!unlimited)}
                            />

                        )}*/}
                    </div>
                    {role === "assistant" && (
                        <div className={clsx(
                            "chat-text overflow-y-auto custom-scroll",
                            unlimited ? 'max-h-32' : 'max-h-[calc(75vh)]',
                        )}>
                            <div className="min-h-8 max-h-full typography-16 font-bold text-gray-600">
                                {
                                    message.replace(/\[([a-zA-Z]*?)\]/g, "")
                                    .replace(/https:\/\/[^\s]+/g, "")
                                }
                                {
                                    message.match(regex)?.[0] && <img src={message.match(regex)?.[0]+"jpeg"} alt=""/>
                                }

                                <div ref={scrollRef} />
                            </div>
                        </div>
                    )}
                    {role === "prompt" && (
                        <div className={clsx(
                            "chat-text overflow-y-auto",
                            unlimited ? 'max-h-32' : 'max-h-[calc(75vh)]',
                        )}>
                            <div className="min-h-8 max-h-full typography-16 font-bold text-gray-600">
                                {/*{message.replace(/\[([a-zA-Z]*?)\]/g, "")}*/}
                                <div className="prompt-loader"></div>
                                <div ref={scrollRef} />
                            </div>
                        </div>
                    )}
                    {role === "user" && (
                        <div className="chat-text max-h-32 overflow-y-auto">
                            <div className="min-h-8 max-h-full typography-16 font-bold text-gray-600">
                                {message.replace(/\[([a-zA-Z]*?)\]/g, "")}
                                <div ref={scrollRef} />
                            </div>
                        </div>
                    )}
                </div>
            </div>


        </div>

    );
}