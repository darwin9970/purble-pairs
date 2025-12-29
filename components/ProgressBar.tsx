import { motion } from 'framer-motion';

export const ProgressBar = () => {
  return (
    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mt-4 shadow-inner border border-white/5">
      <motion.div
        className="h-full bg-gradient-to-r from-pink-500 to-yellow-500 shadow-[0_0_10px_rgba(236,72,153,0.5)]"
        initial={{ width: "100%" }}
        animate={{ width: "0%" }}
        transition={{ duration: 3, ease: "linear" }}
      />
    </div>
  );
};
