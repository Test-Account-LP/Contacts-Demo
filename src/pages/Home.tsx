import PortfolioSummary from '../components/PortfolioSummary';
import ActionButtons from '../components/ActionButtons';
import AssetsList from '../components/AssetsList';

interface HomeProps {
    onMoreClick: () => void;
}

export default function Home({ onMoreClick }: HomeProps) {
    return (
        <div className="pb-20">
            <PortfolioSummary />
            <ActionButtons onMoreClick={onMoreClick} />
            <AssetsList />
        </div>
    );
}
