import { useState, useEffect } from 'react';
import { NAV_ITEMS, SITE_CONFIG } from '../../config';
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
                    className="text-text-secondary relative p-2 transition-colors hover:text-white focus:outline-none"
                    aria-label="Open menu"
                >
                    <IconMenu className="h-6 w-6" />
                </button>
            )}

            {/* Full Screen Menu Overlay */}
            {isOpen && (
                <div className="bg-main/95 z-overlay fixed inset-0 h-screen w-screen overflow-hidden backdrop-blur-3xl">
                    {/* Global background is already present, so we rely on transparency or just clean dark theme */}

                    {/* Close Button - Fixed at top right */}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="hover:text-accent absolute top-6 right-6 p-2 text-white/80 transition-colors focus:outline-none"
                        aria-label="Close menu"
                    >
                        <IconClose className="h-8 w-8" />
                    </button>

                    {/* Menu Content - Centered */}
                    <div className="flex h-full w-full flex-col items-center justify-center px-8">
                        <nav className="flex flex-col items-center space-y-6">
                            {NAV_ITEMS.map((item, index) => {
                                const isActive =
                                    currentPath === item.path ||
                                    (item.path !== '/' && currentPath.startsWith(item.path));
                                return (
                                    <a
                                        key={item.path}
                                        href={item.path}
                                        onClick={() => setIsOpen(false)}
                                        className={`font-sans text-2xl font-bold tracking-tight transition-colors duration-300 ${isActive ? 'text-accent' : 'hover:text-accent text-white/90'}`}
                                    >
                                        <span
                                            className={`mr-3 font-mono text-lg ${isActive ? 'text-accent' : 'text-accent/60'}`}
                                        >
                                            0{index + 1}.
                                        </span>
                                        {item.name}
                                    </a>
                                );
                            })}
                        </nav>

                        {/* Decorative line */}
                        <div className="bg-accent/40 mt-10 h-1 w-20 rounded-full" />

                        {/* Site name */}
                        <p className="mt-8 font-mono text-sm tracking-widest text-white/30">
                            {SITE_CONFIG.ui.mobileMenu.siteName}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
