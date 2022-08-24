import { MongoClient } from "./deps.ts";
import { MONGODB_URI } from "./config.ts";

export const mongoClient = new MongoClient();
await mongoClient.connect(MONGODB_URI);
