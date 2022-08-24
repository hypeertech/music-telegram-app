import { Collection, Long, StorageAdapter } from "./deps.ts";

export interface ISession {
  _id: { $oid: string };
  chat: number;
  user: number;
  data: unknown;
}

export class MongoDBAdapter<T> implements StorageAdapter<T> {
  private collection: Collection<ISession>;

  constructor({ collection }: { collection: Collection<ISession> }) {
    this.collection = collection;
  }

  async read(key: string) {
    const [chat, user] = key.split(":");

    const session = await this.collection.findOne({
      chat: new Long(chat),
      user: new Long(user),
    });

    if (session === null || session === undefined) {
      return undefined;
    }

    return session.data as T;
  }

  async write(key: string, data: T) {
    const [chat, user] = key.split(":");

    await this.collection.updateOne(
      {
        chat: new Long(chat),
        user: new Long(user),
      },
      {
        $set: {
          data,
        },
      },
      { upsert: true },
    );
  }

  async delete(key: string) {
    const [chat, user] = key.split(":");
    await this.collection.deleteOne({
      chat: new Long(chat),
      user: new Long(user),
    });
  }
}
