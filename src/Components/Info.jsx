import React, {useEffect, useRef, useState} from 'react';
import Button from "./Button.jsx";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

const InteractiveSquare = ({ image, altText }) => {
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef(null);
    const imageRef = useRef(null);
    const hasAnimatedIn = useRef(false);
    const animationFrame = useRef(null);

    useEffect(() => {
        if (isHovered && containerRef.current && !hasAnimatedIn.current) {
            hasAnimatedIn.current = true;

            // Set initial state with larger image for parallax reveal
            gsap.set(containerRef.current, {
                opacity: 0,
                scale: 0
            });

            // Animate in with spring effect
            gsap.to(containerRef.current, {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                ease: "back.out(1.7)"
            });
        }

        // Reset flag when hover ends
        if (!isHovered) {
            hasAnimatedIn.current = false;
        }
    }, [isHovered]);

    const handleMouseMove = (e) => {
        if (!containerRef.current || !imageRef.current) return;

        // Cancel any pending animation frame
        if (animationFrame.current) {
            cancelAnimationFrame(animationFrame.current);
        }

        animationFrame.current = requestAnimationFrame(() => {
            const rect = containerRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // Calculate mouse position relative to center
            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;

            // Normalize values between -1 and 1
            const xRatio = mouseX / (rect.width / 2);
            const yRatio = mouseY / (rect.height / 2);

            // Calculate tilt for container (3D effect)
            const rotateY = xRatio * 12; // Reduced for smoother effect
            const rotateX = -yRatio * 12;

            // Apply 3D tilt to container
            gsap.to(containerRef.current, {
                rotationY: rotateY,
                rotationX: rotateX,
                duration: 0.1,
                ease: "none",
                transformPerspective: 1000,
                overwrite: 'auto'
            });

            // Apply parallax movement to image (opposite direction)
            // This reveals hidden parts of the image
            gsap.to(imageRef.current, {
                x: -mouseX * 0.15, // Move image opposite to mouse
                y: -mouseY * 0.15,
                duration: 0.1,
                ease: "none",
                overwrite: 'auto'
            });
        });
    };

    const handleMouseLeave = () => {
        // Cancel any pending animation frame
        if (animationFrame.current) {
            cancelAnimationFrame(animationFrame.current);
        }

        if (containerRef.current && imageRef.current) {
            // Animate out smoothly
            gsap.to(containerRef.current, {
                opacity: 0,
                scale: 0.8,
                rotationY: 0,
                rotationX: 0,
                duration: 0.3,
                ease: "power2.out",
                onComplete: () => {
                    setIsHovered(false);
                }
            });

            // Reset image position
            gsap.to(imageRef.current, {
                x: 0,
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        }
    };

    // Cleanup animation frame on unmount
    useEffect(() => {
        return () => {
            if (animationFrame.current) {
                cancelAnimationFrame(animationFrame.current);
            }
        };
    }, []);

    return (
        <div className="inline-block align-middle relative">
            <div
                className="relative inline-block"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
            >
                {/* Small square trigger */}
                <div
                    id="squared"
                    className="w-[0.4em] h-[0.4em] mb-[14px] mx-3 square bg-black rounded-lg cursor-pointer" />

                {/* Image popup with parallax */}
                {isHovered && (
                    <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
                        style={{
                            pointerEvents: 'none',
                            perspective: '1000px' // Add perspective to parent for better 3D
                        }}
                    >
                        <div
                            ref={containerRef}
                            className="w-[300px] h-[200px] md:w-[300px] md:h-[250px] overflow-hidden rounded-lg shadow-2xl"
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            style={{
                                transformStyle: 'preserve-3d',
                                pointerEvents: 'auto',
                                willChange: 'transform' // Optimize for animations
                            }}
                        >
                            {/* Image wrapper for parallax effect */}
                            <div
                                ref={imageRef}
                                className="absolute inset-0 w-[120%] h-[120%] -top-[10%] -left-[10%]"
                                style={{
                                    willChange: 'transform' // Optimize for animations
                                }}
                            >
                                <img
                                    src={image}
                                    alt={altText}
                                    className="w-full h-full object-cover"
                                    draggable={false}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const Info = () => {
    const containerRef = useRef(null);

    const images = {
        square1: "img/entry-1.webp",
        square2: "img/entry-2.webp",
        square3: "img/entry-3.webp",
    };

    // Original content structure with squares
    const content = [
        { text: "We're building", words: ["We're", "b<b>u</b>ilding"] },
        {
            text: "a new Reality",
            words: ["a", "new"],
            square: { after: 1, image: images.square1 }, // Square after "new"
            lastWord: "Realit<b>y</b>"
        },
        { text: "that rewards", words: ["that", "rew<b>a</b>rds"] },
        {
            text: "players And",
            words: ["play<b>e</b>rs"],
            square: { after: 0, image: images.square2 }, // Square after "players"
            lastWord: "And"
        },
        { text: "empowers", words: ["e<b>m</b>powers"] },
        { text: "humans & AI", words: ["hu<b>m</b>ans", "&", "AI"] },
        {
            text: "to Thrive",
            words: ["to"],
            square: { after: 0, image: images.square3 }, // Square after "to"
            lastWord: "Thri<b>v</b>e"
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Set initial state for the container and words
            gsap.set(containerRef.current, {
                x: -500,
                rotationY: 135, // More dramatic rotation
                z: -500, // Start deeper back
                y: 0
            });

            gsap.set('.animated-word', {
                opacity: 0
            });

            gsap.set('.square', {
                opacity: 0
            });

            // Appearing animation - plays every time when scrolling down
            const appearAnimation = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                    end: 'top 80%',
                    toggleActions: 'play none none none',
                    invalidateOnRefresh: true,
                    refreshPriority: -1,
                    onEnter: () => {
                        // Reset to initial state before animating
                        gsap.set(containerRef.current, {
                            x: -500,
                            rotationY: 135,
                            z: -500,
                            y: 0
                        });
                        gsap.set('.animated-word', {
                            opacity: 0
                        });
                        gsap.set('.square', {
                            opacity: 0
                        });
                        appearAnimation.restart();
                    }
                }
            });

            // Animate the parent container with orbital motion (for appearing)
            appearAnimation.to(containerRef.current, {
                x: 0,
                rotationY: 0,
                duration: 1,
                ease: 'power2.out',
                onUpdate: function() {
                    const progress = this.progress();

                    // Create orbital path for the entire container
                    const angle = Math.PI + (Math.PI * 0.3 * progress); // Larger arc
                    const radius = 100 * (1 - progress); // Increased radius for more depth

                    // Add orbital motion
                    const orbitY = -Math.sin(angle) * radius;
                    const orbitZ = -Math.cos(angle) * radius; // Full depth effect

                    // Apply the orbital transform to container
                    gsap.set(containerRef.current, {
                        y: orbitY,
                        z: orbitZ,
                    });
                }
            })
                // Animate words with staggered fade in
                .to('.animated-word', {
                    opacity: 1,
                    duration: 0.6,
                    ease: 'power2.out',
                    stagger: 0.05,
                }, 0.2)
                .to('.square', {
                    opacity: 1,
                    duration: 0.6,
                    onComplete: () => {
                        // Add pulsing animation after squares appear
                        gsap.to('.square', {
                            scale: 1.2,
                            duration: 0.7,
                            ease: 'easeInOut',
                            repeat: -1,  // Infinite repeat
                            yoyo: true,  // Goes back and forth
                        });
                    }
                });


            // Hiding animation - only triggers when scrolling back up past the element
            const hideAnimation = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                    end: 'top 80%',
                    toggleActions: 'none none none none',
                    invalidateOnRefresh: true,
                    refreshPriority: -2,
                    onLeaveBack: () => {
                        // This fires when scrolling back up past the start point
                        hideAnimation.restart();
                    }
                }
            });

            // Hiding animation sequence
            hideAnimation.to('.animated-word', {
                opacity: 0,
                duration: 0.4,
                ease: 'power2.in',
                stagger: 0.03,
            })
                .to(containerRef.current, {
                    x: 300, // Move to the right when hiding
                    y: 100, // Move down when hiding
                    rotationY: -60, // Rotate in opposite direction when hiding
                    z: -150, // Move back in depth when hiding
                    duration: 0.8,
                    ease: 'power2.in',
                    onComplete: () => {
                        // Reset to initial hidden state after hiding animation completes
                        gsap.set(containerRef.current, {
                            x: -500,
                            rotationY: 135,
                            z: -500,
                            y: 0
                        });
                        gsap.set('.animated-word', {
                            opacity: 0
                        });
                        gsap.set('.square', {
                            opacity: 0
                        });
                    }
                }, 0.1);

            // Pause the hide animation initially
            hideAnimation.pause();

        }, containerRef);

        // Refresh ScrollTrigger after setup
        ScrollTrigger.refresh();

        return () => {
            ctx.revert();
            ScrollTrigger.refresh();
        };
    }, [content]);

    return (
        <section id="info" className="min-h-screen w-screen bg-[#dfdff0] py-40 ">
            <div className="flex flex-col gap-4 my-4 items-center mx-auto container px-4">
                <h2 className="font-family-general text-sm uppercase my-4 md:text-[10px] tracking-widest">
                    WHO WE ARE
                </h2>

                <div
                    ref={containerRef}
                    className="flex flex-col text-7xl uppercase gap-1 leading-[0.8] md:text-[6.8rem] my-3"
                >
                    {content.map((line, lineIndex) => (
                        <div key={lineIndex} className="flex items-center justify-center max-w-full flex-wrap gap-3 px-10 md:gap-4">
                            {line.words.map((word, wordIndex) => (
                                <React.Fragment key={wordIndex}>
                                    <span
                                        className="animated-word special-font font-family-zentry font-black"
                                        dangerouslySetInnerHTML={{ __html: word }}
                                    />
                                    {line.square && line.square.after === wordIndex && (
                                        <InteractiveSquare
                                            image={line.square.image}
                                            altText={`Interactive image`}
                                        />
                                    )}
                                </React.Fragment>
                            ))}
                            {line.lastWord && (
                                <span
                                    className="animated-word special-font font-family-zentry font-black"
                                    dangerouslySetInnerHTML={{ __html: line.lastWord }}
                                />
                            )}
                        </div>
                    ))}
                </div>

                <div className="max-w-96 text-center !font-thin font-family-circular-web text-md md:max-w-[34rem]">
                    <p>Zentry envisions a future where players, emerging tech, and <br /> a new economy unite at the convergence of gaming and AI.</p>
                </div>

                <Button
                    id="discover-button"
                    title="Discover Who We Are"
                    containerClass="md:flex hidden items-center justify-center gap-1"
                />
            </div>
        </section>
    );
};

export default Info;