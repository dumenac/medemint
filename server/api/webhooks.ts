import {readBody} from "h3";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const imageUrl = body.passThroughArgs.imageUrl;

    console.log("[Webhook] Request: ", body);

    let transaction = "";
    if (body.txId != null) {
        transaction = body.txId;
    }
    else if (body.mintHash != null) {
        transaction = body.mintHash;
    }
    else {
        throw new Error("Not implemented / supported");
    }

    const response = {
        imageUrl: imageUrl,
        transaction: transaction
    };

    console.log("[Webhook] Response: ", response);

    return response;
});