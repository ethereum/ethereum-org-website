import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { OpenAIEmbeddings } from "@langchain/openai";

import mongoClientPromise from '../../lib/mongodb';

export default async function fetchVectorSearch(stringToSearch) {
  console.log('Received request:', stringToSearch);

    const client = await mongoClientPromise;
    console.log('Connected to MongoDB');

    const dbName = "docs";
    const collectionName = "embeddings";
    const collection = client.db(dbName).collection(collectionName);
    console.log('Selected collection:', collectionName);

    
    console.log('String to search:', stringToSearch.body.toString())
    
    const question = await stringToSearch.body.toString();
    console.log('Received question:', question);

    const vectorStore = new MongoDBAtlasVectorSearch(
      new OpenAIEmbeddings({
        modelName: 'text-embedding-ada-002',
        stripNewLines: true,
      }), {
      collection,
      indexName: "default",
      textKey: "text", 
      embeddingKey: "embedding",
    });
    console.log('Created Vector store');

    const retriever = vectorStore.asRetriever({
      searchType: "mmr",
      searchKwargs: {
        fetchK: 20,
        lambda: 0.1,
      },
    });
    console.log('Created Retriever');

    const retrieverOutput = await retriever.getRelevantDocuments(question);
    console.log('Retriever output:', retrieverOutput);
    
    return retrieverOutput
  }
