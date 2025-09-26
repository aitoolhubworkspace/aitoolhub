import Layout from '../../components/Layout'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

export default function Article() {
  const router = useRouter()
  const { id } = router.query
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      fetchArticle(id)
    }
  }, [id])

  const fetchArticle = async (articleId) => {
    try {
      setLoading(true)
      
      // Try to get article from API first
      const response = await fetch(`/api/get-article?id=${articleId}`)
      if (response.ok) {
        const data = await response.json()
        if (data.article) {
          setArticle(data.article)
          setLoading(false)
          return
        }
      }
      
      // If API fails, try default articles
      const defaultArticles = [
        {
          id: 'chatgpt-vs-claude-comparison',
          title: 'ChatGPT vs Claude: Which AI Assistant Dominates in 2024?',
          content: 'Comprehensive comparison article coming soon...',
          category: 'AI Comparisons',
          date: '2024-01-15',
          tags: ['chatgpt', 'claude', 'ai-assistants', 'comparison']
        },
        {
          id: 'best-free-ai-tools', 
          title: '27 Best Free AI Tools You Should Be Using in 2024',
          content: 'Free AI tools guide coming soon...',
          category: 'AI Tools',
          date: '2024-01-14',
          tags: ['free-tools', 'ai-apps', 'productivity']
        }
      ]
      
      const foundArticle = defaultArticles.find(a => a.id === articleId)
      setArticle(foundArticle || null)
      
    } catch (error) {
      console.error('Error fetching article:', error)
      setArticle(null)
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto p-8 text-center">
          <div className="text-2xl font-bold text-gray-600">Loading Article...</div>
          <div className="mt-4 text-gray-500">Fetching the latest AI-generated content</div>
        </div>
      </Layout>
    )
  }

  if (!article) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto p-8 text-center">
          <div className="text-2xl font-bold text-gray-600">Article Not Found</div>
          <div className="mt-4 text-gray-500">
            The article "{id}" doesn't exist yet. Try generating it first.
          </div>
          <a href="/simple-test" className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded">
            Generate Articles
          </a>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title={`${article.title} - AIToolHub`}>
      <article className="max-w-4xl mx-auto p-4">
        <header className="mb-8">
          <nav className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            <a href="/" className="hover:text-blue-600">Home</a> / {article.category}
          </nav>
          
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {article.title}
          </h1>
          
          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
            <span>Published: {article.date}</span>
            <span>•</span>
            <span>Category: {article.category}</span>
          </div>
        </header>

        <div className="prose prose-lg dark:prose-invert max-w-none article-content">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
            <strong>🤖 AI-Generated Content:</strong> This article was automatically created by our AI system and is regularly updated.
          </div>
          
          <div className="whitespace-pre-wrap">{article.content}</div>
        </div>

        <footer className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap gap-2">
            {article.tags && article.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                #{tag}
              </span>
            ))}
          </div>
        </footer>
      </article>
    </Layout>
  )
}

// Remove getStaticPaths and getStaticProps to make page dynamic
export async function getServerSideProps({ params }) {
  // This function runs on every request, making the page dynamic
  return {
    props: {} // We'll fetch data client-side
  }
  }
