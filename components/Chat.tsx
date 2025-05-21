"use client";
import { useChat } from '@ai-sdk/react';
import Messages from "./Messages";
import Search from "./Search";
import useChatHistory from '@/hooks/useChatHistory';

const Chat = ({ sessionId }: {
    sessionId: string
}) => {
    const initialMessages = useChatHistory(sessionId);
    //@ts-ignore
    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
        body: {
            sessionId,
            studentId: '1'
        },
        initialMessages: [
          {
            role: 'assistant',
            content: `Hi there! I’m your smart course planner. Just tell me what you’re looking for — your goals, preferences, or even a rough idea — and I’ll turn that into a personalized, optimized schedule tailored to your degree, prerequisites, and availability. Let’s build your perfect semester together!`,
          },
          ...(initialMessages || []),
        ]
    });

    return (
        <div className="w-full flex justify-center">
            <div className="flex flex-col h-screen  px-4 w-full max-w-[800px]">
                <Messages isLoading={isLoading} messages={messages} />
                <Search input={input} setInput={handleInputChange} sendMessage={handleSubmit} />
            </div>
        </div>
    )
};

export default Chat;