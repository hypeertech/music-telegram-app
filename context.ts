import { Context, FluentContextFlavor, SessionFlavor } from "./deps.ts";
import { SessionData } from "./session.ts";

export type BotContext =
    & Context
    & FluentContextFlavor
    & SessionFlavor<SessionData>;
