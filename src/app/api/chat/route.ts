import { google } from '@ai-sdk/google';
import { streamText} from 'ai';
import { generateCoursePrompt } from '@/utils/prompt-utils';

export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages, sessionId, studentId } = await req.json();

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/university/availableCourses/${studentId}`);
    const data = await response.json();
    const coursePrompt = generateCoursePrompt(data);
    const result = streamText({
        system: `${coursePrompt} Please answer the question based on the course.`,
        model: google('gemini-2.5-flash-preview-04-17'),
        messages,
        async onFinish({ response }) {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/session/${sessionId}/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: [
                      ...messages,
                      ...response.messages,
                    ]
                }),
            });
        }
    });

    return result.toDataStreamResponse();
}