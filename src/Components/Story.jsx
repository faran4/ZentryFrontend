import React, {useRef} from 'react'
import AnimatedTitle from "./AnimatedTitle.jsx";
import gsap from "gsap";
import RoundedCorners from "./RoundedCorners.jsx";
import Button from "./Button.jsx";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Story = () => {
    const frameRef = useRef(null);
    const typewriterRef = useRef(null); // Add ref for typewriter text

    const handleMouseLeave = () => {
        const element = frameRef.current;

        gsap.to(element, {
            duration: 0.3,
            rotateX: 0,
            rotateY: 0,
            ease: "power1.inOut"
        })
    }

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const element = frameRef.current;

        if(!element) return;

        const rect = element.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(element, {
            duration: 0.3,
            rotateX,
            rotateY,
            transformPerspective: 500,
            ease: 'power1.inOut',
        })
    }

    useGSAP(() => {
        // Typewriter effect for "the multiversal ip world"
        if(typewriterRef.current) {
            const text = "the multiversal ip world";
            const element = typewriterRef.current;

            // Start with empty text and set opacity
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

                    element.innerHTML = currentText + (showCursor && progress < 1 ? '<span class="text-blue-50 animate-pulse">|</span>' : '');

                    // Remove cursor when typing is complete
                    if (progress === 1) {
                        element.innerHTML = currentText;
                    }
                }
            });
        }
    }, []);

    return (
        <section id="story" className="min-h-dvh w-screen" style={{ backgroundColor: '#000000' }}>
            <div className="flex size-full flex-col items-center py-10 pb-24">
                <p
                    ref={typewriterRef}
                    className="font-family-general text-sm uppercase md:text-[10px]"
                >
                    {/* Text will be populated by GSAP animation */}
                </p>
                <div className="relative size-full">
                    <AnimatedTitle
                        title="The st<b>o</b>ry of <br /> a hidden real<b>m</b>"
                        sectionId="#story"
                        containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
                    />

                    <div className="story-img-container">
                        <div className="story-img-mask">
                            <div className="story-img-content">
                                <img
                                    ref={frameRef}
                                    onMouseLeave={handleMouseLeave}
                                    onMouseUp={handleMouseLeave}
                                    onMouseEnter={handleMouseLeave}
                                    onMouseMove={handleMouseMove}
                                    src="/img/entrance.webp"
                                    alt="entrance"
                                    className="size-full"/>
                            </div>
                        </div>
                        <RoundedCorners />
                    </div>
                </div>
                <div className="-mt-60 flex w-full justify-center md:-mt-64 md:me-44 md:justify-end">
                    <div className="flex h-full w-fit flex-col items-center md:items-start">
                        <p className="mt-3 max-w-sm text-center font-family-circular-web
                        md:text-start">
                            Where realms converge, lies Zentry and the boundless pillar. Discover its secrets and shape
                            your fate amidst infinite opportunities.</p>
                        <Button id="realm-button" title="discover prologue" containerClass="mt-5" />
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Story