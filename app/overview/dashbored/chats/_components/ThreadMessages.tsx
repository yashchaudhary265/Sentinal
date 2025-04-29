type Message = {
    id: string;
    role: string;
    message: string;
};

type ThreadMessagesProps = {
    messages: Message[];
};

export const ThreadMessages = ({ messages }: ThreadMessagesProps): JSX.Element => (
    <div className="flex flex-col h-full space-y-2">
        {messages.length > 0 ? (
            messages.map((message) => (
                <div
                    key={message.id}
                    className={`p-2 rounded-lg ${message.role === 'user' ? 'bg-blue-100 self-end' : 'bg-gray-200 self-start'}`}
                >
                    <p>{message.message}</p>
                </div>
            ))
        ) : (
            <div className="flex items-center justify-center h-full w-full">
                <p>Empty Thread.</p>
            </div>
        )}
    </div>
);