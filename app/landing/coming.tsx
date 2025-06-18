"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Users, Star, Calendar } from "lucide-react";

export default function EnhancedSpeakersComingSoon() {
  // Remove unused state variables
  // const [isSubscribed, setIsSubscribed] = useState(false);
  // const [email, _setEmail] = useState("");
  // const [isEmailValid, setIsEmailValid] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const floatVariants = {
    initial: { y: 0 },
    float: {
      y: [-5, 5, -5],
      transition: {
        repeat: Number.POSITIVE_INFINITY,
        duration: 3,
        ease: "easeInOut",
      },
    },
  };

  // Placeholder speaker silhouettes with different colors and positions
  const speakerSilhouettes = [
    { id: 1, color: "bg-blue-100", position: "translate-y-0" },
    { id: 2, color: "bg-green-100", position: "translate-y-4" },
    { id: 3, color: "bg-purple-100", position: "translate-y-0" },
    { id: 4, color: "bg-amber-100", position: "translate-y-6" },
    { id: 5, color: "bg-pink-100", position: "translate-y-2" },
    { id: 6, color: "bg-cyan-100", position: "translate-y-4" },
  ];

  // Testimonial placeholders
  const testimonials = [
  {
    quote:
      "Kiswahili lugha ya umoja - this celebration truly showcases how language unites our East African community and strengthens our cultural bonds.",
    author: "Dr. Amina Hassan, Linguistics Professor, University of Dar es Salaam",
  },
  {
    quote:
      "The EAC World Kiswahili Language Day is a powerful platform that demonstrates how our shared language drives regional integration and youth empowerment.",
    author: "Hon. Jean Baptiste Habyarimana, Former Minister of Education, Rwanda",
  },
  {
    quote:
      "This forum brilliantly connects artificial intelligence with inclusive education in Kiswahili, paving the way for technological advancement in our mother tongue.",
    author: "Prof. Inyani Simala, Theme Chair Moderator",
  },
  {
    quote:
      "As young innovators, we found incredible inspiration in seeing how Kiswahili can be the vehicle for sustainable development and regional employment opportunities.",
    author: "Sarah Wanjiku, Youth Innovation Participant, Kenya",
  },
  {
    quote:
      "The networking opportunities and knowledge exchange sessions created lasting partnerships between TVET institutions across all EAC partner states.",
    author: "Dr. Joseph Rusanganwa, Education Development Specialist",
  },
  {
    quote:
      "Witnessing the cultural performances and artistic expressions in Kiswahili reminded us of the rich heritage we share as East Africans.",
    author: "Ambassador Grace Mukasine, EAC Integration Expert",
  },
  {
    quote:
      "The symposium's focus on building youth competencies in Kiswahili for regional integration opened new pathways for cross-border collaboration.",
    author: "Michael Ochieng, Regional Development Coordinator, Uganda",
  },
  {
    quote:
      "This celebration proves that Kiswahili is not just a language of the past, but the language of our technological and educational future.",
    author: "Dr. Fatuma Ali, Digital Education Researcher, Somalia",
  },
  {
    quote:
      "The panel discussions with all EAC partner states demonstrated the true spirit of 'Umoja wa Afrika Mashariki' through our common language.",
    author: "Prof. Emmanuel Nshimiyimana, Cultural Heritage Specialist, Burundi",
  },
  {
    quote:
      "From the media briefing to the closing ceremony, every moment reinforced how Kiswahili serves as a bridge for peace and development in our region.",
    author: "Journalist Marie Claire Uwimana, EAC Media Network",
  },
  {
    quote:
      "The youth engagement symposium showed us that Kiswahili is the key to unlocking innovation and entrepreneurship across East Africa.",
    author: "James Mwangi, Young Entrepreneur, Tanzania",
  },
  {
    quote:
      "This forum perfectly balances tradition with modernity, showing how Kiswahili adapts to serve contemporary educational and technological needs.",
    author: "Dr. Rebecca Nyong, Language Policy Expert, South Sudan",
  }
];

  // Rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Remove unused validateEmail function
  // const validateEmail = (email: string) => {
  //   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  // };

  // Handle subscription
  // const handleSubscribe = () => {
  //   if (validateEmail(email)) {
  //     setIsSubscribed(true);
  //     setIsEmailValid(true);
  //     console.log(isEmailValid, isSubscribed)
  //     // Here you would typically send this to your backend
  //     console.log("Subscribed with email:", email);
  //   } else {
  //     setIsEmailValid(false);
  //   }
  // };

  return (
    <div className="w-full py-16 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-50 rounded-full opacity-70 blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-purple-50 rounded-full opacity-70 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-amber-50 rounded-full opacity-50 blur-3xl"></div>
      </div>

      {/* Decorative floating elements */}
      <div className="absolute top-20 left-10 hidden lg:block">
        <motion.div initial="initial" animate="float" variants={floatVariants}>
          <Star className="h-8 w-8 text-yellow-300 opacity-70" />
        </motion.div>
      </div>

      <div className="absolute bottom-20 right-10 hidden lg:block">
        <motion.div
          initial="initial"
          animate="float"
          variants={floatVariants}
          custom={1}
        >
          <Sparkles className="h-10 w-10 text-blue-400 opacity-70" />
        </motion.div>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-5xl mx-auto text-center relative z-10"
      >
        {/* Main heading with decorative elements */}
        <motion.div
          className="relative mb-8 inline-block"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            delay: 0.2,
            duration: 0.8,
          }}
        >
          <div className="absolute -top-8 -right-8">
            <Sparkles className="h-14 w-14 text-yellow-400 animate-pulse" />
          </div>
          <div className="absolute -bottom-6 -left-6">
            <Star
              className="h-10 w-10 text-amber-400 animate-pulse"
              fill="currentColor"
            />
          </div>
          <div className="text-6xl sm:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#026FB4] via-blue-600 to-purple-600 pb-2 px-4">
            Speakers
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="relative">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 mb-6">
            Coming Soon!
          </h2>
          <div className="absolute -right-4 top-0">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              <div className="w-12 h-12 rounded-full border-4 border-dashed border-blue-400 opacity-50"></div>
            </motion.div>
          </div>
          <div className="absolute -left-4 bottom-0">
            <motion.div
              initial={{ rotate: 360 }}
              animate={{ rotate: 0 }}
              transition={{
                duration: 15,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              <div className="w-10 h-10 rounded-full border-4 border-dotted border-purple-400 opacity-50"></div>
            </motion.div>
          </div>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-xl text-gray-600 max-w-2xl mx-auto mb-10"
        >
          We&apos;re assembling an incredible lineup of industry leaders and
          TVET experts for the Future Skills Forum 2025. Stay tuned for
          announcements!
        </motion.p>

        {/* Speaker silhouettes with staggered animation */}
        <motion.div
          variants={itemVariants}
          className="relative h-48 sm:h-56 mb-12"
        >
          <div className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-2xl">
            {speakerSilhouettes.map((speaker, index) => (
              <motion.div
                key={speaker.id}
                className={`absolute ${speaker.position} ${
                  index % 2 === 0
                    ? "left-" + index * 15
                    : "right-" + (5 - index) * 15
                } w-24 h-24 sm:w-28 sm:h-28 rounded-full ${
                  speaker.color
                } flex items-center justify-center shadow-lg overflow-hidden`}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.5 + index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  y: -10,
                  boxShadow:
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  scale: 1.05,
                }}
              >
                <Users className="w-12 h-12 text-gray-500 opacity-70" />
                <div className="absolute inset-0 bg-white/10 rounded-full border-2 border-white/30"></div>

                {/* Decorative pulse effect */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-10"></span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Center decorative element */}
          <motion.div
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <div className="w-16 h-16 rounded-full bg-[#026FB4] flex items-center justify-center shadow-lg">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <div className="absolute inset-0 rounded-full">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-30"></span>
            </div>
          </motion.div>
        </motion.div>

        {/* Testimonial carousel */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-xl shadow-xl border border-gray-100 p-6 mb-12 h-40 flex items-center justify-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-400"></div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <p className="text-lg text-gray-700 italic mb-4">
                &quot;{testimonials[activeIndex].quote}&quot;
              </p>
              <p className="text-sm text-gray-500">
                — {testimonials[activeIndex].author}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Indicator dots */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === activeIndex ? "bg-blue-500 w-4" : "bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Final decorative element */}
      <motion.div variants={itemVariants} className="mt-12 flex justify-center">
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
