import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function generateAIContent(topic, type = 'article') {
  try {
    const prompt = `
    Write a comprehensive, SEO-optimized ${type} about "${topic}" for AIToolHub.
    
    Requirements:
    - Length: 1500+ words
    - Target audience: Tech enthusiasts and AI users
    - Tone: Professional but accessible
    - Include practical examples and use cases
    - Optimize for search engines naturally
    - Structure with headings, subheadings, and bullet points
    - Include a TL;DR summary at the beginning
    
    Focus on providing real value and actionable insights.
    `

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert AI and technology writer. Create engaging, informative content that ranks well on Google and provides real value to readers."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 4000,
      temperature: 0.7,
    })

    return completion.choices[0].message.content
  } catch (error) {
    console.error('Error generating AI content:', error)
    return null
  }
}

export async function generateArticleIdeas() {
  const prompt = `
  Generate 10 trending AI tool topics for AIToolHub. Return as JSON array:
  
  [
    {
      "title": "Topic title",
      "category": "AI Tools|Tutorials|Comparisons|News",
      "keywords": ["keyword1", "keyword2"],
      "trendScore": 85
    }
  ]
  
  Focus on current trends in AI tools, comparisons, tutorials, and news.
  `

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      max_tokens: 2000,
    })

    return JSON.parse(completion.choices[0].message.content)
  } catch (error) {
    console.error('Error generating article ideas:', error)
    return { ideas: [] }
  }
}
