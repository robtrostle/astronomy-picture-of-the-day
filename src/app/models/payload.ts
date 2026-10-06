export type Payload = {
    date: string;
    post_id: number;
    title: string;
    permalink: string;
    media_type: string;
    explanation: string;
    credit?: string;
    copyright?: string;
    alt?: string;
    // In the new API, `url` is the post permalink (an HTML page), NOT a direct
    // media URL. Use `hdurl` for the image. `url`/`permalink` are for linking out.
    url: string;
    hdurl: string;
    basic_html?: string;
    basic_html_url?: string;
    // Legacy field, no longer returned by the new endpoint.
    service_version?: string;
}
