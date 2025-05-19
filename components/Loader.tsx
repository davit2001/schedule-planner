const Loader = () => {
    return (
        <div className="flex items-center space-x-2 p-2 bg-gray-200 text-black rounded-xl w-fit animate-pulse">
            <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
            <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" />
        </div>
    );
};

export default Loader;