import { Heart } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

interface LifeCounterProps {
  lives: number;
}

export const LifeCounter = ({ lives }: LifeCounterProps) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3].map((index) => {
        const isLost = index > lives;
        return (
          <div key={index} className="relative">
             {/* Use Framer Motion for the breaking heart effect if needed, but existing logic used CSS */}
             {/* Sticking to simple state rendering with CSS animation for the 'break' moment if we tracked it */}
             {/* Since 'lives' just updates, we render filled or broken hearts. 
                 To animate the verify "loss", we rely on the state change.
             */}
             
             <Heart 
               className={clsx(
                 "w-8 h-8 transition-colors duration-300",
                 !isLost ? "fill-red-500 text-red-500 drop-shadow-md" : "fill-gray-700 text-gray-700 opacity-50"
               )} 
             />
             
             {/* Optional: Add a disappearing ghost heart for animation */}
             <AnimatePresence>
                {/* Note: This logic implies we just lost a life. But 'lives' is already updated. 
                    So logic is: calculate if this specific heart index is the one we just lost?
                    Maybe too complex for now. We will use the 'animate-heart-break' on a transient element if we want "explosion".
                    For now, simple state switch.
                */}
             </AnimatePresence>
          </div>
        )
      })}
    </div>
  );
};
