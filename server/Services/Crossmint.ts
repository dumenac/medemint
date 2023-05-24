import {RequestBody} from "./ChatGPT";

const env = useRuntimeConfig();

export async function mint(data: RequestBody) {
    const url = `${env.crossmintBaseUrl}/api/2022-06-09/collections/default/nfts`;
    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            accept: "application/json",
            "X-CLIENT-SECRET": env.crossmintClientSecret,
            "X-PROJECT-ID": env.crossmintProjectId,
            "Content-Type": "application/json"
        }
    };

    try {
        const response = await fetch(url, options);
        return await response.json();
    }
    catch (error) {
        return { error: true, message: "An internal error has occurred" };
    }
}