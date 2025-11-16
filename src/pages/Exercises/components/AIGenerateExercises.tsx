import { Button, Form, Input, InputNumber, Modal, Popconfirm, Select, Spin, Table, Tag, message } from 'antd';
import { useEffect, useState } from 'react';
import globalStore from '../../../components/GlobalComponent/globalStore';
import * as http from '../../../lib/httpRequest';
import utils from '../../../utils/utils';

interface AIGenerateExercisesProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const AIGenerateExercises = ({ open, onClose, onSuccess }: AIGenerateExercisesProps) => {
    const [form] = Form.useForm();
    const [aiPrompt, setAIPrompt] = useState('');
    const [aiLoading, setAILoading] = useState(false);
    const [aiPreviewExercises, setAIPreviewExercises] = useState<any[]>([]);
    const [aiStep, setAIStep] = useState(0); // 0: nhập prompt, 1: preview
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [topics, setTopics] = useState<Array<{ value: string; label: string }>>([]);
    const [topicsLoading, setTopicsLoading] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState<string>('');
    const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
    const [numberOfExercise, setNumberOfExercise] = useState<number>(2);
    const [deletedExercises, setDeletedExercises] = useState<Array<{ exercise: any; index: number }>>([]);

    const handleAIGenerate = async () => {
        try {
            await form.validateFields();
        } catch {
            return;
        }

        setAILoading(true);
        try {
            const values = form.getFieldsValue();
            const payload = {
                prompt: values.prompt || aiPrompt,
                topic: values.topic || selectedTopic,
                level: values.level || selectedLevels,
                numberOfExercise: values.numberOfExercise || numberOfExercise
            };
            const res = await http.post('/ai/exercises/generate', payload);

            if (res.exercises && res.exercises.length > 0) {
                // Bỏ qua id: null trong testCases
                const exercisesWithoutId = res.exercises.map((exerciseData: any) => ({
                    ...exerciseData,
                    testCases: exerciseData.testCases.map((tc: any) => {
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        const { id, ...rest } = tc;
                        return rest;
                    })
                }));

                setAIPreviewExercises(exercisesWithoutId);
                setAIStep(1); // Chuyển sang step preview
            } else {
                globalStore.triggerNotification('error', 'Không có bài tập nào được tạo!', '');
            }
        } catch (error: any) {
            globalStore.triggerNotification('error', error.response?.data?.message || 'Có lỗi xảy ra!', '');
        } finally {
            setAILoading(false);
        }
    };

    const handleAICreateExercises = async () => {
        if (aiPreviewExercises.length === 0) return;

        setAILoading(true);
        try {
            let successCount = 0;
            for (const exerciseData of aiPreviewExercises) {
                const payload = {
                    ...exerciseData,
                    topicIds: exerciseData.topicIds || (selectedTopic ? [selectedTopic] : [])
                };

                await http.post('/exercises', payload);
                successCount++;
            }

            globalStore.triggerNotification('success', `Đã tạo ${successCount} bài tập thành công!`, '');
            handleClose();
            onSuccess();
        } catch (error: any) {
            globalStore.triggerNotification('error', error.response?.data?.message || 'Có lỗi xảy ra!', '');
        } finally {
            setAILoading(false);
        }
    };

    const handleClose = () => {
        setAIPrompt('');
        setAIPreviewExercises([]);
        setAIStep(0);
        setEditingIndex(null);
        setSelectedTopic('');
        setSelectedLevels([]);
        setNumberOfExercise(2);
        setDeletedExercises([]);
        form.resetFields();
        onClose();
    };

    useEffect(() => {
        if (open) {
            setTopicsLoading(true);
            // Fetch topics khi modal mở
            http.get('/topics?pageSize=100')
                .then((res: any) => {
                    const topicsList = (res.data || []).map((topic: any) => ({
                        value: topic.id,
                        label: topic.name
                    }));
                    setTopics(topicsList);
                })
                .catch((error) => {
                    console.error('Error fetching topics:', error);
                    globalStore.triggerNotification('error', 'Không thể tải danh sách topics!', '');
                })
                .finally(() => {
                    setTopicsLoading(false);
                });
        }
    }, [open]);

