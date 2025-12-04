import { Table } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import LoadingOverlay from '../../../components/LoadingOverlay/LoadingOverlay';
import type { Course } from '../Courses';

interface CoursesTableSectionProps {
    data: Course[];
    columns: ColumnsType<Course>;
    loading: boolean;
    onChange: (pagination: TablePaginationConfig) => void;
}

const CoursesTableSection = ({ data, columns, loading, onChange }: CoursesTableSectionProps) => {
    return (
        <div className="body">
            <LoadingOverlay loading={loading}>
                <Table<Course>
                    rowKey="id"
                    columns={columns}
                    dataSource={data}
                    pagination={{
                        pageSize: 20,
                        showTotal: (total, range) => `${range[0]}-${range[1]} trên ${total} khóa học`
                    }}
                    onChange={onChange}
                    rowClassName={(_record, index) => (index % 2 === 0 ? 'custom-row row-even' : 'custom-row row-odd')}
                />
            </LoadingOverlay>
        </div>
    );
};

export default CoursesTableSection;
