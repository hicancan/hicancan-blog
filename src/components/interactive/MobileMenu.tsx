import React, { useState, useEffect } from 'react';
import { NAV_ITEMS } from '../../config';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll';
import { IconClose } from '../icons/IconClose';
import { IconMenu } from '../icons/IconMenu';

interface MobileMenuProps {
    currentPath?: string;
}

export default function MobileMenu({ currentPath = '' }: MobileMenuProps) {
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
                    <IconMenu className="w-6 h-6" />
                </button>
            )}

            {/* Full Screen Menu Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 w-screen h-screen bg-main/95 backdrop-blur-3xl overflow-hidden"
                    style={{ zIndex: 99999 }}
                >
                    {/* Global background is already present, so we rely on transparency or just clean dark theme */}

                    {/* Close Button - Fixed at top right */}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-6 right-6 p-2 text-white/80 hover:text-accent transition-colors focus:outline-none"
                        aria-label="Close menu"
                    >
                        <IconClose className="w-8 h-8" />
                    </button>

                    {/* Menu Content - Centered */}
                    <div className="flex flex-col items-center justify-center h-full w-full px-8">
                        <nav className="flex flex-col items-center space-y-6">
                            {NAV_ITEMS.map((item, index) => {
                                const isActive = currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path));
                                return (
                                    <a
                                        key={item.path}
                                        href={item.path}
                                        onClick={() => setIsOpen(false)}
                                        className={`text-2xl font-bold font-sans tracking-tight transition-colors duration-300 ${isActive ? 'text-accent' : 'text-white/90 hover:text-accent'}`}
                                    >
                                        <span className={`text-lg mr-3 font-mono ${isActive ? 'text-accent' : 'text-accent/60'}`}>
                                            0{index + 1}.
                                        </span>
                                        {item.name}
                                    </a>
                                )
                            })}
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
