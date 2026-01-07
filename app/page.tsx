import Link from "next/link";
import Image from "next/image";
import { DocumentTextIcon, MicrophoneIcon, VideoCameraIcon, SparklesIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900 flex flex-col">
      <div className="flex-grow">
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-4 py-12 lg:py-20">
          <div className="text-center">
            <div className="mb-6">
              <Image
                src="/x402-logo-dark.png"
                alt="x402 logo"
                width={320}
                height={160}
                className="mx-auto"
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              xCreator402
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              A Web3 platform for creators to monetize premium content with X402 Protocol.
              Support for EVM/Base and Solana networks.
            </p>
          </div>
        </section>

        {/* Content Categories */}
        <section className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Explore Premium Content
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link
              href="/articles"
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-8 group"
            >
              <DocumentTextIcon className="h-16 w-16 text-green-600 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Articles</h3>
              <p className="text-gray-600 mb-4">
                Pay-per-view articles on Web3, blockchain, and creator economy
              </p>
              <div className="text-blue-600 font-semibold">Browse Articles →</div>
            </Link>

            <Link
              href="/podcasts"
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-8 group"
            >
              <MicrophoneIcon className="h-16 w-16 text-purple-600 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Podcasts</h3>
              <p className="text-gray-600 mb-4">
                Exclusive audio content and interviews with industry leaders
              </p>
              <div className="text-blue-600 font-semibold">Listen Now →</div>
            </Link>

            <Link
              href="/videos"
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-8 group"
            >
              <VideoCameraIcon className="h-16 w-16 text-red-600 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Videos</h3>
              <p className="text-gray-600 mb-4">
                Educational video tutorials on blockchain and smart contracts
              </p>
              <div className="text-blue-600 font-semibold">Watch Videos →</div>
            </Link>
          </div>
        </section>

        {/* Creator Section */}
        <section className="max-w-6xl mx-auto px-4 py-12">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-xl p-8 md:p-12 text-white">
            <div className="flex items-center gap-3 mb-4">
              <SparklesIcon className="h-8 w-8" />
              <h2 className="text-3xl font-bold">Are you a creator?</h2>
            </div>
            <p className="text-xl mb-6 text-blue-50">
              Start monetizing your content with X402 Protocol. Accept payments in
              USDC on Base and Solana networks.
            </p>
            <Link
              href="/creator"
              className="inline-block bg-white text-blue-600 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Go to Creator Dashboard
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Why X402 Protocol?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-bold text-gray-900 mb-2">Multi-Chain</h3>
              <p className="text-gray-600 text-sm">
                Support for EVM (Base) and Solana networks
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-bold text-gray-900 mb-2">Instant Payments</h3>
              <p className="text-gray-600 text-sm">
                Seamless micropayments with low transaction fees
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-bold text-gray-900 mb-2">No Middlemen</h3>
              <p className="text-gray-600 text-sm">
                Direct payments from consumers to creators
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-bold text-gray-900 mb-2">Easy Integration</h3>
              <p className="text-gray-600 text-sm">
                Simple setup with Next.js middleware
              </p>
            </div>
          </div>
        </section>

        {/* Demo Section */}
        <section className="max-w-6xl mx-auto px-4 py-12">
          <div className="bg-gray-800 text-white rounded-lg shadow-xl p-8">
            <h2 className="text-2xl font-bold mb-4">Technical Demo</h2>
            <p className="text-gray-300 mb-6">
              Explore the original X402 protocol demos
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/protected"
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-mono transition-colors"
              >
                Protected page
              </Link>
              <Link
                href="/api/weather"
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-mono transition-colors"
              >
                Protected API
              </Link>
            </div>
          </div>
        </section>
      </div>
      <footer className="py-8 text-center text-sm text-gray-500">
        By using this site, you agree to be bound by the{" "}
        <a
          href="https://www.coinbase.com/legal/developer-platform/terms-of-service"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500"
        >
          CDP Terms of Service
        </a>{" "}
        and{" "}
        <a
          href="https://www.coinbase.com/legal/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500"
        >
          Global Privacy Policy
        </a>
        .
      </footer>
    </div>
  );
}

