import { generateNewContent } from '../../lib/articles'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    // Allow GET requests for testing
    if (req.method === 'GET') {
      return res.status(200).json({ 
        message: 'AI Content Generator is ready! Use POST to generate content.' 
      })
    }
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    console.log('🚀 Starting AI content generation via API...')
    
    // Generate content
    const articles = await generateNewContent()
    
    res.status(200).json({
      success: true,
      message: `AI generated ${articles.length} articles successfully!`,
      articles: articles.slice(0, 3) // Return first 3 articles
    })
    
  } catch (error) {
    console.error('Error in content generation API:', error)
    res.status(500).json({
      success: false,
      error: error.message,
      message: 'Check if Groq API key is correctly set in environment variables'
    })
  }
}
