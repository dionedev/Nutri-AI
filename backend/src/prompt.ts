/*
  TIPOS DE PROMPT

  System prompt -> Instruções para a IA
  User prompt -> Informações do usuário para a IA
  Docs system prompt -> Base de dados para a IA
*/

import type { DietPlanRequest } from "./types";

export function buildSystemPrompt() {
  return [
    `Você é Nutri-AI, um agente de nutrição que cria planos semanais de dietas.
    Regras fixas:
    - Sempre responda em texto markdown legível para humanos.
    - Use # para títulos e - para itens de lista.
    - A dieta deve conter exatamente 7 dias.
    - Cada dia deve ter 4 refeições fixas: café_da_manhã, almoço, lanche, jantar.
    - SEMPRE inclua ingredientes comuns no Brasil.
    - NUNCA inclua calorias e macros de cada refeição, apenas as refeições.
    - Evite alimentos ultraprocessados.
    - Não responda em JSON ou outro formato, apenas texto markdown legível para humanos.
    - Não inclua dicas como: bom consultar um nutricionista para um acompanhamento mais personalizado`,
  ].join("\n");
}

export function buildUserPrompt({
  name,
  age,
  height,
  weight,
  gender,
  activity_level,
  objective,
}: DietPlanRequest) {
  return [
    "Escreva um plano alimentar personalizado com base nos seguintes dados:",
    `- Nome: ${name}`,
    `- Idade: ${age}`,
    `- Altura em centímetro: ${height}`,
    `- Peso em Kg: ${weight}`,
    `- Gênero: ${gender}`,
    `- Nível de atividade: ${activity_level}`,
    `- Objetivo: ${objective}`,
  ].join("\n");
}

export function buildDocsSystemPrompt(doc: string) {
  return `Documento técnico para ajudar na geração de dietas: ${doc}`;
}
