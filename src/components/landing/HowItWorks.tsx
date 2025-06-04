import { motion } from "framer-motion";
import React from "react";
import { SearchCheck, Volleyball, MapPinHouse } from "lucide-react";
import { bebasFont } from "@/lib/font";

const steps = [
  {
    title: "Search Your Club",
    description: "Find pubs hosting watch parties for your team.",
    icon: <SearchCheck size={36} strokeWidth={3} color='#e24e1b' />,
  },
  {
    title: "Pick a Spot",
    description: "See ratings, fan vibes, and match schedules.",
    icon: <MapPinHouse size={36} strokeWidth={3} color='#e24e1b' />,
  },
  {
    title: "Join the Party",
    description: "Grab a pint and cheer together!",
    icon: <Volleyball size={36} strokeWidth={3} color='#e24e1b' />,
  },
];

const HowItWorks = () => {
  return (
    <section
      id='how-it-works'
      className=' py-20 px-4'
      style={{
        backgroundImage:
          "url(https://www.transparenttextures.com/patterns/dark-stripes-light.png)",
      }}
    >
      <motion.h2
        className='text-3xl font-bold text-ednavy text-center mb-12'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        How It Works
      </motion.h2>
      <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8'>
        {steps.map((step, idx) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            className='bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center'
          >
            <div className='text-4xl mb-4'>{step.icon}</div>
            <h3
              className={`${bebasFont.className} text-2xl font-semibold text-ednavy mb-2`}
            >
              {step.title}
            </h3>
            <p className='text-gray-700'>{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
