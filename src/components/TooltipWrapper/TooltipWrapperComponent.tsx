import React, { useState } from 'react';
import type { PropsWithChildren } from 'react';

interface ITooltipWrapper {
    tooltipText: string;
    position: 'top' | 'right' | 'bottom' | 'left';
}

const TooltipWrapper: React.FC<PropsWithChildren<ITooltipWrapper>> = ({ children, tooltipText, position = 'top' }) => {
    const [isTooltipVisible, setTooltipVisible] = useState(false);

    const showTooltip = () => setTooltipVisible(true);
    const hideTooltip = () => setTooltipVisible(false);

    return (
        <div
            className="tooltip-wrapper"
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
            style={{ position: 'relative', display: 'inline-block' }}
        >
            {children}
            {isTooltipVisible && <div className={`tooltip-box tooltip-${position}`}>{tooltipText}</div>}
        </div>
    );
};

export default TooltipWrapper;
