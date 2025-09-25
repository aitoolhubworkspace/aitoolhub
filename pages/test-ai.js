import { useState } from 'react'
import Layout from '../components/Layout'

export default function TestAI() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const generateContent = async () => {
    setLoading(true)
    setResult(null)
    
    try {
      const response = await fetch('/api/generate-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      const data = await response.json()
      setResult(data)
      
    } catch (error) {
      setResult({ 
        error: error.message,
        message: 'Network error. Check if the API route exists.' 
      })
    }
    setLoading(false)
  }

  return (
    <Layout title="Test AI - AIToolHub">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Test AI Content Generation</h1>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
          <p className="text-blue-800 dark:text-blue-200">
            <strong>Note:</strong> This will trigger the AI to generate new content using your Groq API key.
          </p>
        </div>
        
        <button 
          onClick={generateContent}
          disabled={loading}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400 mb-4"
        >
          {loading ? '🤖 AI is Generating Content...' : '🚀 Generate AI Content Now'}
        </button>

        {result && (
          <div className={`mt-6 p-4 rounded-lg ${
            result.success ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'
          }`}>
            <h3 className="font-semibold mb-2">
              {result.success ? '✅ Success!' : '❌ Error'}
            </h3>
            <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
        
        <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h3 className="font-semibold mb-2">Troubleshooting:</h3>
          <ul className="text-sm list-disc list-inside space-y-1">
            <li>Make sure GROQ_API_KEY is set in Vercel environment variables</li>
            <li>Redeploy after adding environment variables</li>
            <li>Check Vercel logs for detailed errors</li>
          </ul>
        </div>
      </div>
    </Layout>
  )
}
