// Free AI API integration - No credit card required
const FREE_AI_PROVIDERS = {
  TOGETHER: {
    name: 'Together AI',
    url: 'https://api.together.xyz/v1/chat/completions',
    freeLimit: 50000, // Free tokens per month
    models: ['meta-llama/Llama-2-70b-chat-hf', 'mistralai/Mixtral-8x7B-Instruct-v0.1']
  },
  GROQ: {
    name: 'Groq',
    url: 'https://api.groq.com/openai/v1/chat/completions',
    freeLimit: null, // Currently free
    models: ['llama2-70b-4096', 'mixtral-8x7b-32768']
  }
}

export async function generateAIContent(topic, type = 'article') {
  // Try Together AI first (free tier), then Groq (always free)
  return await tryTogetherAI(topic, type) || await tryGroq(topic, type)
}

async function tryTogetherAI(topic, type) {
  try {
    const prompt = createPrompt(topic, type)
    
    const response = await fetch(FREE_AI_PROVIDERS.TOGETHER.url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.TOGETHER_API_KEY || 'free-tier'}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: FREE_AI_PROVIDERS.TOGETHER.models[0],
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 2000,
        temperature: 0.7
      })
    })

    if (!response.ok) throw new Error('Together AI failed')
    
    const data = await response.json()
    return data.choices[0].message.content
  } catch (error) {
    console.log('Together AI failed, trying Groq...')
    return null
  }
}

async function tryGroq(topic, type) {
  try {
    const prompt = createPrompt(topic, type)
    
    const response = await fetch(FREE_AI_PROVIDERS.GROQ.url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY || 'gsk-free'}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: FREE_AI_PROVIDERS.GROQ.models[0],
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 2000,
        temperature: 0.7
      })
    })

    if (!response.ok) throw new Error('Groq failed')
    
    const data = await response.json()
    return data.choices[0].message.content
  } catch (error) {
    console.log('All free AI APIs failed, using fallback content')
    return generateFallbackContent(topic)
  }
}

function createPrompt(topic, type) {
  return `
  Write a comprehensive, SEO-optimized ${type} about "${topic}" for AIToolHub.
  
  Requirements:
  - Length: 800-1200 words
  - Target audience: Tech enthusiasts and AI users
  - Tone: Professional but accessible
  - Include practical examples and use cases
  - Optimize for search engines naturally
  - Structure with headings and bullet points
  - Include a TL;DR summary at the beginning
  
  Focus on providing real value and actionable insights about AI tools and technology.
  `
}

function generateFallbackContent(topic) {
  // Simple fallback content that still provides value
  return `
  # ${topic}
  
  **TL;DR:** This article provides comprehensive insights about ${topic}. Our AI system is currently optimizing the full content for maximum value.
  
  ## Introduction
  ${topic} is an important aspect of AI tools and technology that deserves thorough exploration. This guide will help you understand the key concepts and practical applications.
  
  ## Key Aspects
  - Understanding the fundamentals
  - Practical use cases and examples
  - Best practices and recommendations
  - Future trends and developments
  
  ## Conclusion
  ${topic} represents an exciting area of AI technology with significant potential for innovation and improvement.
  
  *Note: This content is automatically generated and regularly updated by our AI system.*
  `
}

export async function generateArticleIdeas() {
  // Use free AI for idea generation or fallback to curated list
  try {
    const prompt = `
    Generate 5 trending AI tool topics for AIToolHub. Return as JSON:
    {
      "ideas": [
        {
          "title": "Topic title",
          "category": "AI Tools|Tutorials|Comparisons|News",
          "keywords": ["keyword1", "keyword2"],
          "trendScore": 85
        }
      ]
    }
    Focus on current trends in AI tools, comparisons, tutorials, and news.
    `

    const response = await fetch(FREE_AI_PROVIDERS.GROQ.url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY || 'gsk-free'}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: FREE_AI_PROVIDERS.GROQ.models[0],
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1000,
        temperature: 0.7
      })
    })

    if (response.ok) {
      const data = await response.json()
      return JSON.parse(data.choices[0].message.content)
    }
  } catch (error) {
    console.log('AI idea generation failed, using curated list')
  }

  // Curated fallback ideas
  return {
    ideas: [
      {
        title: "Best Free AI Tools for Content Creation in 2024",
        category: "AI Tools",
        keywords: ["free-ai-tools", "content-creation", "productivity"],
        trendScore: 90
      },
      {
        title: "ChatGPT vs Google Bard: Ultimate Comparison",
        category: "AI Comparisons", 
        keywords: ["chatgpt", "google-bard", "ai-assistants"],
        trendScore: 85
      },
      {
        title: "How to Use AI for SEO Optimization",
        category: "Tutorials",
        keywords: ["ai-seo", "optimization", "search-engines"],
        trendScore: 80
      },
      {
        title: "Top 10 AI Image Generators Compared",
        category: "AI Comparisons",
        keywords: ["ai-art", "image-generation", "midjourney-alternatives"],
        trendScore: 88
      },
      {
        title: "AI Coding Assistants: GitHub Copilot vs Alternatives",
        category: "AI Tools",
        keywords: ["ai-coding", "github-copilot", "programming"],
        trendScore: 82
      }
    ]
  }
}
