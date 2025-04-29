'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { AssistantHeader } from '../../_components/AssistantHeader';
import { ThreadsList } from '../../_components/ThreadsList';
import { ThreadMessages } from '../../_components/ThreadMessages';
import { MessageInput } from '../../_components/MessageInput';
import { PoweredBy } from '../../_components/PoweredBy';
import { getThreadHistoryById, getThreadsByAssistantId } from '@/lib/api';
import { useHeaderContext } from '@/context/HeaderContext';

export default function AssistantThreads(): JSX.Element {
    const { assistantId, assistantName: encodedAssistantName } = useParams<{ assistantId: string; assistantName: string }>();
    const assistantName = decodeURIComponent(encodedAssistantName);
    const [threadTitle, setThreadTitle] = useState('');
    const [threads, setThreads] = useState([]);
    const [threadHistory, setThreadHistory] = useState([]);

//
    const { setSelectedItem, setSelectedMenu } = useHeaderContext();
    useEffect(() => {
      setSelectedItem("ChatBot"); 
      setSelectedMenu("History");
    }, [setSelectedItem, setSelectedMenu]);
//
    
    const handleGetThreads = async () => {
        try {
            const response = await getThreadsByAssistantId(assistantId);
            console.log(response)
            setThreads(response.data);
        } catch (error) {
            console.error('Error fetching threads:', error);
        }
    };

    const handleGetThreadHistory = async (threadId: string) => {
        try {
            const response = await getThreadHistoryById(threadId);
            console.log(response)
            setThreadHistory(response.data || []);
        } catch (error) {
            console.error('Error fetching thread history:', error);
        }
    };

    const handleSendMessage = () => {
        console.log('Message sent:', threadTitle);
        setThreadTitle('');
    };

    useEffect(() => {
        if (assistantId) {
            handleGetThreads();
        }
    }, [assistantId]);

    return (
        <div className="flex flex-row-reverse justify-between h-full w-full">
            <Card className="hover:shadow-md transition-shadow duration-150 basis-2/5 h-full flex-grow flex flex-col">
                <CardHeader className=' w-full'>
                    <AssistantHeader assistantName={assistantName} assistantId={assistantId} />
                    <hr />
                </CardHeader>
                <CardContent className=' w-full flex-grow overflow-hidden'>
                    <ThreadsList threads={threads} onThreadClick={handleGetThreadHistory} />
                </CardContent>
            </Card>
            <div className="basis-3/5 px-6 rounded-lg">
                <Card className="w-full h-full rounded-lg flex flex-col">
                    <CardHeader className="p-4 bg-gray-100">
                        <AssistantHeader assistantName={assistantName} assistantId={assistantId} />
                    </CardHeader>
                    <CardContent className="flex-grow overflow-y-scroll p-4 bg-white h-full">
                        <ThreadMessages messages={threadHistory} />
                    </CardContent>
                    <CardContent className="flex items-center justify-center mt-8">
                        <MessageInput value={threadTitle} onChange={setThreadTitle} onSend={handleSendMessage} />
                    </CardContent>
                    <CardFooter className='w-full flex items-center justify-center text-sm bg-gray-50 gap-2'>
                        <PoweredBy /> 
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}

// 'use client';
// import { Badge } from '@/components/ui/badge';
// import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { getThreadHistoryById, getThreadsByAssistantId } from '@/lib/api';
// import { CircleDotDashedIcon, SendHorizontalIcon, UserCircle2Icon } from 'lucide-react';
// import { useParams } from 'next/navigation';
// import React, { useEffect, useState } from 'react';

// type Params = {
//     assistantId: string;
//     assistantName: string;
// };

// type Thread = {
//     userId: string;
//     astId: string;
//     threadId: string;
//     threadTitle: string;
//     createdAt: string;
// };

// type Message = {
//     id: string;
//     role: string;
//     message: string;
//     thread_id: string;
//     created_at: number;
// };

// export default function AssistantThreads(): JSX.Element {
//     const { assistantId, assistantName: encodedAssistantName } = useParams<Params>();
//     const assistantName = decodeURIComponent(encodedAssistantName);
//     const [threadTitle, setThreadTitle] = useState('');
//     const [threads, setThreads] = useState<Thread[]>([]);
//     const [threadHistory, setThreadHistory] = useState<Message[]>([]);

//     const handleGetThreads = async (): Promise<void> => {
//         try {
//             const response = await getThreadsByAssistantId(assistantId);
//             setThreads(response.data);
//             console.log('Threads fetched successfully:', response.data);
//         } catch (error) {
//             console.error('Error fetching threads:', error);
//         }
//     };

//     const handleGetThreadHistory = async (threadId: string): Promise<void> => {
//         try {
//             const response = await getThreadHistoryById(threadId);
//             if (response.status) {
//                 setThreadHistory(response.data);
//                 console.log('Thread history fetched successfully:', response.data);
//             } else {
//                 console.error('Error fetching thread history:', response.message);
//             }
//         } catch (error) {
//             console.error('Error fetching thread history:', error);
//         }
//     };

//     const handleSendMessage = () => {
//         console.log('Message sent:', threadTitle);
//         setThreadTitle('');
//     };

//     useEffect(() => {
//         if (assistantId) {
//             handleGetThreads();
//         }
//     }, [assistantId]);

//     return (
//         <div className="flex flex-row-reverse justify-between h-full w-full">
//             <Card className='hover:shadow-md transition-shadow duration-150 basis-2/5'>
//                 <CardHeader>
//                     <div className='flex justify-between mb-2'>
//                         <div className="flex items-center gap-2">
//                             <UserCircle2Icon size={32} strokeWidth={1.4} className="text-primary" />
//                             <div>
//                                 <h2 className="text-base font-semibold text-gray-800 leading-none">{assistantName}</h2>
//                                 <p className="text-xs text-gray-600 leading-none hover:text-muted">{assistantId}</p>
//                             </div>
//                         </div>
//                         <div>
//                             <Badge>{'gpt-4o-mini'}</Badge>
//                         </div>
//                     </div>
//                     <hr />
//                 </CardHeader>
//                 <CardContent>
//                     {threads.length > 0 ? (
//                         threads.map((thread) => (
//                             <div key={thread.threadId} className="m-2 p-2 rounded-md border-b border-gray-200 hover:bg-muted cursor-pointer" onClick={() => handleGetThreadHistory(thread.threadId)}>
//                                 <h3 className="text-sm font-semibold">{thread.threadTitle}</h3>
//                                 <p className="text-xs text-gray-500">Created at: {new Date(thread.createdAt).toLocaleString()}</p>
//                             </div>
//                         ))
//                     ) : (
//                         <p>No threads available.</p>
//                     )}
//                 </CardContent>
//             </Card>
//             <div className="basis-3/5 px-6 rounded-lg">
//                 <Card className='w-full h-full rounded-lg flex flex-col'>
//                     <CardHeader className="p-4 bg-gray-100">
//                         <div className="flex flex-row items-center gap-2">
//                             <UserCircle2Icon size={26} strokeWidth={1.4} className="text-green-600" />
//                             <p className="text-base mt-0 font-medium">{assistantName}</p>
//                         </div>
//                     </CardHeader>
//                     <CardContent className='flex-grow overflow-y-scroll p-4 bg-white h-full'>
//                         <div className="flex flex-col h-full space-y-2">
//                             {threadHistory.length > 0 ? (
//                                 threadHistory.map((message) => (
//                                     <div key={message.id} className={`p-2 rounded-lg ${message.role === 'user' ? 'bg-blue-100 self-end' : 'bg-gray-200 self-start'}`}>
//                                         <p>{message.message}</p>
//                                     </div>
//                                 ))
//                             ) : (
//                                 <div className="flex items-center justify-center h-full w-full">
//                                     <p>Empty Thread.</p>
//                                 </div>
//                             )}
//                         </div>
//                     </CardContent>
//                     <CardContent className='flex items-center justify-center mt-8'>
//                         <div className="relative w-full">
//                             <Input
//                                 placeholder="Stop the bot assistant & start a conversation with client"
//                                 value={threadTitle}
//                                 onChange={(e) => setThreadTitle(e.target.value)}
//                                 className="border rounded-lg w-full"
//                             />
//                             <button
//                                 className="absolute right-[2px] top-1/2 transform -translate-y-1/2 flex items-center justify-center p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                                 title="Send"
//                                 onClick={handleSendMessage}
//                             >
//                                 <SendHorizontalIcon className='h-5 w-5' />
//                             </button>
//                         </div>
//                     </CardContent>
//                     <CardFooter className='w-full flex items-center justify-center text-sm bg-gray-50 gap-2'>
//                         <CircleDotDashedIcon size={18} />
//                         <p>Powered by Sentinal</p>
//                     </CardFooter>
//                 </Card>
//             </div>
//         </div>
//     )
// }