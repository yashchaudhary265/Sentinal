"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
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
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox"; // Import Checkbox
import { updateAssistant } from "@/lib/api";
import DropzoneCard from "../../createBot/_components/FileDrop";
import { CardContent } from "@/components/ui/card";

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

const requestSchema = z.object({
  astName: z.string().nonempty({ message: "Name is required" }),
  astInstruction: z.string().nonempty({ message: "Instruction is required" }),
  gptModel: z.string().nonempty({ message: "GPT Model is required" }),
  files: z.array(z.any()).optional(),
  astTools: z.array(z.string()).min(1, { message: "At least one tool is required" }),
});

interface RequestFormProps {
  onRequestSuccess: (data: any) => void;
  assistant: Assistant;
}

const AssistantForm = ({ onRequestSuccess, assistant }: RequestFormProps) => {
  const requestForm = useForm({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      astId: assistant.astId, 
      astName: assistant.astName || "",
      astInstruction: assistant.astInstruction || "",
      gptModel: "gpt-4o-mini",
      files: [],
      astTools: assistant.astTools, 
    },
  });

  const handleRequest: SubmitHandler<any> = async (data) => {
    console.log("Submitted Data:", data);

    try {
      const result = await updateAssistant(assistant.astId, data.astName, data.astInstruction, data.gptModel, data.astTools);
      console.log("Assistant updated:", result);
      toast.success("Success!", {
        description: "Your request has been processed successfully.",
      });
      onRequestSuccess(data);
    } catch (error) {
      console.error("Error during API request:", error);
    }
  };

  function handleFilesAdded(files: File[]): void {
    throw new Error("Function not implemented.");
  }

  return (
    <CardContent className="">
      <Form {...requestForm}>
        <form onSubmit={requestForm.handleSubmit(handleRequest)} className="grid gap-4">
          <FormField
            control={requestForm.control}
            name="astName"
            render={({ field }) => (
              <FormItem className="flex flex-row justify-between items-center">
                <div className="flex-1 p-2">
                  <FormLabel>Name</FormLabel>
                  <FormDescription>Enter the name of the assistant you are going to create or call.</FormDescription>
                </div>
                <div className="flex-1 p-2 pr-20">
                  <FormControl>
                    <Input {...field} placeholder={assistant.astName} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <hr className="px-4" />

          <FormField
            control={requestForm.control}
            name="astInstruction"
            render={({ field }) => (
              <FormItem className="flex flex-row justify-between items-center">
                <div className="flex-1 p-2">
                  <FormLabel>Instructions</FormLabel>
                  <FormDescription>Provide specific instructions for the assistant.</FormDescription>
                </div>
                <div className="flex-1 p-2 pr-20">
                  <FormControl>
                    <Input {...field} placeholder={assistant.astInstruction} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <hr className="px-4" />

          <FormField
            control={requestForm.control}
            name="gptModel"
            render={({ field }) => (
              <FormItem className="flex flex-row justify-between items-center">
                <div className="flex-1 p-2">
                  <FormLabel>GPT Model</FormLabel>
                  <FormDescription>Select the GPT model you would like to use.</FormDescription>
                </div>
                <div className="flex-1 p-2 pr-20">
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder={assistant.gptModel} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt-4o">gpt-4o</SelectItem>
                        <SelectItem value="gpt-4o-mini">gpt-4o-mini</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <hr className="px-4" />

          <FormItem className="flex flex-row justify-between items-center">
            <div className="flex-1 p-2">
              <FormLabel>Files</FormLabel>
              <FormDescription>Upload any files required for this assistant.</FormDescription>
            </div>
            <div className="flex-1 p-2 pr-20">
              <FormControl>
                <DropzoneCard onFilesAdded={handleFilesAdded} />
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
          <hr className="px-4" />

          <FormField
            control={requestForm.control}
            name="astTools"
            render={({ field }) => (
              <FormItem className="flex flex-row justify-between items-center">
                <div className="flex-1 p-2">
                  <FormLabel>Tools</FormLabel>
                  <FormDescription>Select one or more tools available for the assistant.</FormDescription>
                </div>
                <div className="flex-1 p-2 pr-20">
                  <FormControl>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={field.value.includes("code_interpreter")}
                          onCheckedChange={(checked) => {
                            const newTools = checked
                              ? [...field.value, "code_interpreter"]
                              : field.value.filter((tool) => tool !== "code_interpreter");
                            field.onChange(newTools);
                          }}
                        />
                        <label>Code Interpreter</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={field.value.includes("file_search")}
                          onCheckedChange={(checked) => {
                            const newTools = checked
                              ? [...field.value, "file_search"]
                              : field.value.filter((tool) => tool !== "file_search");
                            field.onChange(newTools);
                          }}
                        />
                        <label>File Search</label>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <hr className="px-4" />

          <Button type="submit" className="mt-4 rounded-xl">
            Update The Bot
          </Button>
        </form>
      </Form>
    </CardContent>
  );
};

export default AssistantForm;