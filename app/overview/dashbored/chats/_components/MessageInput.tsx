import { Input } from '@/components/ui/input';
import { SendHorizontalIcon } from 'lucide-react';

type MessageInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
};

export const MessageInput = ({ value, onChange, onSend }: MessageInputProps): JSX.Element => (
  <div className="relative w-full">
    <Input
      placeholder="Stop the bot assistant & start a conversation with client"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded-lg w-full"
    />
    <button
      className="absolute right-[2px] top-1/2 transform -translate-y-1/2 flex items-center justify-center p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      title="Send"
      onClick={onSend}
    >
      <SendHorizontalIcon className="h-5 w-5" />
    </button>
  </div>
);