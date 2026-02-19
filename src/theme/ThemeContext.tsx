import React, { createContext, useContext, useState, useMemo } from 'react';
import type { ReactNode } from 'react';
import { themes } from './ThemeTokens';
import type { ThemeName, ThemeTokens } from './ThemeTokens';
import { getAccessibleTextColor } from '../utils/color';

interface ThemeContextType {
    themeName: ThemeName;
    tokens: ThemeTokens;
    setTheme: (name: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children, initialTheme = 'default' }: { children: ReactNode, initialTheme?: ThemeName }) => {
    const [themeName, setThemeName] = useState<ThemeName>(initialTheme);

    const tokens = useMemo(() => {
        const baseTokens = themes[themeName];

        // Auto-correct text contrast against its surface background
        return {
            ...baseTokens,
            primaryText: getAccessibleTextColor(baseTokens.surface, baseTokens.primaryText, '#f8fafc', '#0f172a'),
            secondaryText: getAccessibleTextColor(baseTokens.surface, baseTokens.secondaryText, '#cbd5e1', '#334155'),
            buttonPrimaryText: getAccessibleTextColor(baseTokens.buttonPrimaryBackground, baseTokens.buttonPrimaryText, '#ffffff', '#0f172a'),
        };
    }, [themeName]);

    return (
        <ThemeContext.Provider value={{ themeName, tokens, setTheme: setThemeName }}>
            {/* We also inject CSS variables for components that need standard var() usage */}
            <div
                data-theme={themeName}
                style={{
                    '--primary-background': tokens.primaryBackground,
                    '--secondary-background': tokens.secondaryBackground,
                    '--surface': tokens.surface,
                    '--elevated-surface': tokens.elevatedSurface,
                    '--primary-text': tokens.primaryText,
                    '--secondary-text': tokens.secondaryText,
                    '--muted-text': tokens.mutedText,
                    '--primary-accent': tokens.primaryAccent,
                    '--secondary-accent': tokens.secondaryAccent,
                    '--border-color': tokens.borderColor,
                    '--divider-color': tokens.dividerColor,
                    '--header-background': tokens.headerBackground,
                    '--footer-background': tokens.footerBackground,
                    '--metallic-gradient': tokens.metallicGradient || 'none',
                    '--button-gradient': tokens.buttonGradient || 'none',
                } as React.CSSProperties}
            >
                {children}
            </div>
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
