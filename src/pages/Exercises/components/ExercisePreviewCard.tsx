import { Button, Input, InputNumber, Popconfirm, Select, Tag } from 'antd';
import TestCaseTable from './TestCaseTable';
import { visbilities, type Visibility } from '../../../constants/visibility';
import { difficulties, type Difficulty } from '../../../constants/difficulty';
import { useState } from 'react';

export interface ExercisePreview {
    code: string;
    title: string;
    description: string;
    solution?: string;
    solutionLanguage?: string;
    difficulty: string;
    timeLimit: number;
    memory: number;
    visibility: string;
    prompt?: string;
    topicIds?: string[];
    testCases: Array<{
        input: string;
        output: string;
        note?: string;
        isPublic: boolean;
    }>;
}

interface ExercisePreviewCardProps {
    exercise: ExercisePreview;
    index: number;
    isEditing: boolean;
    topics: Array<{ value: string; label: string }>;
    error?: string;
    onStartEdit: () => void;
    onStopEdit: () => void;
    onDelete: () => void;
    onUpdateExercise: (exercisePreviewData: ExercisePreview) => void;
}

const ExercisePreviewCard = ({
    exercise,
    index,
    isEditing,
    topics,
    error,
    onStartEdit,
    onStopEdit,
    onDelete,
    onUpdateExercise
}: ExercisePreviewCardProps) => {
    const [exercisePreviewData, setExercisePreviewData] = useState(exercise);

    const handleUpdateTestCase = (
        testCaseIndex: number,
        field: keyof ExercisePreview['testCases'][number],
        value: string | boolean | undefined
    ) => {
        setExercisePreviewData((prev) => ({
            ...prev,
            testCases: prev.testCases.map((tc, index) => (index === testCaseIndex ? { ...tc, [field]: value } : tc))
        }));
    };

    const handleDeleteTestCase = (testCaseIndex: number) => {
        setExercisePreviewData((prev) => ({
            ...prev,
            testCases: prev.testCases.filter((_, i) => i !== testCaseIndex)
        }));
    };

    const handleAddTestCase = () => {
        setExercisePreviewData((prev) => {
            const newTestCase = {
                input: '',
                output: '',
                note: '',
                isPublic: true
            };
            return {
                ...prev,
                testCases: [...prev.testCases, newTestCase]
            };
        });
    };

    const handleSaveExercise = () => {
        onStopEdit();
        onUpdateExercise(exercisePreviewData);
    };

    const handleCancelEditingExercise = () => {
        onStopEdit();
        setExercisePreviewData(exercise);
    };

    return (
        <div
            className="ai-exercise-preview-card"
            style={{
                marginBottom: 24,
                padding: 16,
                borderRadius: 8,
                border: error ? '1px solid #ff4d4f' : '1px solid #d9d9d9'
            }}
        >
            {error && (
                <div
                    style={{
                        marginBottom: 12,
                        padding: 12,
                        borderRadius: 4,
                        backgroundColor: '#fff2f0',
                        border: '1px solid #ffccc7',
                        color: '#ff4d4f'
                    }}
                >
                    <strong>Lỗi khi tạo bài tập:</strong> {error}
                </div>
            )}
            <div style={{ marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: 16, fontWeight: 600 }}>
                    Bài tập {index + 1}:{' '}
                    {isEditing ? (
                        <Input
                            value={exercisePreviewData.title}
                            onChange={(e) => setExercisePreviewData((prev) => ({ ...prev, title: e.target.value }))}
                            style={{ width: '60%', marginLeft: 8 }}
                        />
                    ) : (
                        exercisePreviewData.title
                    )}
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                    {isEditing ? (
                        <>
                            <Button size="small" type="primary" onClick={handleSaveExercise}>
                                Lưu
                            </Button>
                            <Button size="small" danger onClick={handleCancelEditingExercise}>
                                Hủy
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button size="small" onClick={onStartEdit}>
                                Sửa
                            </Button>
                            <Popconfirm
                                title="Xóa bài tập"
                                description="Bạn có chắc chắn muốn xóa bài tập này?"
                                onConfirm={onDelete}
                                okText="Xóa"
                                cancelText="Hủy"
                            >
                                <Button size="small" danger>
                                    Xóa
                                </Button>
                            </Popconfirm>
                        </>
                    )}
                </div>
            </div>
            <div style={{ marginBottom: 8 }}>
                <strong>Mã bài tập:</strong>{' '}
                {isEditing ? (
                    <Input
                        value={exercisePreviewData.code}
                        onChange={(e) => setExercisePreviewData((prev) => ({ ...prev, code: e.target.value }))}
                        style={{ width: '200px', marginLeft: 8 }}
                    />
                ) : (
                    exercisePreviewData.code
                )}
            </div>
            {exercisePreviewData.topicIds && exercisePreviewData.topicIds.length > 0 && (
                <div style={{ marginBottom: 8 }}>
                    <strong>Chủ đề:</strong>{' '}
                    {isEditing ? (
                        <Select
                            mode="multiple"
                            value={exercisePreviewData.topicIds}
                            onChange={(value) => setExercisePreviewData((prev) => ({ ...prev, topicIds: value }))}
                            style={{ width: '300px', marginLeft: 8 }}
                            options={topics}
                        />
                    ) : (
                        exercisePreviewData.topicIds.map((topicId: string) => {
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
                {isEditing ? (
                    <Select
                        value={exercisePreviewData.difficulty}
                        onChange={(value) => setExercisePreviewData((prev) => ({ ...prev, difficulty: value }))}
                        style={{ width: '150px', marginLeft: 8 }}
                        options={Object.entries(difficulties).map(([value, { text: label }]) => ({
                            value,
                            label
                        }))}
                    />
                ) : (
                    <Tag color={difficulties[exercisePreviewData.difficulty as Difficulty].color}>
                        {difficulties[exercisePreviewData.difficulty as Difficulty].text}
                    </Tag>
                )}
            </div>
            <div style={{ marginBottom: 8 }}>
                <strong>Giới hạn thời gian:</strong>{' '}
                {isEditing ? (
                    <InputNumber
                        value={exercisePreviewData.timeLimit}
                        onChange={(value) => setExercisePreviewData((prev) => ({ ...prev, timeLimit: value ?? 0 }))}
                        min={0}
                        step={0.1}
                        style={{ width: '150px', marginLeft: 8 }}
                        addonAfter="s"
                    />
                ) : (
                    `${exercisePreviewData.timeLimit}s`
                )}
            </div>
            <div style={{ marginBottom: 8 }}>
                <strong>Bộ nhớ:</strong>{' '}
                {isEditing ? (
                    <InputNumber
                        value={exercisePreviewData.memory}
                        onChange={(value) => setExercisePreviewData((prev) => ({ ...prev, timeLimit: value ?? 0 }))}
                        min={0}
                        style={{ width: '150px', marginLeft: 8 }}
                        addonAfter="bytes"
                    />
                ) : (
                    `${exercisePreviewData.memory} bytes`
                )}
            </div>
            <div style={{ marginBottom: 8 }}>
                <strong>Hiển thị:</strong>{' '}
                {isEditing ? (
                    <Select
                        value={exercisePreviewData.visibility}
                        onChange={(value) => setExercisePreviewData((prev) => ({ ...prev, visibility: value }))}
                        style={{ width: '150px', marginLeft: 8 }}
                        options={Object.entries(visbilities)
                            .filter(([visbility]) => visbility !== 'PUBLIC')
                            .map(([value, { text: label }]) => ({
                                value,
                                label
                            }))}
                    />
                ) : (
                    <Tag color={exercisePreviewData.visibility === 'PRIVATE' ? 'red' : 'orange'}>
                        {visbilities[(exercisePreviewData.visibility as Visibility) || 'DRAFT'].text}
                    </Tag>
                )}
            </div>
            {exercisePreviewData.solution && (
                <div style={{ marginBottom: 12 }}>
                    <strong>Code giải mẫu:</strong>
                    <Input.TextArea
                        value={exercisePreviewData.solution}
                        onChange={(e) => setExercisePreviewData((prev) => ({ ...prev, solution: e.target.value }))}
                        rows={8}
                        style={{
                            marginTop: 4,
                            fontFamily: 'monospace',
                            fontSize: 12,
                            height: '400px',
                            resize: 'none'
                        }}
                        placeholder="Nhập code giải mẫu..."
                        readOnly={!isEditing}
                    />
                </div>
            )}
            <div style={{ marginBottom: 12 }}>
                <strong>Mô tả:</strong>
                {isEditing ? (
                    <Input.TextArea
                        value={exercisePreviewData.description}
                        onChange={(e) => setExercisePreviewData((prev) => ({ ...prev, description: e.target.value }))}
                        rows={6}
                        style={{ marginTop: 4, resize: 'none' }}
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
                        {exercisePreviewData.description}
                    </div>
                )}
            </div>
            <div style={{ marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong>Test Cases ({exercisePreviewData.testCases.length}):</strong>
                {isEditing && (
                    <Button size="small" type="dashed" onClick={handleAddTestCase} style={{ marginBottom: 8 }}>
                        + Thêm test case
                    </Button>
                )}
            </div>
            <TestCaseTable
                testCases={exercisePreviewData.testCases}
                isEditing={isEditing}
                onUpdateTestCase={handleUpdateTestCase}
                onDeleteTestCase={handleDeleteTestCase}
            />
        </div>
    );
};

export default ExercisePreviewCard;
