import PortfolioSummary from '../components/PortfolioSummary';
import ActionButtons from '../components/ActionButtons';
import AssetsList from '../components/AssetsList';

interface HomeProps {
    onMoreClick: () => void;
    isKycVerified: boolean;
    peraUsdOptedIn: boolean;
    onKycVerified: () => void;
    onPeraUsdOptIn: () => void;
}

export default function Home({ onMoreClick, isKycVerified, peraUsdOptedIn, onKycVerified, onPeraUsdOptIn }: HomeProps) {
    return (
        <div className="pb-20">
            <PortfolioSummary />
            <ActionButtons onMoreClick={onMoreClick} />
            <AssetsList
                isKycVerified={isKycVerified}
                peraUsdOptedIn={peraUsdOptedIn}
                onKycVerified={onKycVerified}
                onPeraUsdOptIn={onPeraUsdOptIn}
            />
        </div>
    );
}
