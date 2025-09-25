import { useState } from 'react'
import Layout from '../components/Layout'

export default function SimpleTest() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [articles, setArticles] = useState([])

  const generateContent = async () => {
    setLoading(true)
    setResult(null)
    
    try {
      console.log('🔄 Sending request...')
      const response = await fetch('/api/generate-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      console.log('📡 Response status:', response.status)
      const data = await response.json()
      console.log('📦 Response data:', data)
      
      setResult(data)
      
      // If successful, add to articles list
      if (data.success && data.article) {
        setArticles(prev => [data.article, ...prev])
      }
      
    } catch (error) {
      console.error('💥 Fetch error:', error)
      setResult({ 
        error: error.message,
        message: 'Network request failed'
      })
    }
    setLoading(false)
  }

  return (
    <Layout title="Simple Test - AIToolHub">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Simple AI Content Test</h1>
        
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <p>This is a simplified test that bypasses all complex logic.</p>
        </div>
        
        <button 
          onClick={generateContent}
          disabled={loading}
          className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 disabled:bg-gray-400 mb-6"
        >
          {loading ? '🔄 Generating...' : '🚀 Generate AI Content'}
        </button>

        {/* Result Display */}
        {result && (
          <div className={`p-4 rounded-lg mb-6 ${
            result.success ? 'bg-green-100 border border-green-300' : 'bg-red-100 border border-red-300'
          }`}>
            <h3 className="font-bold text-lg mb-2">
              {result.success ? '✅ SUCCESS!' : '❌ ERROR'}
            </h3>
            <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}

        {/* Generated Articles List */}
        {articles.length > 0 && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-3">📚 Generated Articles ({articles.length})</h3>
            {articles.map((article, index) => (
              <div key={article.id} className="bg-white p-4 rounded border mb-3">
                <h4 className="font-semibold text-blue-600">{article.title}</h4>
                <p className="text-gray-600 text-sm mt-1">{article.summary}</p>
                <div className="text-xs text-gray-500 mt-2">
                  ID: {article.id} | Category: {article.category} | Date: {article.date}
                </div>
                <div className="mt-2 text-sm bg-yellow-50 p-2 rounded">
                  <strong>Content Preview:</strong>
                  <div className="mt-1 line-clamp-2">{article.content}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Debug Info */}
        <div className="mt-6 bg-gray-100 p-4 rounded-lg text-sm">
          <h4 className="font-semibold">🔧 Debug Information:</h4>
          <ul className="mt-2 space-y-1">
            <li>• API Endpoint: /api/generate-content</li>
            <li>• Method: POST</li>
            <li>• Articles in state: {articles.length}</li>
            <li>• Last update: {new Date().toLocaleTimeString()}</li>
          </ul>
        </div>
      </div>
    </Layout>
  )
    }
