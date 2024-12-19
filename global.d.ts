import { init } from "next/dist/compiled/webpack/webpack";

declare global {
    interface Window {
      Telegram: {
        WebApp: {
          close: () => void;
          initData: string;
          // Добавьте другие методы и свойства, которые вам нужны
        };
      };
    }
  }
  
  export {};
  