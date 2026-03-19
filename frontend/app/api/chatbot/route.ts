import { NextRequest, NextResponse } from "next/server";

const GOOGLE_API_KEY = process.env.GOOGLE_GEMINI_API_KEY;

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: string;
}

interface ChatRequest {
  message: string;
  conversationHistory: Message[];
}

const SYSTEM_PROMPT = `You are a professional hair style and hair care assistant for a premium barber shop called "MG STUDIO". Your expertise includes:
- Hair care tips and maintenance
- Hair style recommendations based on face shapes and hair types
- Grooming advice for men and women
- Styling products recommendations
- Hair health and growth tips
- Trendy cuts and styles

Guidelines:
1. Keep responses concise and friendly (2-3 sentences max usually)
2. Always be professional and helpful
3. For premium/specialized advice, suggest booking a consultation at MG STUDIO
4. Use emoji occasionally to make conversations friendly
5. Ask clarifying questions if needed (face shape, hair type, hair length, lifestyle)
6. Never provide medical advice - for hair loss or scalp issues, recommend consulting a dermatologist
7. Be enthusiastic about helping customers find their perfect style

FAQ context to keep answers consistent:
- Opening hours: 10:00 AM to 9:00 PM, every day.
- Appointments: Walk-ins are welcome, but appointments are recommended.
- Beard grooming pricing: Varies by service type; exact price should be confirmed during booking.
- Hair spa and treatments: Available for dryness, frizz, and damage recovery.

Current context: You're helping customers of MG STUDIO find the best hairstyles and get grooming advice.`;

export async function POST(req: NextRequest) {
  try {
    const body: ChatRequest = await req.json();
    const { message, conversationHistory } = body;

    if (!message || !message.trim()) {
      return NextResponse.json(
        { error: "Message cannot be empty" },
        { status: 400 }
      );
    }

    if (!GOOGLE_API_KEY) {
      console.error("GOOGLE_GEMINI_API_KEY is not set");
      return NextResponse.json(
        { error: "AI service not configured. Please set GOOGLE_GEMINI_API_KEY." },
        { status: 500 }
      );
    }

    // Format conversation history for Google Gemini API
    const formattedHistory = conversationHistory
      .map(
        (msg) =>
          `${msg.sender === "user" ? "User" : "Assistant"}: ${msg.text}`
      )
      .join("\n");

    const fullPrompt = `${SYSTEM_PROMPT}\n\nConversation History:\n${formattedHistory}\n\nUser: ${message}\n\nAssistant:`;

    console.log("Sending request to Gemini API...");

    // Call Google Generative AI API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GOOGLE_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: fullPrompt,
                },
              ],
            },
          ],
          generationConfig: {
            maxOutputTokens: 200,
            temperature: 0.7,
            topP: 0.95,
          },
        }),
      }
    );

    console.log("Gemini API response status:", response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API error details:", {
        status: response.status,
        error: errorData,
      });
      throw new Error(
        `Gemini API error ${response.status}: ${JSON.stringify(errorData)}`
      );
    }

    const data = await response.json();
    console.log("Gemini API success:", data);

    // Extract the reply from Gemini response
    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't generate a response. Please try again!";

    return NextResponse.json({ reply: reply.trim() });
  } catch (error) {
    console.error("Chatbot API error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to process your message: ${errorMessage}` },
      { status: 500 }
    );
  }
}
