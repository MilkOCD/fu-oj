import { observer } from 'mobx-react-lite';
import classnames from 'classnames';

interface TabProps {
    value?: string | number;
    fontSize?: 14 | 16 | 18;
    options: TabOption[];
    onClick: (value: string | number, option: TabOption) => void;
}

interface TabOption {
    label: string;
    value: string | number;
}

const Tab = observer((props: TabProps) => {
    return (
        <div className="tab">
            <div className={`tab-options fs-${props.fontSize}`}>
                {props.options.map((t: TabOption) => {
                    return (
                        <div
                            key={`tab-option-${t.value}`}
                            className={classnames('tab-option', {
                                selected: props.value == t.value
                            })}
                            onClick={() => props.onClick(t.value, t)}
                        >
                            {t.label}
                        </div>
                    );
                })}
            </div>
        </div>
    );
});

export default Tab;
