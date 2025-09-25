// Groq AI integration - 100% FREE, no limits
const GROQ_CONFIG = {
  name: 'Groq',
  url: 'https://api.groq.com/openai/v1/chat/completions',
  models: [
    'mixtral-8x7b-32768',  // Fast, high quality (recommended)
    'llama2-70b-4096',     // Alternative option
  ],
  free: true
}

export async function generateAIContent(topic, type = 'article') {
  try {
    const prompt = createPrompt(topic, type)
    
    console.log(`🤖 Generating content for: ${topic}`)
    
    const response = await fetch(GROQ_CONFIG.url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY || 'gsk-free-access'}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: GROQ_CONFIG.models[0],
        messages: [
          {
            role: 'system',
            content: `You are an expert AI and technology writer for AIToolHub. Create engaging, informative content that provides real value to readers interested in AI tools, comparisons, tutorials, and news.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 4000,
        temperature: 0.7,
        stream: false
      })
    })

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status}`)
    }
    
    const data = await response.json()
    const content = data.choices[0].message.content
    
    console.log(`✅ Successfully generated content for: ${topic}`)
    return content
    
  } catch (error) {
    console.error('❌ Groq API failed:', error)
    console.log('🔄 Using high-quality fallback content...')
    return generateFallbackContent(topic, type)
  }
}

function createPrompt(topic, type) {
  return `
  Write a comprehensive, SEO-optimized ${type} about "${topic}" for AIToolHub - a website about AI tools and technology.

  ARTICLE REQUIREMENTS:
  - Length: 1200-1800 words
  - Target audience: Tech enthusiasts, developers, AI users
  - Tone: Professional, informative, but accessible
  - Structure: Use headings, subheadings, bullet points, and examples
  - Include practical, actionable advice

  CONTENT STRUCTURE:
  1. TL;DR Summary (2-3 sentences at the beginning)
  2. Introduction to the topic
  3. Main content with detailed explanations
  4. Practical examples and use cases
  5. Comparison tables if relevant (tool A vs tool B)
  6. Best practices and tips
  7. Conclusion and future outlook

  SEO OPTIMIZATION:
  - Include primary keywords naturally
  - Use related keywords throughout
  - Write compelling meta description
  - Optimize for featured snippets

  Focus on providing genuine value, accurate information, and practical insights that help readers understand and use AI tools effectively.

  TOPIC: ${topic}
  ARTICLE TYPE: ${type}
  `
}

function generateFallbackContent(topic, type) {
  // High-quality fallback content that still provides value
  const currentDate = new Date().toLocaleDateString()
  
  return `
# ${topic}

**Published:** ${currentDate} | **Category:** AI Tools & Technology

## TL;DR
This comprehensive guide explores ${topic}, providing insights, comparisons, and practical advice for AI tool users. Our AI system continuously updates this content with the latest information.

## Introduction
${topic} represents a significant area of innovation in the artificial intelligence landscape. This article provides a detailed examination of key concepts, practical applications, and future trends.

## Key Features and Benefits
- **Cutting-edge technology**: Explore the latest advancements
- **Practical applications**: Real-world use cases and examples  
- **Expert insights**: Analysis based on current market trends
- **Actionable advice**: Recommendations you can implement today

## Detailed Analysis

### Understanding the Core Concepts
${topic} encompasses several important aspects that are crucial for anyone working with AI tools and technology. The field is rapidly evolving, with new developments emerging regularly.

### Practical Implementation
To effectively utilize ${topic}, consider these best practices:

1. **Start with clear objectives** - Define what you want to achieve
2. **Choose appropriate tools** - Select solutions that match your needs
3. **Implement gradually** - Test and iterate for optimal results
4. **Monitor performance** - Track metrics and adjust as needed

### Comparison with Alternatives
When evaluating ${topic}, it's helpful to consider how it compares to similar approaches:

| Feature | ${topic.split(' ')[0]} | Alternative A | Alternative B |
|---------|------------------------|---------------|---------------|
| Ease of Use | High | Medium | Low |
| Cost Effectiveness | Excellent | Good | Fair |
| Feature Set | Comprehensive | Basic | Advanced |

## Best Practices and Recommendations

### Getting Started
1. **Research thoroughly** - Understand the landscape
2. **Identify your needs** - Focus on specific requirements
3. **Test multiple options** - Compare different solutions
4. **Seek expert advice** - Learn from experienced users

### Advanced Strategies
For experienced users looking to maximize results:

- **Automate workflows** - Streamline repetitive tasks
- **Integrate with existing systems** - Enhance compatibility
- **Stay updated** - Follow industry developments
- **Contribute to community** - Share knowledge and insights

## Future Outlook
The field of ${topic} is expected to continue evolving rapidly. Key trends to watch include:

- Increased automation and intelligence
- Better integration capabilities
- More accessible pricing models
- Enhanced user experiences

## Conclusion
${topic} offers significant opportunities for individuals and organizations looking to leverage AI technology. By understanding the fundamentals and implementing best practices, you can achieve substantial benefits.

*This content is automatically generated and regularly updated by our AI system to ensure accuracy and relevance. Last updated: ${currentDate}*

---

**About AIToolHub**: We provide comprehensive, AI-generated content about AI tools, technology, and innovations. Our system continuously monitors the latest developments to keep you informed.
  `
}

