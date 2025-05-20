import { google } from '@ai-sdk/google';
import {appendClientMessage, Message, streamText} from 'ai';
import { generateCoursePrompt } from '@/utils/prompt-utils';

export const maxDuration = 30;


export const previousMessages = [
    {
        "id": "d3GBoiSRzen7HQmb",
        "createdAt": new Date("2025-05-10T13:32:46.827Z"),
        "role": 'user',
        "content": "Hi",
        "parts": [
            {
                "type": 'text',
                "text": "Hi"
            }
        ]
    },
    {
        "id": "msg-yLm9kArKoYhfnSd8H3v7g4oR",
        "createdAt": new Date("2025-05-10T13:32:58.000Z"),
        "role": 'assistant',
        "content": "Hello! How can I help you today?",
        "parts": [
            {
                "type": 'step-start'
            },
            {
                "type": 'text',
                "text": "Hello! How can I help you today?"
            }
        ],
        "revisionId": "2xhSDecYTbVW1L6x"
    }
];

export async function POST(req: Request) {
    const { messages, sessionId, studentId } = await req.json();
    console.log('API messages', messages)
    const response = await fetch(`http://localhost:8080/university/availableCourses/${studentId}`);
    const data = await response.json();
    const coursePrompt = generateCoursePrompt(data);
    const result = streamText({
        system: `${coursePrompt} Please answer the question based on the course.`,
        model: google('gemini-2.5-flash-preview-04-17'),
        messages,
        async onFinish({ response }) {
            console.log('response', response);
            console.log('response messages', JSON.stringify(response.messages, null, 2));
        }
    });

    return result.toDataStreamResponse();
}