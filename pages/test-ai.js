import { useState } from 'react'
import Layout from '../components/Layout'

export default function TestAI() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const generateContent = async () => {
    setLoading(true)
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
      setResult({ error: error.message })
    }
    setLoading(false)
  }

  return (
    <Layout title="Test AI - AIToolHub">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Test AI Content Generation</h1>
        
        <button 
          onClick={generateContent}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? 'Generating...' : 'Generate AI Content'}
        </button>

        {result && (
          <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <pre className="text-sm">{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div>
    </Layout>
  )
          }
