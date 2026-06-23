import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI!;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClient: MongoClient | undefined;
}

const client = globalThis._mongoClient ?? new MongoClient(uri);

if (process.env.NODE_ENV !== "production") globalThis._mongoClient = client;

export async function getDb(): Promise<Db> {
  await client.connect();
  return client.db("cinelog");
}

export async function getFilmsCollection() {
  const db = await getDb();
  return db.collection("films");
}
