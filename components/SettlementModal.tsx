import { motion } from 'framer-motion';
import { RefreshCcw, Home } from 'lucide-react';
import clsx from 'clsx';
import { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface SettlementModalProps {
  type: 'victory' | 'defeat';
  onRestart: () => void;
  onHome: () => void;
}

export const SettlementModal = ({ type, onRestart, onHome }: SettlementModalProps) => {
  const isVictory = type === 'victory';

  useEffect(() => {
    if (isVictory) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#EC4899', '#8B5CF6', '#F59E0B']
      });
    }
  }, [isVictory]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      
      <div className="relative bg-slate-900 border border-white/10 p-8 rounded-3xl max-w-sm w-full text-center shadow-2xl">
        <h2 className={clsx(
          "text-4xl font-black mb-2",
          isVictory ? "text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500" : "text-slate-200"
        )}>
          {isVictory ? "闯关成功！" : "游戏结束"}
        </h2>
        
        <p className="text-slate-400 mb-8">
          {isVictory ? "记忆力惊人！准备好接受下一个挑战了吗？" : "不要气馁，再试一次！"}
        </p>

        <div className="flex gap-4 justify-center">
          <button 
            onClick={onHome}
            className="p-4 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
          >
            <Home className="w-6 h-6" />
          </button>
          
          <button 
            onClick={onRestart}
            className="flex-1 px-6 py-3 rounded-xl bg-white text-slate-900 font-bold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCcw className="w-5 h-5" />
            再玩一次
          </button>
        </div>
      </div>
    </motion.div>
  );
};
