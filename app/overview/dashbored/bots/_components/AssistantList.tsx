import AssistantCard from './AssistantCard';

type Assistant = {
  astId: string;
  astName: string;
  gptModel: string;
  astFiles: string[];
  astTools: string[];
  updatedAt: string;
};

type Props = {
  assistants: Assistant[];
  onAssistantClick: (astId: string) => void;
  useCase: boolean;
};

export default function AssistantList({ assistants, onAssistantClick, useCase }: Props) {
  
  return (
    <div
      className={`grid ${
        useCase ? 'grid-cols-1  sm:grid-cols-1 md:grid-cols-3' : 'grid-cols-1'
      } gap-6 m-2`}
    >
      {assistants.map((assistant) => (
        <AssistantCard
          key={assistant.astId}
          assistant={assistant}
          onClick={() => onAssistantClick(assistant.astId)}
        />
      ))}
    </div>
  );
}