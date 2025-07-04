import { cn } from "../lib/utils.js";
import { AnimatePresence, motion } from "motion/react";

import { useState } from "react";

export const HoverEffect = ({
  items,
  className
}) => {
  let [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div
      className={cn("grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2  py-10", className)}>
      {items.map((item, idx) => (
        <a
          href={item?.link}
          key={item?.link}
          className="relative group  block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}>
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] rounded-3xl "
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }} />
            )}
          </AnimatePresence>
         <Card
          title={item.title}
          description={item.description}
          image={item.image}
        />
        </a>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  title,
  description,
  image
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-6 bg-gradient-to-br from-black via-[#0f0f0f] to-[#1a1a1a] shadow-md  transition-all duration-300 relative z-20 ",
        className
      )}>
      <div className="relative z-50 p-4">
        <div className="flex  items-start justify-between gap-4">
            <div className="flex-1">
               <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
            </div>
             <CardImage>{image}</CardImage>

        </div>
        
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children
}) => {
  return (
    <h4 className={cn("text-foreground font-bold tracking-wide mt-4 text-2xl ", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children
}) => {
  return (
    <p
      className={cn("mt-4 text-[#b1b8c2] leading-relaxed text-base max-w-md", className)}>
      {children}
    </p>
  );
};
export const CardImage = ({
  className,
  children
}) => {
  return (
    <div
      className={cn("mt-8 text-textSecondary tracking-wide leading-relaxed text-sm", className)}>
      {children}
    </div>
  );
};
