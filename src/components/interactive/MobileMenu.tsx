import React, { useState, useEffect } from 'react';
import { NAV_ITEMS } from '../../config';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';

export default function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Lock body scroll when menu is open
    useLockBodyScroll(isOpen);

    if (!isMounted) return null;

    return (
        <div className="md:hidden">
            {/* Hamburger Button - Only show when menu is closed */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="relative p-2 text-text-secondary hover:text-white transition-colors focus:outline-none"
                    aria-label="Open menu"
                >
                    <div className="w-6 h-5 relative flex flex-col justify-between">
                        <span className="w-full h-0.5 bg-current rounded-full" />
                        <span className="w-full h-0.5 bg-current rounded-full" />
                        <span className="w-full h-0.5 bg-current rounded-full" />
                    </div>
                </button>
            )}

            {/* Full Screen Menu Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 w-screen h-screen bg-[#0f172a] overflow-hidden"
                    style={{ zIndex: 99999 }}
                >
                    {/* Nebula Effects */}
                    <div className="absolute top-20 right-10 w-64 h-64 bg-primary/30 rounded-full blur-[100px] pointer-events-none" />
                    <div className="absolute bottom-20 left-10 w-64 h-64 bg-accent/30 rounded-full blur-[100px] pointer-events-none" />

                    {/* Close Button - Fixed at top right */}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-6 right-6 p-2 text-white/80 hover:text-accent transition-colors focus:outline-none"
                        aria-label="Close menu"
                    >
                        <svg
                            className="w-8 h-8"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>

                    {/* Menu Content - Centered */}
                    <div className="flex flex-col items-center justify-center h-full w-full px-8">
                        <nav className="flex flex-col items-center space-y-6">
                            {NAV_ITEMS.map((item, index) => (
                                <a
                                    key={item.path}
                                    href={item.path}
                                    onClick={() => setIsOpen(false)}
                                    className="text-2xl font-bold font-sans tracking-tight text-white/90 hover:text-accent transition-colors duration-300"
                                >
                                    <span className="text-lg text-accent/60 mr-3 font-mono">
                                        0{index + 1}.
                                    </span>
                                    {item.name}
                                </a>
                            ))}
                        </nav>

                        {/* Decorative line */}
                        <div className="w-20 h-1 bg-accent/40 rounded-full mt-10" />

                        {/* Site name */}
                        <p className="mt-8 text-sm text-white/30 font-mono tracking-widest">
                            HICANCAN.TOP
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
