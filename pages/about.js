import Layout from '../components/Layout'

export default function About() {
  return (
    <Layout title="About - AIToolHub">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">About AIToolHub</h1>
        
        <div className="prose prose-lg dark:prose-invert">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6">
            <p className="text-lg font-semibold">🚀 Fully Autonomous AI-Powered Content Platform</p>
          </div>
          
          <h2>What We Do</h2>
          <p>AIToolHub is an innovative platform that automatically generates high-quality content about AI tools, technology, and innovations using advanced artificial intelligence.</p>
          
          <h2>How It Works</h2>
          <ul>
            <li>🤖 AI scans trending topics daily</li>
            <li>📝 Generates comprehensive articles automatically</li>
            <li>🔍 Optimizes content for search engines</li>
            <li>🔄 Updates and improves content continuously</li>
          </ul>
          
          <h2>Our Mission</h2>
          <p>To provide the most up-to-date, accurate, and valuable information about AI tools and technology, completely autonomously.</p>
          
          <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Note:</strong> This website and all its content are generated and maintained automatically by AI systems.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}
