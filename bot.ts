import { Bot } from "./deps.ts";
import { BotContext } from "./context.ts";
import { fluentMiddleware, setup as setupFluent } from "./fluent.ts";
import { TOKEN } from "./config.ts";

const bot = new Bot<BotContext>(TOKEN);

bot.use(fluentMiddleware);

bot.on("message:text", async (ctx) => {
  if (ctx.message.text === "Ping!") {
    await ctx.reply("Pong!");
  }
});

bot.catch((e) => {
  console.error(e);
});

await setupFluent();

export { bot };
