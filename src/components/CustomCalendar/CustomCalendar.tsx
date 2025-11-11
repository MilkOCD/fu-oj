import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import Calendar from 'react-calendar';
import utils from '../../utils/utils';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

function shortWeekdayLetters(_locale: string | undefined, date: Date): any {
    const day = date.getDay(); // 0 = Sunday, 1 = Monday ...
    const letters = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    return letters[day];
}

const CustomCalendar = observer(() => {
    const [value, onChange] = useState<Value>(new Date());

    console.log('log:', value);

    return (
        <div className="custom-calendar">
            <div className="title">
                <div className="day">
                    {value instanceof Date
                        ? `Day ${new Date(value).getDate()}`
                        : Array.isArray(value)
                        ? `${value[0]?.toLocaleDateString()} - ${value[1]?.toLocaleDateString()}`
                        : ''}
                </div>
                <div className="month">
                    {value instanceof Date
                        ? `/ ${new Date(value).getMonth()}`
                        : Array.isArray(value)
                        ? `${value[0]?.toLocaleDateString()} - ${value[1]?.toLocaleDateString()}`
                        : ''}
                </div>
                <div className="year">
                    {value instanceof Date
                        ? `/ ${new Date(value).getFullYear()}`
                        : Array.isArray(value)
                        ? `${value[0]?.toLocaleDateString()} - ${value[1]?.toLocaleDateString()}`
                        : ''}
                </div>
                <div className="month-hex">
                    <LeftOutlined className="ico" />
                    <img className="hex-parent" src="/sources/icons/hex-ico.svg" alt="" />
                    <img className="hex-child" src="/sources/icons/hex-child-ico.svg" alt="" />
                    <span className="hex-day">
                        <div className="day">{value instanceof Date ? `${value.getDate()}` : ''}</div>
                        <div className="month">
                            {value instanceof Date ? `${utils.getMonthShortName(value.getMonth())}` : ''}
                        </div>
                    </span>
                    <RightOutlined className="ico" />
                </div>
            </div>
            <Calendar
                onChange={onChange}
                value={value}
                calendarType="hebrew"
                formatShortWeekday={shortWeekdayLetters}
            />
        </div>
    );
});

export default CustomCalendar;
