import { Badge } from '@/components/ui/badge';
import { UserCircle2Icon } from 'lucide-react';

type AssistantHeaderProps = {
  assistantName: string;
  assistantId: string;
};

export const AssistantHeader = ({ assistantName, assistantId }: AssistantHeaderProps): JSX.Element => (
  <div className="flex justify-between mb-2">
    <div className="flex items-center gap-2">
      <UserCircle2Icon size={32} strokeWidth={1.4} className="text-primary" />
      <div>
        <h2 className="text-base font-semibold text-gray-800 leading-none">{assistantName}</h2>
        <p className="text-xs text-gray-600 leading-none hover:text-muted">{assistantId}</p>
      </div>
    </div>
    <Badge>{'gpt-4o-mini'}</Badge>
  </div>
);