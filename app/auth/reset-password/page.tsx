"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import OTPConfirmation from "./_componenets/OTPConfirmation";
import { initiatePasswordReset } from "@/lib/api";

const resetPasswordSchema = z
    .object({
        email: z.string().email({ message: "Invalid email address" }),
        newPassword: z
            .string()
            .min(6, { message: "Password must be at least 6 characters" }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

export default function ResetPasswordForm() {
    const [isSignUpSuccessful, setIsSignUpSuccessful] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const resetPasswordForm = useForm<FieldValues>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            email: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    const handleResetPassword: SubmitHandler<FieldValues> = async (data) => {
        try {
            const isSuccessful = true;
            if (isSuccessful) {
                setEmail(data.email);
                setPassword(data.newPassword);
                setIsSignUpSuccessful(true);
                await initiatePasswordReset(data.email);
                toast.success("Success!", {
                    description: "Check your email for the confirmation code.",
                });
            } else {
                toast.error("Error!", {
                    description: "An error occurred. Please try again later.",
                });
            }
        } catch (error) {
            toast.error("Error!", {
                description: "Unable to reset your password. Please try again.",
            });
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            {!isSignUpSuccessful ? (
                <Card className="mb-0 sm:mb-40 w-full max-w-sm shadow-md border rounded-lg p-8">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-semibold">
                            Create new Password
                        </CardTitle>
                        <p className="text-sm font-normal text-gray-500 mt-2">
                            Enter your email and new passowrd.
                        </p>
                    </CardHeader>

                    <Form {...resetPasswordForm}>
                        <form
                            onSubmit={resetPasswordForm.handleSubmit(handleResetPassword)}
                            className="grid gap-4"
                        >
                            <FormField
                                control={resetPasswordForm.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Email" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={resetPasswordForm.control}
                                name="newPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>New Password</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="password" placeholder="New Password" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={resetPasswordForm.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="password"
                                                placeholder="Confirm Password"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="mt-4 rounded-xl">
                                Reset Password
                            </Button>
                        </form>
                    </Form>
                </Card>
            ) : (
                <Card className="mb-0 sm:mb-40 w-full max-w-sm shadow-md border rounded-lg p-8">
                    <CardContent>
                        <OTPConfirmation email={email} newPassword={password} />
                    </CardContent>
                </Card>
            )}
        </div>
    );
}