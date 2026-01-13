import Link from "next/link";
import Image from "next/image";
import { SparklesIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <div className="flex-grow flex flex-col items-center justify-center p-4">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto text-center py-20">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-75 animate-pulse"></div>
              <div className="relative bg-gray-900 rounded-full p-4">
                 <SparklesIcon className="h-16 w-16 text-purple-400" />
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Magic To Do
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Organize your life with the power of Web3. <br/>
            Secure, private, and powered by crypto.
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <Link
              href="/todo"
              className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-purple-600 font-lg rounded-full hover:bg-purple-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-600 focus:ring-offset-gray-900"
            >
              <span>Enter App</span>
              <svg className="w-5 h-5 ml-2 -mr-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </Link>
          </div>
        </section>

        {/* Features Grid */}
        <section className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 hover:border-purple-500/50 transition-colors">
              <h3 className="text-xl font-bold mb-2 text-purple-400">Pay-to-Access</h3>
              <p className="text-gray-400">One-time micro-payment unlocks the full suite of tools.</p>
           </div>
           <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 hover:border-purple-500/50 transition-colors">
              <h3 className="text-xl font-bold mb-2 text-pink-400">Wallet Identity</h3>
              <p className="text-gray-400">Your todos are linked to your wallet address. No email needed.</p>
           </div>
           <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 hover:border-purple-500/50 transition-colors">
              <h3 className="text-xl font-bold mb-2 text-blue-400">Multi-Chain</h3>
              <p className="text-gray-400">Support for Base (EVM) and Solana payments.</p>
           </div>
        </section>
      </div>

      <footer className="py-8 text-center text-sm text-gray-600 border-t border-gray-800">
        <p>© 2024 Magic To Do. Powered by xCreator402.</p>
      </footer>
    </div>
  );
}
