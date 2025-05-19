import {ChangeEvent} from "react";
import SendIcon from '@/assets/send-icon.svg';

const Search = ({ input, setInput, sendMessage }: {
    input: string;
    setInput: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
    sendMessage: () => void;
}) => (
    <div className="p-2 border border-[#0d0d0d1a] shadow-2xl shadow-zinc-600 rounded-xl  flex items-center gap-2 sticky bottom-[20px] bg-white">
        <input
            type="text"
            className="flex-grow p-2 focus:outline-none"
            placeholder="Type your message..."
            value={input}
            onChange={setInput}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
            onClick={sendMessage}
            className="cursor-pointer bg-gray-600 p-2 text-white rounded-full hover:bg-gray-400"
        >
            <SendIcon />
        </button>
    </div>
);

export default Search;