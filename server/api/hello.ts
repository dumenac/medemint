export default defineEventHandler(async (event) => {

    const env = useRuntimeConfig()

    return {
        message : `Hello world, your Crossmint base URL is ${env.crossmintBaseUrl}`
    } 

})