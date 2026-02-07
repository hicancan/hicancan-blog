import Giscus from '@giscus/react';
import { ErrorBoundary } from './ErrorBoundary';
import { SITE_CONFIG } from '../../config';

interface Props {
    id?: string;
}

/**
 * Giscus comment component wrapped with error boundary
 * for graceful error handling
 */
export default function GiscusComments({ id = 'comments' }: Props) {
    return (
        <ErrorBoundary>
            <Giscus
                id={id}
                repo={SITE_CONFIG.giscus.repo}
                repoId={SITE_CONFIG.giscus.repoId}
                category={SITE_CONFIG.giscus.category}
                categoryId={SITE_CONFIG.giscus.categoryId}
                mapping="pathname"
                strict="0"
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="bottom"
                theme="transparent_dark"
                lang="zh-CN"
                loading="lazy"
            />
        </ErrorBoundary>
    );
}
