import { motion } from 'framer-motion';
import { Difficulty } from '@/lib/types';
import clsx from 'clsx';
import { Play, Grid3x3, Grid2x2, LayoutGrid } from 'lucide-react';

interface MenuProps {
  onStart: (diff: Difficulty) => void;
}

export const Menu = ({ onStart }: MenuProps) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col items-center gap-8 z-10"
    >
      <motion.div variants={item} className="text-center space-y-2">
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 pb-2">
          记忆翻牌
        </h1>
        <p className="text-slate-400">测试你的记忆力！</p>
      </motion.div>

      <motion.div variants={item} className="grid gap-4 w-full max-w-xs">
        <MenuButton 
          title="简单" 
          desc="4 对 (8 张卡片)" 
          icon={<Grid2x2 className="w-5 h-5"/>}
          onClick={() => onStart('easy')}
          color="bg-emerald-500"
        />
        <MenuButton 
          title="普通" 
          desc="6 对 (12 张卡片)" 
          icon={<Grid3x3 className="w-5 h-5"/>}
          onClick={() => onStart('normal')}
          color="bg-blue-500"
        />
        <MenuButton 
          title="困难" 
          desc="8 对 (16 张卡片)" 
          icon={<LayoutGrid className="w-5 h-5"/>}
          onClick={() => onStart('hard')}
          color="bg-purple-500"
        />
      </motion.div>
    </motion.div>
  );
};

const MenuButton = ({ title, desc, icon, onClick, color }: any) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={clsx(
      "relative group flex items-center p-4 rounded-2xl overflow-hidden transition-all",
      "bg-white/5 hover:bg-white/10 border border-white/10"
    )}
  >
    <div className={clsx("p-3 rounded-xl mr-4 text-white shadow-lg", color)}>
      {icon}
    </div>
    <div className="text-left">
      <div className="font-bold text-lg text-white group-hover:text-pink-200 transition-colors">
        {title}
      </div>
      <div className="text-xs text-slate-400 font-medium tracking-wide uppercase">
        {desc}
      </div>
    </div>
    <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
      <Play className="w-5 h-5 text-white/50" />
    </div>
  </motion.button>
);
