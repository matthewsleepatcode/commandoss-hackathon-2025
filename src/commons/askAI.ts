import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  dangerouslyAllowBrowser: true,
})

export const insightAI = async (msg: string) => {
  if (!msg) return

  const response = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: `${msg}` }],
    store: true,
  })

  return response.choices[0].message.content
}
