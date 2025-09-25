import Head from 'next/head'
import Link from 'next/link'

export default function Layout({ children, title = 'AIToolHub - AI Tools & Technology Hub' }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Discover the best AI tools, tutorials, and technology insights. Your ultimate AI tools hub." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="google-adsense-account" content="ca-pub-XXXXXXXXXXXX" />
      </Head>
      
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
                AIToolHub
              </Link>
              
              <nav className="flex space-x-8">
                <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">
                  Home
                </Link>
                <Link href="/categories" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">
                  Categories
                </Link>
                <Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">
                  About
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 py-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="text-center text-gray-600 dark:text-gray-300">
              <p>&copy; 2024 AIToolHub. All rights reserved.</p>
              <p className="mt-2">Powered by AI • Updated Automatically</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
