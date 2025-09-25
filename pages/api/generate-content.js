import { generateNewContent } from '../../lib/articles'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Simple authentication
  const authHeader = req.headers.authorization
  if (authHeader !== `Bearer ${process.env.API_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    console.log('🚀 Starting AI content generation via API...')
    const articles = await generateNewContent()
    
    res.status(200).json({
      success: true,
      message: `Generated ${articles.length} articles total`,
      articles: articles.slice(0, 5) // Return latest 5
    })
  } catch (error) {
    console.error('Error in content generation API:', error)
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
}
