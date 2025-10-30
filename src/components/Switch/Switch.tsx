import type { CSSProperties } from 'react';
import { useState } from 'react';

interface ISwitch {
    isOn: boolean;
    iconOn?: React.ReactNode;
    iconOff?: React.ReactNode;
    styles?: CSSProperties;
    onToggle: (newState: boolean) => void;
}

const Switch: React.FC<ISwitch> = ({ isOn, iconOn, iconOff, styles, onToggle }) => {
    const [state, setState] = useState(isOn);

    const handleToggle = () => {
        const newState = !state;
        setState(newState);
        onToggle(newState); // Gọi callback để thông báo về trạng thái mới
    };

    return (
        <div className={`switch ${state ? 'on' : 'off'}`} onClick={handleToggle} style={styles ?? {}}>
            <div className="switch-handle">
                {iconOn && state && iconOn}
                {iconOff && !state && iconOff}
            </div>
        </div>
    );
};

export default Switch;
