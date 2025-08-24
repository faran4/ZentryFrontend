import React, { useState, useRef, useCallback } from 'react';
import { FaDiscord, FaGithub, FaTwitch, FaTwitter } from "react-icons/fa";

const AnimatedLink = ({ href, children, className = "" }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <li className="relative flex justify-center items-center" style={{ minHeight: '40px' }}>
            <a
                href={href}
                className={`absolute inline-block cursor-pointer overflow-hidden no-underline text-center ${className}`}
                style={{
                    backgroundColor: isHovered ? "black" : "transparent",
                    color: isHovered ? "#531DFF" : "black",
                    padding: isHovered ? "12px 28px" : "0px",
                    borderRadius: isHovered ? "6px" : "0px",
                    transition: "all 0.5s ease-out",
                    transform: isHovered ? "scale(1)" : "scale(1)",
                    zIndex: isHovered ? 10 : 1
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <span className="relative inline-flex overflow-hidden">
                    <div
                        className="transition duration-500 ease-out"
                        style={{
                            transform: isHovered
                                ? "translateY(-160%) skewY(12deg)"
                                : "translateY(0%) skewY(0deg)"
                        }}
                    >
                        {children}
                    </div>
                    <div
                        className="absolute left-0 transition duration-500 ease-out"
                        style={{
                            transform: isHovered
                                ? "translateY(0%) skewY(0deg)"
                                : "translateY(164%) skewY(12deg)"
                        }}
                    >
                        {children}
                    </div>
                </span>
            </a>
        </li>
    );
};

const Footer = () => {
    const [transform, setTransform] = useState('matrix3d(0.999995, 2.83e-05, 0, -1e-07, -1.53e-05, 0.999914, 0, 0, 0, 0, 1, 0, -0.0411366, -0.0152433, 0, 1)');
    const [isHovering, setIsHovering] = useState(false);
    const zentryRef = useRef(null);

    // Define all 5 positions from your data
    const positions = {
        // Extreme left position (∞)
        extremeLeft: {
            m11: 0.956596, m12: 0.230954, m13: 0, m14: -0.0013789,
            m21: -0.131781, m22: 0.298827, m23: -0.0002591, m24: 0,
            m31: 0, m32: 0, m33: 1, m34: 0,
            m41: -334.456, m42: -124.702, m43: 0, m44: 1
        },
        // Between middle and extreme left (@) - I'll create a unique intermediate position
        leftMid: {
            m11: 0.955606, m12: 0.116416, m13: 0, m14: -0.0006662,
            m21: -0.134768, m22: 0.646611, m23: -0.000254, m24: 0,
            m31: 0, m32: 0, m33: 1, m34: 0,
            m41: -163.893, m42: -69.505, m43: 0, m44: 1
        },
        // Middle position (•)
        center: {
            m11: 0.999995, m12: 2.83e-05, m13: 0, m14: -1e-07,
            m21: -1.53e-05, m22: 0.999914, m23: 0, m24: 0,
            m31: 0, m32: 0, m33: 1, m34: 0,
            m41: -0.0411366, m42: -0.0152433, m43: 0, m44: 1
        },
        // Between middle and extreme right (@)
        rightMid: {
            m11: 0.955606, m12: -0.116416, m13: 0, m14: 0.0006662,
            m21: 0.134768, m22: 0.646611, m23: -0.000254, m24: 0,
            m31: 0, m32: 0, m33: 1, m34: 0,
            m41: 163.893, m42: -69.505, m43: 0, m44: 1
        },
        // Extreme right position (∞)
        extremeRight: {
            m11: 0.914122, m12: -0.21676, m13: 0, m14: 0.0012942,
            m21: 0.260735, m22: 0.341922, m23: -0.0005127, m24: 0,
            m31: 0, m32: 0, m33: 1, m34: 0,
            m41: 290.948, m42: -124.598, m43: 0, m44: 1
        }
    };

    // Enhanced easing functions
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
    const easeInOutQuart = (t) => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;

    // Linear interpolation function
    const lerp = (start, end, factor) => start + (end - start) * easeOutCubic(factor);

    // Function to interpolate between two matrices
    const interpolateMatrix = (matrix1, matrix2, factor) => {
        return {
            m11: lerp(matrix1.m11, matrix2.m11, factor),
            m12: lerp(matrix1.m12, matrix2.m12, factor),
            m13: lerp(matrix1.m13, matrix2.m13, factor),
            m14: lerp(matrix1.m14, matrix2.m14, factor),
            m21: lerp(matrix1.m21, matrix2.m21, factor),
            m22: lerp(matrix1.m22, matrix2.m22, factor),
            m23: lerp(matrix1.m23, matrix2.m23, factor),
            m24: lerp(matrix1.m24, matrix2.m24, factor),
            m31: lerp(matrix1.m31, matrix2.m31, factor),
            m32: lerp(matrix1.m32, matrix2.m32, factor),
            m33: lerp(matrix1.m33, matrix2.m33, factor),
            m34: lerp(matrix1.m34, matrix2.m34, factor),
            m41: lerp(matrix1.m41, matrix2.m41, factor),
            m42: lerp(matrix1.m42, matrix2.m42, factor),
            m43: lerp(matrix1.m43, matrix2.m43, factor),
            m44: lerp(matrix1.m44, matrix2.m44, factor)
        };
    };

    // Function to convert matrix object to CSS string
    const matrixToString = (matrix) => {
        return `matrix3d(${matrix.m11}, ${matrix.m12}, ${matrix.m13}, ${matrix.m14}, ${matrix.m21}, ${matrix.m22}, ${matrix.m23}, ${matrix.m24}, ${matrix.m31}, ${matrix.m32}, ${matrix.m33}, ${matrix.m34}, ${matrix.m41}, ${matrix.m42}, ${matrix.m43}, ${matrix.m44})`;
    };

    const handleMouseMove = useCallback((e) => {
        if (!zentryRef.current) return;

        setIsHovering(true);

        const rect = zentryRef.current.parentElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const deltaX = e.clientX - centerX;
        const normalizedX = deltaX / (rect.width / 2);
        const clampedX = Math.max(-1, Math.min(1, normalizedX));

        let resultMatrix;

        if (clampedX <= -0.5) {
            // Between extreme left and left-mid
            const factor = Math.abs((clampedX + 1) / 0.5); // 0 to 1
            resultMatrix = interpolateMatrix(positions.extremeLeft, positions.leftMid, factor);
        } else if (clampedX <= 0) {
            // Between left-mid and center
            const factor = Math.abs(clampedX / 0.5); // 0 to 1
            resultMatrix = interpolateMatrix(positions.leftMid, positions.center, factor);
        } else if (clampedX <= 0.5) {
            // Between center and right-mid
            const factor = clampedX / 0.5; // 0 to 1
            resultMatrix = interpolateMatrix(positions.center, positions.rightMid, factor);
        } else {
            // Between right-mid and extreme right
            const factor = (clampedX - 0.5) / 0.5; // 0 to 1
            resultMatrix = interpolateMatrix(positions.rightMid, positions.extremeRight, factor);
        }

        setTransform(matrixToString(resultMatrix));
    }, []);

    const handleMouseLeave = () => {
        setIsHovering(false);
        // Return to center position
        setTransform(matrixToString(positions.center));
    };

    return (
        <footer
            className="w-screen bg-[#531DFF] py-4 text-black relative overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Full Width ZENTRY Text - Massive Size with 3D Tilt Effect */}
            <div className="w-full text-center overflow-hidden perspective-1000 py-16">
                <h1
                    ref={zentryRef}
                    className="special-font font-family-zentry font-black text-black
                        text-[30vw] sm:text-[32vw] md:text-[34vw] lg:text-[36vw] xl:text-[38vw]
                        whitespace-nowrap px-2 leading-[0.9] -my-3 cursor-pointer select-none"
                    style={{
                        transform: transform,
                        transformStyle: 'preserve-3d',
                        transformOrigin: 'center center',
                        transition: isHovering
                            ? 'transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                            : 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                    }}
                >
                    ZENTR<b>Y</b>
                </h1>
            </div>

            <div className="mx-8 px-4 pt-8 pb-20">
                {/* Main Footer Content */}
                <div className="w-full grid grid-cols-1 md:grid-cols-5 mb-8">
                    {/* Logo Section */}
                    <div className="flex flex-col">
                        <div className="mb-4">
                            {/* Your logo component here */}
                            <div className="w-28 h-28">
                                <img src="/img/zentry-icon1.png" alt="zentry-icon" className="w-full" />
                            </div>
                        </div>
                    </div>

                    {/* Explore Section */}
                    <div className="flex flex-col items-center">
                        <h3 className="text-[10px] font-family-general uppercase mb-8 text-center">Explore</h3>
                        <ul className="font-family-robert-regular text-xl flex flex-col items-center">
                            <AnimatedLink href="#home">Home</AnimatedLink>
                            <AnimatedLink href="#prologue">Prologue</AnimatedLink>
                            <AnimatedLink href="#about">About</AnimatedLink>
                            <AnimatedLink href="#contact">Contact</AnimatedLink>
                        </ul>
                    </div>

                    {/* Products Section */}
                    <div className="flex flex-col items-center">
                        <h3 className="text-[10px] font-family-general uppercase mb-8 text-center">Products</h3>
                        <ul className="font-family-robert-regular text-xl flex flex-col items-center">
                            <AnimatedLink href="#radiant">Radiant</AnimatedLink>
                            <AnimatedLink href="#nexus">Nexus</AnimatedLink>
                            <AnimatedLink href="#zigma">Zigma</AnimatedLink>
                            <AnimatedLink href="#azul">Azul</AnimatedLink>
                        </ul>
                    </div>

                    <div className="flex flex-col items-center">
                        <h3 className="text-[10px] font-family-general uppercase mb-8 text-center">Follow Us</h3>
                        <ul className="font-family-robert-regular text-xl flex flex-col items-center">
                            <AnimatedLink href="#discord">Discord</AnimatedLink>
                            <AnimatedLink href="#twitter">X</AnimatedLink>
                            <AnimatedLink href="#youtube">Youtube</AnimatedLink>
                            <AnimatedLink href="#medium">Medium</AnimatedLink>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="flex flex-col items-center">
                        <h3 className="text-[10px] font-family-general uppercase mb-8 text-center">Resources</h3>
                        <ul className="font-family-robert-regular text-xl flex flex-col items-center">
                            <AnimatedLink href="#media-kit">MediaKit</AnimatedLink>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="absolute bottom-4 left-0 right-0 px-12 font-family-general flex flex-col md:flex-row justify-between items-center">
                    <p className="text-[10px] mb-4 md:mb-0">
                        ©ZENTRY 2024. ALL RIGHTS RESERVED
                    </p>

                    <div className="relative flex justify-center items-center" style={{ minHeight: '40px' }}>
                        <a
                            href="#privacy-policy"
                            className="text-[10px] font-family-general cursor-pointer"
                            onMouseEnter={(e) => e.target.style.color = '#531DFF'}
                            onMouseLeave={(e) => e.target.style.color = 'black'}
                        >
                            PRIVACY POLICY
                        </a>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .perspective-1000 {
                    perspective: 1000px;
                }
            `}</style>
        </footer>
    );
};

export default Footer;