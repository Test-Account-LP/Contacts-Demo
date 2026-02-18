import type { QuestQuestion } from '../components/QuestModal';

export interface Quest {
    id: string;
    title: string;
    description: string;
    timeEstimate: string;
    points: number;
    successMessage: string;
    questions: QuestQuestion[];
}

export const quests: Quest[] = [
    {
        id: 'quest_custody',
        title: 'What is a Self-Custodial Wallet?',
        description: 'Learn the fundamentals of self-custody and why holding your own keys matters.',
        timeEstimate: '2-3 mins',
        points: 200,
        successMessage: 'You understand the fundamentals of self-custody. Your keys. Your control.',
        questions: [
            { id: 1, question: 'What does "self-custodial" mean?', options: ['A bank controls your funds', 'You control your private keys', 'A third-party exchange holds your assets'], correctAnswerIndex: 1 },
            { id: 2, question: 'Why is controlling your private keys important?', options: ['It allows you to reset your password easily', 'It ensures only you can authorize transactions', 'It makes transactions reversible'], correctAnswerIndex: 1 },
            { id: 3, question: 'If you lose access to your private keys in a self-custodial wallet, what happens?', options: ['The wallet provider can recover them for you', 'Your funds may be permanently inaccessible', 'The blockchain automatically restores access'], correctAnswerIndex: 1 }
        ]
    },
    {
        id: 'quest_fund',
        title: 'What is Pera Fund?',
        description: 'Discover how Pera Fund simplifies moving capital into Algorand from other networks.',
        timeEstimate: '2-3 mins',
        points: 200,
        successMessage: 'Funding simplified. You’re ready to move value with confidence.',
        questions: [
            { id: 1, question: 'What is the primary purpose of Pera Fund?', options: ['To lend assets to other users', 'To move funds into Algorand from fiat or other networks', 'To lock tokens for governance'], correctAnswerIndex: 1 },
            { id: 2, question: 'Does using Pera Fund require giving up custody of your wallet?', options: ['Yes, funds are controlled by a third party', 'No, you remain in control of your wallet', 'Only during business hours'], correctAnswerIndex: 1 },
            { id: 3, question: 'Why is direct funding important?', options: ['It reduces friction when entering the ecosystem', 'It increases transaction times', 'It removes blockchain transparency'], correctAnswerIndex: 0 }
        ]
    },
    {
        id: 'quest_swap',
        title: 'What is Pera Swap?',
        description: 'Understand how Pera Swap enables seamless in-wallet asset exchanges with speed and security.',
        timeEstimate: '2-3 mins',
        points: 200,
        successMessage: 'Swap smarter. Stay in control.',
        questions: [
            { id: 1, question: 'What does Pera Swap allow users to do?', options: ['Exchange assets directly within the wallet', 'Convert crypto into airline miles', 'Freeze tokens permanently'], correctAnswerIndex: 0 },
            { id: 2, question: 'When using Pera Swap, who controls your assets?', options: ['A centralized exchange', 'You, through your wallet', 'A random validator'], correctAnswerIndex: 1 },
            { id: 3, question: 'What is a key benefit of in-wallet swaps?', options: ['Faster and more seamless asset management', 'Mandatory identity verification for every swap', 'Delayed settlement windows'], correctAnswerIndex: 0 }
        ]
    }
];
