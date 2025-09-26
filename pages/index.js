import Layout from '../components/Layout'
import { useState, useEffect } from 'react'

export default function Home() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch articles on component mount
  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    try {
      // First, try to get articles from our API
      const response = await fetch('/api/get-articles')
      if (response.ok) {
        const data = await response.json()
        setArticles(data.articles || data)
      } else {
        // Fallback to default articles
        setArticles(getDefaultArticles())
      }
    } catch (error) {
      // Fallback to default articles
      setArticles(getDefaultArticles())
    }
    setLoading(false)
  }

  const getDefaultArticles = () => {
    return [
      {
        id: 'chatgpt-vs-claude-comparison',
        title: 'ChatGPT vs Claude: Which AI Assistant Dominates in 2024?',
        summary: 'Comprehensive comparison of the two leading AI assistants. Performance, pricing, features, and use cases analyzed.',
        content: 'This article will be automatically generated and updated by our AI system. Check back soon for the full comparison!',
        category: 'AI Comparisons',
        date: '2024-01-15',
        tags: ['chatgpt', 'claude', 'ai-assistants', 'comparison']
      },
      {
        id: 'best-free-ai-tools',
        title: '27 Best Free AI Tools You Should Be Using in 2024',
        summary: 'Discover powerful free AI tools for writing, design, coding, and productivity. No credit card required.',
        content: 'Our AI is currently researching and writing this comprehensive guide to the best free AI tools available today.',
        category: 'AI Tools',
        date: '2024-01-14',
        tags: ['free-tools', 'ai-apps', 'productivity']
      }
    ]
  }

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-16">
          <div className="text-2xl font-bold text-gray-600">Loading AI Content...</div>
          <div className="mt-4 text-gray-500">Preparing the latest AI tools and insights for you</div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title="AIToolHub - Discover the Best AI Tools & Technology">
      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-lg mb-12">
        <h1 className="text-5xl font-bold mb-4">AI Tools Hub</h1>
        <p className="text-xl mb-8">Discover the Best AI Tools, Tutorials, and Technology Insights</p>
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 inline-block">
          <p className="text-lg">🚀 <strong>Auto-Updated Daily</strong> with New Articles</p>
          <p className="text-sm mt-2">Currently featuring {articles.length} AI-generated articles</p>
        </div>
      </section>

      {/* Featured Articles */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Latest AI Tools & Guides</h2>
        
        {articles.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-2xl text-gray-600">No articles yet</div>
            <p className="text-gray-500 mt-2">Generate your first AI article using the Test AI page</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <article key={article.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                    <a href={`/article/${article.id}`} className="hover:text-blue-600">
                      {article.title}
                    </a>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {article.summary}
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{article.category}</span>
                    <span>{article.date}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="mt-12 text-center">
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{articles.length}+</div>
              <div className="text-gray-600 dark:text-gray-300">AI Articles</div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">24/7</div>
              <div className="text-gray-600 dark:text-gray-300">Content Generation</div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">100%</div>
              <div className="text-gray-600 dark:text-gray-300">AI Powered</div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
    }
