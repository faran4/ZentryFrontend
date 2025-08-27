import clsx from "clsx";
import { useState } from "react";

const Button = ({ id, title, rightIcon, leftIcon, containerClass }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            id={id}
            className={clsx(
                "font-family-robert-medium relative z-10 w-fit cursor-pointer overflow-hidden bg-violet-50 text-black",
                isHovered ? "px-7 md:px-8 rounded-md" : "px-8 md:px-10 rounded-full",
                containerClass
            )}
            style={{
                paddingLeft: isHovered ? "28px" : "32px", // px-7 = 28px, px-8 = 32px
                paddingRight: isHovered ? "28px" : "32px",
                paddingTop: "12px", // py-3 = 12px
                paddingBottom: "12px",
                borderRadius: isHovered ? "6px" : "50px", // Changed from 9999px to 50px
                transition: "all 0.5s ease-out"
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {leftIcon}

            <span className="relative inline-flex overflow-hidden text-[10px] md:text-[12px] uppercase">
                <div
                    className="transition duration-500 ease-out"
                    style={{
                        transform: isHovered
                            ? "translateY(-160%) skewY(12deg)"
                            : "translateY(0%) skewY(0deg)"
                    }}
                >
                    {title}
                </div>
                <div
                    className="absolute transition duration-500 ease-out"
                    style={{
                        transform: isHovered
                            ? "translateY(0%) skewY(0deg)"
                            : "translateY(164%) skewY(12deg)"
                    }}
                >
                    {title}
                </div>
            </span>

            {rightIcon}
        </button>
    );
};

export default Button;