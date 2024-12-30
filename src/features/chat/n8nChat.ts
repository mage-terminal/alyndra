import { Message } from "./messages";
import {getSessionId} from "@/utils/session";

export async function getN8nChatResponseStream(messages: Message[]) {

  const sessionId = getSessionId();
  let reader: ReadableStreamDefaultReader<Uint8Array> | null = null;


  const stream = new ReadableStream({
    async start(controller: ReadableStreamDefaultController) {
      //controller.enqueue("Just a moment, please...");
      const res = await fetch(`https://wwxt.app.n8n.cloud/webhook/f5883832-db91-4115-a8d9-cb174e02b2f2`, {
        //headers: headers,
        method: "POST",
        body: JSON.stringify({
          messages: messages,
          sessionId:sessionId,
          stream: true,
          max_tokens: 200,
        }),
      });

      const reader = res.body?.getReader();

      if (res.status !== 200 || ! reader) {
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
          const { done, value } = await reader.read();


          if (done) break;
          const data = decoder.decode(value);

          const messagePiece = JSON.parse(data).output;

          const formattedMessage = messagePiece.replace(/[\n\r]+/g, '  ');

          if (formattedMessage) {
            // console.log("=======")
            // console.log(formattedMessage)
            controller.enqueue(formattedMessage);
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
