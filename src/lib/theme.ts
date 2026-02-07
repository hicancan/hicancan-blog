/**
 * Theme & Asset Utilities
 * Unified source for visual styles, gradients, and asset resolution.
 */

// === Post Themes ===
export const POST_THEMES = [
    {
        bg: 'bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900',
        text: 'text-purple-100',
        accent: 'text-purple-300',
        border: 'group-hover:border-purple-500/50',
        dot: 'bg-purple-500',
    },
    {
        bg: 'bg-gradient-to-br from-slate-900 via-cyan-900 to-blue-900',
        text: 'text-cyan-100',
        accent: 'text-cyan-300',
        border: 'group-hover:border-cyan-500/50',
        dot: 'bg-cyan-500',
    },
    {
        bg: 'bg-gradient-to-br from-slate-900 via-slate-800 to-rose-950',
        text: 'text-rose-100',
        accent: 'text-rose-300',
        border: 'group-hover:border-rose-500/50',
        dot: 'bg-rose-500',
    },
    {
        bg: 'bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950',
        text: 'text-emerald-100',
        accent: 'text-emerald-300',
        border: 'group-hover:border-emerald-500/50',
        dot: 'bg-emerald-500',
    },
    {
        bg: 'bg-gradient-to-br from-slate-800 via-zinc-800 to-neutral-900',
        text: 'text-slate-200',
        accent: 'text-slate-400',
        border: 'group-hover:border-slate-500/50',
        dot: 'bg-slate-500',
    },
];

/**
 * Get a consistent theme for a post based on its ID
 */
export function getPostTheme(id: string) {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
        hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % POST_THEMES.length;
    return POST_THEMES[index];
}

// === Project Utilities ===

// Minimal interface needed for asset resolution
export interface ProjectAssetData {
    title: string;
    link: string;
    image?: string;
}

/**
 * Automagically determines the best image URL for a project.
 * Priority:
 * 1. Manually specified 'image' in frontmatter.
 * 2. GitHub Open Graph Image (if link is a GitHub repo).
 * 3. Null (Caller should render a fallback gradient).
 */
export function getProjectImage(project: ProjectAssetData): string | null {
    // 1. Manual Override
    if (project.image) {
        return project.image;
    }

    // 2. GitHub Auto-Discovery
    if (project.link && project.link.includes('github.com')) {
        try {
            const url = new URL(project.link);
            const pathSegments = url.pathname.split('/').filter(Boolean);

            // Format: github.com/user/repo
            if (pathSegments.length >= 2) {
                const user = pathSegments[0];
                const repo = pathSegments[1];
                // Use the standardized GitHub Open Graph URL
                // This is extremely fast and cached by global CDNs
                return `https://opengraph.githubassets.com/1/${user}/${repo}`;
            }
        } catch (e) {
            // Invalid URL, fall through
            console.warn(`[ProjectImage] Invalid GitHub URL for ${project.title}:`, project.link);
        }
    }

    // 3. No image available
    return null;
}

/**
 * Generates a deterministic gradient class based on string hash.
 * Used for projects without any image.
 */
export function getFallbackGradient(str: string): string {
    const gradients = [
        'from-pink-500 via-rose-500 to-yellow-500',
        'from-blue-400 via-indigo-500 to-purple-500',
        'from-emerald-400 via-cyan-500 to-blue-500',
        'from-orange-400 via-red-500 to-pink-500',
        'from-violet-500 via-purple-500 to-fuchsia-500',
    ];

    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    const index = Math.abs(hash) % gradients.length;
    return gradients[index];
}
