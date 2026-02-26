import ShowsList from '../components/ShowsList';
import ToggleRow from '../components/ToggleRow';

export default function DiscoverScreen({ navigation, activeTab, onTabChange, data, isLoading, error }) {
    const handleSelectShow = (show) => {
        navigation.navigate('ShowDetail', { show });
    };

    return (
        <>
            <ToggleRow activeTab={activeTab} onChange={onTabChange} />
            <ShowsList
                data={data}
                activeTab={activeTab}
                isLoading={isLoading}
                error={error}
                onSelectShow={handleSelectShow}
            />
        </>
    );
}
