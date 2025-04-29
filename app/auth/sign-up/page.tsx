"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import OTPConfirmation from "./_components/Otp";
import SignUpForm from "./_components/SignUp";
import Link from "next/link";

export default function SignUp() {
    const [isSignUpSuccessful, setIsSignUpSuccessful] = useState(false);
    const [email, setEmail] = useState<string | null>(null);

    const handleSignUpSuccess = (email: string) => {
        setEmail(email);
        setIsSignUpSuccessful(true);
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <Card className="mb-0 sm:mb-40 w-full max-w-sm shadow-md border rounded-lg">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-semibold">
                        {isSignUpSuccessful ? "Confirm Your Account" : "Sign Up for Sentinel"}
                    </CardTitle>
                    <p className="text-sm font-normal text-gray-500 mt-2">
                        {isSignUpSuccessful ? "Enter the code sent to your email." : "Create an account to get started."}
                    </p>
                </CardHeader>

                {!isSignUpSuccessful ? (
                    <>
                        <CardContent>
                            <SignUpForm onSignUpSuccess={handleSignUpSuccess} />
                        </CardContent>
                        
                        <div className="text-center my-4 flex flex-col items-center gap-1">
                            <p className="text-sm text-gray-500 leading-none">Already have an account ?</p>
                            <Link href="/auth/sign-in" className="text-blue-700 text-[13px] no-underline hover:underline">
                                Continue to Your Account
                            </Link>
                        </div>
                    </>
                ) : (
                    <CardContent>
                        <OTPConfirmation email={email!} />
                    </CardContent>
                )}
            </Card>
        </div>
    );
}