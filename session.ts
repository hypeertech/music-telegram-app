import { Context, enhanceStorage, session } from "./deps.ts";
import { ISession, MongoDBAdapter } from "./mongodb-adapter.ts";
import { LinksLayout } from "./links-layout.ts";
import { mongoClient } from "./mongo-client.ts";
import { BotContext } from "./context.ts";
import { DB_COLLECTION, DB_NAME } from "./config.ts";

export interface SessionData {
  locale?: string;
  linksLayout: LinksLayout;
  showBuyLinks: boolean;
}

const createInitialSessionData = (): SessionData => {
  return {
    showBuyLinks: true,
    linksLayout: LinksLayout.COMBINED,
  };
};

const getSessionKey = (ctx: Context): string | undefined => {
  return ctx.from === undefined || ctx.chat === undefined
    ? undefined
    : `${ctx.from.id}:${ctx.chat.id}`;
};

const storage = () =>
  new MongoDBAdapter<any>({
    collection: mongoClient.database(DB_NAME).collection<ISession>(
      DB_COLLECTION,
    ),
  });

const fromAiogram = (oldData: {
  locale?: string;
  links_layout?: LinksLayout;
  show_buy_links?: boolean;
  linksLayout?: LinksLayout;
}): SessionData => {
  const newData: SessionData = {
    linksLayout: oldData.links_layout || LinksLayout.COMBINED,
    showBuyLinks: oldData.show_buy_links || true,
  };

  if (oldData.locale) {
    newData.locale = oldData.locale;
  }

  return newData;
};

const enhancedStorage = enhanceStorage<any>({
  storage: storage(),
  migrations: {
    1: fromAiogram,
  },
});

export const sessionMiddleware = session<{}, BotContext>({
  initial: createInitialSessionData,
  getSessionKey: getSessionKey,
  storage: enhancedStorage,
});
