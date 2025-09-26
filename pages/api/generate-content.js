import { addArticle } from './get-articles'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(200).json({ 
      message: 'Use POST to generate content',
      status: 'ready'
    })
  }

  try {
    console.log('🚀 Starting content generation...')
    
    const newArticle = {
      id: `article-${Date.now()}`,
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

    // Store the article so homepage can access it
    const allArticles = addArticle(newArticle)

    console.log('✅ Article generated and stored:', newArticle.title)
    
    res.status(200).json({
      success: true,
      message: 'Content generated successfully!',
      article: newArticle,
      totalArticles: allArticles.length,
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('❌ Error:', error)
    res.status(500).json({
      success: false,
      error: error.message,
      message: 'Generation failed'
    })
  }
}
