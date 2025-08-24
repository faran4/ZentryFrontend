import React, {useRef, useState} from 'react'
import AnimatedTitle from "./AnimatedTitle.jsx";
import Button from "./Button.jsx";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";

const Backers = [
    "Coinbase Ventures",
    "Yzi Labs",
    "Spartan",
    "LongHash",
    "Pantera Capital",
    "Animoca Brands",
    "Defiance Capital",
    "Play Ventures",
    "Skyvision Capital",
    "Vessel Capital",
    "Arche Fund",
    "Synergis"
]

const Glance = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isHoveredCard2, setIsHoveredCard2] = useState(false);
    const [isHoveredCard6, setIsHoveredCard6] = useState(false);
    const btnRef = useRef(null);
    const cardRefs = useRef([]);
    const typewriterRef = useRef(null);

    useGSAP(() => {
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

        if (btnRef.current) {
            gsap.set(btnRef.current, {y: 100, opacity: 0});
            gsap.to(btnRef.current, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power1.out",
                scrollTrigger: {
                    trigger: btnRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                }
            })
        }

        cardRefs.current.forEach((card, index) => {
            if (card) {
                gsap.set(card, {
                    y: 100,
                    z: -200,
                    rotationX: -45,
                    opacity: 0,
                    transformPerspective: 1000,
                });

                gsap.to(card, {
                    y: 0,
                    z: 0,
                    rotationX: 0,
                    opacity: 1,
                    duration: 0.8,
                    // delay: index * 0.1, // Stagger effect
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    }
                });
            }
        })
    }, []);

    return (
        <section id="Glance" className="py-40 w-screen">
            <div
                id="glance-title"
                className="w-full flex flex-col gap-4 pb-8">
                <h2 ref={typewriterRef} className="font-family-general text-sm uppercase ml-10 md:text-[10px] tracking-widest">
                    Our universe in a nutshell
                </h2>
                <AnimatedTitle
                    title="Ze<b>n</b>try at a <br />Glan<b>c</b>e"
                    alignment="left"
                    containerClass="pointer-events-none relative z-10"
                />
            </div>
            <div className="container mx-auto pt-16 px-4 pb-16 max-w-5xl">
                <div className="grid grid-cols-8 auto-rows-[140px] gap-8">

                    {/* Card 1 - Top Left */}
                    <div
                        ref={el => cardRefs.current[0] = el}
                        className="col-start-1 col-span-4 row-start-2 row-span-2 flex bg-black border border-white/30 rounded-lg p-4">
                        <div className="flex flex-col gap-1 w-1/2">
                            <h2 className="font-family-general text-md text-blue-50 md:text-[13px] leading-tight">
                                Products
                            </h2>
                            <h1 className="font-family-zentry special-font font-black text-blue-50 text-6xl md:text-8xl">4<b>+</b></h1>
                        </div>
                        <div className="w-1/2 flex items-center justify-center overflow-hidden">
                            <video
                                src="/videos/card-1.webm"
                                loop
                                muted
                                autoPlay
                                playsInline
                                className="w-full h-full object-contain"
                                style={{
                                    transform: 'scale(2) translateX(-50px)'
                                }}
                            />
                        </div>
                    </div>

                    {/* Card 2 - Top Right */}
                    <div
                        ref={el => cardRefs.current[1] = el}
                        className="col-start-5 col-span-4 row-start-1 row-span-4 bg-violet-300 text-black rounded-lg flex items-center justify-center p-6 relative cursor-pointer overflow-hidden"
                        onMouseEnter={() => setIsHoveredCard2(true)}
                        onMouseLeave={() => setIsHoveredCard2(false)}
                    >
                        <div className="absolute bottom-0 left-0 w-full h-[100%] z-10 pointer-events-none">
                            <img
                                src="/img/card2pic.webp"
                                className="w-full h-full object-cover rounded-b-lg"
                            />
                        </div>

                        <div className="absolute top-3 left-3">
                            <h2 className="font-family-general text-md text-black md:text-[13px] leading-tight">
                                Residents
                            </h2>
                        </div>

                        {/* Numbers - Centered */}
                        <div
                            style={{
                                transition: 'all 0.7s cubic-bezier(0.68, -0.35, 0.32, 1.35)',
                                transform: isHoveredCard2
                                    ? 'translateX(10px)translateY(-210px) matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
                                    : 'translateX(70px)translateY(-200px) matrix3d(1, -0.187196, 0, 0.003315, 0, 0.75, 0, 0, 0, 0, 1, 0, 75.4141, -14.1172, 0, 1)',
                            }}
                        >
                            <div className="flex font-family-zentry items-baseline"
                                 style={{
                                     transition: 'all 0.7s cubic-bezier(0.68, -0.35, 0.32, 1.35)',
                                 }}>
                                <span
                                    className="font-black text-black leading-none"
                                    style={{
                                        fontSize: '10rem',
                                        fontWeight: '900',
                                        marginRight: isHoveredCard2 ? "3rem" : "0.2rem",
                                        transition: 'all 0.7s cubic-bezier(0.68, -0.35, 0.32, 1.35)',
                                        transform: isHoveredCard2 ? 'scaleX(2)' : 'scaleX(0.8)'
                                    }}
                                >
                                    5
                                </span>
                                <span
                                    className="font-black text-black leading-none"
                                    style={{
                                        fontSize: '10rem',
                                        fontWeight: '900',
                                        transform: isHoveredCard2 ? 'scaleX(1.4)' : 'scaleX(1.3)',
                                        marginRight: isHoveredCard2 ? "1.9rem" : "1.6rem",
                                        transition: 'all 0.7s cubic-bezier(0.68, -0.35, 0.32, 1.35)'
                                    }}
                                >
                                 0
                                </span>
                                <span
                                    className="font-black text-black leading-none"
                                    style={{
                                        fontSize: '10rem',
                                        fontWeight: '900',
                                        marginRight: isHoveredCard2 ? "0.9rem" : "0.9rem",
                                        transform: 'scaleX(1.4)',
                                        transition: 'all 0.7s cubic-bezier(0.68, -0.35, 0.32, 1.35)',
                                    }}
                                >
                                 0
                                </span>
                                <span
                                    className="font-black special-font text-black leading-none"
                                    style={{
                                        fontSize: '10rem',
                                        fontWeight: '900',
                                        transition: 'all 0.7s cubic-bezier(0.68, -0.35, 0.32, 1.35)',
                                        marginRight: "0.3rem",
                                        transform: isHoveredCard2 ? 'scaleX(1)' : 'scaleX(1)',
                                    }}
                                >
                                <b>K</b>
                                </span>
                                <sup
                                    className="font-black text-black"
                                    style={{
                                        fontSize: '6rem',
                                        fontWeight: '900',
                                        transform: 'scaleX(1.5)',
                                        transition: 'all 0.7s cubic-bezier(0.68, -0.35, 0.32, 1.35)',
                                    }}
                                >
                                    +
                                </sup>
                            </div>
                        </div>
                    </div>

                    {/* Card 3 - Always Centered */}
                    <div
                        ref={el => cardRefs.current[2] = el}
                        className="col-start-2 col-span-3 row-start-4 row-span-2 bg-yellow-300 text-black rounded-lg flex items-center justify-center p-6 relative cursor-pointer overflow-hidden"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        {/* Numbers - Always Centered */}
                        <div
                            style={{
                                transition: 'all 0.7s cubic-bezier(0.68, -0.35, 0.32, 1.35)',
                                transform: isHovered
                                    ? 'translateX(10px)translateY(-50px)matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
                                    : 'translateX(50px)translateY(-50px)matrix3d(0.99, -0.236771, 0, 0.004, 0, 0.82104, 0, 0, 0, 0, 1, 0, 33.9316, -10.5929, 0, 1)',
                            }}
                        >
                            <div className="flex font-family-zentry items-baseline"
                                 style={{
                                     transition: 'all 0.7s cubic-bezier(0.68, -0.35, 0.32, 1.35)',
                                 }}
                            >
                                  <span
                                      className="font-black special-font text-black leading-none"
                                      style={{
                                          fontSize: '13rem',
                                          fontWeight: '900',
                                          marginRight: isHovered ? "2.5rem" : "0.2rem",
                                          transition: 'all 0.7s cubic-bezier(0.68, -0.35, 0.32, 1.35)',
                                          transform: isHovered ? 'scaleX(1.5)' : 'scaleX(0.8)'
                                      }}
                                  >
                                    <b>3</b>
                                  </span>
                                  <span
                                      className="font-black special-font text-black leading-none"
                                      style={{
                                          fontSize: '13rem',
                                          fontWeight: '900',
                                          marginRight: isHovered ? "1rem" : "2rem",
                                          transform: isHovered ? 'scaleX(1.5)' : 'scaleX(1.4)',
                                          transition: 'all 0.7s cubic-bezier(0.68, -0.35, 0.32, 1.35)',
                                      }}
                                  >
                                      <b>0</b>
                                </span>
                                <sup
                                    className="font-black text-black"
                                    style={{
                                        fontSize: '8rem',
                                        fontWeight: '900',
                                        transform: isHovered ? 'scaleX(0.9)' : 'scaleX(1.5)',
                                        transition: 'all 0.7s cubic-bezier(0.68, -0.35, 0.32, 1.35)',
                                    }}
                                >
                                    +
                                </sup>
                            </div>
                        </div>

                        {/* Partners label */}
                        <div className="absolute bottom-6 right-6">
                            <h2 className="font-family-general text-md text-black md:text-[13px] leading-tight">
                                Partners
                            </h2>
                        </div>
                    </div>

                    {/* Card 4 - Bottom Left (starts lower) */}
                    <div
                        ref={el => cardRefs.current[3] = el}
                        className="col-start-1 col-span-4 row-start-6 row-span-4 flex flex-col relative bg-violet-300 rounded-lg p-3">
                        <div className="absolute bottom-0 left-0 w-full h-[10%] z-10 p-4 pointer-events-none">
                            <img
                                src="/img/card5-bottom.svg"
                                className="w-full h-full rounded-b-lg"
                            />
                        </div>
                        <div className="flex flex-col gap-1 w-1/2">
                            <h2 className="font-family-general text-md text-black md:text-[13px] leading-tight">
                                Treasury
                            </h2>
                            <h1 className="font-family-zentry special-font text-black text-6xl md:text-8xl">140<b>M+</b></h1>
                        </div>
                        <div className="w-full flex items-center justify-center overflow-hidden">
                            <video
                                src="/videos/card-5.webm"
                                loop
                                muted
                                autoPlay
                                playsInline
                                className="w-full h-full object-contain"
                                style={{
                                    transform: 'scale(1) translateY(-50px)'
                                }}
                            />
                        </div>
                    </div>

                    {/* Card 5 - Middle Right */}
                    <div
                        ref={el => cardRefs.current[4] = el}
                        className="col-start-5 col-span-3 row-start-5 row-span-2 flex flex-col bg-black border border-white/30 rounded-lg p-4">
                        <div className="flex flex-col gap-1 w-full">
                            <h1 className="font-family-zentry special-font animated-word uppercase text-blue-50 text-3xl md:text-5xl">
                                W<b>o</b>rld-Class <br/> B<b>a</b>ckers
                            </h1>
                        </div>
                        <div className="font-family-general flex flex-col w-full text-blue-50 text-end mt-2 gap-[1px]">
                            {
                                Backers.map((backer, index) => (
                                    <h2 key={index} className="font-family-general text-sm md:text-[11px] leading-tight">
                                        {backer}
                                    </h2>
                                ))
                            }
                        </div>
                    </div>

                    {/* Card 6 - Bottom Right */}
                    <div
                        ref={el => cardRefs.current[5] = el}
                        className="col-start-5 col-span-4 row-start-7 row-span-2 bg-[#dfdff0] text-black rounded-lg flex items-center justify-center p-6 relative cursor-pointer overflow-hidden"
                        onMouseEnter={() => setIsHoveredCard6(true)}
                        onMouseLeave={() => setIsHoveredCard6(false)}
                    >
                        {/* Revenue label with 2024 */}
                        <div className="absolute top-3 left-3">
                            <h2 className="font-family-general text-md text-black md:text-[13px] leading-tight">
                                Revenue generated
                            </h2>
                            <h2 className="font-family-general text-md text-black md:text-[13px] leading-tight">
                                2024
                            </h2>
                        </div>

                        {/* Numbers - Centered */}
                        <div
                            style={{
                                transition: 'all 0.7s cubic-bezier(0.68, -0.35, 0.32, 1.35)',
                                transform: isHoveredCard6
                                    ? 'translateX(-10px)translateY(30px) matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
                                    : 'translateX(-70px)translateY(30px) matrix3d(0.926406, -0.196135, 0, -0.0026704, -0.151133, 0.664846, 0, -0.001002, 0, 0, 1, 0, -49.6514, 19.2104, 0, 1)',
                            }}
                        >
                            <div className="flex font-family-zentry items-baseline"
                                 style={{
                                     transition: 'all 0.7s cubic-bezier(0.68, -0.35, 0.32, 1.35)',
                                 }}>
                                <span
                                    className="font-black text-black leading-none"
                                    style={{
                                        fontSize: '14rem',
                                        fontWeight: '900',
                                        marginRight: isHoveredCard6 ? "2rem" : "2rem",
                                        transition: 'all 0.7s cubic-bezier(0.68, -0.35, 0.32, 1.35)',
                                        transform: isHoveredCard6 ? 'scaleX(1.5) scaleY(1.3)' : 'scaleX(1) scaleY(1.2)'
                                    }}
                                >
                                    4
                                </span>
                                <span
                                    className="font-black text-black leading-none"
                                    style={{
                                        fontSize: '14rem',
                                        fontWeight: '900',
                                        marginRight: isHoveredCard6 ? "2.5rem" : "1.8rem",
                                        transform: isHoveredCard6 ? 'scaleX(1.2) scaleY(1.3)' : 'scaleX(1.5) scaleY(1.2)',
                                        transition: 'all 0.7s cubic-bezier(0.68, -0.35, 0.32, 1.35)',
                                    }}
                                >
                                    0
                                </span>
                                <span
                                    className="font-black text-black special-font leading-none"
                                    style={{
                                        fontSize: '14rem',
                                        fontWeight: '900',
                                        transition: 'all 0.7s cubic-bezier(0.68, -0.35, 0.32, 1.35)',
                                        transform: isHoveredCard6 ? 'scaleX(1.5) scaleY(1.3)' : 'scaleX(1.1) scaleY(1.2)',
                                    }}
                                >
                                    <b>M</b>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Glance