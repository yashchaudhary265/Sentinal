"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function ModeToggle() {
  const { setTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = React.useState<boolean>(true);

  React.useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains("dark"));
  }, []);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
    setTheme(isDarkMode ? "light" : "dark");
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch id="theme-toggle" checked={isDarkMode} onCheckedChange={handleToggle} />
      <Label htmlFor="theme-toggle">
        {isDarkMode ? "Dark Mode" : "Light Mode"}
      </Label>
    </div>
  );
}

// import * as React from "react"
// import { Moon, Sun } from "lucide-react"
// import { useTheme } from "next-themes"

// import { Button } from "@/components/ui/button"

// export function ModeToggle() {
//   const { setTheme } = useTheme()

//   const [mode, setMode] = React.useState<string>('dark');

//   const handleMode = () =>{
//     if(mode === 'dark'){
//         setMode("light")
//     }
//     else{
//         setMode("dark")
//     }

//     setTheme(mode);
//   }


//   return (
//         <Button variant="outline" className="rounded-full" size={'icon'} onClick={()=>handleMode()}>
//           <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
//           <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
//           <span className="sr-only">Toggle theme</span>
//         </Button>
//   )
// }
