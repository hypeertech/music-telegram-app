import { Fluent, useFluent } from "./deps.ts";
import { BotContext } from "./context.ts";

const fluent = new Fluent();

export const fluentMiddleware = useFluent({
  fluent,
  localeNegotiator: (ctx: BotContext) => {
    if (!ctx.session.locale) {
      return ctx.session.locale = ctx.from?.language_code || "en";
    }

    return ctx.session.locale;
  },
});

export const setup = async () => {
  await fluent.addTranslation({
    locales: "en",
    filePath: [`./i18n/translation.en.ftl`],
  });
  await fluent.addTranslation({
    locales: "ru",
    filePath: [`./i18n/translation.ru.ftl`],
  });
};
