import { LangChainStream, Message, streamToResponse } from 'ai';
import { AIMessage, HumanMessage } from 'langchain/schema'
import { NextApiRequest, NextApiResponse } from 'next';
import { ChatOpenAI } from '@langchain/openai';

export default async function handler(req: NextApiRequest,
  res: NextApiResponse,
) {
  const { messages } = await req.body;
  const currentMessageContent = messages[messages.length - 1].content;

  const response = await fetch("https://ethereum.org/api/vector", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(currentMessageContent),
  });
  if (!response.ok) {
    console.error('Fetch Error:', response.statusText, await response.text());
    return res.status(response.status).json({ error: response.statusText });
  }
  const vectorSearch = await response.json();

  const TEMPLATE = `You are a very enthusiastic ethereum.org representative who loves to help people! Given the following sections from the ethereum.org contributor documentation, answer the question using that information. You should paraphrase to provide clear explanations instead of simply quoting. If you are unsure and the answer is not explicitly written in the documentation, say "Sorry, I don't know how to help with that."
  
  Context sections:
  ${vectorSearch}

  Question: """
  ${currentMessageContent}
  """
  `;

  messages[messages.length -1].content = TEMPLATE;

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

  return streamToResponse(stream, res);
}
