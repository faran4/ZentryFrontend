import React, {useEffect, useRef} from 'react'
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AnimatedTitle = ({ title, containerClass, alignment = "center" }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Set initial state for the container and words
            gsap.set(containerRef.current, {
                x: -300,
                rotationY: 120, // More dramatic rotation
                z: -200, // Start deeper back
                y: 0
            });

            gsap.set('.animated-word', {
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
                            x: -300,
                            rotationY: 120,
                            z: -200,
                            y: 0
                        });
                        gsap.set('.animated-word', {
                            opacity: 0
                        });
                        appearAnimation.restart();
                    }
                    // markers: true
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
                }, 0.2);

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
                            x: -300,
                            rotationY: 120,
                            z: -200,
                            y: 0
                        });
                        gsap.set('.animated-word', {
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
    }, [title]); // Added title as dependency

    const getFlexClasses = () => {
        switch(alignment) {
            case 'left':
                return 'flex items-center justify-start';
            case 'right':
                return 'flex items-center justify-end';
            case 'center':
            default:
                return 'flex justify-center items-center';
        }
    };

    return (
        <div ref={containerRef} className={`animated-title special-font font-family-zentry ${containerClass}`}>
            {title.split('<br />').map((line, index) => (
                <div key={index} className={`${getFlexClasses()} max-w-full flex-wrap gap-2 px-10 md:gap-3`}>
                    {line.split(' ').map((word, i) => (
                        <span
                            key={i}
                            className="animated-word"
                            dangerouslySetInnerHTML={{ __html: word }}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default AnimatedTitle;