import Layout from '../components/Layout'

export default function Categories() {
  const categories = [
    { name: 'AI Tools', count: '25+', description: 'Discover the best AI tools for every task' },
    { name: 'Tutorials', count: '15+', description: 'Step-by-step guides and how-tos' },
    { name: 'Comparisons', count: '10+', description: 'Head-to-head AI tool comparisons' },
    { name: 'News', count: 'Daily', description: 'Latest AI developments and updates' },
  ]

  return (
    <Layout title="Categories - AIToolHub">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Content Categories</h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((category) => (
            <div key={category.name} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {category.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{category.description}</p>
              <div className="text-sm text-blue-600 dark:text-blue-400">
                {category.count} articles
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
  }
