import type { ImageMetadata } from 'astro';

export interface GiscusConfig {
    repo: `${string}/${string}`;
    repoId: string;
    category: string;
    categoryId: string;
    enabled: boolean;
}

export interface SiteHeroConfig {
    titlePrefix: string;
    titleSuffix: string;
    description: string;
}

export interface SiteIdentityConfig {
    title: string;
    author: string;
    description: string;
    url: string;
    locale: string;
    email: string;
    avatar: ImageMetadata;
    startDate: Date;
    hero: SiteHeroConfig;
}

export interface SocialLinks {
    bilibili: string;
    github: string;
}

export interface UiTextConfig {
    viewArchive: string;
    comments: string;
    commentsLabel: string;
    blog: {
        published: string;
        updated: string;
    };
    about: {
        greeting: string;
        school: string;
        role1: string;
        role2: string;
        status: string;
    };
    hero: {
        ctaButton: string;
    };
    projects: {
        title: string;
        subtitle: string;
        viewRepo: string;
        noProjects: string;
        scanning: string;
    };
    footer: {
        rights: string;
        builtWith: string;
        techStack: string;
    };
    notFound: {
        title: string;
        subtitle: string;
        message: string;
        button: string;
    };
    mobileMenu: {
        siteName: string;
    };
    friends: {
        title: string;
        subtitle: (count: number) => string;
        initiateLink: string;
        joinGalaxy: string;
        applyFunction: string;
    };
    tags: {
        title: string;
        subtitle: string;
        allTopics: string;
        found: (count: number) => string;
        nodeLabel: (count: number) => string;
    };
    errorBoundary: {
        message: string;
        retry: string;
    };
    guestbook: {
        title: string;
        placeholder: string;
        terminalTitle: string;
        runButton: string;
        discussionTitle: string;
        discussionLabel: string;
    };
}

export interface SiteConfig extends SiteIdentityConfig {
    giscus: GiscusConfig;
    social: SocialLinks;
    ui: UiTextConfig;
}

export interface NavItem {
    name: string;
    path: `/${string}`;
}
