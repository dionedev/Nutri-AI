import OpenAI from "openai";
import type { DietPlanRequest } from "./types";
import { readFileSync } from "node:fs";
import { buildSystemPrompt, buildUserPrompt } from "./prompt";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY as string,
  timeout: 2 * 60 * 1000,
  logLevel: "debug",
});

export async function* generateDietPlan(input: DietPlanRequest) {
  const instruction = readFileSync("knowledge/instruction.md", "utf-8");

  const stream = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: buildSystemPrompt(),
      },
      {
        role: "user",
        content: buildUserPrompt(input),
      },
    ],

    temperature: 0.6,
    stream: true,
  });

  for await (const chunk of stream) {
    const delta = chunk.choices[0]?.delta?.content;
    if (delta) yield delta;
  }
}
