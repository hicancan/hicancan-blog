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
            {/* Hamburger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative z-50 p-2 text-text-secondary hover:text-white transition-colors focus:outline-none"
                aria-label={isOpen ? "Close menu" : "Open menu"}
            >
                <div className="w-6 h-5 relative flex flex-col justify-between">
                    <span
                        className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2.5 bg-accent" : ""
                            }`}
                    />
                    <span
                        className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${isOpen ? "opacity-0 translate-x-4" : "opacity-100"
                            }`}
                    />
                    <span
                        className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2 bg-accent" : ""
                            }`}
                    />
                </div>
            </button>

            {/* Backdrop & Menu Container */}
            <div
                className={`fixed inset-0 z-40 bg-main/90 backdrop-blur-3xl transition-all duration-500 ease-in-out ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
            >
                {/* Nebula Effects in Menu */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] opacity-50 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-[100px] opacity-50 pointer-events-none"></div>

                <div className="flex flex-col items-center justify-center h-full space-y-8">
                    {NAV_ITEMS.map((item, index) => (
                        <a
                            key={item.path}
                            href={item.path}
                            onClick={() => setIsOpen(false)}
                            className={`text-2xl font-bold font-sans tracking-tight text-white/80 hover:text-accent transition-all duration-500 transform ${isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                                }`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <span className="text-xl text-accent/50 mr-2 font-mono">0{index + 1}.</span>
                            {item.name}
                        </a>
                    ))}

                    {/* Decor line */}
                    <div
                        className={`w-12 h-1 bg-white/10 rounded-full mt-8 transition-all duration-700 delay-500 ${isOpen ? "w-24 bg-accent/50" : "w-0"
                            }`}
                    ></div>
                </div>
            </div>
        </div>
    );
}
