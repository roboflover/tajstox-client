import React, { useEffect } from 'react';

const TelegramAuth: React.FC = () => {
  useEffect(() => {
    // This code will only run in the browser
    if (typeof window !== 'undefined' && typeof window.Telegram !== 'undefined') {
      const tgInfo = window.Telegram.WebApp.initData;
      console.log(tgInfo);
    }
  }, []); // Empty dependency array ensures this runs once after initial render

  return (
    <div className="">
      {/* Your component content */}
    </div>
  );
};

export default TelegramAuth;
