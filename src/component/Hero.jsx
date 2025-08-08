import React, { useState, useEffect } from "react";

const Hero = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % 5);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const bgUrl = "https://i.ibb.co/8nBbc012/360-F-428769564-NB2-T4-JM9-E2xsx-Fd-XXwq-W717-Hwga-Zdp-Aq.jpg";

    return (
        <div className="relative w-full h-96 md:h-[500px] overflow-hidden rounded-lg shadow-lg">
            {[0, 1, 2, 3, 4].map((slideIndex) => (
                <div
                    key={slideIndex}
                    className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${current === slideIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                        }`}
                    style={{
                        backgroundImage: `url(${bgUrl})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <div className="bg-black bg-opacity-20 w-full h-full flex flex-col justify-center items-center text-center px-6 md:px-20">
                        {slideIndex === 0 && (
                            <>
                                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                                    Welcome to TaskCrowd
                                </h2>
                                <p className="text-white text-lg md:text-xl max-w-3xl drop-shadow-md">
                                    Collaborate and complete tasks efficiently with our platform.
                                </p>
                            </>
                        )}
                        {slideIndex === 1 && (
                            <>
                                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                                    Add Your Tasks Easily
                                </h2>
                                <p className="text-white text-lg md:text-xl max-w-3xl drop-shadow-md">
                                    Post new tasks and get help from the community quickly.
                                </p>
                            </>
                        )}
                        {slideIndex === 2 && (
                            <>
                                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                                    Browse Available Tasks
                                </h2>
                                <p className="text-white text-lg md:text-xl max-w-3xl drop-shadow-md">
                                    Find tasks that match your skills and interests.
                                </p>
                            </>
                        )}
                        {slideIndex === 3 && (
                            <>
                                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                                    Track Your Progress
                                </h2>
                                <p className="text-white text-lg md:text-xl max-w-3xl drop-shadow-md">
                                    Monitor your task status and stay organized.
                                </p>
                            </>
                        )}
                        {slideIndex === 4 && (
                            <>
                                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                                    Join TaskCrowd Today
                                </h2>
                                <p className="text-white text-lg md:text-xl max-w-3xl drop-shadow-md">
                                    Become part of a growing task management community.
                                </p>
                            </>
                        )}
                    </div>
                </div>
            ))}

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
                {[0, 1, 2, 3, 4].map((idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        className={`w-3 h-3 rounded-full transition-colors ${idx === current ? "bg-white" : "bg-gray-400"
                            }`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Hero;
