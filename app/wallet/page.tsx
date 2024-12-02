import Logobig from "./ton_logo_dark_background.svg";
import Logosmall from "./ton_symbol.svg"
import profilePic from '../logo.jpg'
import Image from 'next/image'

const Wallet: React.FC = () => {
    return (
        <div className="space-y-6 mt-20 mr-5 ml-5">  {/* Дополнительно добавили отступ между строками */}

            {/* Строка с первой криптовалютой */}
            <div className="flex justify-between items-center">
            <div className="flex items-center justify-start">    
                <span className="ml-6 font-semibold text-xl">Wallet</span>
            </div>
            <div className="text-right flex items-center">
                {/* Голубой кружочек */}
                <div 
                className="w-2 h-2 bg-blue-500 rounded-full mr-2"
                title="Blue circle"
                ></div>
                <span className="font-semibold text-xl">263</span>
            </div>
            </div>


            {/* Строка с первой криптовалютой */}
            <div className="flex justify-between items-center">
                <div className="flex items-center justify-start">
                    <Logobig />
                    <span className="ml-2 font-semibold"></span>
                </div>
                <div className="text-right">
                    <span className="font-semibold">0 TON</span>
                </div>
            </div>

            {/* Строка со свторой криптовалютой */}
            <div className="flex justify-between items-center">
                <div className="flex items-center ml-2 ">
                <Image
                        src={profilePic}
                        width={32}
                        height={32}
                        alt="Logo"
                        className='rounded-full ml-3'
                        />
                <span className="ml-2  font-semibold">TAJSTOX</span>
                </div>
                <div className="text-right">
                    <span className="font-semibold">0 TJX</span>
                </div>
            </div>

            {/* Существующая центральная кнопка */}
            <div className="flex justify-center items-center">
                <button className="flex items-center px-6 py-3 font-semibold text-white rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-300 mt-20 space-x-2">
                    {/* Иконка */}
                    <Logosmall />
                    {/* Текст */}
                    <span>Connect Wallet</span>
                </button>
            </div>
        </div>
    );
};

export default Wallet;
