import avatarImage from '../assets/avatar.jpg';
import type { SiteIdentityConfig } from './types';

export const SITE_IDENTITY: SiteIdentityConfig = {
    title: 'hicancan',
    author: 'hicancan',
    description: 'Welcome to my digital garden.',
    url: 'https://www.hicancan.top',
    locale: 'zh-CN',
    email: 'mail@hicancan.top',
    avatar: avatarImage,
    startDate: new Date('2024-11-06T00:00:00'),
    hero: {
        titlePrefix: 'Hello,',
        titleSuffix: 'I am',
        description: '欢迎来到我的数字花园。\n在这里记录代码、设计与生活的真实进展。',
    },
};
