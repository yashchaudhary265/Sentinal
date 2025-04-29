"use client";

import React, { useEffect, useState } from "react";
import { useHeaderContext } from "@/context/HeaderContext";
import { getAllAssistants } from "@/lib/api";
import DashboardStats from "./_components/dashboard/DashboardStats";
import LineChartSection from "./_components/dashboard/LineChartSection";
import AssistantListSection from "./_components/dashboard/AssistantListSection";
import { useRouter } from "next/navigation";
import GreetingCard from "./_components/dashboard/GreetingCard";

type Assistant = {
  astId: string;
  astName: string;
  gptModel: string;
  astFiles: string[];
  astTools: string[];
  updatedAt: string;
};

function Page() {
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [astId, setAstId] = useState<string>("");
  const { setSelectedItem, setSelectedMenu } = useHeaderContext();
  const router = useRouter();

  useEffect(() => {
    setSelectedItem("Dashboard");
    setSelectedMenu("Dashboard");
    fetchAssistants();
  }, [setSelectedItem, setSelectedMenu]);

  const fetchAssistants = async () => {
    try {
      const response = await getAllAssistants();
      setAssistants(response.data);
      if (response.data.length > 0) {
        setAstId(response.data[0].astId);
        cycleAstIds(response.data);
      }
    } catch (err) {
      console.error("Failed to load assistants.", err);
    }
  };

  const cycleAstIds = (assistants: Assistant[]) => {
    let index = 0;

    const cycle = () => {
      setAstId(assistants[index].astId);
      index = (index + 1) % assistants.length;
      console.log(assistants[index].astId)
      setTimeout(cycle, 5000);
    };

    cycle();
  };

  const handleAssistantClick = (astId: string) => {
    router.push(`/overview/dashbored/thread/${astId}`);
    // console.log(astId)
  };

  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-3 gap-2 w-full h-full">
        <div className="col-span-2">
          <DashboardStats />
          <div className="w-full h-[42vh]">
            <LineChartSection astId={astId} />
          </div>
          <div className="w-full">
            <GreetingCard />
          </div>
        </div>
        <AssistantListSection
          assistants={assistants}
          onAssistantClick={handleAssistantClick}
        />
      </div>
    </div>
  );
}

export default Page;