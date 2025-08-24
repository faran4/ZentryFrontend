import React, {useEffect, useRef, useState} from 'react'
import Button from "./Button.jsx";
import {TiLocationArrow} from "react-icons/ti";
import { useWindowScroll} from "react-use";
import gsap from "gsap";

const navItems = ['Nexus', 'Vault', 'Prologue', 'About', 'Contact'];

const Navbar = () => {
    const navContainerRef = useRef(null);
    const navItemsRef = useRef(null);
    const audioElementRef = useRef(null);
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [isIndicatorActive, setIndicatorActive] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isNavVisible, setIsNavVisible] = useState(true);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [bgStyle, setBgStyle] = useState({});
    const [hasUserInteracted, setHasUserInteracted] = useState(false);
    const { y: currentScrollY } = useWindowScroll();

    const toggleAudioIndicator = () => {
        setIsAudioPlaying((prev) => !prev);
        setIndicatorActive((prev) => !prev);
    }

    // Function to start audio on first user interaction
    const handleFirstUserInteraction = () => {
        if (!hasUserInteracted && audioElementRef.current) {
            setHasUserInteracted(true);
            setIsAudioPlaying(true);
            setIndicatorActive(true);
            audioElementRef.current.play().catch(error => {
                console.log("Audio autoplay failed:", error);
            });
        }
    };

    const handleMouseEnter = (index, event) => {
        const navContainer = navItemsRef.current;
        const targetElement = event.currentTarget;

        if (navContainer && targetElement) {
            const containerRect = navContainer.getBoundingClientRect();
            const targetRect = targetElement.getBoundingClientRect();

            setBgStyle({
                opacity: 1,
                width: targetRect.width,
                height: targetRect.height,
                transform: `translateX(${targetRect.left - containerRect.left}px)`,
                transition: 'all 0.3s ease'
            });
        }
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setBgStyle(prev => ({
            ...prev,
            opacity: 0,
            transition: 'all 0.3s ease'
        }));
        setHoveredIndex(null);
    };

    // Add event listener for first user interaction
    useEffect(() => {
        const handleClick = () => {
            handleFirstUserInteraction();
        };

        const handleKeyDown = () => {
            handleFirstUserInteraction();
        };

        // Add event listeners to document for any click or keypress
        if (!hasUserInteracted) {
            document.addEventListener('click', handleClick, { once: true });
            document.addEventListener('keydown', handleKeyDown, { once: true });
        }

        // Cleanup function
        return () => {
            document.removeEventListener('click', handleClick);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [hasUserInteracted]);

    useEffect(() => {
        if(currentScrollY === 0) {
            setIsNavVisible(true);
            navContainerRef.current.classList.remove('floating-nav');
        } else if(currentScrollY > lastScrollY) {
            setIsNavVisible(false);
            navContainerRef.current.classList.add('floating-nav');
        } else if(currentScrollY < lastScrollY) {
            setIsNavVisible(true);
            navContainerRef.current.classList.add('floating-nav');
        }

        setLastScrollY(currentScrollY);
    }, [currentScrollY, lastScrollY]);

    useEffect(() => {
        gsap.to(navContainerRef.current, {
            y: isNavVisible ? 0 : -100,
            opacity: isNavVisible ? 1 : 0,
            duration: 0.2,
        })
    }, [isNavVisible]);

    useEffect(() => {
        if(isAudioPlaying) {
            audioElementRef.current.play();
        } else {
            audioElementRef.current.pause();
        }
    }, [isAudioPlaying]);

    return (
        <div ref={navContainerRef} className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6">
            <header className="absolute top-1/2 w-full -translate-y-1/2">
                <nav className="flex size-full items-center justify-between p-4">
                    <div className="flex items-center gap-2">
                        <img src="/img/logo1.png" alt="logo" className="w-12" />

                        <Button
                            id="product-button"
                            title="Products"
                            rightIcon={<TiLocationArrow />}
                            containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
                        />

                        <Button
                            id="product-button"
                            title="WhitePaper"
                            containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
                        />
                    </div>
                    <div className="flex items-center h-full">
                        <div
                            ref={navItemsRef}
                            className="relative hidden md:flex items-center gap-4"
                            onMouseLeave={handleMouseLeave}
                        >
                            {/* Sliding background */}
                            <div
                                className="absolute top-0 left-0 bg-white rounded-full pointer-events-none z-0"
                                style={bgStyle}
                            />

                            {/* Nav items */}
                            {navItems.map((item, index) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    className={`nav-hover-btn flex items-center gap-1 relative z-10 ${
                                        hoveredIndex === index ? 'text-black' : 'text-blue-50'
                                    }`}
                                    onMouseEnter={(e) => handleMouseEnter(index, e)}
                                >
                                    {item} <TiLocationArrow />
                                </a>
                            ))}
                        </div>
                        <button className="ml-10 flex item-center space-x-0.5" onClick={toggleAudioIndicator}>
                            <audio ref={audioElementRef} className="hidden" src="/audio/music_main.mp3" loop />
                            {[1, 2, 3, 4].map((bar) =>
                                <div key={bar} className={`indicator-line ${isIndicatorActive ? 'active' : 'i'}`} style={{
                                    animationDelay: `${bar * 0.1}s`
                                }} />
                            )}
                        </button>
                    </div>
                </nav>
            </header>
        </div>
    )
}

export default Navbar