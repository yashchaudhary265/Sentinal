'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getAssistantById, createThread, createChat } from '@/lib/api';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Loader, SendHorizontalIcon, UserCircle2Icon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import AssistantForm from '../_components/UpdateCard';
import ReactMarkdown from 'react-markdown';


interface Assistant {
  astId: string;
  astName: string;
  astInstruction: string;
  gptModel: string;
  astFiles: { fileId: string; fileName: string; fileSize: number; fileType: string }[];
  astTools: string[];
  createdAt: string;
  updatedAt: string;
}

interface CreateThreadResponse {
  status: boolean;
  message: string;
  data: {
    thread: {
      id: string;
      created_at: number;
      metadata: any;
      object: string;
      tool_resources: any;
    };
  };
}

export default function AssistantDetailPage() {
  const { astId } = useParams();
  const [assistant, setAssistant] = useState<Assistant | null>(null);
  const [threadTitle, setThreadTitle] = useState('');
  const [threadId, setThreadId] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ text: string; sender: 'user' | 'assistant' }[]>([]);

  useEffect(() => {
    if (!astId) {
      setMessage('Assistant ID not provided');
      return;
    }

    const fetchAssistant = async () => {
      try {
        const response = await getAssistantById(astId as string);
        if (response.status) {
          setAssistant(response.data[0]);
        } else {
          setMessage('Assistant not found');
        }
      } catch (error) {
        setMessage('Error fetching assistant');
        console.error('Error fetching assistant:', error);
      }
    };

    fetchAssistant();
  }, [astId]);

  const handleCreateThread = async () => {
    setMessage('');
    setThreadTitle('');

    if (!assistant || !threadTitle) {
      setMessage('Please provide a valid title.');
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);

      if (!threadId) {
        const result: CreateThreadResponse = await createThread(assistant.astId, threadTitle);
        if (result.status) {
          setThreadId(result.data.thread.id);
          setMessage('Thread created successfully');
          await sendMessageToThread(threadTitle);
        } else {
          setMessage(`Failed to create thread: ${result.message}`);
        }
      } else {
        await sendMessageToThread(threadTitle);
      }
    } catch (error) {
      setMessage('Error creating thread or sending message.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessageToThread = async (message: string) => {
    if (!assistant || !threadId) {
      setMessage('Assistant or Thread ID is missing.');
      return;
    }

    const images: File[] = [];
    try {
      setChatMessages((prev) => [...prev, { text: message, sender: 'user' }]);
      const chatResponse = await createChat(assistant.astId, threadId, message, images);
      console.log(chatResponse);
      setChatMessages((prev) => [...prev, { text: chatResponse as string, sender: 'assistant' }]);
    } catch (error) {
      setMessage('Error sending message');
      console.error('Error sending message:', error);
    }
  };

  if (!assistant) {
    return <p className="text-center">Assistant not found.</p>;
  }

  return (
    <div className="flex justify-between h-full w-full">
      {/* Assistant Info Section */}
      <Card key={assistant.astId} className="hover:shadow-md transition-shadow duration-150 basis-3/5">
        <CardHeader>
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <UserCircle2Icon size={32} strokeWidth={1.4} className="text-primary" />
              <div>
                <h2 className="text-base font-semibold text-gray-800 leading-none">{assistant.astName}</h2>
                <p className="text-xs text-gray-600 leading-none hover:text-muted">{assistant.astId}</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Badge>{assistant.gptModel}</Badge>
            </div>
          </div>
        </CardHeader>
        <hr />
        <AssistantForm onRequestSuccess={() => { }} assistant={assistant} />
      </Card>

      {/* Chat Section */}
      <div className="basis-2/5 px-6 rounded-lg">
        <Card className="w-full h-full rounded-lg flex flex-col">
          <CardHeader className="p-4 bg-gray-100">
            <div className="flex items-center gap-2">
              <UserCircle2Icon size={26} strokeWidth={1.4} className="text-green-600" />
              <p className="text-base mt-0 font-medium">{assistant.astName}</p>
            </div>
          </CardHeader>
          <CardContent className="flex-grow overflow-y-scroll p-4 bg-white h-full">
            <div className="flex flex-col h-full space-y-2">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-100 self-end' : 'bg-gray-200 self-start'}`}
                >
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-1 self-start p-2 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-200"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-400"></div>
                </div>
              )}
            </div>
          </CardContent>
          <CardContent className="flex items-center justify-center">
            <div className="relative w-full">
              <Input
                placeholder={"Type your message here..."}
                className={`border rounded-lg w-full`} 
                value={threadTitle}
                onChange={(e) => setThreadTitle(e.target.value)}
              />

                <button
                  onClick={handleCreateThread}
                  disabled={isLoading}
                  className="absolute right-[2px] top-1/2 transform -translate-y-1/2 flex items-center justify-center p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  title="Send"
                >
                  {isLoading ? (
                    <Loader className="h-5 w-5 animate-spin" />
                  ) : (
                    <SendHorizontalIcon className="h-5 w-5" />
                  )}
                </button>
              
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}