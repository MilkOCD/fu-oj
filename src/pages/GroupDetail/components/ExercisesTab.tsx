import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import ExercisesTable from './ExercisesTable';

const ExercisesTab = observer(() => {
    const { id } = useParams();

    return <ExercisesTable groupId={id} />;
});

export default ExercisesTab;
