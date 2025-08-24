import React, { useRef, useState } from 'react'
import AnimatedTitle from "./AnimatedTitle.jsx";
import Button from "./Button.jsx";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

// Custom ImageTilt component with reverse tilt and zoom
const ImageTilt = ({ src, className = '' }) => {
    const [transformStyle, setTransformStyle] = useState('');
    const [imageTransform, setImageTransform] = useState('');
    const containerRef = useRef(null);
    const imageRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;

        const { left, top, width, height } = containerRef.current.getBoundingClientRect();

        const relativeX = (e.clientX - left) / width;
        const relativeY = (e.clientY - top) / height;

        // Reverse tilt - moving away from cursor
        const tiltX = (relativeY - 0.5) * -15;  // Negative for reverse effect
        const tiltY = (relativeX - 0.5) * 15;   // Positive for reverse effect

        // Image pan effect - moves opposite to reveal hidden parts
        const panX = (relativeX - 0.5) * -20;   // Pan horizontally
        const panY = (relativeY - 0.5) * -20;   // Pan vertically

        // Container transform with perspective and tilt
        const containerTransform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        setTransformStyle(containerTransform);

        // Image transform - scale up and pan to reveal hidden parts
        const imgTransform = `scale(1.15) translate(${panX}px, ${panY}px)`;
        setImageTransform(imgTransform);
    }

    const handleMouseLeave = () => {
        setTransformStyle('');
        setImageTransform('');
    }

    // Scroll-triggered animation
    useGSAP(() => {
        if (containerRef.current) {
            gsap.set(containerRef.current, {
                y: 80,
                opacity: 0,
                scale: 0.9,
            });

            gsap.to(containerRef.current, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                }
            })
        }
    }, []);

    return (
        <div
            ref={containerRef}
            className={`overflow-hidden rounded-xl border border-black ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: transformStyle,
                transformStyle: 'preserve-3d',
                transition: 'transform 0.2s ease-out',
            }}
        >
            <img
                ref={imageRef}
                src={src}
                className="w-full h-full object-cover"
                style={{
                    transform: imageTransform,
                    transition: 'transform 0.3s ease-out',
                }}
                alt="Update"
            />
        </div>
    );
};

const Updates = () => {
    return (
        <section id="Updates" className="relative w-screen py-40 flex bg-blue-50 text-black">
            {/* Left sticky container */}
            <div className="w-1/2 h-full sticky top-0">
                <div
                    id="updates-title"
                    className="h-full ml-12 pt-8 flex flex-col gap-4">
                    <AnimatedTitle
                        title="Lat<b>e</b>st <br /><b>U</b>pdates"
                        alignment="left"
                        containerClass="pointer-events-none relative z-10"
                    />
                    <h2 className="font-family-robert-regular mt-4 text-sm uppercase ml-10 md:text-[12px] tracking-wide">
                        Stay updated with the latest news, events, <br />and updates in our ecosystem. Be part of <br />our universe's growth and evolution.
                    </h2>
                    <Button
                        id="updates-button"
                        title="Read All News"
                        containerClass="flex !bg-black !text-white items-center justify-center ml-8 mt-4"
                    />
                </div>
            </div>

            {/* Right scrollable content */}
            <div className="w-1/2 mr-12">
                <div className="flex flex-col items-center justify-center">
                    <div className="w-full p-12">
                        <ImageTilt
                            src="/img/Updatephoto.webp"
                            className="w-full aspect-video"
                        />
                        <div className="flex w-full justify-baseline mt-4">
                            <p className="w-1/4 font-family-general text-sm uppercase md:text-[10px] ml-4 tracking-wide">
                                09.05.2024
                            </p>
                            <h2 className="w-3/4 font-family-robert-medium text-sm md:text-[16px] tracking-tight">
                                Nexus: Zentry's Metagame Portal <br />Bridging Human & AI in the Global <br />Play Economy.
                            </h2>
                        </div>
                    </div>
                    <div className="w-full p-12">
                        <ImageTilt
                            src="/img/Updatephoto1.webp"
                            className="w-full aspect-video"
                        />
                        <div className="flex w-full justify-baseline mt-4">
                            <p className="w-1/4 font-family-general text-sm uppercase md:text-[10px] ml-4 tracking-wide">
                                22.11.2024
                            </p>
                            <h2 className="w-3/4 font-family-robert-medium text-sm md:text-[16px] tracking-tight">
                                Zentry Whitepaper: The Blueprint to<br />the Metagame
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Updates