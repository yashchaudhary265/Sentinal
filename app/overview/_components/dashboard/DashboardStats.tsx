import React from "react";
import { Card } from "@/components/ui/card";
import { BotIcon, LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const DashboardStats: React.FC = () => {
  const stats = [
    { value: 20, label: "Bots", percentage: "54%" },
    { value: "--", label: "Active Api", percentage: "Temp" },
  ];

  return (
    <div className="grid grid-cols-4 gap-2">
      {stats.map((item, index) => (
        <Card
          key={index}
          className={`p-3 bg-card text-card-foreground h-full flex justify-between items-start`}>
          <div className="flex flex-col justify-between h-full">
            <div className="icon bg-muted text-primary-foreground shadow text-center rounded-full p-2">
              {item.label === "Bots" && <BotIcon className="text-primary" />}
              {item.label === "Active Api" && <LinkIcon className="text-primary" />}
            </div>
          </div>
          <div>
            <h5 className="font-bold mb-0">{item.value}</h5>
            <span className="text-sm text-muted-foreground">{item.label}</span>
          </div>
        </Card>
      ))}
      <Card
        className={`p-3 bg-card text-card-foreground h-full flex justify-between items-center col-span-2`}>
        <div className="flex items-start flex-col justify-between h-full">
          <div className="icon bg-muted text-primary-foreground shadow text-center rounded-full p-2">
            <BotIcon className="text-primary" />
          </div>
          <div>
            <h5 className="font-bold mb-0">{/* Add dynamic content if needed */}</h5>
            <span className="text-sm text-muted-foreground">Create New Bot</span>
          </div>
        </div>
        <Link href="/overview/dashbored/createBot">
          <Button className="bg-primary text-secondary hover:bg-primary-dark">Create New Bot</Button>
        </Link>
      </Card>
    </div>
  );
};

export default DashboardStats;