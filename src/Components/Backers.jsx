import React, { useState, useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger)

const Backers = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [updatesActive, setUpdatesActive] = useState(false)
    const itemRefs = useRef([])

    const backersData = [
        { category: "Backers", name: "Yzilabs", image: "yzlabs.webp" },
        { category: "Backers", name: "Coinbase Ventures", image: "coinbase.webp" },
        { category: "Backers", name: "Pantera Capital", image: "pantera.png" },
        { category: "Backers", name: "Defiance Capital", image: "Definance.png" },
        { category: "Backers", name: "Animoca Brands", image: "animoca.png" },
        { category: "Backers", name: "SkyVision Capital", image: "svc.png" },
        { category: "Backers", name: "Play Venture", image: "play.webp" },
        { category: "Backers", name: "Vessel Capital", image: "vessel.webp" },
        { category: "Backers", name: "Arche Fund", image: "arche.png" },
        { category: "Gaming", name: "Marblex", image: "marblex.png" },
        { category: "Gaming", name: "Fnatic", image: "fnatic.png" },
        { category: "Gaming", name: "Xset", image: "xset.png" },
        { category: "Web3", name: "Jambo", image: "jambo.png" },
        { category: "Brands", name: "Aws", image: "aws.png" }
    ];

    const stickyContent = {
        "Backers": {
            text: "Our backers include top-tier VCs, funds, and <br />companies, providing expertise, network and resources<br />to fuel out project's success."
        },
        "Gaming": {
            text: "Our Gaming partners span Projects, communities, <br />protocols & infrastructure, accelerating expansive<br />growth of the new gamming era."
        },
        "Web3": {
            text: "Our web3 partners support tech & community, driving <br /> cutting-edge innovation and a vibrant ecosystem users."
        },
        "Brands": {
            text: "Out brands partners cover tech, gaming, entertainment, <br /> and lifestyle sectors, enhancing our reach and player <br /> experience."
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight / 2;

            for (let i = itemRefs.current.length - 1; i >= 0; i--) {
                const element = itemRefs.current[i];
                if (element && element.offsetTop <= scrollPosition) {
                    setActiveIndex(i);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // GSAP integration for Updates section trigger
    useGSAP(() => {
        ScrollTrigger.create({
            trigger: "#Updates",
            start: "top 60%",
            end: "bottom 25%",
            onEnter: () => {
                setUpdatesActive(true);
                // Hide sticky elements
                gsap.to("#backers-text", { opacity: 0, duration: 0.3 });
                gsap.to("#backers-image", { opacity: 0, duration: 0.3 });
            },
            onLeaveBack: () => {
                setUpdatesActive(false);
                // Show sticky elements
                gsap.to("#backers-text", { opacity: 1, duration: 0.3 });
                gsap.to("#backers-image", { opacity: 1, duration: 0.3 });
            }
        });
    }, []);

    const getCurrentCategory = () => {
        return backersData[activeIndex]?.category || "Backers";
    };

    const getCurrentImage = () => {
        return backersData[activeIndex]?.image || "yzlabs.webp";
    };

    return (
        <section id="Backers" className="w-screen pt-10 md:pt-20 pb-20 md:pb-40 flex flex-col lg:flex-row">
            {/* Left sticky section */}
            <div
                id="backers-text"
                className="w-full lg:w-[40%] h-auto lg:h-full sticky top-4 md:top-100 mt-8 lg:mt-16 mb-8 lg:mb-0"
            >
                <div className="w-full h-full flex justify-center px-4 lg:px-0">
                    <p className="font-family-robert-regular text-xs sm:text-sm md:text-[16px] lg:ml-20 tracking-wide text-center lg:text-left max-w-md lg:max-w-none">
                        {stickyContent[getCurrentCategory()]?.text.split('<br />').map((line, i) => (
                            <span key={i}>{line.trim()}{i < stickyContent[getCurrentCategory()]?.text.split('<br />').length - 1 && <br />}</span>
                        ))}
                    </p>
                </div>
            </div>

            {/* Right content section */}
            <div className="w-full lg:w-[60%] flex flex-col lg:flex-row">
                <div className="w-full lg:w-[70%] flex flex-col">
                    <div className="w-full flex justify-center lg:justify-start lg:ml-32 mb-6 lg:mb-0 px-4 lg:px-0">
                        <h1 className="special-font font-family-zentry lg:ml-8 uppercase leading-tight text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-center lg:text-left">
                            O<b>u</b>r Partners
                        </h1>
                    </div>
                    <div
                        id="backers-list"
                        className="w-full flex flex-col px-4 lg:px-0"
                    >
                        {backersData.map((backer, index) => (
                            <div
                                key={index}
                                ref={el => itemRefs.current[index] = el}
                                className="w-full flex items-center justify-center lg:justify-start lg:pl-20 lg:py-0"
                            >
                                <p className={`font-family-robert-regular text-[8px] sm:text-[10px] lg:pl-8 mt-1 transition-colors duration-300 mr-2 lg:mr-0 ${
                                    updatesActive
                                        ? 'text-black'
                                        : (activeIndex === index ? 'text-yellow-300' : 'text-white/40')
                                }`}>
                                    {backer.category}
                                </p>
                                <h1 className={`special-font font-family-zentry ml-2 lg:ml-4 uppercase leading-14 text-3xl sm:text-4xl md:text-5xl lg:text-6xl transition-colors duration-300 text-center lg:text-left ${
                                    updatesActive
                                        ? 'text-black'
                                        : (activeIndex === index ? 'text-yellow-300' : 'text-blue-50')
                                }`}>
                                    {backer.name}
                                </h1>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right sticky image section */}
                <div className="w-full lg:w-[30%] relative mt-8 lg:mt-0">
                    <div className="sticky top-4 md:top-100 flex justify-center lg:mt-16">
                        <img
                            id="backers-image"
                            src={`/img/${getCurrentImage()}`}
                            className="w-24 sm:w-28 md:w-32 lg:w-32 object-contain transition-opacity duration-300"
                            alt={backersData[activeIndex]?.name || "Partner"}
                            key={getCurrentImage()}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Backers