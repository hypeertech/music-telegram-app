import { serve, webhookCallback } from "./deps.ts";
import { bot } from "./bot.ts";
import { TOKEN } from "./config.ts";

const handleUpdate = webhookCallback(bot, "std/http");

serve({
  [`/${TOKEN}`]: async (req) => {
    if (req.method == "POST") {
      try {
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
