import {
    CalendarOutlined,
    BookOutlined,
    ContainerFilled,
    GroupOutlined,
    TeamOutlined,
    UserOutlined
} from '@ant-design/icons';
import { Avatar } from 'antd';
import classnames from 'classnames';
import { observer } from 'mobx-react-lite';
import globalStore from '../../../components/GlobalComponent/globalStore';
import utils from '../../../utils/utils';
import LoadingOverlay from '../../../components/LoadingOverlay/LoadingOverlay';
import { useEffect, useState } from 'react';

const QuickStatistic = observer(({ upcomingExams, dashboardData }: { upcomingExams: any; dashboardData: any }) => {
    const [countdowns, setCountdowns] = useState<any>({});

    useEffect(() => {
        if (!upcomingExams || upcomingExams.length === 0) return;

        const interval = setInterval(() => {
            const now = Date.now();

            const newCountdowns: any = {};

            upcomingExams.forEach((exam: any) => {
                const end = new Date(exam.endTime).getTime();
                const diff = Math.max(0, end - now);

                const minutes = Math.floor(diff / 1000 / 60);
                const seconds = Math.floor((diff / 1000) % 60);

                newCountdowns[exam.id] = {
                    minutes,
                    seconds
                };
            });

            setCountdowns(newCountdowns);
        }, 1000);

        return () => clearInterval(interval);
    }, [upcomingExams]);

    return (
        <LoadingOverlay loading={!upcomingExams || upcomingExams.length == 0}>
            {upcomingExams && upcomingExams.length != 0 ? (
                <div className={classnames('quick-statistic', { 'flex-col': globalStore.isBelow1000 })}>
                    <div className="left">
                        <div className="header">
                            <Avatar icon={<GroupOutlined />} style={{ backgroundColor: '#1890ff' }} />
                            Quản lý
                        </div>
                        <div className="summary">
                            <div className="cell good-bg">
                                <div className="header">Tổng số nhóm</div>
                                <div className="info">
                                    {' '}
                                    <TeamOutlined /> {dashboardData.totalGroups}
                                </div>
                            </div>
                            <div className="cell good-bg">
                                <div className="header">Tổng số sinh viên</div>
                                <div className="info">
                                    {' '}
                                    <UserOutlined /> {dashboardData.totalStudents}
                                </div>
                            </div>
                            <div className="cell good-bg">
                                <div className="header">Tổng số bài tập</div>
                                <div className="info">
                                    {' '}
                                    <BookOutlined /> {dashboardData.totalExercises}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <div className="header">
                            <Avatar icon={<CalendarOutlined />} style={{ backgroundColor: '#1890ff' }} />
                            Bài thi trong ngày
                        </div>
                        <div className="upcoming-exams">
                            {upcomingExams.map((ue: any) => {
                                const cd = countdowns[ue.id] || { minutes: 0, seconds: 0 };

                                return (
                                    <div key={ue.id} className="upcoming-exams-item good-bg">
                                        <div className="header">
                                            <ContainerFilled className="icon" />
                                            {ue.title}
                                            <div className="label">&nbsp;Thời gian làm bài: {ue.timeLimit} phút</div>
                                        </div>
                                        <div className="content">
                                            <div className="cell">
                                                <div className="label">Thời gian bắt đầu: </div>
                                                {utils.formatDate(ue.startTime, 'DD/MM/YYYY HH:mm')}
                                            </div>
                                            <div className="cell">
                                                <div className="label">Thời gian kết thúc: </div>
                                                {utils.formatDate(ue.endTime, 'DD/MM/YYYY HH:mm')}
                                            </div>
                                        </div>
                                        <div className="time-left mt-8">
                                            {cd.minutes == 0 ? (
                                                <b className="color-red">Bài thi đã kết thúc</b>
                                            ) : (
                                                <>
                                                    Bài thi kết thúc trong <b>{cd.minutes}</b> phút <b>{cd.seconds}</b>{' '}
                                                    giây
                                                </>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            ) : (
                <div style={{ height: 300 }}></div>
            )}
        </LoadingOverlay>
    );
});

export default QuickStatistic;
