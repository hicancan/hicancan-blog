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
    ui: {
        viewArchive: string;
        comments: string;
        commentsLabel: string;

        // New Sections
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
    },
    ui: {
        viewArchive: '进入归档',
        comments: '评论区',
        commentsLabel: 'COMMENTS',

        blog: {
            published: '发布于',
            updated: '更新于',
        },

        about: {
            greeting: '你好，我是',
            school: 'NJUPT',
            role1: '算法爱好者',
            role2: '关注 AI 与 量子计算',
            status: '// 学生 · coder · 持续折腾',
        },

        // Hero Section
        hero: {
            ctaButton: '了解我',
        },

        // Projects
        projects: {
            title: '项目',
            subtitle: '// 将咖啡转化为代码，将想法转化为现实',
            viewRepo: 'View Repository',
            noProjects: '// System Scanning... No projects detected.',
            scanning: 'Initiating code sequence...',
        },

        // Footer
        footer: {
            rights: 'All Rights Reserved.',
            builtWith: 'Built with',
            techStack: 'Astro v5 & Tailwind CSS v4',
        },

        // 404 Page
        notFound: {
            title: '404',
            subtitle: 'Signal Lost in Space',
            message:
                '// The coordinates you provided lead to a black hole.\n// Please check your navigation systems.',
            button: 'Return to Base',
        },

        // Mobile Menu
        mobileMenu: {
            siteName: 'HICANCAN.TOP',
        },

        // Friends Page
        friends: {
            title: '友链星系',
            subtitle: (count: number) => `// 收到来自 ${count} 个相邻星系的信号`,
            initiateLink: 'Initiate Link',
            joinGalaxy: 'Join the Galaxy',
            applyFunction: 'apply_for_link()',
        },

        // Tags Pages
        tags: {
            title: '话题矩阵',
            subtitle: '// 记录学习轨迹与思考路径',
            allTopics: 'All Topics',
            found: (count: number) => `Found ${count} article${count > 1 ? 's' : ''}`,
            nodeLabel: (count: number) => `${count} ${count > 1 ? 'NODES' : 'NODE'}`,
        },

        // Error Boundary
        errorBoundary: {
            message: '// 组件加载失败',
            retry: '重试',
        },

        // Guestbook
        guestbook: {
            title: 'Guestbook.log',
            placeholder: '// 写下你的 Commit 信息...',
            terminalTitle: 'email.tsx — vim',
            runButton: 'Run > send_mail.sh',
            discussionTitle: '公开讨论区',
            discussionLabel: 'PUBLIC THREAD',
        },
    },
};

export const NAV_ITEMS = [
    { name: '话题', path: '/tags' },
    { name: '项目', path: '/projects' },
    { name: '友链', path: '/friends' },
    { name: '留言', path: '/guestbook' },
    { name: '关于', path: '/about' },
];

export const THEME_COLOR = '#0f172a';
