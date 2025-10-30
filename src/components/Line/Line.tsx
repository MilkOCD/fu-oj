import classnames from 'classnames';

interface ILine {
    width: number;
    height: number;
    text?: string;
    lineOnly?: boolean;
    center?: boolean;
}

const Line: React.FC<ILine> = ({ width, height, text, lineOnly, center }) => {
    return (
        <div className="line">
            {!center && text && <div style={{ fontWeight: 600, fontSize: 16, marginRight: 8 }}>{text}</div>}
            <div className={classnames('left-line', { 'line-only': lineOnly || !center })}></div>
            {lineOnly ? (
                ''
            ) : text ? (
                center ? (
                    <div style={{ fontWeight: 600, fontSize: 16, marginRight: 8 }}>{text}</div>
                ) : (
                    <></>
                )
            ) : (
                <img style={{ width: width, height: height }} src="/sources/logo-fullname.png" alt="" />
            )}
            <div className={classnames('right-line', { 'line-only': lineOnly || !center })}></div>
        </div>
    );
};

export default Line;
