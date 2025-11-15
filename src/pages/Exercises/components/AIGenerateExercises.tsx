import { Button, Input, Modal, Table, Tag } from 'antd';
import { useState } from 'react';
import globalStore from '../../../components/GlobalComponent/globalStore';
import * as http from '../../../lib/httpRequest';
import utils from '../../../utils/utils';

interface AIGenerateExercisesProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const AIGenerateExercises = ({ open, onClose, onSuccess }: AIGenerateExercisesProps) => {
    const [aiPrompt, setAIPrompt] = useState('');
    const [aiLoading, setAILoading] = useState(false);
    const [aiPreviewExercises, setAIPreviewExercises] = useState<any[]>([]);
    const [aiStep, setAIStep] = useState(0); // 0: nhập prompt, 1: preview

    const handleAIGenerate = async () => {
        if (!aiPrompt.trim()) {
            globalStore.triggerNotification('error', 'Vui lòng nhập prompt!', '');
            return;
        }

        setAILoading(true);
        try {
            const res = await http.post('/ai/exercises/generate', { prompt: aiPrompt });

            if (res.exercises && res.exercises.length > 0) {
                // Bỏ qua id: null trong testCases
                const exercisesWithoutId = res.exercises.map((exerciseData: any) => ({
                    ...exerciseData,
                    testCases: exerciseData.testCases.map((tc: any) => {
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
                    topicIds: [] // Cần chọn topics sau
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
        onClose();
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
      "id": null,
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
            width={900}
            style={{ top: 20 }}
        >
            {aiStep === 0 ? (
                <div style={{ marginBottom: 16 }}>
                    <div style={{ marginBottom: 8, fontWeight: 500, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>Nhập prompt:</span>
                        <Button size="small" type="link" onClick={handleUseDefaultPrompt}>
                            Sử dụng prompt mẫu
                        </Button>
                    </div>
                    <Input.TextArea
                        rows={15}
                        placeholder="Nhập prompt để tạo bài tập..."
                        value={aiPrompt}
                        onChange={(e) => setAIPrompt(e.target.value)}
                        style={{ fontFamily: 'monospace', fontSize: 12 }}
                    />
                </div>
            ) : (
                <div style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                    {aiPreviewExercises.map((exercise, index) => (
                        <div
                            key={index}
                            className="ai-exercise-preview-card"
                            style={{
                                marginBottom: 24,
                                padding: 16,
                                borderRadius: 8
                            }}
                        >
                            <div style={{ marginBottom: 12, fontSize: 16, fontWeight: 600 }}>
                                Bài tập {index + 1}: {exercise.title}
                            </div>
                            <div style={{ marginBottom: 8 }}>
                                <strong>Mã bài tập:</strong> {exercise.code}
                            </div>
                            <div style={{ marginBottom: 8 }}>
                                <strong>Độ khó:</strong> {utils.getDifficultyClass(exercise.difficulty)}
                            </div>
                            <div style={{ marginBottom: 8 }}>
                                <strong>Giới hạn thời gian:</strong> {exercise.timeLimit}s
                            </div>
                            <div style={{ marginBottom: 8 }}>
                                <strong>Bộ nhớ:</strong> {exercise.memory} bytes
                            </div>
                            <div style={{ marginBottom: 12 }}>
                                <strong>Mô tả:</strong>
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
                            </div>
                            <div style={{ marginBottom: 8 }}>
                                <strong>Test Cases ({exercise.testCases.length}):</strong>
                            </div>
                            <Table
                                dataSource={exercise.testCases}
                                columns={[
                                    {
                                        title: 'Input',
                                        dataIndex: 'input',
                                        key: 'input',
                                        render: (text: string) => (
                                            <div style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
                                                {text}
                                            </div>
                                        )
                                    },
                                    {
                                        title: 'Output',
                                        dataIndex: 'output',
                                        key: 'output',
                                        render: (text: string) => (
                                            <div style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
                                                {text}
                                            </div>
                                        )
                                    },
                                    {
                                        title: 'Note',
                                        dataIndex: 'note',
                                        key: 'note'
                                    },
                                    {
                                        title: 'State',
                                        dataIndex: 'isPublic',
                                        key: 'isPublic',
                                        render: (isPublic: boolean) =>
                                            isPublic ? <Tag color="green">Public</Tag> : <Tag color="red">Hidden</Tag>
                                    }
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

