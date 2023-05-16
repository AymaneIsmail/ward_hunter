export async function POST(request: Request) {
  const {championName, role} = await request.json()
  // Configurez vos identifiants d'API et le point de terminaison de l'API OpenAI ici
  const OPENAI_API_KEY = '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'
  const OPENAI_API_ENDPOINT = 'https://api.openai.com/v1/chat/completions'

  const max_tokens = 50
  const temperature = 0.7
  const n = 1

  const requestBody = {
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: `Tu es un coach League of Legends. 
        Tu dois conseiller les meilleurs composition possible selon le champion choisit.
         Donne uniquement la composition d'équipe même si le rôle du champion ne correspond pas habituellement à son rôle habituelle.
        Donne uniquement réponse sous la forme suivante sans aucune explication :
           
              ***
              MID:
              JUNGLER:
              TOP:
              ADC:
              SUPPORT:
              ***
Si le personnage ne correspond pas au rôle choisit donne quand même une équipe.
              `,
              
      },
      { role: 'user', content: `${championName} - ${role}`},
    ],
    max_tokens: max_tokens,
    temperature: temperature,
  }

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify(requestBody),
  }

  // Envoyez la requête à l'API OpenAI
  const response = fetch(OPENAI_API_ENDPOINT, requestOptions)
  const json = await (await response).json()
  const string = json.choices[0].message.content
  const regex: RegExp = /(\w+):\s(\w+)/g

  const matches: RegExpExecArray[] | null = Array.from(string.matchAll(regex))

  const result: Record<string, string>[] = []

  if (matches) {
    matches.forEach((match) => {
      const key: string = match[1]
      const value: string = match[2]
      const pair: Record<string, string> = { [key]: value }
      result.push(pair)
    })
  }
  console.log(result)
  return new Response(JSON.stringify(result))
}
