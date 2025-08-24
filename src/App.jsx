import React from 'react';
import Hero from "./Components/Hero.jsx";
import About from "./Components/About.jsx";
import Navbar from "./Components/Navbar.jsx";
import Features from "./Components/Features.jsx";
import Story from "./Components/Story.jsx";
import Contact from "./Components/Contact.jsx";
import Footer from "./Components/Footer.jsx";
import Vault from "./Components/Vault.jsx";
import SectionColorTransition from "./Components/SectionColorTransition.jsx";
import Info from "./Components/Info.jsx";
import {sectionTransitionsConfig} from "./utils/sectionTransition.js";
import Glance from "./Components/Glance.jsx";
import Updates from "./Components/Updates.jsx";
import Backers from "./Components/Backers.jsx";

const App = () => {
    return (
        <main children="relative min-h-screen w-screen overflow-x-hidden">
            <Navbar />
            <Hero />
            <About />
            <Features />
            <Story />
            <Vault />
            <Info />
            <Glance />
            <Backers />
            <Updates />
            <SectionColorTransition sections={sectionTransitionsConfig}/>
            <Contact />
            <Footer />
        </main>
    )
}

export default App