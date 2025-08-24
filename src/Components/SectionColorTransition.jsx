import React from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

const SectionColorTransition = ({ sections = [] }) => {
    useGSAP(() => {
        if (sections.length === 0) return;

        // Set initial states for all sections
        sections.forEach(section => {
            if (section.selector) {
                gsap.set(section.selector, {
                    backgroundColor: section.initialColors.background,
                    color: section.initialColors.text
                });
            }

            if (section.elements) {
                section.elements.forEach(element => {
                    gsap.set(element.selector, {
                        backgroundColor: element.initialColors.background,
                        color: element.initialColors.text
                    });
                });
            }
        });

        // Helper function to apply colors to a section and its elements
        const applySectionColors = (section, colorType, duration = 0.2, ease = "power2.out") => {
            let colors;

            // Determine which color set to use
            if (colorType === 'futureActive' && section.futureActiveColors) {
                colors = section.futureActiveColors;
            } else if (colorType === 'active') {
                colors = section.activeColors;
            } else {
                colors = section.initialColors;
            }

            if (section.selector) {
                gsap.to(section.selector, {
                    backgroundColor: colors.background,
                    color: colors.text,
                    duration,
                    ease
                });
            }

            if (section.elements) {
                section.elements.forEach(element => {
                    let elementColors;

                    // Determine which color set to use for elements
                    if (colorType === 'futureActive' && element.futureActiveColors) {
                        elementColors = element.futureActiveColors;
                    } else if (colorType === 'active') {
                        elementColors = element.activeColors;
                    } else {
                        elementColors = element.initialColors;
                    }

                    gsap.to(element.selector, {
                        backgroundColor: elementColors.background,
                        color: elementColors.text,
                        duration,
                        ease
                    });
                });
            }
        };

        // Helper function to determine what colors sections should have at a given scroll position
        const getSectionStateAtIndex = (targetIndex) => {
            return sections.map((section, index) => {
                if (index === 0) {
                    // First section: active if any section after it is triggered
                    if (targetIndex >= 2) {
                        // If we're at info section or beyond, check if story has futureActiveColors
                        return section.futureActiveColors ? 'futureActive' : 'active';
                    } else if (targetIndex > 0) {
                        return 'active';
                    } else {
                        return 'initial';
                    }
                } else if (index < targetIndex) {
                    // Previous sections - check if they should use futureActive colors
                    if (targetIndex >= 2 && section.futureActiveColors) {
                        return 'futureActive';
                    } else {
                        return 'active';
                    }
                } else if (index === targetIndex) {
                    // Current section should be active
                    return 'active';
                } else {
                    // Future sections should be in initial state
                    return 'initial';
                }
            });
        };

        // Create scroll triggers for each section transition
        sections.forEach((section, index) => {
            if (index === 0) return; // Skip first section as it's the initial state

            ScrollTrigger.create({
                trigger: section.selector,
                start: section.trigger?.start || "top 75%",
                end: section.trigger?.end || "bottom 25%",
                onEnter: () => {
                    // Determine the correct state for all sections when entering this section
                    const sectionStates = getSectionStateAtIndex(index);

                    // Apply colors to all sections based on their determined state
                    sections.forEach((sec, secIndex) => {
                        applySectionColors(
                            sec,
                            sectionStates[secIndex],
                            section.transition?.duration || 0.2,
                            section.transition?.ease || "power2.out"
                        );
                    });
                },
                onLeaveBack: () => {
                    // When leaving back, determine correct state for all sections
                    const sectionStates = getSectionStateAtIndex(index - 1);

                    // Apply colors to all sections based on their determined state
                    sections.forEach((sec, secIndex) => {
                        applySectionColors(
                            sec,
                            sectionStates[secIndex],
                            section.transition?.duration || 0.2,
                            section.transition?.ease || "power2.out"
                        );
                    });
                }
            });
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [sections]);

    return null;
};

export default SectionColorTransition;