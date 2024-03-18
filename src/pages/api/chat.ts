import { LangChainStream, Message, StreamingTextResponse,streamToResponse } from 'ai';
import { ChatPromptTemplate, MessagesPlaceholder } from 'langchain/prompts';
import { AIMessage, HumanMessage } from 'langchain/schema'
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest } from 'next/server'
import { StringOutputParser } from '@langchain/core/output_parsers'
import { ChatOpenAI } from '@langchain/openai';

import fetchVectorSearch from '../../lib/api/fetchVectorSearch'

export const runtime = 'edge';

export default async function handler(req: NextRequest,
  res: NextApiResponse,
) {
  const body = await req.json();
  const messages = body.messages ?? [];
  console.log(messages)
  const currentMessageContent = messages[messages.length - 1].content;
  const chatHistory = messages.map(m => `${m.role}: ${m.content}`).join('\n')

  const llm = new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
    streaming: true,
  });

  const contextualizeQuestionSystemPrompt = `Given a chat history and the latest usre question which might reference context in the chat history, formulate a standalone question which can be understood without the chat history. Do NOT answer the question, just reformulate it if needed and otherwise return it as is.`
  const contextualizeQuestionPrompt = ChatPromptTemplate.fromMessages([
    ["system", contextualizeQuestionSystemPrompt],
    new MessagesPlaceholder("chat_history"),
    ["human", "{question}"],
  ])
  const contextualizeChain = contextualizeQuestionPrompt.pipe(llm).pipe(new StringOutputParser())


  const chat_history = messages.map(m => m.role == 'user'
      ?new HumanMessage(m.content)
      : new AIMessage(m.content),
  )

  const contextualizedQuestion = await contextualizeChain.invoke({
    chat_history: chat_history,
    question: currentMessageContent,
  })

  const questionToAsk = chat_history.length < 2 ? currentMessageContent : contextualizedQuestion
  
  console.log('Contextualized question', questionToAsk)

  // const requestObject: any = {
  //   body: JSON.stringify(currentMessageContent),
  // };

  const vectorSearch = await fetchVectorSearch({ body: questionToAsk } )
  // console.log(vectorSearch)
  
  const TEMPLATE = `You are a very enthusiastic ethereum.org representative who loves to help people! Given the following sections from the ethereum.org contributor documentation, answer the question using that information. You should paraphrase to provide clear explanations instead of simply quoting. If you are unsure and the answer is not explicitly written in the documentation, say "Sorry, I don't know how to help with that."
  
  Conversation history:
  ${chatHistory}

  Context sections:
  ${JSON.stringify(vectorSearch)}

  Question: """
  ${currentMessageContent}
  """
  `;

  console.log(TEMPLATE)

  messages[messages.length -1].content = TEMPLATE;

  const { stream, handlers } = LangChainStream();
  

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

  return new StreamingTextResponse(stream);
}
