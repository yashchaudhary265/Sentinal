// context/AstContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define types for AstInfo and ApiResponse
interface AstInfo {
  astName: string;
  api_token: string;
}

interface ApiResponse {
  status: boolean;
  message: string;
  data: string;
}

interface AstContextType {
  astInfo: AstInfo | null;
  apiResponse: ApiResponse | null;
  setAstInfo: (astInfo: AstInfo) => void;
  setApiResponse: (apiResponse: ApiResponse) => void;
}

const AstContext = createContext<AstContextType | undefined>(undefined);

export const AstProvider = ({ children }: { children: ReactNode }) => {
  const [astInfo, setAstInfo] = useState<AstInfo | null>(null);
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);

  return (
    <AstContext.Provider value={{ astInfo, apiResponse, setAstInfo, setApiResponse }}>
      {children}
    </AstContext.Provider>
  );
};

export const useAstContext = (): AstContextType => {
  const context = useContext(AstContext);
  if (!context) {
    throw new Error("useAstContext must be used within an AstProvider");
  }
  return context;
};