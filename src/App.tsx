import { useState } from 'react';
import confetti from 'canvas-confetti';
import Layout from './components/Layout';
import Home from './pages/Home';
import MenuScreen from './pages/MenuScreen';
import ProfileContactsScreen from './pages/ProfileContactsScreen';
import DomainPurchaseFlow from './pages/DomainPurchaseFlow';
import ChatScreen from './pages/ChatScreen';
import ContactDetailsScreen from './pages/ContactDetailsScreen';
import ProEvaluationModal from './components/ProEvaluationModal';
import TransactionModal from './components/TransactionModal';
import PointsScreen from './pages/PointsScreen';
import ThemesScreen from './pages/ThemesScreen';
import PeraQuestsDashboard from './pages/PeraQuestsDashboard';
import DiscoverScreen from './pages/DiscoverScreen';
import SpinWheelScreen from './pages/SpinWheelScreen';
import CrosswordScreen from './pages/CrosswordScreen';
import { ThemeProvider } from './theme/ThemeContext';

type Screen = 'home' | 'menu' | 'profile-contacts' | 'purchase-flow' | 'contact-details' | 'chat' | 'points-dashboard' | 'themes-screen' | 'pera-quests' | 'discover' | 'spin-wheel' | 'crossword';

export interface Transaction {
  date: string;
  amount: string;
  type: 'sent' | 'received';
  asset: string;
}

export interface Contact {
  id: string;
  name: string;
  type: 'user' | 'group';
  handle?: string;
  address?: string; // Optional for groups
  avatar?: string;
  bio?: string;
  pnl?: string;
  history?: Transaction[];
  isPro?: boolean;
  members?: Contact[]; // For groups
  role?: 'admin' | 'member'; // For groups
  followers?: number;
  following?: number;
}

export interface UserProfile {
  name: string;
  bio: string;
  handle: string;
  privacy: 'public' | 'friends' | 'private';
  level: number;
  points: number;
  followers: number;
  following: number;
  completedQuests: string[];
  hasSeenPeraQuestIntro: boolean;
}

