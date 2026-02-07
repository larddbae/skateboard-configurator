/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { Part } from "@/lib/types";
import { useCustomizerControls } from "@/app/build/context";
import clsx from "clsx";

type Props = {
  allParts: Part[];
  className?: string;
};

export default function AIStyleAnalyzer({ allParts, className }: Props) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { setDeck, setWheel, setTruck, setBolt } = useCustomizerControls();
  
  // Manual input state for AI SDK v5+
  const [input, setInput] = useState("");

  const { messages, sendMessage, status } = useChat({});

  const isLoading = status === "submitted" || status === "streaming";

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    sendMessage({ text: input });
    setInput("");
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Get text content from message parts (SDK v5+ format)
  const getMessageText = (message: any): string => {
    if (message.parts && Array.isArray(message.parts)) {
      return message.parts
        .filter((part: any) => part.type === "text")
        .map((part: any) => part.text)
        .join("");
    }
    return message.content || "";
  };

  // Extract and apply part recommendations from AI response
  const applyRecommendations = (messageText: string) => {
    const idMatches = messageText.match(/ID:\s*(\d+)/gi);
    if (!idMatches) return;

    const partIds = idMatches.map((match) => {
      const numMatch = match.match(/\d+/);
      return numMatch ? parseInt(numMatch[0], 10) : null;
    }).filter((id): id is number => id !== null);

    partIds.forEach((id) => {
      const part = allParts.find((p) => p.id === id);
      if (!part) return;

      switch (part.category) {
        case "deck":
          setDeck(part);
          break;
        case "wheel":
          setWheel(part);
          break;
        case "truck":
          setTruck(part);
          break;
        case "bolt":
          setBolt(part);
          break;
      }
    });
  };

  const quickPrompts = [
    "I'm a beginner, recommend a complete setup",
    "Best wheels for street skating?",
    "What's good for park skating?",
  ];

  return (
    <div className={clsx("flex flex-col", className)}>
      {/* Chat Messages */}
      <div className="mb-3 max-h-60 overflow-y-auto rounded-lg bg-zinc-800 p-3">
        {messages.length === 0 ? (
          <div className="text-center text-sm text-zinc-500">
            Ask me anything about skateboard parts!
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((message) => {
              const messageText = getMessageText(message);
              const isUser = message.role === "user";

              return (
                <div
                  key={message.id}
                  className={clsx(
                    "rounded-lg p-2 text-sm",
                    isUser
                      ? "ml-4 bg-purple-600 text-white"
                      : "mr-4 bg-zinc-700 text-zinc-200"
                  )}
                >
                  <div className="mb-1 text-xs font-bold opacity-70">
                    {isUser ? "You" : "🤖 AI"}
                  </div>
                  <div className="whitespace-pre-wrap">{messageText}</div>
                  {!isUser && messageText.includes("ID:") && (
                    <button
                      onClick={() => applyRecommendations(messageText)}
                      className="mt-2 rounded bg-lime-500 px-2 py-1 text-xs font-medium text-zinc-900 hover:bg-lime-400"
                    >
                      ✨ Apply Recommendations
                    </button>
                  )}
                </div>
              );
            })}
            {isLoading && (
              <div className="mr-4 rounded-lg bg-zinc-700 p-2 text-sm text-zinc-400">
                <span className="animate-pulse">Thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Quick Prompts */}
      <div className="mb-2 flex flex-wrap gap-1">
        {quickPrompts.map((prompt, i) => (
          <button
            key={i}
            onClick={() => setInput(prompt)}
            className="rounded-full bg-zinc-700 px-2 py-1 text-xs text-zinc-300 hover:bg-zinc-600"
          >
            {prompt.length > 25 ? prompt.slice(0, 25) + "..." : prompt}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Ask about skateboard parts..."
          disabled={isLoading}
          className="flex-1 rounded-lg bg-zinc-900 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className={clsx(
            "rounded-lg px-4 py-2 text-sm font-medium transition-all",
            isLoading || !input.trim()
              ? "cursor-not-allowed bg-zinc-700 text-zinc-500"
              : "bg-purple-600 text-white hover:bg-purple-500"
          )}
        >
          {isLoading ? "..." : "Send"}
        </button>
      </form>
    </div>
  );
}
