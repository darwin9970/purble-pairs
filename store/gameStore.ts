import { create } from 'zustand';
import { Card, Difficulty, DIFFICULTY_SETTINGS, GameState } from '@/lib/types';

import { ANIMAL_IMAGES } from '@/lib/assets';

const generateCards = (difficulty: Difficulty): Card[] => {
  const { pairs } = DIFFICULTY_SETTINGS[difficulty];
  // 选择 N 张随机图片
  const selectedImages = [...ANIMAL_IMAGES].sort(() => 0.5 - Math.random()).slice(0, pairs);
  // 创建配对
  const cards = [...selectedImages, ...selectedImages].map((image, index) => ({
    id: `card-${index}-${Math.random().toString(36).substr(2, 9)}`,
    content: image,
    isFlipped: false,
    isMatched: false,
  }));
  
  // 洗牌
  return cards.sort(() => 0.5 - Math.random());
};

export const useGameStore = create<GameState>((set, get) => ({
  status: 'menu',
  cards: [],
  lives: 3,
  difficulty: 'normal',
  previewTimeLeft: 3,

  setDifficulty: (difficulty) => set({ difficulty }),

  startGame: () => {
    const { difficulty } = get();
    const newCards = generateCards(difficulty);
    // 初始全翻转（可见）用于预览
    const previewCards = newCards.map(c => ({ ...c, isFlipped: true }));
    
    set({ 
      status: 'preview', 
      cards: previewCards, 
      lives: 3, 
      previewTimeLeft: 3 
    });
  },

  tickPreview: () => {
    const { previewTimeLeft } = get();
    if (previewTimeLeft > 0) {
      set({ previewTimeLeft: previewTimeLeft - 1 });
    } else {
      // 时间到，翻回背面并开始游戏
      const { cards } = get();
      set({ 
        status: 'playing', 
        previewTimeLeft: 0,
        cards: cards.map(c => ({ ...c, isFlipped: false }))
      });
    }
  },

  flipCard: (cardId) => {
    const { status, cards, lives } = get();
    
    // 防卫语句
    if (status !== 'playing') return;
    
    const clickedCard = cards.find(c => c.id === cardId);
    if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched) return;

    // 翻转点击的卡片
    const newCards = cards.map(c => 
      c.id === cardId ? { ...c, isFlipped: true } : c
    );
    
    set({ cards: newCards });

    // 检查已翻转数量（排除已匹配的）
    const flippedPending = newCards.filter(c => c.isFlipped && !c.isMatched);
    
    if (flippedPending.length === 2) {
      // 立即锁定输入
      set({ status: 'checking' });
      // Trigger match check (delayed by UI component usually, but logic here needs to be sound)
      // We will rely on the UI/Component to call checkMatch or handle the delay, 
      // BUT for a robust store, we can trigger a timeout here or require manual trigger.
      // To keep store "pure-ish", let's handle the checking logic via a timeout in the store or component.
      // Better: Component listens to 'checking' state and calls checkMatch after animation.
      // Actually, let's keep logic inside store actions for simplicity.
      setTimeout(() => {
        get().checkMatch();
      }, 600 + 400); // 等待翻转动画 (0.6s) + 观看时间 (0.4s)
    }
  },

  checkMatch: () => {
    const { cards, lives } = get();
    const flippedPending = cards.filter(c => c.isFlipped && !c.isMatched);

    if (flippedPending.length !== 2) return; // 不应发生

    const [card1, card2] = flippedPending;

    if (card1.content === card2.content) {
      // 匹配成功！
      const matchedCards = cards.map(c => 
        (c.id === card1.id || c.id === card2.id) 
          ? { ...c, isMatched: true } 
          : c
      );
      
      // 检查胜利
      const allMatched = matchedCards.every(c => c.isMatched);
      
      set({ 
        cards: matchedCards, 
        status: allMatched ? 'victory' : 'playing' 
      });

    } else {
      // 匹配失败
      const newLives = lives - 1;
      
      // 设置为不匹配状态以触发动画
      set({ lives: newLives, status: 'mismatch' });
      
      // Wait for shake animation (e.g. 800ms)
      setTimeout(() => {
         // 仅在动画结束后检查游戏结束，让用户能看到心碎/震动效果
         if (newLives <= 0) {
             set({ status: 'defeat' });
             // Reveal remaining cards maybe? (Future enhancement)
         } else {
             // 重置卡片
             const resetCards = get().cards.map(c => 
                (c.id === card1.id || c.id === card2.id) 
                  ? { ...c, isFlipped: false } 
                  : c
             );
             set({ cards: resetCards, status: 'playing' });
         }
      }, 1000); // 1s 延迟，让用户意识到错误
    }

  },

  resetGame: () => {
    set({ 
      status: 'menu', 
      cards: [], 
      lives: 3, 
      previewTimeLeft: 3 
    });
  }
}));
