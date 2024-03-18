import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OpenAIEmbeddings } from "@langchain/openai";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_KEY

// https://js.langchain.com/docs/modules/indexes/vector_stores/integrations/supabase

export default async function fetchVectorSearchSupabase(stringToSearch) {
  const privateKey: any = SUPABASE_KEY;
  const url: any = SUPABASE_URL;
  // @ts-ignore
  try {
  const client = createClient(url, privateKey);

    if (!stringToSearch.body) {
      console.error('No body in stringToSearch');
      return [];
    }

    const question = await stringToSearch.body.toString();
    console.log('Received question:', question);

   

    const vectorStore = await SupabaseVectorStore.fromExistingIndex(
      new OpenAIEmbeddings({
        modelName: 'text-embedding-ada-002',
        stripNewLines: true,
      }),
      {
        client,
        tableName: "documents",
        queryName: "match_documents",
      }
    );
  
    const resultOne = await vectorStore.similaritySearch(question, 5);
    // console.log('Result:', resultOne);


    if (resultOne.length === 0) {
      console.log('No documents found for the query:', question);
    } else {
      console.log('Documents retrieved:', resultOne);
    }

    return resultOne;
  } catch (error) {
    console.error('Error in fetchVectorSearchSupabase:', error);
    // Depending on your setup, you might want to return an error message or an empty array
    return [];
  }
};
