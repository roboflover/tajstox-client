import Mysvg from "./venom.svg";

const Wallet: React.FC = () => {
    return (
        <div>
            <div className="flex justify-center items-center">
                <button className="flex items-center px-6 py-3 font-semibold text-white rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-300 mt-20 space-x-2">
                    {/* Иконка */}
                    <Mysvg width={22} height={28} />
                    {/* Текст */}
                    <span>Connect Wallet</span>
                </button>
            </div>
        </div>
    );
};

export default Wallet;
