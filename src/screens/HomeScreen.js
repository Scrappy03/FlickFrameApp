import ShowsList from '../components/ShowsList';
import ToggleRow from '../components/ToggleRow';

export default function HomeScreen({ activeTab, onTabChange, data, isLoading, error }) {
    return (
        <>
            <ToggleRow activeTab={activeTab} onChange={onTabChange} />
            <ShowsList
                data={data}
                activeTab={activeTab}
                isLoading={isLoading}
                error={error}
            />
        </>
    );
}
