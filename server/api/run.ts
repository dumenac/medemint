import {readBody} from "h3";
import {generateImage} from "../Services/ImageFactory";

export default defineEventHandler(async (event) => {
    const env = useRuntimeConfig()

    const body = await readBody(event);
    const description = body.description;
    if (description == null) {
        return {
            error: true,
            message: "Description is required"
        };
    }

    return await generateImage(description);
});