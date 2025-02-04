import { MongoClient } from "mongodb";
export async function connectDateBase() {
  const client = await MongoClient.connect(
    "mongodb+srv://prinsvaghasiyait21:Prince832004@cluster0.01ztk.mongodb.net/events?retryWrites=true&w=majority"
  );
  return client;
}

export async function insertDocumnet(client, collection, document) {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);

  return result;
}

export async function getAllDocuments(client, collection) {
  const db = client.db();
  const documents = await db
    .collection(collection)
    .find()
    .sort({
      _id: -1,
    })
    .toArray();
  return documents;
}
