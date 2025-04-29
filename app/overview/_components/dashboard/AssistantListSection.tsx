import React from "react";
import { Card } from "@/components/ui/card";
import AssistantList from "../../dashbored/bots/_components/AssistantList";

type Props = {
  assistants: Array<{
    astId: string;
    astName: string;
    gptModel: string;
    astFiles: string[];
    astTools: string[];
    updatedAt: string;
  }>;
  onAssistantClick: (id: string) => void;
};

const AssistantListSection: React.FC<Props> = ({ assistants, onAssistantClick }) => {
  return (
    <Card className="h-full flex flex-col overflow-auto">
      <div className="p-2 font-semibold text-lg text-gray-800 border-b border-gray-300 flex-shrink-0">
        Explore Your Virtual Assistants
      </div>
      <div className="flex-grow overflow-auto">
        <AssistantList assistants={assistants} onAssistantClick={onAssistantClick} useCase={false} />
      </div>
    </Card>
  );
};

export default AssistantListSection;