    const handleDeleteExercise = (index: number) => {
        const exercise = aiPreviewExercises[index];
        const newExercises = aiPreviewExercises.filter((_, i) => i !== index);
        setAIPreviewExercises(newExercises);
        
        // Lưu bài tập đã xóa để có thể undo
        setDeletedExercises((prev) => [...prev, { exercise, index }]);
        
        if (editingIndex === index) {
            setEditingIndex(null);
        } else if (editingIndex !== null && editingIndex > index) {
            setEditingIndex(editingIndex - 1);
        }

        // Hiển thị message với undo
        const key = `delete-${index}-${Date.now()}`;
        const hide = message.success({
            content: (
                <span>
                    Đã xóa bài tập{' '}
                    <Button
                        size="small"
                        type="link"
                        style={{ padding: 0, height: 'auto', marginLeft: 8 }}
                        onClick={() => {
                            handleUndoDelete(exercise, index);
                            hide();
                        }}
                    >
                        Hoàn tác
                    </Button>
                </span>
            ),
            key,
            duration: 5
        });
    };

    const handleUndoDelete = (exercise: any, originalIndex: number) => {
        setAIPreviewExercises((prev) => {
            const newExercises = [...prev];
            // Tìm vị trí phù hợp để insert lại
            const insertIndex = Math.min(originalIndex, newExercises.length);
            newExercises.splice(insertIndex, 0, exercise);
            return newExercises;
        });
        setDeletedExercises((prev) => prev.filter((item) => item.index !== originalIndex || item.exercise !== exercise));
        message.success('Đã khôi phục bài tập');
    };

    const handleUpdateExercise = (index: number, field: string, value: any) => {
        const newExercises = [...aiPreviewExercises];
        newExercises[index] = {
            ...newExercises[index],
            [field]: value
        };
        setAIPreviewExercises(newExercises);
    };

    const handleUpdateTestCase = (exerciseIndex: number, testCaseIndex: number, field: string, value: any) => {
        const newExercises = [...aiPreviewExercises];
        newExercises[exerciseIndex].testCases[testCaseIndex] = {
            ...newExercises[exerciseIndex].testCases[testCaseIndex],
            [field]: value
        };
        setAIPreviewExercises(newExercises);
    };

    const handleDeleteTestCase = (exerciseIndex: number, testCaseIndex: number) => {
        const newExercises = [...aiPreviewExercises];
        newExercises[exerciseIndex].testCases = newExercises[exerciseIndex].testCases.filter(
            (_: unknown, i: number) => i !== testCaseIndex
        );
        setAIPreviewExercises(newExercises);
    };

    const handleAddTestCase = (exerciseIndex: number) => {
        const newExercises = [...aiPreviewExercises];
        const newTestCase = {
            input: '',
            output: '',
            note: '',
            isPublic: true
        };
        newExercises[exerciseIndex].testCases = [...newExercises[exerciseIndex].testCases, newTestCase];
        setAIPreviewExercises(newExercises);
    };

    const defaultPrompt = `Hãy tạo EXACTLY N bài tập lập trình theo đúng yêu cầu sau:

1. Chủ đề: thuật toán sắp xếp (Sorting Algorithms)

2. Mỗi bài phải thuộc đúng độ khó được yêu cầu (EASY, MEDIUM, HARD)

3. Trả về kết quả DUY NHẤT ở dạng JSON array, KHÔNG được bao gồm text giải thích, KHÔNG dùng markdown, KHÔNG bao code block.

Định dạng mỗi object trong JSON phải EXACTLY như sau:

{
  "code": "EXxxx",
  "title": "...",
  "description": "...",
  "solution": "code Python hoặc Java, không bao code block",
  "difficulty": "EASY/MEDIUM/HARD",
  "timeLimit": 0.2,
  "memory": 65536,
  "maxSubmissions": 0,
  "testCases": [
    {
      "input": "...",
      "output": "...",
      "isPublic": true/false
    }
  ]
}

QUAN TRỌNG:
- Mỗi bài có tối thiểu 3 test cases (ít nhất 1 private)
- input/output KHÔNG được chứa mô tả thêm, chỉ raw values
- code trong "solution" phải thuần text
- KHÔNG sinh thêm nội dung ngoài JSON

Yêu cầu cụ thể: Tạo 2 bài tập về thuật toán sắp xếp:
- 1 bài EASY
- 1 bài MEDIUM`;

