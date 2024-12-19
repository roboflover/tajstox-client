import { init } from "next/dist/compiled/webpack/webpack";

declare global {
    interface Window {
      Telegram: {
        WebApp: {
          close: () => void;
          initData: string;
          shareText?: (text: string) => void; 
          [key: string]: any;
          // Добавьте другие методы и свойства, которые вам нужны
        };
      };
    }
  }
  
  export {};
  