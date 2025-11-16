import OpenAI from 'openai'
import { GoogleGenerativeAI } from '@google/generative-ai'

// OpenAI Configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Gemini Configuration
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export class AIService {
  async generateText(prompt: string, model: 'gpt-4' | 'gpt-3.5-turbo' = 'gpt-3.5-turbo') {
    try {
      const completion = await openai.chat.completions.create({
        model,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1000,
      })

      return completion.choices[0]?.message?.content || ''
    } catch (error) {
      console.error('OpenAI API error:', error)
      throw new Error('Failed to generate text')
    }
  }

  async generateWithGemini(prompt: string) {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
      const result = await model.generateContent(prompt)
      const response = await result.response
      return response.text()
    } catch (error) {
      console.error('Gemini API error:', error)
      throw new Error('Failed to generate text with Gemini')
    }
  }

  async generateCode(prompt: string, language: string = 'typescript') {
    const enhancedPrompt = `Generate ${language} code for: ${prompt}. Only return the code without explanations.`
    return this.generateText(enhancedPrompt)
  }
}

export const aiService = new AIService()