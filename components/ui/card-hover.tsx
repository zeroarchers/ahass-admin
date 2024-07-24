import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

import { Icons } from "@/components/icons";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    link: string;
    icon?: keyof typeof Icons;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 ",
        className,
      )}
    >
      {items.map((item, idx) => {
        const Icon = Icons[item.icon || "arrowRight"];
        return (
          <Link
            href={item?.link}
            key={item?.link}
            className="relative group  block p-2 h-full w-full"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-red-500 dark:bg-red-800 block  rounded-3xl"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.15 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>
            <Card className="flex items-center py-5">
              <Icon className="h-10 w-10 mr-2" />
              <CardTitle>{item.title}</CardTitle>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden  border border-transparent dark:border-white/[0.2]  relative z-20",
        className,
      )}
    >
      {children}
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h1 className={cn("font-bold text-2xl tracking-wide", className)}>
      {children}
    </h1>
  );
};
