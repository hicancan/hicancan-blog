/**
 * Post theme utilities for card styling
 */

export const THEMES = [
    { bg: "bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900", text: "text-purple-100", accent: "text-purple-300", border: "group-hover:border-purple-500/50", dot: "bg-purple-500" },
    { bg: "bg-gradient-to-br from-slate-900 via-cyan-900 to-blue-900", text: "text-cyan-100", accent: "text-cyan-300", border: "group-hover:border-cyan-500/50", dot: "bg-cyan-500" },
    { bg: "bg-gradient-to-br from-slate-900 via-slate-800 to-rose-950", text: "text-rose-100", accent: "text-rose-300", border: "group-hover:border-rose-500/50", dot: "bg-rose-500" },
    { bg: "bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950", text: "text-emerald-100", accent: "text-emerald-300", border: "group-hover:border-emerald-500/50", dot: "bg-emerald-500" },
    { bg: "bg-gradient-to-br from-slate-800 via-zinc-800 to-neutral-900", text: "text-slate-200", accent: "text-slate-400", border: "group-hover:border-slate-500/50", dot: "bg-slate-500" },
];

/**
 * Get a consistent theme for a post based on its ID
 */
export function getPostTheme(id: string) {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
        hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % THEMES.length;
    return THEMES[index];
}
