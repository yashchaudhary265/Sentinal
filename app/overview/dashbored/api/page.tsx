"use client"
import React, { useEffect } from 'react';
import { GenerateTocken } from './_components/GenerateTocken';
import { Card } from '@/components/ui/card';
import IntegrationSection from './_components/IntegrationSection';
import { CardContent } from '@mui/material';
import AstInfos from './_components/AstInfos';
import { useHeaderContext } from '@/context/HeaderContext';

type Props = {};

const Page = (props: Props) => {
    const { setSelectedItem, setSelectedMenu } = useHeaderContext();

    useEffect(() => {
        setSelectedItem("Api");
        setSelectedMenu("Api");
    }, [setSelectedItem, setSelectedMenu]);

    return (
        <div className="grid grid-cols-2 gap-4 h-full p-4">
            <Card>
                <CardContent>
                    <GenerateTocken />
                    <div className="">
                        <AstInfos />
                    </div>
                </CardContent>
            </Card>
            <Card className="overflow-auto">
                <CardContent>
                    <IntegrationSection />
                </CardContent>
            </Card>
        </div>
    );
};

export default Page;