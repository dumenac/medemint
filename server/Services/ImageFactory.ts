import { generateResponse } from "./ChatGPT";
import { dallEGenerateImage } from "./DallE";
import { mint } from "./Crossmint";

const SUFFIX =
'" This NFT should be minted using the Crossmint Minting API.This is what the body of a request to the Crossmint Minting API looks like:```{  "recipient": "email:emailaddress:chain",  "metadata": {    "name": "My first Mint API NFT" // This value cannot have more than 30 characters,    "image": "https://www.crossmint.com/assets/crossmint/logo.png",    "description": "My NFT created via the mint API!" // This value cannot have more than 60 characters,    "attributes": [      {        "trait_type": "trait",        "value": "value"      },      {        "trait_type": "trait",        "value": "value"      }    ]  }}```Just to make it more clear, the recipient field is composed by the following structure when you want to mint to an email address: "email:<email_address>:<chain>" or this one if you want to mint to a wallet address: "<chain>:<address>"I will need you to build a body for the API call given the info I provided you before.Also, please think of a good prompt to generate a suitable image with Dall-e.Please limit your output to a dictionary similar to this one:{    "dalle_prompt": "Dall-e prompt",    "request_body": "Body for the Crossmint Minting API request"} Please only return the JSON data and nothing else. Also please ensure the json data is valid.';

export async function generateImage(description: string) {
  const prompt = await generateResponse('"' + description + SUFFIX);
  if (prompt == null) {
    // Handle error
    return null;
  }

  console.log(prompt);

  const dalleResponse = await dallEGenerateImage(prompt.dalle_prompt);
  if (!dalleResponse.success) {
    // Handle error
    return null;
  }

  const imageUrl = dalleResponse.imageUrl!;

  let body = prompt.request_body;
  body.metadata.image = imageUrl;
  body.metadata.name = body.metadata.name.substring(0, 30);
  body.metadata.description = body.metadata.description.substring(0, 60);

  const response = await mint(body);
  return {
    request: body,
    response: response,
  };
}
