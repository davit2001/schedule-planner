"use client";
import Message from "./Message";
import { UIMessage } from "ai";
import { useEffect, useRef } from "react";
import Loader from "./Loader";

const Messages = ({ messages, isLoading }: {
    messages: UIMessage[];
    isLoading?: boolean;
}) => {
    const bottomRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages.length]);

    return (
        <div className="flex flex-col gap-2 overflow-y-auto p-4 flex-grow">
            {messages.map((message, idx) => (
                <Message
                    key={idx}
                    message={message.content}
                    sender={message.role}
                />
            ))}
            {isLoading && (<Loader />)}
            <div ref={bottomRef} />
        </div>
    )
};

export default Messages;