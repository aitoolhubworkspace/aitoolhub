import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { getArticles } from '../lib/articles'

export default function ContentTest() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadArticles()
  }, [])

  const loadArticles = async () => {
    try {
      const articlesData = await getArticles()
      setArticles(articlesData)
    } catch (error) {
      console.error('Error loading articles:', error)
    }
    setLoading(false)
  }

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
      console.log('Generation result:', data)
      
      // Reload articles after generation
      await loadArticles()
    } catch (error) {
      console.error('Error generating content:', error)
    }
  }

  return (
    <Layout title="Content Test - AIToolHub">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Content Test Page</h1>
        
        <div className="mb-6">
          <button 
            onClick={generateContent}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
          >
            Generate New AI Content
          </button>
          <p className="text-sm text-gray-600 mt-2">Click to generate a new AI article</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Current Articles ({articles.length})</h2>
          {loading ? (
            <p>Loading articles...</p>
          ) : (
            <div className="space-y-4">
              {articles.map((article, index) => (
                <div key={article.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="font-semibold text-lg">{article.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">{article.summary}</p>
                  <div className="text-xs text-gray-500 mt-2">
                    ID: {article.id} | Category: {article.category} | Date: {article.date}
                  </div>
                  <div className="mt-2">
                    <strong>Content Preview:</strong>
                    <p className="text-sm mt-1 line-clamp-3">{article.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
              }
