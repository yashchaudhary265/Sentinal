type Thread = {
    threadId: string;
    threadTitle: string;
    createdAt: string;
  };
  
  type ThreadsListProps = {
    threads: Thread[];
    onThreadClick: (threadId: string) => void;
  };
  
  export const ThreadsList = ({ threads, onThreadClick }: ThreadsListProps): JSX.Element => (
    <div className="h-full overflow-auto">
      {threads.length > 0 ? (
        threads.map((thread) => (
          <div
            key={thread.threadId}
            className="m-2 p-2 rounded-md border-b border-gray-200 hover:bg-muted cursor-pointer"
            onClick={() => onThreadClick(thread.threadId)}
          >
            <h3 className="text-sm font-semibold">{thread.threadTitle}</h3>
            <p className="text-xs text-gray-500">Created at: {new Date(thread.createdAt).toLocaleString()}</p>
          </div>
        ))
      ) : (
        <p>No threads available.</p>
      )}
    </div>
  );