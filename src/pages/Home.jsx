import React from 'react';
import Hero from '../component/Hero';
import { useLoaderData } from 'react-router';
import Count from '../component/Count';
import Card from './Card';
import { Typewriter } from 'react-simple-typewriter'; // ✅ Import
import HowToUse from './HowToUse';

const Home = () => {
    const data = useLoaderData();

    return (
        <div className="bg-background text-foreground min-h-screen">
            <Hero />

            {/* Featured Small Tasks Section */}
            <section className="mt-20 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto">
                <div className="mb-12 text-center">
                    <h2 className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent">
                        Featured Small
                        <Typewriter
                            words={[' Tasks', ' Job', ' Remote Work']}
                            loop={0}
                            cursor
                            cursorStyle="_"
                            typeSpeed={80}
                            deleteSpeed={60}
                            delaySpeed={1500}
                        />
                    </h2>
                    <p className="mt-3 max-w-xl mx-auto text-muted text-lg">
                        Find curated freelance tasks matching your skills, budget, and deadlines.
                    </p>
                </div>

                <Card tasks={data} />
            </section>
            <HowToUse />

            {/* Service Review Section */}
            <section className="mt-24 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto mb-20">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold">Our Service Review</h2>
                </div>
                <Count />
            </section>
        </div>
    );
};

export default Home;
