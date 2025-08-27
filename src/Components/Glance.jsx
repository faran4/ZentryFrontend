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
                className="w-full flex flex-col justify-center items-center md:justify-start md:items-start gap-4 pb-8">
                <h2 ref={typewriterRef} className="font-family-general text-[10px] font-bold uppercase ml-10 tracking-widest">
                    Our universe in a nutshell
                </h2>
                <AnimatedTitle
                    title="Ze<b>n</b>try at a <br />Glan<b>c</b>e"
                    alignment="left"
                    containerClass="pointer-events-none relative z-10"
                />
            </div>

            {/* DESKTOP VIEW - Hidden on mobile */}
            <div className="hidden md:block container mx-auto pt-16 px-4 pb-16 max-w-5xl">
                <div className="w-full grid grid-cols-8 auto-rows-[140px] gap-8">

                    {/* Card 1 - Products */}
                    <div
                        ref={el => cardRefs.current[0] = el}
                        className="col-start-1 col-span-4 row-start-2 row-span-2 flex bg-black border border-white/30 rounded-lg p-4">
                        <div className="flex flex-col gap-1 w-1/2">
                            <h2 className="font-family-general text-[13px] text-blue-50 leading-tight">
                                Products
                            </h2>
                            <h1 className="font-family-zentry special-font font-black text-blue-50 text-8xl">4<b>+</b></h1>
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

                    {/* Card 2 - Residents */}
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
                            <h2 className="font-family-general text-[13px] text-black leading-tight">
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

                    {/* Card 3 - Partners */}
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
                            <h2 className="font-family-general text-[13px] text-black leading-tight">
                                Partners
                            </h2>
                        </div>
                    </div>

                    {/* Card 4 - Treasury */}
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
                            <h2 className="font-family-general text-[13px] text-black leading-tight">
                                Treasury
                            </h2>
                            <h1 className="font-family-zentry special-font text-black text-8xl">140<b>M+</b></h1>
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

                    {/* Card 5 - Backers */}
                    <div
                        ref={el => cardRefs.current[4] = el}
                        className="col-start-5 col-span-3 row-start-5 row-span-2 flex flex-col bg-black border border-white/30 rounded-lg p-4">
                        <div className="flex flex-col gap-1 w-full">
                            <h1 className="font-family-zentry special-font animated-word uppercase text-blue-50 text-5xl">
                                W<b>o</b>rld-Class <br/> B<b>a</b>ckers
                            </h1>
                        </div>
                        <div className="font-family-general flex flex-col w-full text-blue-50 text-end mt-2 gap-[1px]">
                            {
                                Backers.map((backer, index) => (
                                    <h2 key={index} className="font-family-general text-[11px] leading-tight">
                                        {backer}
                                    </h2>
                                ))
                            }
                        </div>
                    </div>

                    {/* Card 6 - Revenue */}
                    <div
                        ref={el => cardRefs.current[5] = el}
                        className="col-start-5 col-span-4 row-start-7 row-span-2 bg-[#dfdff0] text-black rounded-lg flex items-center justify-center p-6 relative cursor-pointer overflow-hidden"
                        onMouseEnter={() => setIsHoveredCard6(true)}
                        onMouseLeave={() => setIsHoveredCard6(false)}
                    >
                        {/* Revenue label with 2024 */}
                        <div className="absolute top-3 left-3">
                            <h2 className="font-family-general text-[13px] text-black leading-tight">
                                Revenue generated
                            </h2>
                            <h2 className="font-family-general text-[13px] text-black leading-tight">
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

            {/* MOBILE VIEW - Hidden on desktop */}
            <div className="md:hidden container mx-auto pt-16 px-4 pb-16 max-w-5xl">
                <div className="w-full grid grid-cols-5 auto-rows-[90px] gap-6">

                    {/* Card 1 - Products */}
                    <div
                        ref={el => cardRefs.current[0] = el}
                        className="col-start-2 col-span-4 row-start-5 row-span-2 flex bg-black border border-white/30 rounded-lg p-4">
                        <div className="flex flex-col gap-1 w-1/2">
                            <h2 className="font-family-general text-[10px]  md:text-sm text-blue-50 leading-tight">
                                Products
                            </h2>
                            <h1 className="font-family-zentry special-font font-black text-blue-50 text-5xl md:text-6xl">4<b>+</b></h1>
                        </div>
                        <div className="w-1/2 flex items-center justify-center overflow-hidden ">
                            <video
                                src="/videos/card-1.webm"
                                loop
                                muted
                                autoPlay
                                playsInline
                                className="w-full h-full object-contain scale-[2] translate-x-[-60px] md:translate-x-[-50px]"
                            />
                        </div>
                    </div>

                    {/* Card 2 - Residents */}
                    <div
                        ref={el => cardRefs.current[1] = el}
                        className="col-start-1 col-span-4 row-start-1 row-span-4 bg-violet-300 text-black rounded-lg flex items-center justify-center p-6 relative cursor-pointer overflow-hidden"
                        onMouseEnter={() => setIsHoveredCard2(true)}
                        onMouseLeave={() => setIsHoveredCard2(false)}
                    >
                        <div className="absolute bottom-0 left-0 w-full h-[95%] z-10 pointer-events-none">
                            <img
                                src="/img/card2pic.webp"
                                className="w-full h-full object-cover rounded-b-lg"
                            />
                        </div>

                        <div className="absolute top-2 left-2">
                            <h2 className="font-family-general text-sm text-black leading-tight">
                                Residents
                            </h2>
                        </div>

                        {/* Numbers - Centered */}
                        <div
                            style={{
                                transition: 'all 0.7s cubic-bezier(0.68, -0.35, 0.32, 1.35)',
                                transform: 'translateX(0px)translateY(-120px) matrix3d(1, -0.187196, 0, 0.003315, 0, 0.75, 0, 0, 0, 0, 1, 0, 75.4141, -14.1172, 0, 1)',
                            }}
                        >
                            <div className="flex font-family-zentry items-baseline">
                                <span
                                    className="font-black text-black leading-none"
                                    style={{
                                        fontSize: '8rem',
                                        fontWeight: '900',
                                        marginRight: "0.1rem",
                                        transform: 'scaleX(0.8)',
                                    }}
                                >
                                    5
                                </span>
                                <span
                                    className="font-black text-black leading-none"
                                    style={{
                                        fontSize: '8rem',
                                        fontWeight: '900',
                                        transform: 'scaleX(1.3)',
                                        marginRight: "1.1rem",
                                    }}
                                >
                                 0
                                </span>
                                <span
                                    className="font-black text-black leading-none"
                                    style={{
                                        fontSize: '8rem',
                                        fontWeight: '900',
                                        marginRight: "0.7rem",
                                        transform: 'scaleX(1.4)',
                                    }}
                                >
                                 0
                                </span>
                                <span
                                    className="font-black special-font text-black leading-none"
                                    style={{
                                        fontSize: '8rem',
                                        fontWeight: '900',
                                        marginRight: "0.3rem",
                                        transform: 'scaleX(1)',
                                    }}
                                >
                                <b>K</b>
                                </span>
                                <sup
                                    className="font-black text-black"
                                    style={{
                                        fontSize: '5rem',
                                        fontWeight: '900',
                                        transform: 'scaleX(1.5)',
                                    }}
                                >
                                    +
                                </sup>
                            </div>
                        </div>
                    </div>

                    {/* Card 3 - Partners */}
                    <div
                        ref={el => cardRefs.current[2] = el}
                        className="col-start-1 col-span-3 row-start-7 row-span-2 bg-yellow-300 text-black rounded-lg flex items-center justify-center p-6 relative cursor-pointer overflow-hidden"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        {/* Numbers - Always Centered */}
                        <div
                            style={{
                                transition: 'all 0.7s cubic-bezier(0.68, -0.35, 0.32, 1.35)',
                                transform: 'translateX(0px)translateY(-30px)matrix3d(0.99, -0.236771, 0, 0.004, 0, 0.82104, 0, 0, 0, 0, 1, 0, 33.9316, -10.5929, 0, 1)',
                            }}
                        >
                            <div className="flex font-family-zentry items-baseline"
                            >
                                  <span
                                      className="font-black special-font text-black leading-none"
                                      style={{
                                          fontSize: '10rem',
                                          fontWeight: '900',
                                          marginRight: "0.2rem",
                                          transform: 'scaleX(0.8)'
                                      }}
                                  >
                                    <b>3</b>
                                  </span>
                                <span
                                    className="font-black special-font text-black leading-none"
                                    style={{
                                        fontSize: '10rem',
                                        fontWeight: '900',
                                        marginRight: "1.5rem",
                                        transform: 'scaleX(1.4)',
                                    }}
                                >
                                      <b>0</b>
                                </span>
                                <sup
                                    className="font-black text-black"
                                    style={{
                                        fontSize: '5rem',
                                        fontWeight: '900',
                                        transform: 'scaleX(1.5)',
                                    }}
                                >
                                    +
                                </sup>
                            </div>
                        </div>

                        {/* Partners label */}
                        <div className="absolute bottom-3 right-3 md:bottom-6 md:right-6">
                            <h2 className="font-family-general text-[11px] md:text-md text-black leading-tight">
                                Partners
                            </h2>
                        </div>
                    </div>

                    {/* Card 4 - Treasury */}
                    <div
                        ref={el => cardRefs.current[3] = el}
                        className="col-start-2 col-span-4 row-start-9 row-span-4 flex flex-col relative bg-violet-300 rounded-md p-3">
                        <div className="absolute bottom-0 left-0 w-full h-[10%] z-10 p-4 pointer-events-none">
                            <img
                                src="/img/card5-bottom.svg"
                                className="md:w-full md:h-full object-contain rounded-b-lg"
                            />
                        </div>
                        <div className="flex flex-col gap-1 w-1/2">
                            <h2 className="font-family-general text-[10px] md:text-md text-black leading-tight">
                                Treasury
                            </h2>
                            <h1 className="font-family-zentry special-font text-black text-5xl md:text-6xl">140<b>M+</b></h1>
                        </div>
                        <div className="w-full flex items-center justify-center overflow-hidden">
                            <video
                                src="/videos/card-5.webm"
                                loop
                                muted
                                autoPlay
                                playsInline
                                className="md:w-full md:h-full object-contain"
                                style={{
                                    transform: 'scale(1) translateY(-50px)'
                                }}
                            />
                        </div>
                    </div>

                    {/* Card 5 - Backers */}
                    <div
                        ref={el => cardRefs.current[4] = el}
                        className="col-start-3 col-span-3 row-start-13 row-span-2 flex flex-col bg-black border border-white/30 rounded-md p-2 overflow-hidden">
                        <div className="flex flex-col gap-1 w-full">
                            <h1 className="font-family-zentry special-font animated-word uppercase leading-[0.9] text-blue-50 text-[2.5rem]">
                                W<b>o</b>rld-Class <br/> B<b>a</b>ckers
                            </h1>
                        </div>
                        <div className="font-family-general flex flex-col w-full text-blue-50 text-end mt-1 gap-[0.5px]">
                            {
                                Backers.map((backer, index) => (
                                    <h2 key={index} className="font-family-general text-[9px] uppercase md:text-sm leading-tight">
                                        {backer}
                                    </h2>
                                ))
                            }
                        </div>
                    </div>

                    {/* Card 6 - Revenue */}
                    <div
                        ref={el => cardRefs.current[5] = el}
                        className="col-start-1 col-span-4 row-start-15 row-span-2 bg-[#dfdff0] text-black rounded-md flex items-center justify-center p-6 relative cursor-pointer overflow-hidden"
                        onMouseEnter={() => setIsHoveredCard6(true)}
                        onMouseLeave={() => setIsHoveredCard6(false)}
                    >
                        {/* Revenue label with 2024 */}
                        <div className="absolute top-2 left-2">
                            <h2 className="font-family-general text-[10px] md:text-md text-black leading-tight">
                                Revenue generated
                            </h2>
                            <h2 className="font-family-general text-[10px] md:text-md text-black leading-tight">
                                2024
                            </h2>
                        </div>

                        {/* Numbers - Centered */}
                        <div
                            style={{
                                transition: 'all 0.7s cubic-bezier(0.68, -0.35, 0.32, 1.35)',
                                transform: 'translateX(-10px)translateY(10px) matrix3d(0.926406, -0.196135, 0, -0.0026704, -0.151133, 0.664846, 0, -0.001002, 0, 0, 1, 0, -49.6514, 19.2104, 0, 1)',
                            }}
                        >
                            <div className="flex font-family-zentry items-baseline">
                                <span
                                    className="font-black text-black leading-none"
                                    style={{
                                        fontSize: '11rem',
                                        fontWeight: '900',
                                        marginRight: "1.2rem",
                                        transform: 'scaleX(1) scaleY(1.2)'
                                    }}
                                >
                                    4
                                </span>
                                <span
                                    className="font-black text-black leading-none"
                                    style={{
                                        fontSize: '11rem',
                                        fontWeight: '900',
                                        marginRight: "1.4rem",
                                        transform: "scaleX(1.5) scaleY(1.2)",
                                    }}
                                >
                                    0
                                </span>
                                <span
                                    className="font-black text-black special-font leading-none"
                                    style={{
                                        fontSize: '11rem',
                                        fontWeight: '900',
                                        transform: 'scaleX(1.1) scaleY(1.2)',
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