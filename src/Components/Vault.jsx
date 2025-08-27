import React, {useEffect, useRef, useState} from 'react'
import AnimatedTitle from "./AnimatedTitle.jsx";
import {TiLocationArrow} from "react-icons/ti";
import Button from "./Button.jsx";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/all";
import {useGSAP} from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Vault = () => {
    const btnRef = useRef(null);
    const vaultRef = useRef(null);
    const progressRef1 = useRef(null);
    const progressRef2 = useRef(null);
    const progressRef3 = useRef(null);
    const progressBarRef1 = useRef(null);
    const progressBarRef2 = useRef(null);
    const progressBarRef3 = useRef(null);
    const mobileProgressRef1 = useRef(null);
    const mobileProgressRef2 = useRef(null);
    const mobileProgressRef3 = useRef(null);
    const mobileProgressBarRef1 = useRef(null);
    const mobileProgressBarRef2 = useRef(null);
    const mobileProgressBarRef3 = useRef(null);
    const [activeBar, setActiveBar] = useState(1);
    const [videoIndex, setVideoIndex] = useState(1);
    const [phase, setPhase] = useState(0);

    const totalVideos = 3;
    const getVideoSrc = (index) => `/videos/vault${index}.webm`;

    useGSAP(() => {
        if (btnRef.current) {
            gsap.set(btnRef.current, {y: 100, opacity: 0});
            gsap.to(btnRef.current, {
                y: 0, opacity: 1, duration: 0.8, ease: "power1.out",
                scrollTrigger: {trigger: btnRef.current, start: "top 80%", toggleActions: "play none none reverse"}
            })
        }

        if (vaultRef.current) {
            // Kill any existing ScrollTriggers for this element
            ScrollTrigger.getAll().forEach(st => {
                if (st.vars.trigger === vaultRef.current) {
                    st.kill();
                }
            });

            // Detect if mobile
            const isMobile = window.innerWidth < 768;

            // Get the correct refs based on screen size
            const refs = isMobile
                ? [mobileProgressRef1, mobileProgressRef2, mobileProgressRef3]
                : [progressRef1, progressRef2, progressRef3];
            const barRefs = isMobile
                ? [mobileProgressBarRef1, mobileProgressBarRef2, mobileProgressBarRef3]
                : [progressBarRef1, progressBarRef2, progressBarRef3];

            // Set initial states for progress bars
            barRefs.forEach(ref => {
                if (ref.current) {
                    gsap.set(ref.current, {
                        height: "0%",
                        transformOrigin: "top"
                    });
                }
            });

            // Initially hide all progress content except the first one
            refs.forEach((ref, index) => {
                if (ref.current) {
                    if (index === 0) {
                        ref.current.style.display = "flex";
                        ref.current.style.opacity = "1";
                    } else {
                        ref.current.style.display = "none";
                        ref.current.style.opacity = "0";
                    }
                }
            });

            // Create timeline with responsive end value
            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: vaultRef.current,
                    start: "top top",
                    end: () => {
                        // Adjust end based on screen size
                        return isMobile ? "bottom -150%" : "bottom -200%";
                    },
                    scrub: 1,
                    pin: true,
                    pinSpacing: true,
                    invalidateOnRefresh: true, // Recalculate on window resize
                    onUpdate: (self) => {
                        const progress = self.progress;

                        // Determine current and next phase
                        const currentPhase = progress <= 0.33 ? 0 : progress <= 0.66 ? 1 : 2;
                        const localProgress = currentPhase === 0 ? progress / 0.33 :
                            currentPhase === 1 ? (progress - 0.33) / 0.33 :
                                (progress - 0.66) / 0.34;

                        // Handle phase transitions - make sure current phase is visible
                        refs.forEach((ref, i) => {
                            if (ref.current) {
                                if (i === currentPhase) {
                                    // Make current phase visible
                                    ref.current.style.display = "flex";
                                    ref.current.style.opacity = "1";
                                } else {
                                    // Hide other phases
                                    ref.current.style.display = "none";
                                    ref.current.style.opacity = "0";
                                }
                            }
                        });

                        // Update progress bars
                        barRefs.forEach((barRef, i) => {
                            if (barRef.current) {
                                if (i === currentPhase) {
                                    // Animate current progress bar
                                    barRef.current.style.height = `${Math.max(0, Math.min(100, localProgress * 100))}%`;
                                } else if (i < currentPhase) {
                                    // Previous bars at 100%
                                    barRef.current.style.height = "100%";
                                } else {
                                    // Future bars at 0%
                                    barRef.current.style.height = "0%";
                                }
                            }
                        });

                        // Update state
                        setActiveBar(currentPhase + 1);
                        setPhase(currentPhase);
                    },
                    onEnter: () => {
                        // Show first item when entering the pinned section
                        if (refs[0].current) {
                            refs[0].current.style.display = "flex";
                            refs[0].current.style.opacity = "1";
                        }
                    }
                }
            });

            // Refresh ScrollTrigger on window resize
            const handleResize = () => {
                ScrollTrigger.refresh();
            };

            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
                timeline.kill();
            };
        }
    }, [])

    useEffect(() => {
        if (phase === 0) {
            handleVideoChange(1);
        } else if (phase === 1) {
            handleVideoChange(2);
        } else {
            handleVideoChange(3);
        }
    }, [phase]);

    const handleVideoChange = (newIndex) => {
        if (newIndex !== videoIndex) {
            setVideoIndex(newIndex);
        }
    };

    const ProgressItem = ({num, title, text, progressRef, progressBarRef, isMobile = false}) => (
        <div className="flex flex-col">
            <div className={`flex items-center gap-3 mb-2 transition-all duration-300 ${
                activeBar === num ? (isMobile ? 'text-sm' : 'text-base md:text-lg') : 'text-xs md:text-sm'
            }`}>
                <span className={isMobile ? "text-black" : "text-black"}>0{num}</span>
                <h3 className={`font-medium ${isMobile ? "text-black" : "text-black"}`}>{title}</h3>
            </div>
            <div className="flex items-start gap-4 md:gap-6" ref={progressRef}>
                <div className="ml-2">
                    <div className={`w-0.5 ${isMobile ? 'h-10' : 'h-12 md:h-16'} bg-black/20 rounded-full relative`}>
                        <div ref={progressBarRef}
                             className="w-full bg-black rounded-full absolute top-0 transition-height"
                             style={{height: '0%'}}/>
                    </div>
                </div>
                <div className={`flex-1 ${isMobile ? '' : 'md:w-72'}`}>
                    <p className={`text-black/70 ${isMobile ? 'text-[10px]' : 'text-xs md:text-[12px]'} leading-relaxed pr-2`}>{text}</p>
                </div>
            </div>
        </div>
    );

    const progressData = [
        {
            title: "Shaping Zentry Collectively",
            text: "Participate in governance, influence key decisions in the ever-growing Zentry Universe that is limited only by people's imaginations"
        },
        {
            title: "Unlocking Economic Opportunity",
            text: "ZENT, a commodity-based currency that unlocks exclusive benefits, airdrops, quotas, and co-creation within and beyond Zentry ecosystem."
        },
        {
            title: "Sharing Value Accrued",
            text: "ZENT holders thrive as Zentry grows, benefiting from the expansive partnerships, treasury investment and economic activities."
        }
    ];

    return (
        <div ref={vaultRef} id="vault" className="min-h-screen w-screen relative overflow-hidden"
             style={{ backgroundColor: '#000000' }}>

            {/* Mobile Layout */}
            <div className="md:hidden flex flex-col h-screen px-4 py-6">
                {/* Top Section */}
                <div className="flex-shrink-0">
                    <AnimatedTitle
                        title="The univ<b>e</b>rse <br /> powered by ze<b>n</b>t"
                        id="vault-title"
                        containerClass="pointer-events-none relative z-10"
                        alignment="left"/>
                    <div ref={btnRef} className="mt-4">
                        <Button id="vault-button" title="Enter Vault" containerClass="text-blue-50 !bg-black flex"/>
                    </div>
                </div>

                {/* Middle Section - Video */}
                <div className="flex-1 flex items-center justify-center py-4">
                    <div className="w-60 h-60 rounded-lg overflow-hidden">
                        <video
                            key={videoIndex}
                            src={getVideoSrc(videoIndex)}
                            loop
                            muted
                            autoPlay
                            playsInline
                            className="w-full h-full object-cover"
                            onError={(e) => console.error('Mobile video error:', e)}
                        />
                    </div>
                </div>

                {/* Bottom Section - Progress Items */}
                <div className="flex-shrink-0 pb-4">
                    <div className="flex font-family-general flex-col gap-3">
                        <ProgressItem
                            num={1}
                            title={progressData[0].title}
                            text={progressData[0].text}
                            progressRef={mobileProgressRef1}
                            progressBarRef={mobileProgressBarRef1}
                            isMobile={true}
                        />
                        <ProgressItem
                            num={2}
                            title={progressData[1].title}
                            text={progressData[1].text}
                            progressRef={mobileProgressRef2}
                            progressBarRef={mobileProgressBarRef2}
                            isMobile={true}
                        />
                        <ProgressItem
                            num={3}
                            title={progressData[2].title}
                            text={progressData[2].text}
                            progressRef={mobileProgressRef3}
                            progressBarRef={mobileProgressBarRef3}
                            isMobile={true}
                        />
                    </div>
                </div>
            </div>

            {/* Desktop/Tablet Layout */}
            <div className="hidden md:block h-screen relative">
                {/* Top Left */}
                <div className="absolute top-8 left-8">
                    <AnimatedTitle
                        title="The univ<b>e</b>rse <br /> powered by ze<b>n</b>t"
                        id="vault-title"
                        containerClass="pointer-events-none relative z-10"
                        alignment="left"/>
                    <div className="mt-4 ml-12">
                        <Button id="vault-button" title="Enter Vault" containerClass="text-blue-50 !bg-black flex"/>
                    </div>
                </div>

                {/* Bottom Left - Progress Items */}
                <div className="absolute bottom-8 left-8 max-w-md">
                    <div className="flex font-family-general flex-col gap-3">
                        <ProgressItem
                            num={1}
                            title={progressData[0].title}
                            text={progressData[0].text}
                            progressRef={progressRef1}
                            progressBarRef={progressBarRef1}
                        />
                        <ProgressItem
                            num={2}
                            title={progressData[1].title}
                            text={progressData[1].text}
                            progressRef={progressRef2}
                            progressBarRef={progressBarRef2}
                        />
                        <ProgressItem
                            num={3}
                            title={progressData[2].title}
                            text={progressData[2].text}
                            progressRef={progressRef3}
                            progressBarRef={progressBarRef3}
                        />
                    </div>
                </div>

                {/* Bottom Right - Video */}
                <div className="absolute bottom-8 right-8 lg:right-12">
                    <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-lg overflow-hidden">
                        <video
                            key={videoIndex}
                            src={getVideoSrc(videoIndex)}
                            loop
                            muted
                            autoPlay
                            playsInline
                            className="w-full h-full object-cover"
                            onError={(e) => console.error('Desktop video error:', e)}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Vault