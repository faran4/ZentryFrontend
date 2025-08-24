import React, {useRef} from 'react'
import AnimatedTitle from "./AnimatedTitle.jsx";
import Button from "./Button.jsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import {useGSAP} from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    const swordManRef = useRef(null);
    const contact1Ref = useRef(null);
    const contact2Ref = useRef(null);

    useGSAP(() => {
        if (swordManRef.current) {
            gsap.set(swordManRef.current, {
                y: 200,
                opacity: 0,
            });

            gsap.to(swordManRef.current, {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power2.Out",
                scrollTrigger: {
                    trigger: swordManRef.current,
                    start: "top 90%",
                    toggleActions: "play none none reverse",
                }
            })
        }

        if (contact1Ref.current) {
            gsap.set(contact1Ref.current, {
                y: -100,
                opacity: 0,
            });

            gsap.to(contact1Ref.current, {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: swordManRef.current,
                    start: "top 90%",
                    toggleActions: "play none none reverse",
                }
            })
        }

        if (contact2Ref.current) {
            gsap.set(contact2Ref.current, {
                y: 350,
                opacity: 0,
            });

            gsap.to(contact2Ref.current, {
                y: 150,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: swordManRef.current,
                    start: "top 90%",
                    toggleActions: "play none none reverse",
                }
            })
        }
    }, []);

    return (
        <div id="contact" className="my-20 min-h-96 w-screen px-10">
            <div className="relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden">
                <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
                    <div
                        ref={contact1Ref}
                        className="contact-clip-path-1">
                        <img src="img/contact-1.webp" alt=""/>
                    </div>
                    <div
                        ref={contact2Ref}
                        className="contact-clip-path-2">
                        <img src="img/contact-2.webp" alt=""/>
                    </div>
                </div>
                <div
                    ref={swordManRef}
                    className="absolute -top-40 left-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
                    <div className="absolute md:scale-125">
                        <img src="img/swordman-partial.webp" alt=""/>
                    </div>
                    <div className="sword-man-clip-path md:scale-125">
                        <img src="img/swordman.webp" alt=""/>
                    </div>
                </div>

                <div className="flex flex-col items-center text-center">
                    <p className="mb-10 font-general text-[10px] uppercase">
                        Join Zentry
                    </p>

                    <AnimatedTitle
                        title="let&#39;s b<b>u</b>ild the <br /> new era of <br /> g<b>a</b>ming t<b>o</b>gether."
                        className="special-font !md:text-[6.2rem] w-full font-zentry !text-5xl !font-black !leading-[.9]"
                    />

                    <Button title="contact us" containerClass="mt-10 cursor-pointer" />
                </div>
            </div>
        </div>
    )
}
export default Contact