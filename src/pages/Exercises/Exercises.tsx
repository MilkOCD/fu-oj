import { DeleteOutlined, HeartOutlined, SearchOutlined, SettingOutlined } from '@ant-design/icons';
import type { FormProps } from 'antd';
import { Button, Form, Input, Modal, Popconfirm, Select, Table, Tag } from 'antd';
import classnames from 'classnames';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useNavigate } from 'react-router-dom';
import globalStore from '../../components/GlobalComponent/globalStore';
import Line from '../../components/Line/Line';
import ProtectedElement from '../../components/ProtectedElement/ProtectedElement';
import TooltipWrapper from '../../components/TooltipWrapper/TooltipWrapperComponent';
import * as http from '../../lib/httpRequest';
import routesConfig from '../../routes/routesConfig';

const Exercises = observer(() => {
    const navigate = useNavigate();
    const [updateId, setUpdateId] = useState(null);
    const [datas, setDatas] = useState([]);
    const [topics, setTopics] = useState([]);
    const [displayDatas, setDisplayDatas] = useState([]);
    const [search, setSearch] = useState('');

    const [form] = Form.useForm();

    const columns = [
        {
            title: 'Mã bài tập',
            dataIndex: 'code',
            key: 'code',
            sorter: (a: any, b: any) => (a.code || '').localeCompare(b.code || ''),
            render: (code: string) => {
                return (
                    <Highlighter
                        highlightClassName="highlight"
                        searchWords={[search]}
                        autoEscape={true}
                        textToHighlight={code}
                    />
                );
            }
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
            sorter: (a: any, b: any) => (a.title || '').localeCompare(b.title || ''),
            render: (title: string) => {
                return (
                    <Highlighter
                        highlightClassName="highlight"
                        searchWords={[search]}
                        autoEscape={true}
                        textToHighlight={title}
                    />
                );
            }
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description'
        },
        {
            title: 'Chủ đề',
            dataIndex: 'topics',
            key: 'topics',
            render: (topics: any[]) => {
                if (!topics) return null;

                return topics.map((topic, index) => {
                    const text = topic.name.trim().toUpperCase();
                    const colors = [
                        'magenta',
                        'red',
                        'volcano',
                        'orange',
                        'gold',
                        'lime',
                        'green',
                        'cyan',
                        'blue',
                        'geekblue',
                        'purple'
                    ];
                    const color = colors[index];

                    return (
                        <Tag color={color} key={text} style={{ marginBottom: 8 }}>
                            {text}
                        </Tag>
                    );
                });
            }
        },
        {
            title: '',
            dataIndex: 'actions',
            key: 'actions',
            render: (actions: any, record: any) => {
                return (
                    <div className="actions-row" onClick={(e) => e.stopPropagation()}>
                        <TooltipWrapper tooltipText="Thêm vào yêu thích" position="left">
                            <HeartOutlined className="action-row-btn" />
                        </TooltipWrapper>

                        <ProtectedElement acceptRoles={['INSTRUCTOR']}>
                            <TooltipWrapper tooltipText="Chỉnh sửa" position="left">
                                <SettingOutlined
                                    className="action-row-btn"
                                    onClick={() => {
                                        setUpdateId(record.id);
                                        globalStore.setOpenDetailPopup(true);
                                        form.setFieldsValue({
                                            ...record,
                                            topicIds: record.topics.map((topic: any) => topic.id)
                                        });
                                    }}
                                />
                            </TooltipWrapper>
                            <TooltipWrapper tooltipText="Xóa" position="left">
                                <Popconfirm
                                    // title="Are you sure you want to delete this exercise?"
                                    title="Bạn có chắc chắn muốn xóa bài tập này?"
                                    okText="Có"
                                    cancelText="Không"
                                    onConfirm={() => {
                                        http.deleteById('/exercises', record.id).then((res) => {
                                            globalStore.triggerNotification(
                                                'success',
                                                res.message || 'Delete successfully!',
                                                ''
                                            );
                                            getExercises();
                                        });
                                    }}
                                >
                                    <DeleteOutlined className="action-row-btn" />
                                </Popconfirm>
                            </TooltipWrapper>
                        </ProtectedElement>
                    </div>
                );
            }
        }
    ];

    const handleChange = (value: string[]) => {
        console.log(`selected ${value}`);
    };

    const onFinish: FormProps['onFinish'] = (values) => {
        console.log('Success:', values);

        if (updateId) {
            http.putaaa(updateId, '/exercises', { ...values, testCases: [] })
                .then((res) => {
                    globalStore.triggerNotification('success', res.message, '');
                    getExercises();
                    globalStore.setOpenDetailPopup(false);
                })
                .catch((error) => {
                    globalStore.triggerNotification('error', error.response?.data?.message, '');
                });
        } else {
            http.post('/exercises', { ...values, testCases: [] })
                .then((res) => {
                    globalStore.triggerNotification('success', res.message, '');
                    getExercises();
                    globalStore.setOpenDetailPopup(false);
                })
                .catch((error) => {
                    globalStore.triggerNotification('error', error.response?.data?.message, '');
                });
        }
    };

    const onFinishFailed: FormProps['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const getExercises = () => {
        http.get('/exercises').then((res) => {
            setDatas(res.data);
            setDisplayDatas(res.data);
        });
    };

    useEffect(() => {
        getExercises();

        http.get('/topics').then((res) => {
            setTopics(res.data.map((topic: any) => ({ ...topic, value: topic.id, label: topic.name })));
        });
    }, []);

    useEffect(() => {
        if (!globalStore.isDetailPopupOpen) {
            form.resetFields();
            setUpdateId(null);
        }
    }, [globalStore.isDetailPopupOpen]);

    return (
        <div className="exercises">
            <Modal
                title={`${updateId ? 'Chỉnh sửa' : 'Tạo mới'} bài tập`}
                className="detail-modal"
                open={globalStore.isDetailPopupOpen}
                onCancel={() => globalStore.setOpenDetailPopup(false)}
                width={420}
            >
                <div className="exercise-form">
                    <Form
                        form={form}
                        name="basic"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        labelAlign="left"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Code"
                            name="code"
                            rules={[{ required: true, message: 'Please input your code!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Title"
                            name="title"
                            rules={[{ required: true, message: 'Please input your title!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[{ required: true, message: 'Please input your description!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Max Submissions"
                            name="maxSubmissions"
                            rules={[{ required: true, message: 'Please input your max submissions!' }]}
                        >
                            <Input type="number" />
                        </Form.Item>

                        <Form.Item
                            label="Topics"
                            name="topicIds"
                            rules={[{ required: true, message: 'Please select 1 topic at least!' }]}
                        >
                            <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="Select topics"
                                defaultValue={[]}
                                onChange={handleChange}
                                options={topics}
                            />
                        </Form.Item>

                        {/* <Form.Item name="remember" valuePropName="checked" label={null}>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item> */}

                        <Form.Item label={null}>
                            <Button type="primary" htmlType="submit">
                                {updateId ? 'Update' : 'Create'}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
            <div className="header">
                <div className="title">Danh sách bài tập</div>
                <div className="description">
                    Để bắt đầu một cách thuận lợi, bạn nên tập trung vào một lộ trình học. Ví dụ: Để đi làm với vị trí
                    "Lập trình viên Front-end" bạn nên tập trung vào lộ trình "Front-end".
                </div>
            </div>
            <div
                className={classnames('wrapper flex', {
                    'flex-col wrapper-responsive': globalStore.windowSize.width < 1300
                })}
            >
                <div className="search">
                    <div className="title">
                        <SearchOutlined />
                        Bộ lọc
                    </div>
                    <Input
                        value={search}
                        placeholder="Tìm kiếm theo Mã, Tên, Mô tả, Chủ đề"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Line width={0} height={0} text="Chủ đề" center />
                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Select topics"
                        defaultValue={[]}
                        onChange={handleChange}
                        options={topics}
                    />
                    <ProtectedElement acceptRoles={['INSTRUCTOR']}>
                        <Line width={0} height={0} text="Quản lý" center />
                        <Button onClick={() => globalStore.setOpenDetailPopup(true)}>Tạo mới</Button>
                    </ProtectedElement>
                </div>
                <div className="body">
                    <Table
                        rowKey="id"
                        scroll={{ x: 800 }}
                        pagination={{ pageSize: 10, showSizeChanger: false }}
                        dataSource={displayDatas}
                        columns={columns}
                        onRow={(record) => {
                            return {
                                onClick: () => {
                                    navigate(`/${routesConfig.exercise}`.replace(':id?', record.id));
                                }
                            };
                        }}
                    />
                </div>
            </div>
        </div>
    );
});

export default Exercises;
