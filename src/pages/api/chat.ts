import { LangChainStream, Message, streamToResponse } from 'ai';
import { AIMessage, HumanMessage } from 'langchain/schema'
import { NextApiRequest, NextApiResponse } from 'next';
import { ChatOpenAI } from '@langchain/openai';

export default async function handler(req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log('Received request');
  if (!req.body || !req.body.messages) {
    console.log('Missing messages in request body');
    return res.status(400).json({ error: 'Missing messages in request body' });
  }

  const messages = req.body.messages;
  const currentMessage = messages[messages.length - 1];
  if (!currentMessage || !currentMessage.content) {
    console.log('Missing content in last message');
    return res.status(400).json({ error: 'Missing content in last message' });
  }

  const currentMessageContent = currentMessage.content;

  try {
    console.log('Fetching ethereum.org/api/vector');
    const response = await fetch("https://deploy-preview-12424--ethereumorg.netlify.app/api/vector", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currentMessageContent),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Fetch Error:', response.statusText, errorText);
      return res.status(response.status).json({ error: response.statusText, details: errorText });
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
    console.log('Template generated:', TEMPLATE);

    const { stream, handlers } = LangChainStream();
    const llm = new ChatOpenAI({
      modelName: "gpt-3.5-turbo",
      streaming: true,
    });

    console.log('Starting LLM call');
    await llm.call(
      (messages as Message[]).map(m =>
        m.role == 'user'
          ? new HumanMessage(m.content)
          : new AIMessage(m.content),
      ),
      {},
      [handlers],
    );

    console.log('LLM call finished');
    return streamToResponse(stream, res);
  } catch (error) {
    console.error(error);
    console.log('Internal Server Error');
    return res.status(500).json({ error: 'Internal Server Errorf' });
  }
}
