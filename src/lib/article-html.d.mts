export declare const shikiThemes: { light: string; dark: string };
export declare function prepare(): Promise<unknown>;
export declare function articleHtml(markdown: string, image?: (src: string) => Promise<{ src: string; width: number | string; height: number | string } | undefined>): Promise<string>;
