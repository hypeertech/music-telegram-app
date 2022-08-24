import { serve, webhookCallback } from "./deps.ts";
import { bot } from "./bot.ts";
import { TOKEN, MONGODB_URI } from "./config.ts";
import { mongoClient } from "./mongo-client.ts";

const handleUpdate = webhookCallback(bot, "std/http");

serve({
  [`/${TOKEN}`]: async (req) => {
    if (req.method == "POST") {
      try {
        await mongoClient.connect(MONGODB_URI);
        return await handleUpdate(req);
      } catch (err) {
        console.error(err);
      }
    }
    return new Response();
  },
  "/": () => {
    return new Response("Hello world!");
  },
});
