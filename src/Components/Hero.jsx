import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import { useEffect, useRef, useState } from "react";

import Button from "./Button";
import VideoPreview from "./VideoPreview";

gsap.registerPlugin(ScrollTrigger);

// Fixed the HTML syntax - removed the extra 'b>'
const displayText = [
    "G<b>A</b>MING",      // Index 0 for currentIndex 1
    "Ide<b>n</b>tity",    // Index 1 for currentIndex 2
    "Re<b>a</b>lity",     // Index 2 for currentIndex 3
    "Ag<b>e</b>ntic AI"   // Index 3 for currentIndex 4
];

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [hasClicked, setHasClicked] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isHoveringPreview, setIsHoveringPreview] = useState(false);

    const [loading, setLoading] = useState(true);
    const [loadedVideos, setLoadedVideos] = useState(0);

    const totalVideos = 4;
    const nextVdRef = useRef(null);
    const hoverTimeoutRef = useRef(null);

    const handleVideoLoad = () => {
        setLoadedVideos((prev) => prev + 1);
    };

    useEffect(() => {
        if (loadedVideos === totalVideos - 1) {
            setLoading(false);
        }
    }, [loadedVideos]);

    // Handle mouse movement to show/hide preview
    const handleMouseMove = () => {
        setIsHovering(true);

        // Clear existing timeout
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
        }

        // Set new timeout to hide preview immediately when cursor stops moving
        // But only if not hovering over the preview itself
        hoverTimeoutRef.current = setTimeout(() => {
            if (!isHoveringPreview) {
                setIsHovering(false);
            }
        }, 100);
    };

    const handlePreviewMouseEnter = () => {
        setIsHoveringPreview(true);
        // Clear any pending hide timeout
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
        }
    };

    const handlePreviewMouseLeave = () => {
        setIsHoveringPreview(false);
        // Start hide timeout when leaving preview
        hoverTimeoutRef.current = setTimeout(() => {
            setIsHovering(false);
        }, 100);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
        }
    };

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current);
            }
        };
    }, []);

    const handleMiniVdClick = () => {
        setHasClicked(true);

        // Animate current text out
        gsap.to("#hero-text", {
            x: 100,
            opacity: 0,
            duration: 0.5,
            ease: "power2.in"
        });

        // Update index after text exits
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex % totalVideos) + 1);
        }, 500);
    };

    // Video transition animation
    useGSAP(
        () => {
            if (hasClicked) {
                gsap.set("#next-video", { visibility: "visible" });
                gsap.to("#next-video", {
                    transformOrigin: "center center",
                    scale: 1,
                    width: "100%",
                    height: "100%",
                    duration: 1,
                    ease: "power1.inOut",
                    onStart: () => nextVdRef.current.play(),
                });
                gsap.from("#current-video", {
                    transformOrigin: "center center",
                    scale: 0,
                    duration: 1.5,
                    ease: "power1.inOut",
                });
            }
        },
        {
            dependencies: [currentIndex],
            revertOnUpdate: true,
        }
    );

    // Animate new text in when currentIndex changes
    useGSAP(() => {
        if (hasClicked) {
            gsap.fromTo("#hero-text",
                {
                    x: -100,
                    opacity: 0
                },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power2.out",
                    delay: 0.8 // Small delay so it comes in as video is covering screen
                }
            );
        }
    }, [currentIndex]); // Trigger when currentIndex changes

    useGSAP(() => {
        gsap.set("#video-frame", {
            clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
            borderRadius: "0% 0% 40% 10%",
        });
        gsap.from("#video-frame", {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            borderRadius: "0% 0% 0% 0%",
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: "#video-frame",
                start: "center center",
                end: "bottom center",
                scrub: true,
            },
        });
    });

    const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

    return (
        <div
            className="relative h-dvh w-screen overflow-x-hidden"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {loading && (
                <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
                    <div className="three-body">
                        <div className="three-body__dot"></div>
                        <div className="three-body__dot"></div>
                        <div className="three-body__dot"></div>
                    </div>
                </div>
            )}

            <div
                id="video-frame"
                className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
            >
                <div>
                    <div
                        className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg"
                        style={{
                            opacity: isHovering ? 1 : 0,
                            transform: isHovering ? 'scale(1)' : 'scale(0.5)',
                            transition: 'all 0.3s ease-in-out'
                        }}
                        onMouseEnter={handlePreviewMouseEnter}
                        onMouseLeave={handlePreviewMouseLeave}
                    >
                        <VideoPreview>
                            <div
                                onClick={handleMiniVdClick}
                                className="origin-center transition-all duration-500 ease-in hover:scale-110 hover:opacity-100"
                            >
                                <video
                                    src={getVideoSrc((currentIndex % totalVideos) + 1)}
                                    loop
                                    muted
                                    id="current-video"
                                    className="size-64 origin-center scale-150 object-cover object-center"
                                    onLoadedData={handleVideoLoad}
                                />
                            </div>
                        </VideoPreview>
                    </div>

                    <video
                        ref={nextVdRef}
                        src={getVideoSrc(currentIndex)}
                        loop
                        muted
                        id="next-video"
                        className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
                        onLoadedData={handleVideoLoad}
                    />
                    <video
                        src={getVideoSrc(
                            currentIndex === totalVideos - 1 ? 1 : currentIndex
                        )}
                        autoPlay
                        loop
                        muted
                        className="absolute left-0 top-0 size-full object-cover object-center"
                        onLoadedData={handleVideoLoad}
                    />
                </div>

                <h1 id="hero-text" className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
                    <span
                        key={currentIndex}
                        dangerouslySetInnerHTML={{ __html: displayText[currentIndex - 1] }}
                    />
                </h1>

                <div className="absolute left-0 top-0 z-40 size-full">
                    <div className="mt-24 px-5 sm:px-10">
                        <h1 className="special-font hero-heading text-blue-100">
                            redefi<b>n</b>e
                        </h1>

                        <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
                            Enter the Metagame Layer <br /> Unleash the Play Economy
                        </p>

                        <Button
                            id="watch-trailer"
                            title="Watch trailer"
                            leftIcon={<TiLocationArrow />}
                            containerClass="bg-yellow-300 flex-center gap-1"
                        />
                    </div>
                </div>
            </div>

            <h1 id="hero-text-bg" className="special-font hero-heading absolute bottom-5 right-5 text-black">
                <span
                    key={currentIndex}
                    dangerouslySetInnerHTML={{ __html: displayText[currentIndex - 1] }}
                />
            </h1>
        </div>
    );
};

export default Hero;