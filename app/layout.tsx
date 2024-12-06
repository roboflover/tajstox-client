"use client";

import localFont from "next/font/local";
import "./globals.css";
import { ParticlesContainer } from "./components/Particles";
import React from "react";
import MonetizationOn from '@mui/icons-material/MonetizationOn';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import HandshakeIcon from '@mui/icons-material/Handshake';
import { ScoreProvider } from './contex/ScoreContext';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { TokenProvider } from './contex/TokenContext';
import Link from 'next/link';

// Массив иконок
const icons = [
  AccountBalanceWalletIcon,
  HandshakeIcon,
  SportsEsportsIcon,
  MonetizationOn,
  RocketLaunchIcon,
];

const pages = ['Wallet', 'Team', 'Game', 'Сoins', 'Bonus']
const links = ['/wallet', '/team', '/', '/coins', '/bonus']

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
<TokenProvider>
  <ScoreProvider>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <ParticlesContainer />
        {children}
        {/* Нижнее меню */}
        <div
          style={{ left: '15px', right: '15px' }}
          className="absolute bottom-4 transform translate-x-0 bg-gray-800 rounded-full shadow-md p-4 flex justify-between z-10"
        >
        {pages.map((text, index) => {
          const IconComponent = icons[index];
          const isGame = text === 'Game'; // Условие для кнопки Game
          return (
            <React.Fragment key={index}>
              <div className="flex items-center">
                <div className={`flex flex-col items-center ${isGame ? 'relative' : ''}`}>
                  {isGame && (
                    <div className="absolute w-16 h-16 bg-blue-400 bg-opacity-50 rounded-full -z-10" /> // Голубой полупрозрачный кружок
                  )}
                  <Link href={links[index]} className="text-white text-center mt-2 mx-0 hover:text-gray-400">
                    <IconComponent sx={{ color: "white", pointerEvents: "none" }} />
                  </Link>
                  <p className="text-sm">{text}</p>
                </div>
              </div>
            </React.Fragment>
          );
        })}
        </div>
      </body>
    </html>
  </ScoreProvider>
</TokenProvider>
  );
}
