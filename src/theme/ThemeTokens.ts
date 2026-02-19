export type ThemeName = 'default' | 'retro' | 'space' | 'bmx' | 'train' | 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';

export interface ThemeTokens {
    primaryBackground: string;
    secondaryBackground: string;
    surface: string;
    elevatedSurface: string;

    primaryText: string;
    secondaryText: string;
    mutedText: string;

    primaryAccent: string;
    secondaryAccent: string;

    borderColor: string;
    dividerColor: string;

    headerBackground: string;
    footerBackground: string;

    buttonPrimaryBackground: string;
    buttonPrimaryText: string;
    buttonSecondaryBackground: string;
    buttonSecondaryText: string;

    success: string;
    warning: string;
    error: string;

    overlayLight: string;
    overlayDark: string;

    metallicGradient?: string;
    buttonGradient?: string;
}

export const themes: Record<ThemeName, ThemeTokens> = {
    default: {
        primaryBackground: '#f8fafc', // slate-50
        secondaryBackground: '#ffffff', // white
        surface: '#ffffff', // white
        elevatedSurface: '#f1f5f9', // slate-100
        primaryText: '#0f172a', // slate-900
        secondaryText: '#475569', // slate-600
        mutedText: '#94a3b8', // slate-400
        primaryAccent: '#3b82f6', // blue-500
        secondaryAccent: '#8b5cf6', // violet-500
        borderColor: '#e2e8f0', // slate-200
        dividerColor: '#cbd5e1', // slate-300
        headerBackground: 'rgba(255, 255, 255, 0.8)', // white backdrop
        footerBackground: '#ffffff', // white bottom nav
        buttonPrimaryBackground: '#0f172a', // slate-900
        buttonPrimaryText: '#ffffff',
        buttonSecondaryBackground: '#f1f5f9', // slate-100
        buttonSecondaryText: '#0f172a',
        success: '#16a34a',
        warning: '#d97706',
        error: '#dc2626',
        overlayLight: 'rgba(255, 255, 255, 0.5)',
        overlayDark: 'rgba(0, 0, 0, 0.5)',
    },
    retro: {
        primaryBackground: '#2e1065', // indigo-950
        secondaryBackground: '#4f46e5', // indigo-600
        surface: '#312e81', // indigo-900
        elevatedSurface: '#4338ca', // indigo-700
        primaryText: '#ffffff',
        secondaryText: '#a5b4fc', // indigo-300
        mutedText: '#818cf8', // indigo-400
        primaryAccent: '#ec4899', // pink-500
        secondaryAccent: '#f43f5e', // rose-500
        borderColor: '#ec4899', // pink-500
        dividerColor: '#e11d48', // rose-600
        headerBackground: 'rgba(46, 16, 101, 0.5)',
        footerBackground: '#4f46e5',
        buttonPrimaryBackground: '#ec4899',
        buttonPrimaryText: '#ffffff',
        buttonSecondaryBackground: '#ffffff',
        buttonSecondaryText: '#2e1065',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        overlayLight: 'rgba(255, 255, 255, 0.1)',
        overlayDark: 'rgba(0, 0, 0, 0.5)',
    },
    space: {
        primaryBackground: '#000000',
        secondaryBackground: '#0a0a0a',
        surface: '#171717',
        elevatedSurface: '#262626',
        primaryText: '#ffffff',
        secondaryText: '#a3a3a3',
        mutedText: '#737373',
        primaryAccent: '#1e3a8a', // blue-900
        secondaryAccent: '#1e40af', // blue-800
        borderColor: '#1e3a8a',
        dividerColor: '#172554',
        headerBackground: 'rgba(0, 0, 0, 0.5)',
        footerBackground: '#0a0a0a',
        buttonPrimaryBackground: '#1e3a8a',
        buttonPrimaryText: '#ffffff',
        buttonSecondaryBackground: '#ffffff',
        buttonSecondaryText: '#000000',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#b91c1c',
        overlayLight: 'rgba(255, 255, 255, 0.15)',
        overlayDark: 'rgba(0, 0, 0, 0.7)',
    },
    bmx: {
        primaryBackground: '#1c1917', // stone-900
        secondaryBackground: '#292524', // stone-800
        surface: '#44403c', // stone-700
        elevatedSurface: '#57534e', // stone-600
        primaryText: '#fafaf9',
        secondaryText: '#d6d3d1',
        mutedText: '#a8a29e',
        primaryAccent: '#ea580c', // orange-600
        secondaryAccent: '#d97706', // amber-600
        borderColor: '#d97706',
        dividerColor: '#b45309',
        headerBackground: 'rgba(28, 25, 23, 0.5)',
        footerBackground: '#292524',
        buttonPrimaryBackground: '#ea580c',
        buttonPrimaryText: '#ffffff',
        buttonSecondaryBackground: '#ffffff',
        buttonSecondaryText: '#1c1917',
        success: '#65a30d',
        warning: '#ca8a04',
        error: '#dc2626',
        overlayLight: 'rgba(255, 255, 255, 0.1)',
        overlayDark: 'rgba(0, 0, 0, 0.6)',
    },
    train: {
        primaryBackground: '#0f172a', // slate-900
        secondaryBackground: '#1e293b', // slate-800
        surface: '#334155', // slate-700
        elevatedSurface: '#475569', // slate-600
        primaryText: '#f8fafc',
        secondaryText: '#cbd5e1',
        mutedText: '#94a3b8',
        primaryAccent: '#7f1d1d', // red-900
        secondaryAccent: '#991b1b', // red-800
        borderColor: '#7f1d1d',
        dividerColor: '#450a0a',
        headerBackground: 'rgba(15, 23, 42, 0.5)',
        footerBackground: '#1e293b',
        buttonPrimaryBackground: '#7f1d1d',
        buttonPrimaryText: '#ffffff',
        buttonSecondaryBackground: '#ffffff',
        buttonSecondaryText: '#0f172a',
        success: '#15803d',
        warning: '#b45309',
        error: '#b91c1c',
        overlayLight: 'rgba(255, 255, 255, 0.1)',
        overlayDark: 'rgba(0, 0, 0, 0.5)',
    },
    bronze: {
        primaryBackground: '#1B1410',
        secondaryBackground: '#2C1D11',
        surface: '#2C1D11',
        elevatedSurface: '#3A2718',
        primaryText: '#E6B17A',
        secondaryText: '#CD7F32',
        mutedText: '#8C4A17',
        primaryAccent: '#CD7F32',
        secondaryAccent: '#E6B17A',
        borderColor: '#8C4A17',
        dividerColor: '#5A2E0C',
        headerBackground: 'rgba(27, 20, 16, 0.6)',
        footerBackground: '#2C1D11',
        buttonPrimaryBackground: '#CD7F32',
        buttonPrimaryText: '#1C1208',
        buttonSecondaryBackground: '#3A2718',
        buttonSecondaryText: '#E6B17A',
        success: '#15803d',
        warning: '#ca8a04',
        error: '#dc2626',
        overlayLight: 'rgba(255, 255, 255, 0.15)',
        overlayDark: 'rgba(0, 0, 0, 0.6)',
        metallicGradient: 'linear-gradient(135deg, #CD7F32 0%, #E6B17A 30%, #8C4A17 70%, #5A2E0C 100%)',
        buttonGradient: 'linear-gradient(180deg, #E6B17A 0%, #CD7F32 20%, #8C4A17 100%)',
    },
    silver: {
        primaryBackground: '#111111',
        secondaryBackground: '#1C1C1E',
        surface: '#1C1C1E',
        elevatedSurface: '#2C2C2E',
        primaryText: '#F5F5F5',
        secondaryText: '#C0C0C0',
        mutedText: '#8E8E8E',
        primaryAccent: '#C0C0C0',
        secondaryAccent: '#E8EEF2', // cool tint
        borderColor: '#8E8E8E',
        dividerColor: '#5F5F5F',
        headerBackground: 'rgba(17, 17, 17, 0.6)',
        footerBackground: '#1C1C1E',
        buttonPrimaryBackground: '#C0C0C0',
        buttonPrimaryText: '#111111',
        buttonSecondaryBackground: '#2C2C2E',
        buttonSecondaryText: '#F5F5F5',
        success: '#15803d',
        warning: '#ca8a04',
        error: '#dc2626',
        overlayLight: 'rgba(255, 255, 255, 0.2)',
        overlayDark: 'rgba(0, 0, 0, 0.6)',
        metallicGradient: 'linear-gradient(135deg, #C0C0C0 0%, #E8EEF2 30%, #8E8E8E 70%, #5F5F5F 100%)',
        buttonGradient: 'linear-gradient(180deg, #E8EEF2 0%, #C0C0C0 20%, #8E8E8E 100%)',
    },
    gold: {
        primaryBackground: '#121212',
        secondaryBackground: '#1A1A1A',
        surface: '#1A1A1A',
        elevatedSurface: '#262626',
        primaryText: '#F6E27A',
        secondaryText: '#D4AF37',
        mutedText: '#9E7C1F',
        primaryAccent: '#D4AF37',
        secondaryAccent: '#F6E27A',
        borderColor: '#9E7C1F',
        dividerColor: '#7A5C00',
        headerBackground: 'rgba(18, 18, 18, 0.6)',
        footerBackground: '#1A1A1A',
        buttonPrimaryBackground: '#D4AF37',
        buttonPrimaryText: '#1A1A1A',
        buttonSecondaryBackground: '#262626',
        buttonSecondaryText: '#F6E27A',
        success: '#15803d',
        warning: '#ca8a04',
        error: '#dc2626',
        overlayLight: 'rgba(255, 255, 255, 0.1)',
        overlayDark: 'rgba(0, 0, 0, 0.6)',
        metallicGradient: 'linear-gradient(135deg, #D4AF37 0%, #F6E27A 25%, #9E7C1F 65%, #7A5C00 100%)',
        buttonGradient: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, #D4AF37 20%, #9E7C1F 100%)',
    },
    platinum: {
        primaryBackground: '#0A1118',
        secondaryBackground: '#111D29',
        surface: '#111D29',
        elevatedSurface: '#192839',
        primaryText: '#FFFFFF',
        secondaryText: '#E5E4E2',
        mutedText: '#B1B0AC',
        primaryAccent: '#E5E4E2',
        secondaryAccent: '#FFFFFF',
        borderColor: '#B1B0AC',
        dividerColor: '#878681',
        headerBackground: 'rgba(10, 17, 24, 0.6)',
        footerBackground: '#111D29',
        buttonPrimaryBackground: '#E5E4E2',
        buttonPrimaryText: '#0A1118',
        buttonSecondaryBackground: '#192839',
        buttonSecondaryText: '#E5E4E2',
        success: '#15803d',
        warning: '#ca8a04',
        error: '#dc2626',
        overlayLight: 'rgba(255, 255, 255, 0.2)',
        overlayDark: 'rgba(0, 0, 0, 0.6)',
        metallicGradient: 'linear-gradient(135deg, #E5E4E2 0%, #FFFFFF 30%, #B1B0AC 70%, #878681 100%)',
        buttonGradient: 'linear-gradient(180deg, #FFFFFF 0%, #E5E4E2 20%, #B1B0AC 100%)',
    },
    diamond: {
        primaryBackground: '#0F121F',
        secondaryBackground: '#1A2035',
        surface: '#1A2035',
        elevatedSurface: '#232B45',
        primaryText: '#E0FAFF',
        secondaryText: '#B9F2FF',
        mutedText: '#7CC1D4',
        primaryAccent: '#B9F2FF',
        secondaryAccent: '#E0FAFF',
        borderColor: '#7CC1D4',
        dividerColor: '#4A8D9E',
        headerBackground: 'rgba(15, 18, 31, 0.6)',
        footerBackground: '#1A2035',
        buttonPrimaryBackground: '#B9F2FF',
        buttonPrimaryText: '#0F121F',
        buttonSecondaryBackground: '#232B45',
        buttonSecondaryText: '#B9F2FF',
        success: '#15803d',
        warning: '#f59e0b',
        error: '#ef4444',
        overlayLight: 'rgba(255, 255, 255, 0.3)',
        overlayDark: 'rgba(0, 0, 0, 0.6)',
        metallicGradient: 'linear-gradient(135deg, #B9F2FF 0%, #E0FAFF 20%, #7CC1D4 60%, #4A8D9E 100%)',
        buttonGradient: 'linear-gradient(180deg, #E0FAFF 0%, #B9F2FF 20%, #7CC1D4 100%)',
    }
};
