import { Message } from "./messages";

export async function getMomentChatResponseStream() {

    let reader: ReadableStreamDefaultReader<Uint8Array> | null = null;


    const stream = new ReadableStream({
        async start(controller: ReadableStreamDefaultController) {
            controller.enqueue("Just a moment, please...");
console.log("----------")
            try {

            } catch (error) {
                console.error(error);
                controller.error(error);
            } finally {
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
