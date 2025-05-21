"use client";

import { useEffect, useState } from "react";
import { Message } from "ai";
import { denormalizeMessages } from '@/utils/message-utils';

export default function useChatHistory(sessionId: string) {
  const [messages, setMessages] = useState<Message[] | undefined>(undefined);

  useEffect(() => {
    const fetchHistory = async () => {
      const chatHistoryResponse = await fetch(`/api/session?sessionId=${sessionId}`);
      const history = await chatHistoryResponse.json();
      setMessages(history?.messages || []);
    };

    fetchHistory();
  }, [sessionId]);

  return denormalizeMessages(messages)
}
