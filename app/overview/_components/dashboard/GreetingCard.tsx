import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";

function GreetingCard() {
  const [time, setTime] = useState<string>("");

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return "Good Morning";
    } else if (hour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  useEffect(() => {
    const updateTime = () => {
      const currentTime = new Date().toLocaleTimeString();
      setTime(currentTime);
    };

    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Card className="relative shadow-lg rounded-xl border border-gray-200 bg-gradient-to-r from-indigo-400 to-pink-500">
      <CardHeader className="py-8 px-6  text-white rounded-t-lg">
        <CardTitle className="text-3xl font-bold text-left">
          {getGreeting()}
        </CardTitle>
        <p className="text-sm text-left mt-2 text-white">Have a great day ahead!</p>
      </CardHeader>
      
      <CardContent className="p-6 text-xl text-gray-800">
        <div className="mt-10 text-5xl font-light text-white">
          {time}
        </div>
      </CardContent>

      <div className="absolute h-80 w-80 right-6 -top-12">
          <Image
            src="/customer.png"
            alt="Greeting Image"
            width={2000}
            height={2000}
          />
        </div>
    </Card>
  );
}

export default GreetingCard;