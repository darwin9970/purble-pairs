export type GameStatus = 
  | 'menu' 
  | 'init' 
  | 'preview' 
  | 'playing' 
  | 'checking' 
  | 'mismatch'
  | 'victory' 
  | 'defeat';


export type Difficulty = 'easy' | 'normal' | 'hard';

export interface Card {
  id: string; // React key 的唯一 ID
  content: string; // 图片 URL
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameState {
  status: GameStatus;
  cards: Card[];
  lives: number;
  difficulty: Difficulty;
  previewTimeLeft: number; // 单位：秒
  
  // 动作
  setDifficulty: (diff: Difficulty) => void;
  startGame: () => void;
  flipCard: (cardId: string) => void;
  checkMatch: () => void;
  tickPreview: () => void;
  resetGame: () => void;
}

export const DIFFICULTY_SETTINGS = {
  easy: { pairs: 4, cols: 4 },     // 8 cards
  normal: { pairs: 6, cols: 4 },   // 12 cards
  hard: { pairs: 8, cols: 4 },     // 16 cards
};
