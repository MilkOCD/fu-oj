export const VISIBILITY = 'Hiển thị';

export const visbilities = {
    PUBLIC: {
        text: 'Công khai',
        color: 'cyan',
        className: 'color-cyan'
    },
    PRIVATE: {
        text: 'Riêng tư',
        color: 'gold',
        className: 'color-gold'
    },
    DRAFT: {
        text: 'Bản nháp',
        color: 'gold',
        className: 'color-red'
    }
} as const;

export type Visibility = keyof typeof visbilities;
