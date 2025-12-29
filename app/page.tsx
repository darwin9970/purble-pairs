"use client";

import { useEffect } from 'react';
import { useGameStore } from '@/store/gameStore';
import { Menu } from '@/components/Menu';
import { GameBoard } from '@/components/GameBoard';
import { LifeCounter } from '@/components/LifeCounter';
import { ProgressBar } from '@/components/ProgressBar';
import { SettlementModal } from '@/components/SettlementModal';
import { AnimatePresence, motion } from 'framer-motion';

export default function Home() {
  const { status, tickPreview, previewTimeLeft, lives, startGame, resetGame, difficulty, setDifficulty } = useGameStore();

  // Handle Preview Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (status === 'preview') {
      interval = setInterval(() => {
        tickPreview();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [status, tickPreview]);

  const isGameActive = status !== 'menu';
  const showHUD = ['preview', 'playing', 'checking', 'mismatch', 'victory', 'defeat'].includes(status);
  const showSettlement = status === 'victory' || status === 'defeat';

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-slate-900 border-[16px] border-slate-950/50 p-4 overflow-hidden relative selection:bg-pink-500/30">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-950/40 via-slate-900 to-slate-900 pointer-events-none" />

      {/* HUD Layer */}
      <AnimatePresence>
        {showHUD && (
          <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start max-w-4xl mx-auto w-full z-20"
          >
            <div className="flex flex-col gap-2">
               <div className="text-slate-400 text-sm font-bold tracking-wider uppercase">生命值</div>
               <LifeCounter lives={lives} />
            </div>
            
            <div className="flex flex-col items-end gap-2">
                <button 
                  onClick={resetGame}
                  className="text-xs text-slate-500 hover:text-white transition-colors uppercase tracking-widest font-bold"
                >
                  退出游戏
                </button>
                {status === 'preview' && (
                     <div className="text-pink-400 font-bold animate-pulse">记忆时间！ {previewTimeLeft}秒</div>
                )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="z-10 w-full max-w-4xl flex flex-col items-center">
        <AnimatePresence mode="wait">
          {status === 'menu' && (
            <motion.div 
               key="menu"
               exit={{ opacity: 0, y: -20 }}
               className="absolute inset-0 flex items-center justify-center"
            >
              <Menu onStart={(d) => { setDifficulty(d); startGame(); }} />
            </motion.div>
          )}

          {isGameActive && (
             <motion.div 
                key="game"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full flex flex-col items-center"
             >
                {status === 'preview' && (
                  <div className="w-full max-w-md mb-8">
                     <ProgressBar />
                  </div>
                )}
                
                <GameBoard />
             </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showSettlement && (
          <SettlementModal 
            type={status as 'victory' | 'defeat'} 
            onRestart={startGame} 
            onHome={resetGame} 
          />
        )}
      </AnimatePresence>

    </main>
  );
}
