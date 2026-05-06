import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, phone, skills, experience, education, jobTitle } = await req.json();

  if (!name || !skills) {
    return NextResponse.json({ error: "Name and skills are required" }, { status: 400 });
  }

  const prompt = `Create a professional resume for:
Name: ${name}
Email: ${email || "N/A"}
Phone: ${phone || "N/A"}
Job Title: ${jobTitle || "Software Developer"}
Skills: ${skills}
Experience: ${experience || "No experience provided"}
Education: ${education || "No education provided"}

Write a complete professional resume with these sections:
- Professional Summary
- Skills
- Work Experience
- Education
- Contact Information

Make it ATS-friendly. Use plain text formatting.`;

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
            content: "You are an expert resume writer. Create professional ATS-optimized resumes.",
          },
          { role: "user", content: prompt },
        ],
        max_tokens: 2048,
      }),
    });

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content || "";
    return NextResponse.json({ result, id: Date.now() });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "AI request failed" }, { status: 500 });
  }
}