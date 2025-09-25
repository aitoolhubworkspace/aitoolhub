import { contentScheduler } from './scheduler'

export async function getArticles() {
  return contentScheduler.getAllArticles()
}

export async function getArticleById(id) {
  return contentScheduler.getArticleById(id)
}

export async function generateNewContent() {
  return await contentScheduler.generateDailyContent()
}
