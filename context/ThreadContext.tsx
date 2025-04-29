import React, { createContext, useState, ReactNode, useContext } from "react";

interface ThreadContextType {
  selectedThread: string;
  threadName: string;
  setSelectedThread: (thread: string) => void;
  setThreadName: (name: string) => void;
}

const ThreadContext = createContext<ThreadContextType | undefined>(undefined);

export const ThreadProvider = ({ children }: { children: ReactNode }) => {
  const [selectedThread, setSelectedThread] = useState<string>("defaultThread");
  const [threadName, setThreadName] = useState<string>("defaultName");

  return (
    <ThreadContext.Provider
      value={{ selectedThread, threadName, setSelectedThread, setThreadName }}
    >
      {children}
    </ThreadContext.Provider>
  );
};

export const useThreadContext = (): ThreadContextType => {
  const context = useContext(ThreadContext);
  if (!context) {
    throw new Error("useThreadContext must be used within a ThreadProvider");
  }
  return context;
};