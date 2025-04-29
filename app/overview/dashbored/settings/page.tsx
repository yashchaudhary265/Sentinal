'use client';

import { ModeToggle } from '@/components/shared/Mode';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useHeaderContext } from '@/context/HeaderContext';
import { Button, CardContent } from '@mui/material';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

type Props = {};

const Page = (props: Props) => {
    const { setSelectedItem, setSelectedMenu } = useHeaderContext();
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const storedUserEmail = localStorage.getItem('user_email');
        setUserName(storedUserEmail || 'user_name');
    }, []);

    useEffect(() => {
        setSelectedItem("Settings");
        setSelectedMenu("General");
    }, [setSelectedItem, setSelectedMenu]);

    return (
        <div className="w-full h-full p-6">
            <Card className="w-full h-full p-4 shadow-md">
                <CardContent className="grid gap-6 ">
                    {/* Account Section */}
                    <div className="grid grid-cols-2 gap-2 items-start justify-between pr-10">
                        <div className="flex flex-col">
                            <h2 className="text-base font-semibold">Account</h2>
                            <p className="text-xs text-gray-500 ">Manage your account settings here.</p>
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center gap-4">
                                <p className="font-medium text-sm w-[14%]">Email:</p>
                                <p className="text-gray-600 text-sm">
                                    {userName || 'example@example.com'}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-4">
                                    <p className="font-medium text-sm w-[14%]">Password:</p>
                                    <Link href={'/auth/reset-password'}>
                                        <Badge className="px-2 rounded-full text-xs cursor-pointer">
                                            Change Password
                                        </Badge>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="border-t border-gray-300" />

                    {/* Night Mode Section */}
                    <div className="grid grid-cols-2 gap-2 items-center justify-between pr-10">
                        <div className="flex flex-col">
                            <h2 className="text-base font-semibold">Night Mode</h2>
                            <p className="text-xs text-gray-500">Toggle dark mode for a better experience.</p>
                        </div>
                        <ModeToggle />
                    </div>
                    <hr className="border-t border-gray-300" />
                </CardContent>
            </Card>
        </div>
    );
};

export default Page;