import { useGameStore } from '@/store/gameStore';
import { Card } from './Card';
import clsx from 'clsx';
import { motion } from 'framer-motion';

export const GameBoard = () => {
    const { cards, flipCard, difficulty, status } = useGameStore();
  
    const isMismatchState = status === 'mismatch';

    // 智能响应式布局：
    // 全平台统一：一行4个 (grid-cols-4) - 保持整齐，因为卡片总数是4的倍数
    // 尺寸限制：最大宽度受限于 1000px, 90%视口宽度 或 85%视口高度 (防止过高)
    return (
      <div 
        className="grid gap-3 sm:gap-4 mx-auto p-4 place-items-center grid-cols-4"
        style={{
           width: '100%',
           maxWidth: 'min(1000px, 90vw, 85vh)'
        }}
      >
        {cards.map((card) => (
          <motion.div 
            layout 
            key={card.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="w-full h-full"
          >
            <Card 
              card={card} 
              onClick={() => flipCard(card.id)} 
              isShaking={isMismatchState && card.isFlipped && !card.isMatched}
            />
          </motion.div>
        ))}
      </div>
    );
  };
