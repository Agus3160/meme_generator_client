import { Meme } from "../types";

const getMemesTemplates = async (): Promise<Meme[]> => {
    
    const response = await fetch('https://meme-generator-api-9g9l.onrender.com/memes/', {
        method: 'GET',
    })

    if(!response.ok) {
        const error = new Error(response.statusText)
        throw error
    }
    
    const data:Meme[] = await response.json()
    return data
}

export default getMemesTemplates