import { MemeBodyRequest } from "../types";

const captionImage = async (req: MemeBodyRequest): Promise<string> => {

    if(req.template_id === "-1") throw new Error("template_id is required")
    if(req.boxes.every((text) => text.text.trim() === '')) throw new Error("At least one text is required")

    const response = await fetch('https://meme-generator-api-9g9l.onrender.com/memes/', {
        method: 'POST',
        body: JSON.stringify(req),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    
    if(!response.ok) throw new Error(response.statusText) 

    const data:{url:string} = await response.json()
    return data.url
}

export default captionImage