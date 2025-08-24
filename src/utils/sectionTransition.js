// Configuration for section color transitions

export const sectionTransitionsConfig = [
    // Section 1: Story (Initial section)
    {
        selector: "#story",
        initialColors: {
            background: "#000000", // black (default state)
            text: "#DFDFF0" // blue-50
        },
        activeColors: {
            background: "#edff66", // yellow (when vault+ sections are active)
            text: "#000000" // black text
        },
        elements: [
            {
                selector: "#realm-button",
                initialColors: {
                    background: "#f5f3ff",
                    text: "#000000"
                },
                activeColors: {
                    background: "#000000",
                    text: "#f5f3ff"
                }
            }
        ],
        transition: {
            duration: 0.2,
            ease: "power2.out"
        }
    },

    // Section 2: Vault
    {
        selector: "#vault",
        trigger: {
            start: "top 75%",
            end: "bottom 25%"
        },
        initialColors: {
            background: "#000000", // black (when story is active)
            text: "#DFDFF0" // blue-50
        },
        activeColors: {
            background: "#edff66", // yellow (when vault is active, before info)
            text: "#000000" // black text
        },
        // Add a new property for when this section should update due to later sections
        futureActiveColors: {
            background: "#dfdff0", // light blue (when info becomes active)
            text: "#000000" // black text
        },
        elements: [
            {
                selector: "#vault-title",
                initialColors: {
                    background: "transparent",
                    text: "#DFDFF0"
                },
                activeColors: {
                    background: "transparent",
                    text: "#000000"
                },
                futureActiveColors: {
                    background: "transparent",
                    text: "#000000"
                }
            }
        ],
        transition: {
            duration: 0.2,
            ease: "power2.out"
        }
    },

    // Section 3: Info (Creates the final transition to light blue)
    {
        selector: "#info",
        trigger: {
            start: "top 70%",
            end: "bottom 25%"
        },
        initialColors: {
            background: "#edff66", // yellow (inherited from vault state)
            text: "#000000" // black text
        },
        activeColors: {
            background: "#dfdff0", // light blue (info's final color)
            text: "#000000" // black text (stays the same)
        },
        futureActiveColors: {
            background: "#000000", // black (when glance becomes active)
            text: "#dfdff0" // light blue text
        },
        elements: [
            {
                selector: "#discover-button",
                initialColors: {
                    background: "#000000",
                    text: "#ffffff"
                },
                activeColors: {
                    background: "#000000",
                    text: "#ffffff"
                },
                futureActiveColors: {
                    background: "#dfdff0", // light blue (when info becomes active)
                    text: "#000000" // black text
                },
            },
            {
                selector: "#squared",
                initialColors: {
                    background: "#dfdff0",
                },
                activeColors: {
                    background: "#000000",
                },
                futureActiveColors: {
                    background: "#dfdff0", // light blue (when info becomes active)
                },
            }
        ],
        transition: {
            duration: 0.3,
            ease: "power2.out"
        }
    },
    {
        selector: "#Glance",
        trigger: {
            start: "top 60%",
            end: "bottom 25%"
        },
        initialColors: {
            background: "#DFDFF0", // light blue (default state)
            text: "#000000" // black text
        },
        activeColors: {
            background: "#000000", // black (when glance is active)
            text: "#dfdff0" // light blue text
        },
        elements: [
            {
                selector: "#glance-title",
                initialColors: {
                    background: "#dfdff0",
                    text: "#000000"
                },
                activeColors: {
                    background: "#000000",
                    text: "#dfdff0"
                }
            },
        ],
        transition: {
            duration: 0.3,
            ease: "power2.out"
        }
    },
    {
        selector: "#Backers",
        trigger: {
            start: "top 60%",
            end: "bottom 10%"
        },
        initialColors: {
            background: "#000000", // black (inherited from glance)
            text: "#dfdff0", // light blue text
        },
        activeColors: {
            background: "#000000", // stays black when backers is active
            text: "#dfdff0" // stays light blue
        },
        futureActiveColors: {
            background: "#dfdff0", // light blue when updates becomes active
            text: "#000000" // black text
        },
        transition: {
            duration: 0.3,
            ease: "power2.out"
        }
    },
    {
        selector: "#Updates",
        trigger: {
            start: "top 60%",
            end: "bottom 25%"
        },
        initialColors: {
            background: "#000000", // black (inherited)
            text: "#DFDFF0" // light blue text
        },
        activeColors: {
            background: "#dfdff0", // light blue background
            text: "#000000" // black text
        },
        elements: [
            {
                selector: "#updates-title",
                initialColors: {
                    background: "#000000",
                    text: "#DFDFF0"
                },
                activeColors: {
                    background: "#dfdff0",
                    text: "#000000"
                }
            },
        ],
        transition: {
            duration: 0.3,
            ease: "power2.out"
        }
    },
];