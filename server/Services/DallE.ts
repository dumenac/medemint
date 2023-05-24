const env = useRuntimeConfig();

interface ImagesResponse {
    url: string;
}

interface DallEResponse {
    created: number;
    data: ImagesResponse[]
}

interface ImageResponse {
    success: boolean;
    imageUrl?: string;
}

export async function dallEGenerateImage(prompt: string, n: number = 1, size: string = "1024x1024"): Promise<ImageResponse> {
    try {
        const response = await fetch("https://api.openai.com/v1/images/generations", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${env.openaiSecret}`
            },
            body: JSON.stringify({
                prompt,
                n,
                size
            })
        });

        const responseJson = (await response.json()) as DallEResponse;
        const result: ImageResponse = {
            success: true,
            imageUrl: responseJson.data[0].url
        }
        return result;
    }
    catch (err) {
        console.error('Error calling DALL-E:', err);
        return {
            success: false
        };
    }
}