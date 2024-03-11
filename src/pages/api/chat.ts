import { LangChainStream, Message,StreamingTextResponse } from 'ai';
import { AIMessage, HumanMessage } from 'langchain/schema'
import { ChatOpenAI } from '@langchain/openai';

export const runtime = 'edge';


export default async function POST(req) {
  console.error('in api');
  const { messages } = await req.json();
  console.log('API messages', messages);
  const currentMessageContent = messages[messages.length - 1].content;

  // const vectorSearch = await fetch("http://localhost:3000/api/vectorSearch", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: currentMessageContent,
  // }).then((res) => res.json());


  // Construct a template for the chatbot to answer a question.
  // The template includes the vector search response and the question itself.
  const TEMPLATE = `You are a very enthusiastic ethereum.org representative who loves to help people! Given the following sections from the ethereum.org contributor documentation, answer the question using that information, outputted in markdown format. You should paraphrase to provide clear explanations instead of simply quoting. If you are unsure and the answer is not written in the documentation, say "Sorry, I don't know how to help with that."
  
  Context sections:
  

  Question: """
  ${currentMessageContent}
  """
  `;

  // Add the template to the last message in the "messages" array.
  messages[messages.length -1].content = TEMPLATE;

  // Set up a LangChainStream and a ChatOpenAI instance.
  const { stream, handlers } = LangChainStream();
  const llm = new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
    streaming: true,
  });

  llm
    .call(
      (messages as Message[]).map(m =>
        m.role == 'user'
          ? new HumanMessage(m.content)
          : new AIMessage(m.content),
      ),
      {},
      [handlers],
    )
    .catch(console.error);

  // Return a StreamingTextResponse with the stream from the LangChainStream.
  return new StreamingTextResponse(stream);
}
