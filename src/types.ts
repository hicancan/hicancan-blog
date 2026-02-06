export type NebulaVariant = 'default' | 'galaxy' | 'guestbook' | 'matrix' | 'none';

export interface SiteConfig {
    title: string;
    description: string;
    author: string;
    avatar: {
        src: string;
        width: number;
        height: number;
        format: "png" | "jpg" | "jpeg" | "tiff" | "webp" | "gif" | "svg" | "avif";
    };
    ui: {
        themeColor: string;
        comments: string;
        commentsLabel: string;
    };
}
