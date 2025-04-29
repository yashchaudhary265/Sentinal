// contexts/HeaderContext.tsx

import React, { createContext, useState, ReactNode, useContext } from "react";

interface HeaderContextType {
  selectedItem: string;
  selectedMenu: string;
  setSelectedItem: (item: string) => void;
  setSelectedMenu: (menu: string) => void;
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export const HeaderProvider = ({ children }: { children: ReactNode }) => {
  const [selectedItem, setSelectedItem] = useState<string>("ChatBots");
  const [selectedMenu, setSelectedMenu] = useState<string>("Bots");

  return (
    <HeaderContext.Provider value={{ selectedItem, selectedMenu, setSelectedItem, setSelectedMenu }}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeaderContext = (): HeaderContextType => {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error("useHeaderContext must be used within a HeaderProvider");
  }
  return context;
};