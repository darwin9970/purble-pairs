import { useGameStore } from '@/store/gameStore';
import { Card } from './Card';
import clsx from 'clsx';
import { motion } from 'framer-motion';

export const GameBoard = () => {
    const { cards, flipCard, difficulty, status } = useGameStore();
  
    // 根据难度确定网格列数
    // Calcluate responsive card size limits based on viewport
    // Width limit: 90vw / 4 cols -> ~22vw
    // Height limit: 65vh / Rows -> ~45vh/Rows (assuming 1.5 aspect ratio: width < 30vh/Rows)
    
    // Rows per difficulty
    const rowCount = {
       easy: 2,
       normal: 3,
       hard: 4
    };
    
    const rows = rowCount[difficulty];

    const isMismatchState = status === 'mismatch';

    return (
      <div 
        className="grid gap-3 sm:gap-4 mx-auto p-4 place-items-center"
        style={{
           // Dynamic Grid Config
           gridTemplateColumns: `repeat(4, minmax(0, 1fr))`,
           // Constrain container width based on the tighter of Width vs Height limits
           // Height Limit Formula: (65vh / rows) / 1.5 aspect-ratio * 4 cols
           // Width Limit Formula: 90vw
           width: '100%',
           maxWidth: `min(1000px, 90vw, calc(${65 / rows / 1.5 * 4}vh))`
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
