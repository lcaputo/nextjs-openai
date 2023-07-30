import { OPENAI_API_KEY } from '../../config';
import { Configuration, OpenAIApi } from 'openai-edge';
import { OpenAIStream, StreamingTextResponse } from 'ai';

export const runtime = 'edge'

const config = new Configuration({
    apiKey: OPENAI_API_KEY,
})

const openai = new OpenAIApi(config)

export async function POST(request: any) {
    const json = await request.json()
    const { messages } = json
    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        stream: true,
        messages: [
            {
                role: 'system',
                content: 'Compórtate como si fueras un experto en marketing y te dedicas a la cración de textos promocionales, el usuario te dira su nicho de mercado, productos o servicios y tu debes crear un texto para ofrecerlos por SMS, que no exceda los 500 caracteres, sin hashtags. si te escribe cualquier otra cosa recuerdale al usuario cual es tu función.',
            },
            {
                role: 'user',
                content: messages[messages.length - 1].content
            }
        ],
        max_tokens: 500,
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 1,
        presence_penalty: 1,
    })

const stream = OpenAIStream(response)
return new StreamingTextResponse(stream)

//   return new Response(
//     JSON.stringify({
//         message: 'Hello World',
//     }), {
//         headers: {
//             'content-type': 'application/json;charset=UTF-8',
//         },
//     })
}
