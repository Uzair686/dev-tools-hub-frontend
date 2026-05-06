import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { text, tone } = await req.json();

  if (!text) {
    return NextResponse.json({ error: "Text is required" }, { status: 400 });
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `You are a professional text rewriter. Rewrite the given text in a ${tone || "professional"} tone. Return only the rewritten text, no explanations.`,
          },
          { role: "user", content: text },
        ],
        max_tokens: 1024,
      }),
    });

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content || "";
    return NextResponse.json({ result });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "AI request failed" }, { status: 500 });
  }
}