    const handleUseDefaultPrompt = () => {
        setAIPrompt(defaultPrompt);
    };

    return (
        <Modal
            title="Tạo câu hỏi với AI"
            open={open}
            onCancel={handleClose}
            destroyOnClose={false}
            maskClosable={false}
            className="ai-generate-exercises-modal"
            footer={
                aiStep === 0
                    ? [
                          <Button key="cancel" onClick={handleClose}>
                              Hủy
                          </Button>,
                          <Button key="generate" type="primary" loading={aiLoading} onClick={handleAIGenerate}>
                              Tạo bài tập
                          </Button>
                      ]
                    : [
                          <Button
                              key="back"
                              onClick={() => {
                                  setAIStep(0);
                                  setAIPreviewExercises([]);
                              }}
                          >
                              Quay lại
                          </Button>,
                          <Button key="cancel" onClick={handleClose}>
                              Hủy
                          </Button>,
                          <Button key="create" type="primary" loading={aiLoading} onClick={handleAICreateExercises}>
                              Tạo {aiPreviewExercises.length} bài tập
                          </Button>
                      ]
            }
            width={1200}
            style={{ top: 20 }}
            bodyStyle={{ maxHeight: '85vh', overflowY: 'auto' }}
        >
            {aiStep === 0 ? (
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={{
                        topic: selectedTopic,
                        numberOfExercise: numberOfExercise,
                        level: selectedLevels,
                        prompt: aiPrompt
                    }}
                >
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                        <Form.Item
                            name="topic"
                            label="Topic"
                            rules={[{ required: true, message: 'Vui lòng chọn topic!' }]}
                        >
                            <Select
                                style={{ width: '100%' }}
                                placeholder="Chọn topic"
                                value={selectedTopic || undefined}
                                onChange={(value) => {
                                    setSelectedTopic(value);
                                    form.setFieldsValue({ topic: value });
                                }}
                                options={topics}
                                notFoundContent={topicsLoading ? <Spin size="small" /> : 'Không có dữ liệu'}
                                loading={topicsLoading}
                            />
                        </Form.Item>
                        <Form.Item
                            name="numberOfExercise"
                            label="Số lượng bài tập"
                            rules={[
                                { required: true, message: 'Vui lòng nhập số lượng bài tập!' },
                                { type: 'number', min: 1, max: 10, message: 'Số lượng phải từ 1 đến 10!' }
                            ]}
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                min={1}
                                max={10}
                                value={numberOfExercise}
                                onChange={(value) => {
                                    setNumberOfExercise(value || 2);
                                    form.setFieldsValue({ numberOfExercise: value || 2 });
                                }}
                            />
                        </Form.Item>
                    </div>
                    <Form.Item
                        name="level"
                        label="Độ khó"
                        rules={[{ required: true, message: 'Vui lòng chọn ít nhất một độ khó!' }]}
                    >
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="Chọn độ khó"
                            value={selectedLevels}
                            onChange={(value) => {
                                setSelectedLevels(value);
                                form.setFieldsValue({ level: value });
                            }}
                            options={[
                                { value: 'EASY', label: 'EASY' },
                                { value: 'MEDIUM', label: 'MEDIUM' },
                                { value: 'HARD', label: 'HARD' }
                            ]}
                        />
                    </Form.Item>
                    <Form.Item
                        name="prompt"
                        label={
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                <span>Nhập prompt:</span>
                                <Button size="small" type="link" onClick={handleUseDefaultPrompt}>
                                    Sử dụng prompt mẫu
                                </Button>
                            </div>
                        }
                        rules={[{ required: true, message: 'Vui lòng nhập prompt!' }]}
                    >
                        <Input.TextArea
                            rows={15}
                            placeholder="Nhập prompt để tạo bài tập..."
                            value={aiPrompt}
                            onChange={(e) => {
                                setAIPrompt(e.target.value);
                                form.setFieldsValue({ prompt: e.target.value });
                            }}
                            style={{ fontFamily: 'monospace', fontSize: 12 }}
                        />
                    </Form.Item>
                    <div style={{ marginTop: 16, padding: 12, backgroundColor: '#f5f5f5', border: '1px solid #d9d9d9', borderRadius: 4 }}>
                        <div style={{ color: '#595959', fontSize: 13, fontWeight: 500, marginBottom: 4 }}>⚠️ Lưu ý:</div>
                        <div style={{ color: '#8c8c8c', fontSize: 12 }}>
                            AI tạo bài tập có thể sai, vì vậy hãy double-check lại nhé!
                        </div>
                    </div>
                </Form>
            ) : (
                <div style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                    {aiPreviewExercises.map((exercise, index) => (
                        <div
                            key={index}
                            className="ai-exercise-preview-card"
                            style={{
                                marginBottom: 24,
                                padding: 16,
                                borderRadius: 8,
                                border: '1px solid #d9d9d9'
                            }}
                        >
                            <div style={{ marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ fontSize: 16, fontWeight: 600 }}>
                                    Bài tập {index + 1}: {editingIndex === index ? (
                                        <Input
                                            value={exercise.title}
                                            onChange={(e) => handleUpdateExercise(index, 'title', e.target.value)}
                                            style={{ width: '60%', marginLeft: 8 }}
                                        />
                                    ) : (
                                        exercise.title
                                    )}
                                </div>
                                <div style={{ display: 'flex', gap: 8 }}>
                                    {editingIndex === index ? (
                                        <Button size="small" type="primary" onClick={() => setEditingIndex(null)}>
                                            Lưu
                                        </Button>
                                    ) : (
                                        <Button size="small" onClick={() => setEditingIndex(index)}>
                                            Sửa
                                        </Button>
                                    )}
                                    <Popconfirm
                                        title="Xóa bài tập"
                                        description="Bạn có chắc chắn muốn xóa bài tập này?"
                                        onConfirm={() => handleDeleteExercise(index)}
                                        okText="Xóa"
                                        cancelText="Hủy"
                                    >
                                        <Button size="small" danger>
                                            Xóa
                                        </Button>
                                    </Popconfirm>
                                </div>
                            </div>
                            <div style={{ marginBottom: 8 }}>
                                <strong>Mã bài tập:</strong>{' '}
                                {editingIndex === index ? (
                                    <Input
                                        value={exercise.code}
                                        onChange={(e) => handleUpdateExercise(index, 'code', e.target.value)}
                                        style={{ width: '200px', marginLeft: 8 }}
                                    />
                                ) : (
                                    exercise.code
                                )}
                            </div>
                            {exercise.topicIds && exercise.topicIds.length > 0 && (
                                <div style={{ marginBottom: 8 }}>
                                    <strong>Topics:</strong>{' '}
                                    {editingIndex === index ? (
                                        <Select
                                            mode="multiple"
                                            value={exercise.topicIds}
                                            onChange={(value) => handleUpdateExercise(index, 'topicIds', value)}
                                            style={{ width: '300px', marginLeft: 8 }}
                                            options={topics}
                                        />
                                    ) : (
                                        exercise.topicIds.map((topicId: string) => {
                                            const topic = topics.find((t) => t.value === topicId);
                                            return (
                                                <Tag key={topicId} color="blue" style={{ marginRight: 4 }}>
                                                    {topic?.label || topicId}
                                                </Tag>
                                            );
                                        })
                                    )}
                                </div>
                            )}
                            <div style={{ marginBottom: 8 }}>
                                <strong>Độ khó:</strong>{' '}
                                {editingIndex === index ? (
                                    <Select
                                        value={exercise.difficulty}
                                        onChange={(value) => handleUpdateExercise(index, 'difficulty', value)}
                                        style={{ width: '150px', marginLeft: 8 }}
                                        options={[
                                            { value: 'EASY', label: 'EASY' },
                                            { value: 'MEDIUM', label: 'MEDIUM' },
                                            { value: 'HARD', label: 'HARD' }
                                        ]}
                                    />
                                ) : (
                                    utils.getDifficultyClass(exercise.difficulty)
                                )}
                            </div>
                            <div style={{ marginBottom: 8 }}>
                                <strong>Giới hạn thời gian:</strong>{' '}
                                {editingIndex === index ? (
                                    <InputNumber
                                        value={exercise.timeLimit}
                                        onChange={(value) => handleUpdateExercise(index, 'timeLimit', value)}
                                        min={0}
                                        step={0.1}
                                        style={{ width: '150px', marginLeft: 8 }}
                                        addonAfter="s"
                                    />
                                ) : (
                                    `${exercise.timeLimit}s`
                                )}
                            </div>
                            <div style={{ marginBottom: 8 }}>
                                <strong>Bộ nhớ:</strong>{' '}
                                {editingIndex === index ? (
                                    <InputNumber
                                        value={exercise.memory}
                                        onChange={(value) => handleUpdateExercise(index, 'memory', value)}
                                        min={0}
                                        style={{ width: '150px', marginLeft: 8 }}
                                        addonAfter="bytes"
                                    />
                                ) : (
                                    `${exercise.memory} bytes`
                                )}
                            </div>
                            <div style={{ marginBottom: 8 }}>
                                <strong>Khả năng hiển thị:</strong>{' '}
                                {editingIndex === index ? (
                                    <Select
                                        value={exercise.visibility}
                                        onChange={(value) => handleUpdateExercise(index, 'visibility', value)}
                                        style={{ width: '150px', marginLeft: 8 }}
                                        options={[
                                            { value: 'DRAFT', label: 'DRAFT' },
                                            { value: 'PUBLIC', label: 'PUBLIC' },
                                            { value: 'PRIVATE', label: 'PRIVATE' }
                                        ]}
                                    />
                                ) : (
                                    <Tag color={exercise.visibility === 'PUBLIC' ? 'green' : exercise.visibility === 'PRIVATE' ? 'red' : 'orange'}>
                                        {exercise.visibility || 'DRAFT'}
                                    </Tag>
                                )}
                            </div>
                            {editingIndex === index && (
                                <div style={{ marginBottom: 8 }}>
                                    <strong>Solution:</strong>
                                    <Input.TextArea
                                        value={exercise.solution || ''}
                                        onChange={(e) => handleUpdateExercise(index, 'solution', e.target.value)}
                                        rows={5}
                                        style={{ marginTop: 4, fontFamily: 'monospace', fontSize: 12 }}
                                        placeholder="Nhập solution code..."
                                    />
                                </div>
                            )}
                            <div style={{ marginBottom: 12 }}>
                                <strong>Mô tả:</strong>
                                {editingIndex === index ? (
                                    <Input.TextArea
                                        value={exercise.description}
                                        onChange={(e) => handleUpdateExercise(index, 'description', e.target.value)}
                                        rows={6}
                                        style={{ marginTop: 4 }}
                                    />
                                ) : (
                                    <div
                                        className="ai-exercise-description"
                                        style={{
                                            marginTop: 4,
                                            padding: 8,
                                            borderRadius: 4,
                                            whiteSpace: 'pre-wrap'
                                        }}
                                    >
                                        {exercise.description}
                                    </div>
                                )}
                            </div>
                            <div style={{ marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <strong>Test Cases ({exercise.testCases.length}):</strong>
                                {editingIndex === index && (
                                    <Button
                                        size="small"
                                        type="dashed"
                                        onClick={() => handleAddTestCase(index)}
                                        style={{ marginBottom: 8 }}
                                    >
                                        + Thêm test case
                                    </Button>
                                )}
                            </div>
                            <Table
                                dataSource={exercise.testCases.map((tc: any, tcIndex: number) => ({ ...tc, key: tcIndex }))}
                                columns={[
                                    {
                                        title: 'Input',
                                        dataIndex: 'input',
                                        key: 'input',
                                        render: (text: string, record: any) => {
                                            const testCaseIndex = record.key as number;
                                            return editingIndex === index ? (
                                                <Input.TextArea
                                                    value={text}
                                                    onChange={(e) => handleUpdateTestCase(index, testCaseIndex, 'input', e.target.value)}
                                                    rows={2}
                                                    style={{ fontFamily: 'monospace', fontSize: 12 }}
                                                />
                                            ) : (
                                                <div style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
                                                    {text}
                                                </div>
                                            );
                                        }
                                    },
                                    {
                                        title: 'Output',
                                        dataIndex: 'output',
                                        key: 'output',
                                        render: (text: string, record: any) => {
                                            const testCaseIndex = record.key as number;
                                            return editingIndex === index ? (
                                                <Input.TextArea
                                                    value={text}
                                                    onChange={(e) => handleUpdateTestCase(index, testCaseIndex, 'output', e.target.value)}
                                                    rows={2}
                                                    style={{ fontFamily: 'monospace', fontSize: 12 }}
                                                />
                                            ) : (
                                                <div style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
                                                    {text}
                                                </div>
                                            );
                                        }
                                    },
                                    {
                                        title: 'Note',
                                        dataIndex: 'note',
                                        key: 'note',
                                        render: (text: string, record: any) => {
                                            const testCaseIndex = record.key as number;
                                            return editingIndex === index ? (
                                                <Input
                                                    value={text || ''}
                                                    onChange={(e) => handleUpdateTestCase(index, testCaseIndex, 'note', e.target.value)}
                                                />
                                            ) : (
                                                text || '-'
                                            );
                                        }
                                    },
                                    {
                                        title: 'State',
                                        dataIndex: 'isPublic',
                                        key: 'isPublic',
                                        render: (isPublic: boolean, record: any) => {
                                            const testCaseIndex = record.key as number;
                                            return editingIndex === index ? (
                                                <Select
                                                    value={isPublic}
                                                    onChange={(value) => handleUpdateTestCase(index, testCaseIndex, 'isPublic', value)}
                                                    style={{ width: '100%' }}
                                                    options={[
                                                        { value: true, label: 'Public' },
                                                        { value: false, label: 'Hidden' }
                                                    ]}
                                                />
                                            ) : (
                                                isPublic ? <Tag color="green">Public</Tag> : <Tag color="red">Hidden</Tag>
                                            );
                                        }
                                    },
                                    ...(editingIndex === index
                                        ? [
                                              {
                                                  title: 'Thao tác',
                                                  key: 'action',
                                                  render: (_: unknown, record: any) => {
                                                      const testCaseIndex = record.key as number;
                                                      return (
                                                          <Popconfirm
                                                              title="Xóa test case"
                                                              description="Bạn có chắc chắn muốn xóa test case này?"
                                                              onConfirm={() => handleDeleteTestCase(index, testCaseIndex)}
                                                              okText="Xóa"
                                                              cancelText="Hủy"
                                                          >
                                                              <Button size="small" danger>
                                                                  Xóa
                                                              </Button>
                                                          </Popconfirm>
                                                      );
                                                  }
                                              }
                                          ]
                                        : [])
                                ]}
                                pagination={false}
                                size="small"
                                style={{ marginTop: 8 }}
                            />
                        </div>
                    ))}
                </div>
            )}
        </Modal>
    );
};

export default AIGenerateExercises;

