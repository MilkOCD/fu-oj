import {
    CodeSandboxOutlined,
    FileTextOutlined,
    CompressOutlined,
    ExpandAltOutlined,
    SendOutlined
} from '@ant-design/icons';
import Editor from '@monaco-editor/react';
import { Button, Select } from 'antd';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { useNavigate, useParams } from 'react-router-dom';
import globalStore from '../../components/GlobalComponent/globalStore';
import { programmingLanguages } from '../../constants/languages';
import * as http from '../../lib/httpRequest';
import routesConfig from '../../routes/routesConfig';

const Exercise = observer(() => {
    const { id } = useParams();
    const navigate = useNavigate();

    if (!id) {
        globalStore.triggerNotification('error', 'Exercise does not exist!', '');
        navigate(`/${routesConfig.exercises}`);
        return <></>;
    }

    const [language, setLanguage] = useState<number>(45); // ID trong programmingLanguages
    const [theme, setTheme] = useState<'light' | 'vs-dark'>('light');
    const [layout, setLayout] = useState([
        { i: 'desc', x: 0, y: 0, w: 4, h: 12 },
        { i: 'editor', x: 4, y: 0, w: 8, h: 12 }
    ]);
    const containerRef = useRef<any>(null);
    const [width, setWidth] = useState(0);
    const [rowHeight, setRowHeight] = useState(0);

    const getDefaultTemplate = (lang: string): string => {
        switch (lang) {
            case 'python':
                return '# Write your Python code here';
            case 'cpp':
                return '#include <bits/stdc++.h>\nusing namespace std;\nint main() {\n    return 0;\n}';
            case 'java':
                return 'public class Main {\n    public static void main(String[] args) {\n        \n    }\n}';
            case 'javascript':
                return 'console.log("Hello, world!");';
            case 'typescript':
                return 'console.log("Hello from TypeScript!");';
            case 'c':
                return '#include <stdio.h>\nint main() {\n    printf("Hello, world!");\n    return 0;\n}';
            case 'csharp':
                return 'using System;\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello, world!");\n    }\n}';
            case 'go':
                return 'package main\nimport "fmt"\nfunc main() {\n    fmt.Println("Hello, world!")\n}';
            case 'rust':
                return 'fn main() {\n    println!("Hello, world!");\n}';
            case 'kotlin':
                return 'fun main() {\n    println("Hello, world!")\n}';
            case 'php':
                return '<?php\necho "Hello, world!";';
            case 'swift':
                return 'print("Hello, world!")';
            default:
                return '// Start coding here';
        }
    };

    // Lấy thông tin ngôn ngữ hiện tại từ constants
    const selectedLang = programmingLanguages.find((lang) => lang.id === language);
    const editorLanguage = selectedLang?.editorValue || 'javascript';
    const editorValue = getDefaultTemplate(editorLanguage);

    const testRun = () => {
        const payload = { exerciseId: id, languageCode: language, sourceCode: editorValue };
        http.post('/submissions/run', payload)
            .then((res) => {
                console.log('log:', res);
            })
            .catch((error) => {
                console.log('log:', error);
            });
    };

    const submit = () => {
        const payload = { exerciseId: id, languageCode: language, sourceCode: editorValue };
        console.log('log:', payload);
    };

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;

            if (width < 1300) {
                // Chuyển sang 1 cột dọc
                setLayout([
                    { i: 'desc', x: 0, y: 0, w: 12, h: 6 },
                    { i: 'editor', x: 0, y: 6, w: 12, h: 12 }
                ]);
            } else {
                // Layout ngang như cũ
                setLayout([
                    { i: 'desc', x: 0, y: 0, w: 4, h: 12 },
                    { i: 'editor', x: 4, y: 0, w: 8, h: 12 }
                ]);
            }
        };

        handleResize(); // Gọi 1 lần khi mount
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (!containerRef.current) return;
        const observer = new ResizeObserver((entries) => {
            if (entries[0]) {
                const totalHeight = globalStore.windowSize.height - 350;
                const maxH = Math.max(...layout.map((item) => item.h));
                const rowHeight = totalHeight / maxH;
                setRowHeight(rowHeight);

                setWidth(entries[0].contentRect.width);
            }
        });
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [globalStore.windowSize]);

    return (
        <div ref={containerRef} className="widget-layout">
            <GridLayout
                className="layout"
                layout={layout}
                cols={12}
                width={width}
                rowHeight={rowHeight}
                draggableHandle=".drag-handle"
                onDragStop={(newLayout) => {
                    const desc = newLayout.find((item) => item.i === 'desc')!;
                    const editor = newLayout.find((item) => item.i === 'editor')!;

                    if (desc.x == 0) {
                        setLayout([
                            { ...desc, x: editor.w },
                            { ...editor, x: 0 }
                        ]);
                    } else if (editor.x == 0) {
                        setLayout([
                            { ...desc, x: 0 },
                            { ...editor, x: desc.w }
                        ]);
                    } else {
                        setLayout([
                            { ...desc, x: editor.w },
                            { ...editor, x: 0 }
                        ]);
                    }
                }}
                onResizeStop={(layout, oldItem, newItem) => {
                    if (globalStore.windowSize.width < 1300) return;

                    console.log('log:', newItem.h);

                    if (newItem.i === 'desc') {
                        const newWidth = newItem.w == 12 ? 11 : newItem.w;
                        const newHeight = newItem.h;
                        setLayout([
                            { i: 'desc', x: 0, y: 0, w: newWidth, h: newHeight },
                            { i: 'editor', x: newWidth, y: 0, w: 12 - newWidth, h: newHeight }
                        ]);
                    } else if (newItem.i === 'editor') {
                        const newWidth = newItem.w == 12 ? 11 : newItem.w;
                        const newHeight = newItem.h == 0 ? 1 : newItem.h;
                        setLayout([
                            { i: 'desc', x: 0, y: 0, w: 12 - newWidth, h: newHeight },
                            { i: 'editor', x: 12 - newWidth, y: 0, w: newWidth, h: newHeight }
                        ]);
                    }
                }}
            >
                <div className="exercise-description" key="desc">
                    <div className="header drag-handle">
                        <div className="item">
                            <FileTextOutlined />
                            Mô tả
                        </div>
                    </div>
                    <div className="content">
                        <div className="content-header">Mô tả bài tập</div>
                        <p>
                            Đây là phần mô tả hoặc hướng dẫn bài tập. Bạn có thể đặt nội dung markdown, ví dụ đề bài,
                            yêu cầu đầu vào / đầu ra, ví dụ test case…
                        </p>
                    </div>
                </div>

                <div className="exercise" key="editor">
                    <div className="header drag-handle">
                        <div className="item">
                            <CodeSandboxOutlined />
                            Code
                        </div>
                    </div>

                    <div className="actions">
                        <Select value={language} onChange={(val) => setLanguage(val)} options={programmingLanguages} />
                        <Button onClick={testRun}>Chạy thử code</Button>
                        <Button onClick={submit}>Nộp code</Button>
                    </div>

                    <div className="content">
                        <Editor
                            height="100%"
                            theme={theme}
                            language={editorLanguage}
                            value={editorValue}
                            options={{
                                fontSize: 14,
                                minimap: { enabled: false },
                                automaticLayout: true
                            }}
                        />
                    </div>
                </div>
            </GridLayout>
        </div>
    );
});

export default Exercise;
