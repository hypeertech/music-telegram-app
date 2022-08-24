import { Context, FluentContextFlavor, SessionFlavor } from "./deps.ts";

export type BotContext = Context & FluentContextFlavor & SessionFlavor<any>;
