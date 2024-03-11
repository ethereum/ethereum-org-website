import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_ATLAS_URI as string
const options = {};

let client;
let mongoClientPromise: Promise<any>;

// declare global {
//   var _mongoClientPromise: Promise<any>;
// }

if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}

// Commented out as it was causing errors
// if (process.env.NODE_ENV === "development") {
//   // In development mode, use a global variable so that the value
//   // is preserved across module reloads caused by HMR (Hot Module Replacement).
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(uri, options);
//     global._mongoClientPromise = client.connect();
//   }
//   mongoClientPromise = global._mongoClientPromise;
// } else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  mongoClientPromise = client.connect();
// }

export default mongoClientPromise;
