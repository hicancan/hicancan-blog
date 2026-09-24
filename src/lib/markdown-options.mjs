import remarkMath from 'remark-math-extended';
import remarkGfm from 'remark-gfm';
import rehypeMathjax from 'rehype-mathjax/svg';
import { AllPackages } from 'mathjax-full/js/input/tex/AllPackages.js';
import { rehypeGithubAlerts } from 'rehype-github-alerts';
import remarkTyporaInline from '../plugins/remark-typora-inline.mjs';

export const markdownOptions = {
  gfm: false,
  remarkPlugins: [[remarkGfm, { singleTilde: false }], remarkMath, remarkTyporaInline],
  rehypePlugins: [[rehypeMathjax, { tex: { packages: [...AllPackages, 'physics'] } }], rehypeGithubAlerts],
};

export const shikiConfig = {
  themes: { light: 'github-light', dark: 'github-dark' },
  langAlias: { flow: 'plaintext', sequence: 'plaintext' },
};
