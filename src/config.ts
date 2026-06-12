import { GISCUS_CONFIG, SOCIAL_LINKS } from './site-config/integrations';
import { NAV_ITEMS } from './site-config/navigation';
import { SITE_IDENTITY } from './site-config/site';
import { THEME_COLOR } from './site-config/theme';
import type { SiteConfig } from './site-config/types';
import { UI_TEXT } from './site-config/ui';

export const SITE_CONFIG: SiteConfig = {
    ...SITE_IDENTITY,
    giscus: GISCUS_CONFIG,
    social: SOCIAL_LINKS,
    ui: UI_TEXT,
};

export { NAV_ITEMS, THEME_COLOR };
