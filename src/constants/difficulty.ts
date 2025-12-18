export const DIFFICULTY = 'Độ khó';

export const difficulties = {
    EASY: {
        text: 'Dễ',
        color: 'cyan',
        className: 'color-cyan',
        bgClassName: 'bg-cyan'
    },
    MEDIUM: {
        text: 'Trung bình',
        color: 'gold',
        className: 'color-gold',
        bgClassName: 'bg-gold'
    },
    HARD: {
        text: 'Khó',
        color: 'red',
        className: 'color-red',
        bgClassName: 'bg-red'
    }
} as const;

export type Difficulty = keyof typeof difficulties;
