import React from 'react';

const steps = [
    {
        id: 1,
        title: "Step 1: Post Your Task",
        description: "Create a detailed task listing to find the perfect freelancer for your job.",
    },
    {
        id: 2,
        title: "Step 2: Browse Freelancers",
        description: "Explore freelancers’ profiles and bids to choose the best fit for your task.",
    },
    {
        id: 3,
        title: "Step 3: Connect and Collaborate",
        description: "Communicate with freelancers, finalize details, and get your task done.",
    },
    {
        id: 4,
        title: "Step 4: Review & Pay",
        description: "Leave feedback for freelancers and securely process payments after completion.",
    },
];

const HowToUse = () => {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold text-center mb-10 text-purple-700">
                How It Works
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {steps.map(({ id, title, description }) => (
                    <div
                        key={id}
                        className="bg-yellow-100 rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="font-extrabold text-xl mb-3 text-purple-700 dark:text-purple-300">
                            {title}
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">
                            {description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HowToUse;
