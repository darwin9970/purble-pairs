import { motion } from 'framer-motion';
import { Card as CardType } from '@/lib/types';
import clsx from 'clsx';
import { CARD_BACK_IMAGE } from '@/lib/assets';

interface CardProps {
  card: CardType;
  onClick: () => void;
  isShaking: boolean;
}

export const Card = ({ card, onClick, isShaking }: CardProps) => {
  return (
    <div className="relative w-full aspect-square cursor-pointer perspective-1000" onClick={onClick}>
      <motion.div
        className={clsx(
          "w-full h-full relative preserve-3d",
          isShaking && "animate-shake ring-2 ring-red-500 rounded-xl"
        )}
        initial={{ rotateY: card.isFlipped ? 180 : 0 }}
        animate={{ rotateY: card.isFlipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* 功能上的正面（视觉上的背面 - 显示封面） */}
        <div 
          className="absolute inset-0 rounded-xl shadow-lg
                     border-2 border-white/20
                     flex items-center justify-center overflow-hidden"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(0deg)' }}
        >
          <img 
            src={CARD_BACK_IMAGE} 
            alt="卡片背面" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* 功能上的背面（视觉上的正面 - 显示内容） */}
        <div 
          className={clsx(
            "absolute inset-0 rounded-xl shadow-lg border-2",
            "bg-white flex items-center justify-center overflow-hidden",
            card.isMatched ? "border-yellow-400 bg-yellow-50/80" : "border-white"
          )}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <img 
            src={card.content} 
            alt="动物" 
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>
    </div>
  );
};
