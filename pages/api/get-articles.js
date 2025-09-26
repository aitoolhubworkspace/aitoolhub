// Simple in-memory storage for articles
let generatedArticles = []

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Return both default and generated articles
    const defaultArticles = [
      {
        id: 'chatgpt-vs-claude-comparison',
        title: 'ChatGPT vs Claude: Which AI Assistant Dominates in 2024?',
        summary: 'Comprehensive comparison of the two leading AI assistants.',
        content: 'Article content will be generated automatically.',
        category: 'AI Comparisons',
        date: '2024-01-15',
        tags: ['chatgpt', 'claude', 'ai-assistants']
      },
      {
        id: 'best-free-ai-tools',
        title: '27 Best Free AI Tools You Should Be Using in 2024',
        summary: 'Discover powerful free AI tools for various tasks.',
        content: 'Article content will be generated automatically.',
        category: 'AI Tools',
        date: '2024-01-14',
        tags: ['free-tools', 'ai-apps']
      }
    ]

    const allArticles = [...generatedArticles, ...defaultArticles]
    
    res.status(200).json({
      success: true,
      articles: allArticles,
      count: allArticles.length
    })
    
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
}

// Function to add articles (used by generate-content API)
export function addArticle(article) {
  generatedArticles.unshift(article)
  return generatedArticles
}

// Function to get all articles
export function getArticles() {
  return generatedArticles
}
