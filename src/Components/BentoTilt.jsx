import React, {useRef, useState} from 'react'
import {useGSAP} from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

const BentoTilt = ({ children, className = '' }) => {
    const [transformStyle, setTransformStyle] = useState('');
    const itemRef = useRef(null);

    const handleMouseMove = (e) => {
        if(!itemRef.current) return;

        const {left, top, width, height} = itemRef.current.getBoundingClientRect();

        const relativeX = (e.clientX - left) / width;
        const relativeY = (e.clientY - top) / height;

        const tiltX = (relativeY - 0.5) * 10;
        const tiltY = (relativeX - 0.5) * -10;

        const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.95, 0.95, 0.95)`;
        setTransformStyle(newTransform);
    }

    const handleMouseLeave = (e) => {
        setTransformStyle('');
    }

    useGSAP(() => {
        if(itemRef.current) {
            gsap.set(itemRef.current, {
                y: 100,
                z: -200,              // Start behind the screen
                rotationX: -45,       // Reversed: tilted forward instead of back
                opacity: 0,
                transformPerspective: 1000,
            });

            gsap.to(itemRef.current, {
                y: 0,
                z: 0,                 // Come forward to normal position
                rotationX: 0,         // Rotate to vertical position
                opacity: 1,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: itemRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                }
            })
        }
    }, []);

    return (
        <div className={className} ref={itemRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
             style={{
                 transform: transformStyle,
                 transformStyle: 'preserve-3d'
             }}>
            {children}
        </div>
    )
}
export default BentoTilt