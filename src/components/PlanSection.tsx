import React from "react";
import {motion} from "framer-motion";
import {FaCheckCircle, FaTimesCircle} from "react-icons/fa";
import Button from "@/components/common/Button";

const plans = [
    {
        title: "30 Day Free Plan",
        price: "$0",
        features: [
            {text: "Unlimited Text to 3D Generation", included: true},
            {text: "Unlimited Text to Music Generation", included: true},
            {text: "Unlimited Text to Code Generation", included: true},
            {text: "Unlimited Text to NFT Generation", included: true},
            {text: "Unlimited Text to MetaVerse Generation", included: true},
            {text: "Unlimited Text to Game Generation", included: true},
        ],
        buttonLabel: "TRY ALL NOW",
    },
    /*{
        title: "Pro Plan",
        price: "$19.99",
        features: [
            {text: "500 credits per month", included: true},
            {text: "5 tasks waiting in queue", included: true},
            {text: "High queue priority", included: true},
            {text: "Assets are under CC BY 4.0 license", included: true},
            {text: "10 free retries", included: true},
            {text: "Quad remesher and custom polycounts", included: true},
            {text: "AI texture editing", included: false},
            {text: "Download community models", included: false},
            {text: "Animation", included: false},
        ],
        buttonLabel: "UPGRADE NOW",
    },
    {
        title: "Premium Plan",
        price: "$49.99",
        features: [
            {text: "Unlimited credits per month", included: true},
            {text: "Unlimited tasks waiting in queue", included: true},
            {text: "Top queue priority", included: true},
            {text: "Assets are under CC BY 4.0 license", included: true},
            {text: "Unlimited retries", included: true},
            {text: "Quad remesher and custom polycounts", included: true},
            {text: "AI texture editing", included: true},
            {text: "Download community models", included: true},
            {text: "Animation", included: true},
        ],
        buttonLabel: "GO PREMIUM",
    },*/
];

const PlanSection = () => {
    return (
        <motion.section
            className="flex flex-col items-center justify-center min-h-screen bg-primary-800 text-white py-16"
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            viewport={{once: false}}
            transition={{duration: 1}}
        >
            <motion.h1
                className="text-4xl font-bold mb-12 font-Nunito text-accent-500"
                initial={{y: -50, opacity: 0}}
                whileInView={{y: 0, opacity: 1}}
                viewport={{once: false}}
                transition={{duration: 0.8}}
            >
                Choose Your Plan
            </motion.h1>
            <div className="flex flex-wrap justify-center gap-8">
                {plans.map((plan, index) => (
                    <motion.div
                        key={index}
                        className="bg-primary-200 p-6 rounded-lg shadow-lg w-80"
                        initial={{scale: 0.8, opacity: 0}}
                        whileInView={{scale: 1, opacity: 1}}
                        viewport={{once: false}}
                        transition={{duration: 0.8, delay: index * 0.2}}
                    >
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-accent-500">
                                {plan.title}
                            </h2>
                            <h3 className="text-4xl font-bold mt-2">{plan.price}</h3>
                        </div>
                        <ul className="mt-4">
                            {plan.features.map((feature, idx) => (
                                <li
                                    key={idx}
                                    className={`flex items-center gap-2 py-2 ${
                                        feature.included
                                            ? "text-accent-400"
                                            : "text-secondary-600"
                                    }`}
                                >
                                    {feature.included ? (
                                        <FaCheckCircle className="text-accent-500"/>
                                    ) : (
                                        <FaTimesCircle className="text-secondary-600"/>
                                    )}
                                    <p className="text-sm">{feature.text}</p>
                                </li>
                            ))}
                        </ul>
                        <div className="h-12 w-full mt-4">
                            <Button
                                label={plan.buttonLabel}
                                onClick={() => {
                                }}
                                color="primary"
                            />
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
};

export default PlanSection;