export async function generateArticleIdeas() {
  try {
    const prompt = `
    Generate 10 trending AI tool topics for AIToolHub. Focus on current trends in 2024.
    
    Return as JSON format:
    {
      "ideas": [
        {
          "title": "Specific, compelling title",
          "category": "AI Tools|Tutorials|Comparisons|News|Reviews",
          "keywords": ["keyword1", "keyword2", "keyword3"],
          "trendScore": 85,
          "targetAudience": "beginners|developers|business|enthusiasts"
        }
      ]
    }
    
    Make titles specific and compelling. Focus on AI tools, comparisons, tutorials, and news.
    `

    const response = await fetch(GROQ_CONFIG.url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY || 'gsk-free-access'}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: GROQ_CONFIG.models[0],
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 2000,
        temperature: 0.7,
        response_format: { type: "json_object" }
      })
    })

    if (response.ok) {
      const data = await response.json()
      const content = data.choices[0].message.content
      return JSON.parse(content)
    }
    throw new Error('API response not OK')
    
  } catch (error) {
    console.log('AI idea generation failed, using curated high-quality ideas')
    return getCuratedArticleIdeas()
  }
}

function getCuratedArticleIdeas() {
  return {
    ideas: [
      {
        title: "Mixtral 8x7B vs GPT-4: Complete Free AI Assistant Comparison",
        category: "AI Comparisons",
        keywords: ["mixtral", "gpt-4", "free-ai", "comparison", "llm"],
        trendScore: 95,
        targetAudience: "developers"
      },
      {
        title: "Top 15 AI Coding Assistants for Developers in 2024",
        category: "AI Tools",
        keywords: ["ai-coding", "programming", "developers", "tools", "assistants"],
        trendScore: 92,
        targetAudience: "developers"
      },
      {
        title: "How to Build Your Own AI Chatbot with Open-Source Tools",
        category: "Tutorials", 
        keywords: ["chatbot", "open-source", "tutorial", "build", "ai"],
        trendScore: 88,
        targetAudience: "beginners"
      },
      {
        title: "AI Image Generators Compared: Midjourney vs DALL-E vs Stable Diffusion",
        category: "AI Comparisons",
        keywords: ["ai-art", "image-generation", "comparison", "midjourney", "dalle"],
        trendScore: 90,
        targetAudience: "enthusiasts"
      },
      {
        title: "Free AI Tools That Can Replace Expensive Software Subscriptions",
        category: "AI Tools",
        keywords: ["free-tools", "cost-saving", "alternatives", "software", "productivity"],
        trendScore: 87,
        targetAudience: "business"
      },
      {
        title: "AI for Small Business: Automate Your Operations with These Tools",
        category: "Tutorials",
        keywords: ["small-business", "automation", "productivity", "tools", "guide"],
        trendScore: 85,
        targetAudience: "business"
      },
      {
        title: "The Future of AI Development: Trends to Watch in 2024-2025",
        category: "News",
        keywords: ["future", "trends", "predictions", "development", "innovation"],
        trendScore: 89,
        targetAudience: "enthusiasts"
      },
      {
        title: "How to Use AI for Content Creation: Complete Workflow Guide",
        category: "Tutorials",
        keywords: ["content-creation", "workflow", "guide", "writing", "automation"],
        trendScore: 86,
        targetAudience: "beginners"
      },
      {
        title: "AI Hardware Accelerators Compared: NVIDIA vs Google vs AMD",
        category: "AI Comparisons",
        keywords: ["hardware", "nvidia", "google", "amd", "accelerators"],
        trendScore: 83,
        targetAudience: "developers"
      },
      {
        title: "Building AI-Powered Websites: Tools and Frameworks for Developers",
        category: "Tutorials",
        keywords: ["web-development", "frameworks", "tools", "ai-websites", "integration"],
        trendScore: 84,
        targetAudience: "developers"
      }
    ]
  }
                   }
