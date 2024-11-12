import { useEffect } from "react";
import axios from "axios";

/* eslint-disable @typescript-eslint/no-explicit-any */

export const TelegramAuth = () => {
  
  useEffect(() => {
    
    const user = (window as any).Telegram.WebAppUser; // Получение данных из Telegram Web App
    console.log(user)
    async function sendUserData() {
      try {
        await axios.post("http://localhost:3000/users", user);
      } catch (error) {
        console.error("Error sending user data:", error);
      }
    }

    if (user) {
      sendUserData();
    }
  }, []);

return (
  <div className="h-screen flex items-center justify-center bg-gray-50">
    <h1 className="text-4xl font-bold">Welcome to Telegram Mini App</h1>
  </div>
);
};


