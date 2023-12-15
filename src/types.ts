export interface Meme {
    id: string;
    name: string;
    url: string;
    width: number;
    height: number;
    box_count: number;
}

export interface CreatedMeme{
    url: string;
    page_url: string;
}

export interface MemeBodyRequest{
    template_id: string|null|undefined;
    boxes: {
        text: string;
    }[]
}