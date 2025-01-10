import {Message} from "./messages";
import {getSessionId} from "@/utils/session";

export async function getAlyndraChatResponseStream(messages: Message[]) {

    const sessionId = getSessionId();
    let reader: ReadableStreamDefaultReader<Uint8Array> | null = null;

    const stream = new ReadableStream({
        async start(controller: ReadableStreamDefaultController) {
            const res = await fetch(`https://wwxt.app.n8n.cloud/webhook/f5883832-db91-4115-a8d9-cb174e02b2f2`, {
                method: "POST",
                body: JSON.stringify({
                    messages: messages,
                    sessionId: sessionId,
                    stream: true,
                    max_tokens: 200,
                }),
            });

            const reader = res.body?.getReader();

            if (res.status !== 200 || !reader) {
                if (res.status === 401) {
                    throw new Error('Invalid OpenAI authentication');
                }
                if (res.status === 402) {
                    throw new Error('Payment required');
                }

                throw new Error(`OpenAI chat error (${res.status})`);
            }

            const decoder = new TextDecoder("utf-8");
            try {
                while (true) {
                    const {done, value} = await reader.read();

                    if (done) break;
                    const data = decoder.decode(value);

                    const messagePiece = JSON.parse(data).output.message;

                    const formattedMessage = messagePiece.replace(/[\n\r]+/g, '  ');

                    if (formattedMessage) {
                        const maxChunkSize = 20;

                        const sentences = formattedMessage.split(/(?<!\d)([。？！.?!])(?!\d)/);
                        let tempMessage = "";

                        for (let i = 0; i < sentences.length; i++) {
                            tempMessage += sentences[i];

                            while (tempMessage.length >= maxChunkSize) {
                                controller.enqueue(tempMessage.slice(0, maxChunkSize).trim());
                                tempMessage = tempMessage.slice(maxChunkSize);
                            }

                            if (/^[。？！.?!]$/.test(sentences[i]) || i === sentences.length - 1) {
                                controller.enqueue(tempMessage.trim());
                                tempMessage = "";
                            }
                        }

                        if (tempMessage.trim()) {
                            controller.enqueue(tempMessage.trim());
                        }
                    }
                    if (JSON.parse(data).output.image != undefined) {
                        if (JSON.parse(data).output.image.length > 0) {
                            const imagePiece = JSON.parse(data).output.image;
                            for (let j = 0; j < imagePiece.length; j++) {
                                controller.enqueue(imagePiece[j]);
                            }
                        }
                    }
                }
            } catch (error) {
                console.error(error);
                controller.error(error);
            } finally {
                reader.releaseLock();
                controller.close();
            }
        },
        async cancel() {
            if (reader) {
                await reader.cancel();
                reader.releaseLock();
            }
        }
    });

    return stream;
}