export type Theme = 'default' | 'retro' | 'space' | 'bmx' | 'train' | 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);

  const [profile, setProfile] = useState<UserProfile>({
    name: 'DUA4...2ESM',
    bio: '',
    handle: '',
    privacy: 'public',
    level: 26,
    points: 85420,
    followers: 1240,
    following: 42,
    completedQuests: [],
    hasSeenPeraQuestIntro: false
  });

  const [contacts, setContacts] = useState<Contact[]>([
    { id: '1', name: 'Alice', type: 'user', handle: 'alice.algo', address: 'ALICE...W34' },
    { id: '2', name: 'Bob', type: 'user', handle: 'bob.algo', address: 'BOB...X99' },
    {
      id: '3',
      name: 'Mufasa',
      type: 'user',
      handle: 'Mufasa.algo',
      address: 'KING...LION',
      isPro: true,
      // Placeholder until image generation completes and I can swap the URL
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Simba',
      bio: "Everything the light touches is our kingdom. But a king's time as ruler rises and falls like the sun. One day, the sun will set on my time here, and will rise with you as the new king.",
      pnl: '+$5,000,000',
      followers: 850000,
      following: 12,
      history: [
        { date: '2022-11-10', amount: '500,000', type: 'received', asset: 'ALGO' },
        { date: '2022-08-15', amount: '1,200', type: 'sent', asset: 'USDC' },
        { date: '2022-05-12', amount: '45,000', type: 'received', asset: 'goBTC' },
        { date: '2022-01-01', amount: '100,000', type: 'received', asset: 'ALGO' },
      ]
    },
    {
      id: '100',
      name: 'CryptoKing',
      type: 'user',
      handle: 'cryptoking.algo',
      address: 'KING...X99',
      isPro: true,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CryptoKing',
      bio: "Diamond hands. I bought Bitcoin in 2011 and Algo at Genesis. See you at the top.",
      pnl: '+$14,500,000',
      followers: 1200000,
      following: 0,
      history: [
        { date: '2023-01-10', amount: '1,500,000', type: 'received', asset: 'ALGO' },
      ]
    },
    {
      id: '101',
      name: 'Satoshi_Fan',
      type: 'user',
      handle: 'satoshi.algo',
      address: 'SAT...OSHI',
      isPro: true,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Satoshi_Fan',
      bio: "Building the decentralized future one block at a time. Tech lead @ Web3 Ventures.",
      pnl: '+$8,200,000',
      followers: 850000,
      following: 42,
      history: [
        { date: '2022-05-12', amount: '25,000', type: 'received', asset: 'goBTC' },
      ]
    },
    {
      id: '4',
      name: 'Weekend Trip',
      type: 'group',
      role: 'admin',
      members: [
        { id: '1', name: 'Alice', type: 'user', handle: 'alice.algo', address: 'ALICE...W34' },
        { id: '2', name: 'Bob', type: 'user', handle: 'bob.algo', address: 'BOB...X99' }
      ]
    },
    {
      id: '5',
      name: 'Crypto Degens',
      type: 'group',
      role: 'member',
      members: [
        { id: '3', name: 'Mufasa', type: 'user', handle: 'Mufasa.algo', address: 'KING...LION' },
        { id: '1', name: 'Alice', type: 'user', handle: 'alice.algo', address: 'ALICE...W34' }
      ]
    }
  ]);

  const navigateTo = (screen: Screen) => setCurrentScreen(screen);

  const handleAddContact = (contact: Omit<Contact, 'id'>) => {
    const newContact = { ...contact, id: Date.now().toString() };
    setContacts([...contacts, newContact]);
  };

  const [isPro, setIsPro] = useState(false);
  const [showProModal, setShowProModal] = useState(false);
  const [proFeatureName, setProFeatureName] = useState('');

  const handleStartProTrial = () => {
    setIsPro(true);
    setShowProModal(false);
    if (proFeatureName === 'Custom Themes') {
      navigateTo('themes-screen');
    }
    // In a real app, this would start a timer or backend process
  };

  const verifyProAccess = (feature: string) => {
    if (!isPro) {
      setProFeatureName(feature);
      setShowProModal(true);
      return false;
    }
    return true;
  };

  const handleUpdateProfile = (updatedProfile: Partial<UserProfile>) => {
    setProfile({ ...profile, ...updatedProfile });
  };

  const handlePurchaseSuccess = (newHandle: string) => {
    setProfile({ ...profile, handle: newHandle });
    navigateTo('profile-contacts');
  };

  const handleContactClick = (contactId: string) => {
    setSelectedContactId(contactId);
    navigateTo('contact-details');
  };

  const getSelectedContact = () => contacts.find(c => c.id === selectedContactId)!;

  // Transaction Modal State
  const [isTxModalOpen, setIsTxModalOpen] = useState(false);
  const [txType, setTxType] = useState<'send' | 'request'>('send');

  const handleTxStart = (type: 'send' | 'request') => {
    setTxType(type);
    setIsTxModalOpen(true);
  };

  const handleTxConfirm = (amount: string, asset: string) => {
    console.log(`Transaction Confirmed: ${txType} ${amount} ${asset}`);
    // Here you would add the transaction to history/PnL logic
  };

  const handleRemoveMember = (groupId: string, memberId: string) => {
    setContacts(prev => prev.map(c => {
      if (c.id === groupId && c.members) {
        return { ...c, members: c.members.filter(m => m.id !== memberId) };
      }
      return c;
    }));
  };

  const handleAddMember = (groupId: string, member: Contact) => {
    setContacts(prev => prev.map(c => {
      if (c.id === groupId && c.members) {
        // check duplicates
        if (c.members.some(m => m.id === member.id)) return c;
        return { ...c, members: [...c.members, member] };
      }
      return c;
    }));
  };

  const handleQuestComplete = (questId: string, points: number) => {
    if (profile.completedQuests.includes(questId)) return;

    setProfile(prev => ({
      ...prev,
      points: prev.points + points,
      completedQuests: [...prev.completedQuests, questId]
    }));

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#2dd4bf', '#fbbf24', '#f472b6'] // Teal, Gold, Pink
    });
  };

  return (
    <ThemeProvider>
      <Layout
        onHomeClick={() => navigateTo('home')}
        onMenuClick={() => navigateTo('menu')}
        onDiscoverClick={() => navigateTo('discover')}
        overlay={
          currentScreen === 'spin-wheel' ? (
            <SpinWheelScreen
              onBack={() => navigateTo('discover')}
              onPointsEarned={(pts) => setProfile(prev => ({ ...prev, points: prev.points + pts }))}
              currentPoints={profile.points}
            />
          ) : currentScreen === 'crossword' ? (
            <CrosswordScreen
              onBack={() => navigateTo('discover')}
              onPointsEarned={(pts) => setProfile(prev => ({ ...prev, points: prev.points + pts }))}
            />
          ) : undefined
        }
      >
        {currentScreen === 'home' && (
          <Home onMoreClick={() => navigateTo('menu')} />
        )}
        {(currentScreen === 'discover' || currentScreen === 'spin-wheel' || currentScreen === 'crossword') && (
          <DiscoverScreen
            onSpinClick={() => navigateTo('spin-wheel')}
            onCrosswordClick={() => navigateTo('crossword')}
          />
        )}
        {currentScreen === 'menu' && (
          <MenuScreen
            onProfileClick={() => navigateTo('profile-contacts')}
            isPro={isPro}
            onTryPro={(feature) => verifyProAccess(feature)}
            onThemesClick={() => navigateTo('themes-screen')}
            onPeraRewardsClick={() => navigateTo('points-dashboard')}
          />
        )}
        {currentScreen === 'profile-contacts' && (
          <ProfileContactsScreen
            onBack={() => navigateTo('menu')}
            profile={profile}
            contacts={contacts}
            onUpdateProfile={handleUpdateProfile}
            onAddContact={handleAddContact}
            onPurchaseStart={() => navigateTo('purchase-flow')}
            isPro={isPro}
            onTryPro={(feature) => verifyProAccess(feature)}
            onContactClick={handleContactClick}
            onPointsClick={() => navigateTo('points-dashboard')}
          />
        )}
        {currentScreen === 'themes-screen' && (
          <ThemesScreen
            onBack={() => navigateTo('menu')}
            userLevel={profile.level}
          />
        )}
        {currentScreen === 'purchase-flow' && (
          <DomainPurchaseFlow
            onBack={() => navigateTo('profile-contacts')}
            onSuccess={handlePurchaseSuccess}
          />
        )}
        {currentScreen === 'contact-details' && selectedContactId && (
          <ContactDetailsScreen
            contact={getSelectedContact()}
            allContacts={contacts}
            onBack={() => navigateTo('profile-contacts')}
            onChat={() => navigateTo('chat')}
            onSend={() => handleTxStart('send')}
            onRequest={() => handleTxStart('request')}
            onRemoveMember={(memberId) => handleRemoveMember(selectedContactId, memberId)}
            onAddMember={(member) => handleAddMember(selectedContactId, member)}
          />
        )}
        {currentScreen === 'chat' && selectedContactId && (
          <ChatScreen
            contact={getSelectedContact()}
            onBack={() => navigateTo('contact-details')}
          />
        )}

        {currentScreen === 'points-dashboard' && (
          <PointsScreen
            profile={profile}
            onBack={() => navigateTo('profile-contacts')}
            onQuestComplete={handleQuestComplete}
            onUserClick={handleContactClick}
          />
        )}

        {currentScreen === 'pera-quests' && (
          <PeraQuestsDashboard
            profile={profile}
            onBack={() => navigateTo('menu')}
            onUpdateProfile={handleUpdateProfile}
            onQuestComplete={handleQuestComplete}
          />
        )}

        <ProEvaluationModal
          isOpen={showProModal}
          onClose={() => setShowProModal(false)}
          onStartTrial={handleStartProTrial}
          featureName={proFeatureName}
        />

        {selectedContactId && isTxModalOpen && (
          <TransactionModal
            isOpen={isTxModalOpen}
            onClose={() => setIsTxModalOpen(false)}
            type={txType}
            recipient={getSelectedContact()}
            onConfirm={handleTxConfirm}
          />
        )}
      </Layout>
    </ThemeProvider>
  );
}

export default App;
