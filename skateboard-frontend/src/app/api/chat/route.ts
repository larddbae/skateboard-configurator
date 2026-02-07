/* eslint-disable @typescript-eslint/no-explicit-any */
import { streamText, convertToModelMessages } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

// Create OpenRouter client
const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

interface PartData {
  id: number;
  name: string;
  category: string;
  price: string;
  stock: number;
  description: string | null;
}

// Fetch parts from Laravel API
async function fetchPartsFromAPI(): Promise<PartData[]> {
  try {
    const response = await fetch('http://localhost:8000/api/parts');
    if (!response.ok) {
      console.error('Failed to fetch parts:', response.status);
      return [];
    }
    const data = await response.json();
    return data.parts || [];
  } catch (error) {
    console.error('Error fetching parts:', error);
    return [];
  }
}

// Build system prompt with parts context
async function buildSystemPrompt(): Promise<string> {
  const parts = await fetchPartsFromAPI();
  
  let partsContext = '\n\nAvailable skateboard parts in our store:\n';
  
  const categories = ['deck', 'wheel', 'truck', 'bolt'];
  for (const category of categories) {
    const categoryParts = parts.filter((p) => p.category === category);
    partsContext += `\n${category.toUpperCase()}S:\n`;
    categoryParts.forEach((p) => {
      partsContext += `- ${p.name} (ID: ${p.id}, $${p.price}, ${p.stock} in stock): ${p.description || 'No description'}\n`;
    });
  }

  return `You are a helpful skateboard expert assistant for a skateboard configurator app.
Your job is to help users choose the right skateboard parts based on their skill level, skating style, and preferences.

${partsContext}

Guidelines:
1. Be friendly and conversational
2. When recommending parts, ALWAYS include the exact part ID in format (ID: X)
3. Consider the user's skill level (beginner, intermediate, advanced)
4. Consider skating style (street, park, cruising, tricks)
5. Keep responses concise but helpful
6. If asked for a complete setup, recommend one part from each category
7. Always justify your recommendations briefly`;
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    console.log('[Chat API] Received messages:', messages?.length);

    const systemPrompt = await buildSystemPrompt();

    // Using deepseek model same as reference project
    const result = streamText({
      model: openrouter("deepseek/deepseek-v3.2"),
      system: systemPrompt,
      messages: await convertToModelMessages(messages),
    } as any);

    console.log('[Chat API] Streaming response...');
    
    return (result as any).toUIMessageStreamResponse();
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process chat request", details: String(error) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
