// src/app/api/chat/route.ts
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({}); // Uses GEMINI_API_KEY from environment

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // or "gemini-1.5-pro"
      contents: messages.map((msg: any) => ({
        role: msg.from === "user" ? "user" : "model",
        parts: [{ text: msg.text }],
      })),
    });

    const text = response.text;
    return NextResponse.json({ reply: text });
  } catch (err: any) {
    console.error("🔥 API ERROR:", err.message || err);
    return NextResponse.json(
      { error: "Something went wrong in /api/chat" },
      { status: 500 }
    );
  }
}
