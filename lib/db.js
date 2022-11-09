import { MongoClient } from "mongodb";

export const connectToDatabase = async () => {
  const connectionString = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTERNAME}.hfw4h.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`;
  const client = MongoClient.connect(connectionString);
  return client;
};
