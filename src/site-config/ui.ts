import type { UiTextConfig } from './types';

export const UI_TEXT: UiTextConfig = {
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
    hero: {
        ctaButton: '了解我',
    },
    projects: {
        title: '作品',
        subtitle: '// 将咖啡转化为代码，将想法转化为可用的工具',
        viewRepo: 'View Repository',
        noProjects: '// System Scanning... No works detected.',
        scanning: 'Initiating build sequence...',
    },
    footer: {
        rights: 'All Rights Reserved.',
        builtWith: 'Built with',
        techStack: 'Astro v5 & Tailwind CSS v4',
    },
    notFound: {
        title: '404',
        subtitle: 'Signal Lost in Space',
        message:
            '// The coordinates you provided lead to a black hole.\n// Please check your navigation systems.',
        button: 'Return to Base',
    },
    mobileMenu: {
        siteName: 'HICANCAN.TOP',
    },
    friends: {
        title: '友链星系',
        subtitle: (count: number) => `// 收到来自 ${count} 个相邻星系的信号`,
        initiateLink: 'Initiate Link',
        joinGalaxy: 'Join the Galaxy',
        applyFunction: 'apply_for_link()',
    },
    tags: {
        title: '话题矩阵',
        subtitle: '// 记录学习轨迹与思考路径',
        allTopics: 'All Topics',
        found: (count: number) => `Found ${count} article${count > 1 ? 's' : ''}`,
        nodeLabel: (count: number) => `${count} ${count > 1 ? 'NODES' : 'NODE'}`,
    },
    errorBoundary: {
        message: '// 组件加载失败',
        retry: '重试',
    },
    guestbook: {
        title: 'Guestbook.log',
        placeholder: '// 发送邮件至 hicancan...',
        terminalTitle: 'email.tsx — vim',
        runButton: 'Run > send_mail.sh',
        discussionTitle: '联系方式',
        discussionLabel: 'CONTACT',
    },
};
