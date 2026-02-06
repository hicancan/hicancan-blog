export interface ProjectData {
    title: string;
    description: string;
    image?: string;
    link: string;
    tags: string[];
}

/**
 * Automagically determines the best image URL for a project.
 * Priority:
 * 1. Manually specified 'image' in frontmatter.
 * 2. GitHub Open Graph Image (if link is a GitHub repo).
 * 3. Null (Caller should render a fallback gradient).
 */
export function getProjectImage(project: ProjectData): string | null {
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
        'from-violet-500 via-purple-500 to-fuchsia-500'
    ];

    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    const index = Math.abs(hash) % gradients.length;
    return gradients[index];
}
