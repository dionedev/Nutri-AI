"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UserInfo } from "@/types/diet-data.type";
import { Loader, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";

export function DietGenerator({ data }: { data: UserInfo }) {
  const [output, setOutput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  const controllerRef = useRef<AbortController | null>(null);

  async function startStreaming() {
    const controller = new AbortController();
    controllerRef.current = controller;

    setOutput("");
    setIsStreaming(true);

    try {
      const response = await fetch("http://localhost:3333/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          age: data.age,
          height: data.height,
          weight: data.weight,
          gender: data.gender,
          activity_level: data.activity_level,
          objective: data.objective,
        }),
        signal: controller.signal,
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder("utf-8");

      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;

        setOutput((prev) => prev + decoder.decode(value));
      }
    } catch (err: any) {
      if (err.name === "AbortError") {
        console.log("REQUEST CANCELADA");
        return;
      }
      console.log(err);
    } finally {
      setIsStreaming(false);
      controllerRef.current = null;
    }
  }

  async function handleStreaming() {
    if (isStreaming) {
      controllerRef.current?.abort();
      setIsStreaming(false);
      return;
    }
    await startStreaming();
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-4xl border-0 p-4 md:p-6">
        <div className="flex justify-center gap-4">
          <Button
            className="cursor-pointer gap-2"
            size="lg"
            onClick={handleStreaming}
          >
            {isStreaming ? <Loader className="animate-spin" /> : <Sparkles />}
            {isStreaming ? "Cancelar" : "Gerar dieta"}
          </Button>
        </div>
        {output && (
          <div className="bg-card rounded-lg p-4 md:p-6 border border-border max-h-[500px] overflow-y-auto">
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown
                components={{
                  h2: ({ node, ...props }) => (
                    <h2
                      className="text-xl font-bold text-green-600 my-2"
                      {...props}
                    />
                  ),
                  h1: ({ node, ...props }) => (
                    <h1
                      className="text-2xl font-bold text-zinc-900 mb-2"
                      {...props}
                    />
                  ),
                }}
              >
                {output}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
