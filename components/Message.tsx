const Message = ({ message, sender }: {
    message: string;
    sender: string;
}) => (
    <div
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