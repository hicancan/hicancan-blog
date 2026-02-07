import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export function IconMenu(props: IconProps) {
    return (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
            />
        </svg>
    );
}
