'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAllAssistants } from '@/lib/api';
import AssistantList from './_components/AssistantList';
import { useHeaderContext } from '@/context/HeaderContext';

type Assistant = {
  astId: string;
  astName: string;
  gptModel: string;
  astFiles: string[];
  astTools: string[];
  updatedAt: string;
};

const AssistantsPage = () => {
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  
  const { setSelectedItem, setSelectedMenu } = useHeaderContext();
  useEffect(() => {
    setSelectedItem("ChatBots"); 
    setSelectedMenu("Bots");
  }, [setSelectedItem, setSelectedMenu]);

  const fetchAssistants = async () => {
    try {
      const response = await getAllAssistants();
      setAssistants(response.data);
      setLoading(false);
    } catch (error: any) {
      console.error('Error fetching assistants:', error.message);
      setError('Failed to load assistants. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssistants();
  }, []);

  const handleAssistantClick = (astId: string) => {
    router.push(`/overview/dashbored/thread/${astId}`);
  };

  if (loading) {
    return <p>Loading assistants...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <div>
      <AssistantList assistants={assistants} onAssistantClick={handleAssistantClick} useCase={true} />
    </div>
  );
};

export default AssistantsPage;
