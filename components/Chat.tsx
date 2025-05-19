"use client";
import {FC} from "react";
import { useChat } from '@ai-sdk/react';
import Messages from "./Messages";
import Search from "./Search";

const Chat: FC = () => {
    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
        body: {
            sessionId: '123',
            studentId: 'AB123'
        }
    });
    console.log('messages', messages)
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