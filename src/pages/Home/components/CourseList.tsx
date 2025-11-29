import { observer } from 'mobx-react-lite';
import LoadingOverlay from '../../../components/LoadingOverlay/LoadingOverlay';
import { useNavigate } from 'react-router-dom';

const CourseList = observer(({ courses }: { courses: any }) => {
    const navigate = useNavigate();

    return (
        <LoadingOverlay loading={!courses || courses.length == 0}>
            {courses && courses.length != 0 ? (
                <div className="course-list">
                    {courses.map((c: any) => {
                        return (
                            <div
                                key={`course-item-${c.id}`}
                                className="course-item good-bg"
                                onClick={() => navigate(`/courses/${c.id}`)}
                            >
                                <div className="title">
                                    <img className="ico" src="/sources/icons/fire-ico.svg" />
                                    {c.title}
                                </div>
                                <div className="description max-2-lines">{c.description}</div>
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

export default CourseList;
