"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "What are your opening hours?",
    answer:
      "We're open every day from 10:00 AM to 9:00 PM. If you want a preferred slot, I can help you book one.",
  },
  {
    question: "Do I need an appointment?",
    answer:
      "Walk-ins are welcome, but appointments are recommended to avoid wait time, especially evenings and weekends.",
  },
  {
    question: "Which haircut suits my face shape?",
    answer:
      "Great question! We usually suggest styles based on face shape, hair texture, and daily routine. Share a selfie or describe your face shape and I can suggest options.",
  },
  {
    question: "What is the beard grooming price range?",
    answer:
      "Beard grooming prices vary by service type. For exact pricing and current offers, our team can confirm quickly at booking.",
  },
  {
    question: "Do you provide hair spa and treatments?",
    answer:
      "Yes, we offer hair spa and nourishment treatments for dryness, frizz, and damage recovery.",
  },
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hey there! 👋 I'm your personal hair style assistant. Ask me anything about hair care, styling tips, or finding the perfect hairstyle for your face shape!",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = (messageText ?? input).trim();
    if (!textToSend) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: textToSend,
      sender: "user",
      timestamp: new Date(),
    };

    const updatedHistory = [...messages, userMessage];
    setMessages(updatedHistory);
    if (!messageText) {
      setInput("");
    }

    const faqMatch = FAQS.find(
      (faq) => faq.question.toLowerCase() === textToSend.toLowerCase()
    );

    if (faqMatch) {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: faqMatch.answer,
        sender: "bot",
        timestamp: new Date(),
      };
      setTimeout(() => {
        setMessages((prev) => [...prev, botMessage]);
      }, 250);
      return;
    }

    setIsLoading(true);

    try {
      // Call backend chatbot API
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: textToSend,
          conversationHistory: updatedHistory,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get response");
      }

      // Add bot response
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.reply,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorText =
        error instanceof Error ? error.message : "Something went wrong";
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `Sorry, I encountered an error: ${errorText}. Please try again!`,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-shadow z-40"
          size="icon"
          title="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[calc(100vw-2rem)] max-w-sm h-[520px] bg-background border border-border rounded-lg shadow-2xl flex flex-col z-50 animate-in fade-in slide-in-from-bottom-2">
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-4 rounded-t-lg flex items-center justify-between">
            <h3 className="font-semibold flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Hair Style Assistant
            </h3>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-primary/90 text-primary-foreground h-8 w-8"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/30">
            {messages.length <= 2 && (
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground">
                  Quick FAQs
                </p>
                <div className="flex flex-wrap gap-2">
                  {FAQS.map((faq) => (
                    <Button
                      key={faq.question}
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs"
                      disabled={isLoading}
                      onClick={() => handleSendMessage(faq.question)}
                    >
                      {faq.question}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : "bg-secondary text-secondary-foreground rounded-bl-none"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg rounded-bl-none text-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-border p-4 rounded-b-lg">
            <div className="flex gap-2">
              <Input
                placeholder="Ask me anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={() => handleSendMessage()}
                disabled={isLoading || !input.trim()}
                size="icon"
                className="rounded-md"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
