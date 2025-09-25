import { contentScheduler } from './scheduler'

// Initial sample data
const initialArticles = [
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
  },
  {
    id: 'ai-for-beginners-guide',
    title: 'AI for Beginners: Complete Guide to Getting Started',
    summary: 'Step-by-step guide for absolute beginners. Learn how to use AI tools effectively from day one.',
    content: 'This beginner-friendly guide is being crafted by our AI to help newcomers navigate the world of artificial intelligence.',
    category: 'Tutorials',
    date: '2024-01-13',
    tags: ['beginners', 'tutorial', 'guide']
  },
  {
    id: 'midjourney-alternatives',
    title: 'Top 15 Midjourney Alternatives for AI Image Generation',
    summary: 'Explore the best Midjourney alternatives for creating stunning AI-generated images without limitations.',
    content: 'Our AI is compiling a detailed comparison of the top AI image generation tools available as alternatives to Midjourney.',
    category: 'AI Tools',
    date: '2024-01-12',
    tags: ['ai-art', 'image-generation', 'midjourney', 'dalle']
  },
  {
    id: 'ai-coding-assistants',
    title: 'Best AI Coding Assistants: GitHub Copilot vs Competitors',
    summary: 'Compare the top AI coding assistants to boost your programming productivity and code quality.',
    content: 'This comprehensive comparison of AI coding assistants is being generated to help developers choose the right tool.',
    category: 'AI Comparisons',
    date: '2024-01-11',
    tags: ['coding', 'programming', 'github-copilot', 'developers']
  }
]

// Initialize scheduler with sample data
initialArticles.forEach(article => {
  if (!contentScheduler.getArticleById(article.id)) {
    contentScheduler.generatedArticles.push(article)
  }
})

export async function getArticles() {
  // In production, this would trigger AI content generation
  // For now, return the current articles
  return contentScheduler.getAllArticles()
}

export async function getArticleById(id) {
  return contentScheduler.getArticleById(id)
}

export async function generateNewContent() {
  // This would be called by an automated scheduler
  return await contentScheduler.generateDailyContent()
}
