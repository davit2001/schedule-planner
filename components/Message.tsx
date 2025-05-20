import { HTMLAttributes } from 'react';

interface MessageProps extends HTMLAttributes<HTMLDivElement> {
    message: string;
    sender: string;
}
const Message = ({ message, sender, ...props }: MessageProps) => (
    <div
      {...props}
        className={`p-2 my-1 rounded-xl ${
            sender === "user"
                ? "bg-[#e9e9e980] self-end max-w-xs"
                : "text-black self-start"
        }`}
    >
        <p>{message}</p>
    </div>
);

export default Message;