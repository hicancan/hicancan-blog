import type { ImageMetadata } from 'astro';
import avatarImage from './assets/avatar.jpg';

// Strict Type Contracts
interface GiscusConfig {
    repo: `${string}/${string}`;
    repoId: string;
    category: string;
    categoryId: string;
}

interface SiteConfig {
    title: string;
    author: string;
    description: string;
    url: string;
    locale: string;
    email: string;
    avatar: ImageMetadata;
    giscus: GiscusConfig;
    startDate: Date;
    hero: {
        titlePrefix: string;
        titleSuffix: string;
        description: string;
    };
    social: {
        bilibili: string;
        github: string;
    };
}

export const SITE_CONFIG: SiteConfig = {
    title: 'hicancan',
    author: 'hicancan',
    description: 'Welcome to my digital garden.',
    url: 'https://hicancan.top',
    locale: 'zh-CN',
    email: 'mail@hicancan.top',
    avatar: avatarImage,
    startDate: new Date('2024-11-06T00:00:00'),
    hero: {
        titlePrefix: 'Hello,',
        titleSuffix: 'I am',
        description: '欢迎来到我的数字花园。\n在这里记录代码、设计与生活的真实进展。',
    },
    // Single Source of Truth for Comments
    giscus: {
        repo: 'hicancan/hicancan-blog',
        repoId: 'R_kgDORIqQNg',
        category: 'Announcements',
        categoryId: 'DIC_kwDORIqQNs4C140p',
    },
    social: {
        bilibili: 'https://space.bilibili.com/1144561698',
        github: 'https://github.com/hicancan',
    }
};

export const NAV_ITEMS = [
    { name: '话题', path: '/tags' },
    { name: '项目', path: '/projects' },
    { name: '友链', path: '/friends' },
    { name: '留言', path: '/guestbook' },
    { name: '关于', path: '/about' },
];
