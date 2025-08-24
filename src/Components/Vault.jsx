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
    const [activeBar, setActiveBar] = useState(1);
    const [videoIndex, setVideoIndex] = useState(1);
    const [phase, setPhase] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

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
            gsap.set([progressBarRef1.current, progressBarRef2.current, progressBarRef3.current], {
                height: "0%", transformOrigin: "top"
            });

            // Initially show first progress item, hide others
            gsap.set(progressRef1.current, {opacity: 1, display: "flex"});
            gsap.set([progressRef2.current, progressRef3.current], {opacity: 0, display: "none"});

            gsap.timeline({
                scrollTrigger: {
                    trigger: vaultRef.current,
                    start: "bottom bottom",
                    end: "bottom -200%",  // Increased scroll distance - now takes 3x longer to complete
                    scrub: 1,
                    pin: true,
                    onUpdate: (self) => {
                        const progress = self.progress;
                        const refs = [progressRef1, progressRef2, progressRef3];
                        const barRefs = [progressBarRef1, progressBarRef2, progressBarRef3];

                        // Determine current and next phase
                        const currentPhase = progress <= 0.33 ? 0 : progress <= 0.66 ? 1 : 2;
                        const localProgress = currentPhase === 0 ? progress / 0.33 :
                            currentPhase === 1 ? (progress - 0.33) / 0.33 :
                                (progress - 0.66) / 0.34;

                        // Always ensure at least one progress item is visible
                        let shouldShowCurrent = true;

                        // Handle phase transitions more smoothly
                        refs.forEach((ref, i) => {
                            if (ref.current) {
                                if (i === currentPhase) {
                                    // Always show current phase
                                    gsap.set(ref.current, {
                                        display: "flex",
                                        opacity: 1
                                    });
                                } else {
                                    // Hide other phases only if current is fully visible
                                    gsap.set(ref.current, {
                                        opacity: 0,
                                        display: "none"
                                    });
                                }
                            }
                        });

                        // Update progress bars - reset non-current bars, animate current
                        barRefs.forEach((barRef, i) => {
                            if (barRef.current) {
                                if (i === currentPhase) {
                                    // Animate current progress bar
                                    gsap.set(barRef.current, {
                                        height: `${Math.max(0, Math.min(100, localProgress * 100))}%`
                                    });
                                } else if (i < currentPhase) {
                                    // Keep previous bars at 100%
                                    gsap.set(barRef.current, {height: "100%"});
                                } else {
                                    // Future bars at 0%
                                    gsap.set(barRef.current, {height: "0%"});
                                }
                            }
                        });

                        // Update state
                        setActiveBar(currentPhase + 1);
                        setPhase(currentPhase);
                    }
                }
            });
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
            // Instant video change - no transition delay
            setVideoIndex(newIndex);
        }
    };

    const ProgressItem = ({num, title, text, progressRef, progressBarRef}) => (
        <div className="flex flex-col">
            <div
                className={`flex items-center gap-3 mb-2 transition-all duration-300 ${activeBar === num ? 'text-lg' : 'text-sm'}`}>
                <span className="text-black">0{num}</span>
                <h3 className="text-black">{title}</h3>
            </div>
            <div className="flex items-start gap-6" ref={progressRef} style={{display: 'none', opacity: 0}}>
                <div className="ml-2">
                    <div className="w-0.5 h-16 bg-black/20 rounded-full relative">
                        <div ref={progressBarRef} className="w-full bg-black rounded-full absolute top-0"
                             style={{height: '0%'}}/>
                    </div>
                </div>
                <div className="w-72 max-md:flex-1">
                    <p className="text-black/70 text-xs md:text-[12px] leading-tight">{text}</p>
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
        <div ref={vaultRef} id="vault" className="min-h-screen w-screen relative" style={{ backgroundColor: '#000000' }}>

            {/* Mobile: Stack Layout */}
            <div className="flex md:hidden flex-col p-4 gap-8 min-h-screen">
                <div>
                    <AnimatedTitle title="The univ<b>e</b>rse <br /> powered by ze<b>n</b>t" id="vault-title"
                                   containerClass="mt-4 pointer-events-none relative z-10"
                                   alignment="left"/>
                    <div ref={btnRef} className="mt-4">
                        <Button id="vault-button" title="Enter Vault" containerClass="text-blue-50 !bg-black flex"/>
                    </div>
                </div>

                <div className="w-60 h-60 mx-auto rounded-lg overflow-hidden">
                    <video
                        key={videoIndex} // Force remount on change
                        src={getVideoSrc(videoIndex)}
                        loop
                        muted
                        autoPlay
                        playsInline
                        className="w-full h-full object-cover"
                        onError={(e) => console.error('Desktop video error:', e)}
                    />
                </div>

                <div className="flex font-family-general flex-col gap-3">
                    <ProgressItem num={1} title={progressData[0].title} text={progressData[0].text}
                                  progressRef={progressRef1} progressBarRef={progressBarRef1}/>
                    <ProgressItem num={2} title={progressData[1].title} text={progressData[1].text}
                                  progressRef={progressRef2} progressBarRef={progressBarRef2}/>
                    <ProgressItem num={3} title={progressData[2].title} text={progressData[2].text}
                                  progressRef={progressRef3} progressBarRef={progressBarRef3}/>
                </div>
            </div>

            {/* Desktop/Tablet: Positioned Layout */}
            <div className="hidden md:block">
                {/* Top Left */}
                <div className="absolute top-4 left-0">
                    <AnimatedTitle title="The univ<b>e</b>rse <br /> powered by ze<b>n</b>t" id="vault-title"
                                   containerClass="mt-4 pointer-events-none relative z-10"
                                   alignment="left"/>
                    <div ref={btnRef} className="ml-12 mt-4">
                        <Button id="vault-button" title="Enter Vault" containerClass="text-blue-50 !bg-black flex"/>
                    </div>
                </div>

                {/* Bottom Left */}
                <div className="absolute bottom-8 left-8 flex font-family-general flex-col gap-3">
                    <ProgressItem num={1} title={progressData[0].title} text={progressData[0].text}
                                  progressRef={progressRef1} progressBarRef={progressBarRef1}/>
                    <ProgressItem num={2} title={progressData[1].title} text={progressData[1].text}
                                  progressRef={progressRef2} progressBarRef={progressBarRef2}/>
                    <ProgressItem num={3} title={progressData[2].title} text={progressData[2].text}
                                  progressRef={progressRef3} progressBarRef={progressBarRef3}/>
                </div>

                {/* Bottom Right - Desktop Video */}
                <div className="absolute bottom-8 right-12">
                    <div className="w-120 h-120 rounded-lg overflow-hidden">
                        <video
                            key={videoIndex} // Force remount on change
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