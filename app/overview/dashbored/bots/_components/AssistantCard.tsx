'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { EllipsisVertical, UserCircle2Icon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { useThreadContext } from '@/context/ThreadContext';

type Assistant = {
  astId: string;
  astName: string;
  gptModel: string;
  astFiles: string[];
  astTools: string[];
  updatedAt: string;
};

type Props = {
  assistant: Assistant;
  onClick: (astId: string) => void;
};

export default function AssistantCard({ assistant, onClick }: Props) {
  const { setSelectedThread, setThreadName } = useThreadContext();

  const updateThread = () => {
    setSelectedThread(assistant.astId);
    setThreadName(assistant.astName);
  };

  return (
    <Card
      key={assistant.astId}
      className="hover:shadow-md transition-shadow duration-150 cursor-pointer bg-card text-card-foreground"
      onClick={() => onClick(assistant.astId)}
    >
      <CardHeader>
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <UserCircle2Icon size={32} strokeWidth={1.4} className="text-primary" />
            <div>
              <h2 className="text-base font-semibold leading-none">{assistant.astName}</h2>
              <p className="text-xs leading-none text-muted-foreground">{assistant.astId}</p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Badge>{assistant.gptModel}</Badge>
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                <EllipsisVertical size={20} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  asChild
                  onClick={(e) => {
                    e.stopPropagation();
                    updateThread();
                  }}
                >
                  <Link href={`/overview/dashbored/chats/${assistant.astId}/${assistant.astName}`}>
                    History
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  asChild
                  onClick={(e) => {
                    e.stopPropagation();
                    updateThread();
                  }}
                >
                  <Link href={`/overview/dashbored/monitors/${assistant.astId}`}>
                    Monitor
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <hr className="my-1 border-muted" />
        <p className="text-xs mb-1">Tools Used</p>
        <div className="flex gap-2 py-1">
          {assistant.astTools.length > 0 ? (
            assistant.astTools.map((tool) => (
              <p
                key={tool}
                className="text-xs text-muted-foreground bg-muted p-1 rounded-sm"
              >
                {tool}
              </p>
            ))
          ) : (
            <p className="text-xs text-muted-foreground bg-muted p-1 rounded-sm">No tools</p>
          )}
        </div>
        <hr className="my-1 border-muted" />
        <p className="text-xs mb-1">Docs Used</p>
        <div className="flex gap-2 py-1">
          {assistant?.astFiles?.length > 0 ? (
            assistant.astFiles.map((file) => (
              <p
                key={file}
                className="text-xs text-muted-foreground bg-muted p-1 rounded-sm"
              >
                {file}
              </p>
            ))
          ) : (
            <p className="text-xs text-muted-foreground bg-muted p-1 rounded-sm">No files</p>
          )}
        </div>
        <p className="text-xs text-right">
          <strong>Updated:</strong> {new Date(assistant.updatedAt).toLocaleString()}
        </p>
      </CardContent>
    </Card>
  );
}