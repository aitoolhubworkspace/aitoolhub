import Layout from '../components/Layout'
import { getArticles } from '../lib/articles'

export default function Home({ articles }) {
  return (
    <Layout title="AIToolHub - Discover the Best AI Tools & Technology">
      {/* Hero Section */}
      <section className="text-center py-16 bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-lg mb-12">
        <h1 className="text-5xl font-bold mb-4">AI Tools Hub</h1>
        <p className="text-xl mb-8">Discover the Best AI Tools, Tutorials, and Technology Insights</p>
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 inline-block">
          <p className="text-lg">🚀 <strong>Auto-Updated Daily</strong> with 5+ New Articles</p>
        </div>
      </section>

      {/* Featured Articles */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Latest AI Tools & Guides</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article key={article.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                  <a href={`/article/${article.id}`} className="hover:text-blue-600">
                    {article.title}
                  </a>
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {article.summary}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{article.category}</span>
                  <span>{article.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-12 text-center">
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">5+</div>
              <div className="text-gray-600 dark:text-gray-300">Daily Articles</div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">150+</div>
              <div className="text-gray-600 dark:text-gray-300">Monthly Content</div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">24/7</div>
              <div className="text-gray-600 dark:text-gray-300">AI Automation</div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const articles = await getArticles()
  
  return {
    props: {
      articles: articles.slice(0, 6) // Show latest 6 articles
    },
    revalidate: 3600 // Refresh every hour
  }
  }
