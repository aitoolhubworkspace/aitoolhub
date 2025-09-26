// Simple in-memory storage for articles (same as get-articles.js)
let generatedArticles = [
  {
    id: 'ai-tools-revolution-complete-2024-guide',
    title: 'AI Tools Revolution: Complete 2024 Guide',
    summary: 'Discover how AI tools are transforming industries and what you need to know to stay ahead.',
    content: `
# AI Tools Revolution: Complete 2024 Guide

## Introduction
Artificial Intelligence has become the most transformative technology of our generation. In 2024, AI tools are more accessible and powerful than ever before.

## Key Trends for 2024
- **Democratization of AI**: Tools are becoming more user-friendly
- **Multimodal Capabilities**: Text, image, audio, and video integration  
- **Real-time Processing**: Instant analysis and response
- **Customization**: AI models tailored to specific industries

## Top AI Tools to Watch
1. **ChatGPT-4** - Advanced conversational AI
2. **Midjourney** - Revolutionary image generation
3. **Claude** - Enterprise-grade AI assistant
4. **Google Bard** - Search-integrated AI

## Getting Started
To begin using AI tools effectively:
- Identify your specific needs
- Start with free tiers
- Experiment with different tools
- Stay updated with new developments

## Conclusion
The AI revolution is here to stay. Embracing these tools now will give you a significant advantage in the coming years.

*This content was generated automatically and is updated regularly.*
    `,
    category: 'AI Trends',
    date: new Date().toISOString().split('T')[0],
    tags: ['ai-revolution', '2024', 'trends']
  }
]

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { id } = req.query

  if (!id) {
    return res.status(400).json({ error: 'Article ID is required' })
  }

  try {
    // Find article in generated articles
    const article = generatedArticles.find(a => a.id === id)
    
    if (article) {
      return res.status(200).json({
        success: true,
        article: article
      })
    }

    // If not found in generated articles, check default articles
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

    const defaultArticle = defaultArticles.find(a => a.id === id)
    
    if (defaultArticle) {
      return res.status(200).json({
        success: true,
        article: defaultArticle
      })
    }

    // Article not found
    return res.status(404).json({
      success: false,
      error: 'Article not found'
    })

  } catch (error) {
    console.error('Error fetching article:', error)
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
