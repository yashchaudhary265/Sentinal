'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getAssistantById, getThreadsByAssistantId } from '@/lib/api';
import { useHeaderContext } from '@/context/HeaderContext';
import BasicLineChart from '../_components/AreaCurve';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { LinkIcon } from 'lucide-react';

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

const StatisticCard = ({
    value,
    label,
    percentage,
}: {
    value: number | string;
    label: string;
    percentage: string;
}) => (
    <Card className="p-3 bg-orange-300 text-white h-full flex justify-between items-center">
        <div className="flex items-start flex-col justify-between h-full">
            <div className="icon bg-black shadow text-center rounded-full p-2">
                <LinkIcon className="text-dark text-gradient" />
            </div>
            <div>
                <h5 className="font-bold mb-0">{value}</h5>
                <span className="text-sm">{label}</span>
            </div>
        </div>
        <p className="text-sm font-bold">{percentage}</p>
    </Card>
);

const ProgressBar = ({
    label,
    width,
}: {
    label: string;
    width: string;
}) => (
    <div className="mb-4 h-full">
        <p className="text-sm mb-2">{label}</p>
        <div className="w-full bg-gray-200 rounded h-[6px]">
            <div
                className="bg-blue-500 h-[6px] rounded"
                style={{ width }}
            ></div>
        </div>
    </div>
);

const Page = () => {
    const { astId } = useParams();
    const [data, setData] = useState<any>(null);
    const [assistant, setAssistant] = useState<Assistant | null>(null);
    const [loading, setLoading] = useState(true);
    const route = useRouter();

    const { setSelectedItem, setSelectedMenu } = useHeaderContext();

    useEffect(() => {
        setSelectedItem('ChatBot');
        setSelectedMenu('Monitor');
    }, [setSelectedItem, setSelectedMenu]);

    useEffect(() => {
        if (astId !== 'defaultThread') {
            const fetchData = async () => {
                setLoading(true);
                try {
                    const response = await getThreadsByAssistantId(astId as string);
                    const assistantData = await getAssistantById(astId as string);
                    setAssistant(assistantData?.data[0]);
                    setData(response);
                } catch (error) {
                    console.error('Error fetching threads:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        } else {
            setLoading(false);
        }
    }, [astId]);

    if (loading) return <div>Loading...</div>;

    if (astId === 'defaultThread') {
        route.push('/overview/dashbored/bots');
    }

    return (
        <div className="h-full w-full flex flex-col">
            <div>
                <BasicLineChart threadData={data?.data || []} />
            </div>
            <div className="w-full border-b-2 border-primary"></div>
            <div className="flex-grow p-4 flex gap-4 pb-20">
                <div className="grid grid-cols-2 gap-4 h-full flex-1">
                    <StatisticCard value={data?.data?.length || 0} label="Created Threads" percentage="+55%" />
                    <StatisticCard value="1200" label="Projects" percentage="+40%" />
                    <StatisticCard value="750" label="Tasks" percentage="+20%" />
                    <StatisticCard value="950" label="Sales" percentage="+30%" />
                </div>
                <div className="h-full flex-1">
                    <Card className="h-full">
                        <CardContent>
                            <div className="">
                                <p className=' font-bold my-4'>Reviews</p>
                            </div>
                            <ProgressBar label="Positive Reviews" width="70%" />
                            <ProgressBar label="Neutral Reviews" width="20%" />
                            <ProgressBar label="Negative Reviews" width="10%" />
                        </CardContent>
                        <CardFooter>
                            <p className=' text-sm '>More than 1,500,000 developers used Creative Tim's products and over 700,000 projects were created.</p>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Page;