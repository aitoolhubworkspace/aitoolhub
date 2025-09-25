import { generateAIContent, generateArticleIdeas } from './openai'
import { sampleArticles } from './articles'

// This simulates our AI content pipeline
export class ContentScheduler {
  constructor() {
    this.dailyTarget = 5
    this.generatedArticles = [...sampleArticles]
  }

  async generateDailyContent() {
    console.log('🚀 Starting daily content generation...')
    
    try {
      // Get trending topics
      const ideas = await generateArticleIdeas()
      const topics = ideas.ideas || ideas || []
      
      // Generate content for each topic
      for (let i = 0; i < Math.min(this.dailyTarget, topics.length); i++) {
        const topic = topics[i]
        if (!topic) continue

        console.log(`📝 Generating article: ${topic.title}`)
        
        const content = await generateAIContent(topic.title, 'comprehensive guide')
        
        if (content) {
          const newArticle = {
            id: this.generateSlug(topic.title),
            title: topic.title,
            summary: this.generateSummary(content),
            content: content,
            category: topic.category || 'AI Tools',
            date: new Date().toISOString().split('T')[0],
            tags: topic.keywords || []
          }
          
          this.generatedArticles.unshift(newArticle)
          console.log(`✅ Generated: ${topic.title}`)
        }
        
        // Add delay to avoid rate limiting
        await this.delay(2000)
      }
      
      console.log(`🎉 Daily content generation complete: ${this.generatedArticles.length} total articles`)
      return this.generatedArticles
      
    } catch (error) {
      console.error('Error in daily content generation:', error)
      return this.generatedArticles
    }
  }

  generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  generateSummary(content) {
    // Extract first 150 characters as summary
    return content.substring(0, 150) + '...'
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  getAllArticles() {
    return this.generatedArticles
  }

  getArticleById(id) {
    return this.generatedArticles.find(article => article.id === id)
  }
}

// Create singleton instance
export const contentScheduler = new ContentScheduler()
