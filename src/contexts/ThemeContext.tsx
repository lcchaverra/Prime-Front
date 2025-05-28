import React, { createContext, useState, useEffect } from 'react';

    interface ThemeContextType {
    isDarkMode: boolean;
    toggleTheme: () => void;
    }

    export const ThemeContext = createContext<ThemeContextType>({
    isDarkMode: false,
    toggleTheme: () => {},
    });

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const saved = localStorage.getItem('darkMode');
        return saved ? JSON.parse(saved) : false;
    });

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
        
        // Cambiar el tema de PrimeReact
        const theme = isDarkMode ? 'lara-dark-indigo' : 'lara-light-indigo';
        const linkId = 'theme-css';
        const linkElement = document.getElementById(linkId) as HTMLLinkElement || document.createElement('link');
        
        linkElement.id = linkId;
        linkElement.rel = 'stylesheet';
        linkElement.type = 'text/css';
        linkElement.href = `https://cdn.jsdelivr.net/npm/primereact@10.5.1/resources/themes/${theme}/theme.css`;

        if (!document.getElementById(linkId)) {
        document.head.appendChild(linkElement);
        }

        // Actualizar las clases del body
        document.body.classList.toggle('dark', isDarkMode);
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode((prev: any) => !prev);
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
        {children}
        </ThemeContext.Provider>
    );
};