import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { OpenAIEmbeddings } from "@langchain/openai";

import mongoClientPromise from '../../lib/mongodb';

export default async function POST(req: Request) {
  const client = await mongoClientPromise;
  const dbName = "docs";
  const collectionName = "embeddings";
  const collection = client.db(dbName).collection(collectionName);
  
  console.log('Req in vector route:', req)

  return Response.json('hello');

  // const question = await req.text();
  // console.log('Question in vector.ts', question)

  // const vectorStore = new MongoDBAtlasVectorSearch(
  //   new OpenAIEmbeddings({
  //     modelName: 'text-embedding-ada-002',
  //     stripNewLines: true,
  //   }), {
  //   collection,
  //   indexName: "default",
  //   textKey: "text", 
  //   embeddingKey: "embedding",
  // });

  // const retriever = vectorStore.asRetriever({
  //   searchType: "mmr",
  //   searchKwargs: {
  //     fetchK: 20,
  //     lambda: 0.1,
  //   },
  // });
  
  // const retrieverOutput = await retriever.getRelevantDocuments(question);

  // console.log("Retriever output:", retrieverOutput)
  
  // return Response.json(retrieverOutput);
}