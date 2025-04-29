"use client";
import { useAstContext } from "@/context/AstContext";
import React from "react";
import { CardContent } from "@/components/ui/card"; // Assuming you have card components for layout
import { Badge } from "@/components/ui/badge"; // Assuming you have a badge component for status

type Props = {};

const IntegrationSection = (props: Props) => {
    const { apiResponse } = useAstContext(); // Access context values

    return (
        <div className="space-y-4 text-xs overflow-auto">
            {apiResponse ? (
                <div className="bg-card text-card-foreground rounded-lg shadow-md">
                    <CardContent className="p-0">
                        <div className="flex items-center justify-between ">
                            <h3 className="text-xl font-semibold text-primary">Integration Status</h3>
                            <div>
                                <Badge color={apiResponse.status ? "success" : "error"} className={`text-xs ${apiResponse.status ? "bg-green-600" : "bg-red-600"}`}>
                                    {apiResponse.status ? "Success" : "Failed"}
                                </Badge>
                            </div>

                        </div>
                        <div className="space-y-3">

                            {apiResponse.data ? (
                                <div>
                                    <h4 className="font-semibold text-gray-700">API Data:</h4>
                                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto">{apiResponse.data}</pre>
                                </div>
                            ) : (
                                <p className="text-muted-foreground">No data available</p>
                            )}
                        </div>
                    </CardContent>
                </div>
            ) : (
                <div className="text-center text-gray-500">
                    <p>No API response available</p>
                </div>
            )}
        </div>
    );
};

export default IntegrationSection;