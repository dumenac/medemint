const env = useRuntimeConfig();

export interface PromptResponse {
    dalle_prompt: string;
    request_body: RequestBody;
}

export interface RequestBody {
    recipient: string;
    metadata: Metadata;
    passThroughArgs: any;
}

export interface Metadata {
    name: string;
    image: string;
    description: string;
    attributes: Attribute[];
}

export interface Attribute {
    trait_type: string;
    value: string;
}


export async function generateResponse(prompt: string): Promise<PromptResponse> {
    try {
        const response = await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${env.openaiSecret}`,
            },
            body: JSON.stringify({
                prompt: prompt,
                max_tokens: 3000,
            }),
        });
        const data = await response.json();
        console.log(data);
        const text = JSON.parse(data.choices[0].text.replace("`", "")) as PromptResponse;
        return text;
    } catch (err) {
        console.error('Error calling ChatGPT:', err);
        throw err;
    }
}