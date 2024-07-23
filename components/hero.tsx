"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlights";
import { motion } from "framer-motion";
import Link from "next/link";

const Hero = () => {
  return (
    <HeroHighlight>
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="flex flex-col flex-wrap"
      >
        <h1 className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto ">
          Sistem administrasi AHASS yang mementingkan <br />
          <Highlight className="text-black dark:text-white">
            {"produktifitas dan pilihan."}
          </Highlight>
        </h1>
        <Link className="text-center" href="/login">
          <Button className="mt-5 mx-auto" size={"lg"}>
            Login
          </Button>
        </Link>
      </motion.div>
    </HeroHighlight>
  );
};

export default Hero;
