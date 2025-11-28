import { observer } from 'mobx-react-lite';
import LoadingOverlay from '../../../components/LoadingOverlay/LoadingOverlay';
import utils from '../../../utils/utils';

const TopBySubmissions = observer(({ topBySubmissions }: { topBySubmissions: any }) => {
    return (
        <LoadingOverlay loading={!topBySubmissions || topBySubmissions.length == 0}>
            {topBySubmissions && topBySubmissions.length != 0 ? (
                <div className="course-list">
                    {topBySubmissions.map((c: any) => {
                        return (
                            <div key={`course-item-${c.id}`} className="course-item good-bg">
                                <div className="title">
                                    <img className="ico" src="/sources/news.png" />
                                    {c.title}
                                    <div className="difficulty">{utils.getDifficultyBackground(c.difficulty)}</div>
                                </div>
                                <div className="description">Lượt nộp bài: {c.submissionCount}</div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div style={{ height: 300 }}></div>
            )}
        </LoadingOverlay>
    );
});

export default TopBySubmissions;
