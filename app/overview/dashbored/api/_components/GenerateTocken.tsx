"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getAstInfo, integrateChannelsAPI } from "@/lib/api";
import { useAstContext } from "@/context/AstContext"; // Import the context hook

interface AstInfo {
  api_token: string;
  astName: string;
}

interface ApiResponse {
  status: boolean;
  message: string;
  data: AstInfo[];
}

interface IntegrationResponse {
  message: string;
  data: string; 
}

const formSchema = z.object({
  assId: z.string().min(2, {
    message: "assId must be at least 2 characters.",
  }),
});

export function GenerateTocken() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      assId: "",
    },
  });

  const { setAstInfo, setApiResponse } = useAstContext();

  const onSubmit = async (data: { assId: string }) => {
    try {
      console.log("Submitted assId:", data.assId);
      const astInfoResponse: ApiResponse = await getAstInfo(data.assId);
      const { astName, api_token } = astInfoResponse.data[0];

      console.log("Retrieved astName and apiToken:", { astName, api_token });

      setAstInfo({ astName, api_token });
      
      const integrationResponse: IntegrationResponse = await integrateChannelsAPI(astName, api_token);
      console.log("Integration Successful:", integrationResponse);
      setApiResponse({
        status: true,
        message: "Data fetched successfully",
        data: integrationResponse.data,
      });
    } catch (error) {
      console.error("Error in API flow:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="assId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assignment ID</FormLabel>
              <FormControl>
                <Input placeholder="Enter assignment ID" {...field} />
              </FormControl>
              <FormDescription>
                Enter the assignment ID to generate a token.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Generate Token</Button>
      </form>
    </Form>
  );
}