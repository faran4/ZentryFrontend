import React, {useRef, useState} from 'react'
import gsap from 'gsap'
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle from "./AnimatedTitle.jsx";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const [isHovering, setIsHovering] = useState(false);
    const aboutImgRef = useRef(null);
    const borderRef = useRef(null);
    const containerRef = useRef(null);
    const typewriterRef = useRef(null); // Add ref for typewriter text

    const handleMouseMove = ({ clientX, clientY, currentTarget }) => {
        if(!aboutImgRef.current || !borderRef.current || !containerRef.current) return;

        const rect = currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate mouse position relative to center
        const mouseX = clientX - centerX;
        const mouseY = clientY - centerY;

        // Normalize values
        const xRatio = mouseX / (rect.width / 2);
        const yRatio = mouseY / (rect.height / 2);

        if (isHovering) {
            // Calculate tilt values for moving away from cursor
            const rotateY = -xRatio * 8; // Negative to move away from cursor
            const rotateX = yRatio * 8;  // Positive to move away from cursor

            // Subtle translate movement away from cursor
            const translateX = -mouseX * 0.05;
            const translateY = -mouseY * 0.05;

            // Apply tilt and movement to the entire container
            gsap.to(containerRef.current, {
                x: translateX,
                y: translateY,
                rotationY: rotateY,
                rotationX: rotateX,
                duration: 0.3,
                ease: "power2.out",
                transformPerspective: 1000,
                transformOrigin: "center center"
            });

            // Keep the existing parallax for border and image
            gsap.to(borderRef.current, {
                x: -mouseX * 0.15,
                y: -mouseY * 0.15,
                rotationY: rotateY * 0.5,
                rotationX: rotateX * 0.5,
                duration: 0.1,
                ease: "none",
                transformPerspective: 1000,
            });

            gsap.to(aboutImgRef.current, {
                x: -mouseX * 0.15,
                y: -mouseY * 0.15,
                rotationY: rotateY * 0.5,
                rotationX: rotateX * 0.5,
                duration: 0.1,
                ease: "none",
                transformPerspective: 1000,
            });
        }
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        if (aboutImgRef.current && borderRef.current && containerRef.current) {
            const resetConfig = {
                rotationY: 0,
                rotationX: 0,
                x: 0,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
            };

            // Reset container transform
            gsap.to(containerRef.current, resetConfig);
            gsap.to(aboutImgRef.current, resetConfig);
            gsap.to(borderRef.current, {
                rotationY: 0,
                rotationX: 0,
                x: 0,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
            });
        }
    };

    useGSAP(() => {
        // Typewriter effect for "Welcome to Zentry"
        if(typewriterRef.current) {
            const text = "Welcome to Zentry";
            const element = typewriterRef.current;

            // Start with empty text and invisible cursor
            gsap.set(element, {
                opacity: 1,
            });

            // Create typewriter animation
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: typewriterRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                }
            });

            // Animate the text typing
            tl.to({}, {
                duration: text.length * 0.08, // 0.08s per character
                ease: "none",
                onUpdate: function() {
                    const progress = this.progress();
                    const currentLength = Math.floor(progress * text.length);
                    const currentText = text.substring(0, currentLength);
                    const showCursor = Math.floor(Date.now() / 500) % 2; // Blinking cursor

                    element.innerHTML = currentText + (showCursor && progress < 1 ? '<span class="text-white animate-pulse">|</span>' : '');

                    // Remove cursor when typing is complete
                    if (progress === 1) {
                        element.innerHTML = currentText;
                    }
                }
            });
        }

        // Use matchMedia to handle responsive animations
        const mm = gsap.matchMedia();

        mm.add({
            // Mobile and tablet (below md breakpoint - 768px)
            isMobile: "(max-width: 767px)",
            // Desktop (md and above - 768px+)
            isDesktop: "(min-width: 768px)"
        }, (context) => {
            let { isMobile } = context.conditions;

            // Adjust ScrollTrigger settings based on screen size
            const clipAnimation = gsap.timeline({
                scrollTrigger: {
                    trigger: '#clip',
                    start: isMobile ? "top top+=100" : "center center",
                    end: isMobile ? "+=600 center" : "+=800 center",
                    scrub: isMobile ? 0.3 : 0.5,
                    pin: true,
                    pinSpacing: true,
                    invalidateOnRefresh: true,
                }
            });

            clipAnimation.to('.about-image', {
                width: '100vw',
                height: '100vh',
                borderRadius: 0,
            })
                // Animate BOTH clip paths to expand and fill the screen
                .to('#clip-path-shape', {
                    attr: {
                        d: 'M 0,0 L 1,0 Q 1,0 1,0 L 1,1 Q 1,1 1,1 L 0,1 Q 0,1 0,1 L 0,0 Q 0,0 0,0 Z'
                    },
                    ease: "none"
                }, 0)
                .to('#about-img', {
                    borderRadius: 0,
                    scale: 1,
                    width: '100%',
                    height: '100%',
                    x: 0,
                    y: 0,
                    top: 0,
                    left: 0,
                    ease: "none"
                }, 0);
        });

        return () => mm.revert();
    });

    return (
        <div id="about" className="min-h-screen w-screen">
            <div className="relative mb-8 mt-20 sm:mt-28 md:mt-36 flex flex-col items-center gap-3 sm:gap-4 md:gap-5">
                <h2
                    ref={typewriterRef}
                    className="font-family-general text-sm uppercase md:text-[10px]"
                >
                    {/* Text will be populated by GSAP animation */}
                </h2>

                {/* Mobile version - no breaks, smaller text */}
                <div className="block md:hidden">
                    <AnimatedTitle
                        title="Disc<b>o</b>ver the world's largest shared <b>a</b>dventure"
                        containerClass="mt-5 !text-black text-center !tracking-[0px]"
                    />
                </div>

                {/* Desktop version - with breaks, larger text */}
                <div className="hidden md:block">
                    <AnimatedTitle
                        title="Disc<b>o</b>ver the world's <br /> largest shared <b>a</b>dventure"
                        containerClass="mt-5 !text-black text-center"
                    />
                </div>

                <div className="about-subtext">
                    <p className="hidden md:flex">The Game of Games begins-your life, now an epic MMORPG <br /> Zentry unites every player from countless games and platforms</p>
                    <p className="md:hidden">The Game of Games begins-your life, now an epic MMORPG. Zentry unites every player from countless games and platforms</p>
                </div>
            </div>

            <div className="h-dvh w-screen" id="clip">
                <div
                    ref={containerRef}
                    className="about-image"
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={handleMouseLeave}
                    style={{
                        // Add 3D perspective to the container
                        perspective: '1000px',
                        transformStyle: 'preserve-3d',
                    }}
                >
                    {/* SVG definitions for clip paths */}
                    <svg className="absolute w-0 h-0">
                        <defs>
                            <clipPath id="rounded-polygon-clip" clipPathUnits="objectBoundingBox">
                                <path
                                    id="clip-path-shape"
                                    d="M 0.1,0.1 L 0.7,0.2 Q 0.9,0.3 0.7,0.2 L 0.9,0.85 Q 0.85,0.9 0.9,0.85 L 0.1,0.95 Q 0.1,0.9 0.1,0.85 L 0.1,0.15 Q 0.1,0.5 0.1,0.2 Z"
                                />
                            </clipPath>

                            {/* Border clip path - just 1px larger */}
                            <clipPath id="border-clip" clipPathUnits="objectBoundingBox">
                                <path
                                    id="border-clip-shape"
                                    d="M 0.098,0.098 L 0.702,0.198 Q 0.902,0.298 0.702,0.198 L 0.902,0.852 Q 0.848,0.902 0.902,0.852 L 0.098,0.952 Q 0.098,0.902 0.098,0.852 L 0.098,0.148 Q 0.098,0.498 0.098,0.198 Z"
                                />
                            </clipPath>
                        </defs>
                    </svg>

                    {/* Black border background - acts as the border */}
                    <div
                        className="border-container absolute left-0 top-0 h-full w-full overflow-hidden"
                        style={{
                            clipPath: 'url(#border-clip)',
                            WebkitClipPath: 'url(#border-clip)',
                            transform: 'scale(1)',
                            transformOrigin: 'center center',
                        }}
                    >
                        {/* Black background inside container - larger to show during tilt */}
                        <div
                            ref={borderRef}
                            className="border-bg absolute bg-black"
                            style={{
                                transformStyle: 'preserve-3d',
                                width: '100%',
                                height: '100%',
                                top: '0%',
                                left: '0%',
                            }}
                        />
                    </div>

                    {/* Image container with overflow hidden to create clipping effect */}
                    <div
                        className="image-container absolute left-0 top-0 h-full w-full overflow-hidden"
                        style={{
                            clipPath: 'url(#rounded-polygon-clip)',
                            WebkitClipPath: 'url(#rounded-polygon-clip)',
                            transform: 'scale(1)',
                            transformOrigin: 'center center',
                        }}
                    >
                        {/* Image inside container - larger to show hidden parts */}
                        <img
                            ref={aboutImgRef}
                            id="about-img"
                            src="img/about.webp"
                            alt="Background"
                            className="absolute object-cover z-10"
                            style={{
                                transformStyle: 'preserve-3d',
                                width: '100%',
                                height: '100%',
                                top: '0%',
                                left: '0%',
                            }}
                        />
                    </div>
                </div>

                <img
                    src="img/aboutimg1.webp"
                    alt="cover"
                    className="absolute -left-2 sm:-left-3 md:-left-4 lg:-left-5 -top-16 sm:-top-20 md:-top-25 lg:-top-30 w-[140%] sm:w-[130%] md:w-[125%] lg:w-[120%] h-[140%] sm:h-[130%] md:h-[125%] lg:h-[120%] object-cover z-50 pointer-events-none"
                />
            </div>
        </div>
    )
}

export default About