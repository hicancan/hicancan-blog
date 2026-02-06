import React, { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
}

/**
 * Error boundary wrapper for React components (e.g., Giscus)
 * Gracefully handles errors without breaking the entire page
 */
export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Component Error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback || (
                <div className="text-center py-8 text-text-secondary">
                    <p className="font-mono text-sm">// 组件加载失败</p>
                    <button
                        onClick={() => this.setState({ hasError: false })}
                        className="mt-4 px-4 py-2 text-xs border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
                    >
                        重试
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
