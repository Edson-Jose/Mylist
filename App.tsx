import React from 'react';
import { StatusBar } from 'react-native';
import { AuthProvider } from './src/hooks/useAuth';
import { CustomThemeProvider, useAppTheme } from './src/hooks/useTheme';
import { DataProvider } from './src/hooks/useDataContext'; // NOVO CONTEXTO DE CONEXÃO
import { Routes } from './src/routes';

const AppStatusBar: React.FC = () => {
  const { isDarkMode, currentTheme } = useAppTheme();
  return (
    <StatusBar 
      barStyle={isDarkMode ? 'light-content' : 'dark-content'} 
      backgroundColor={currentTheme.colors.backgroundPrimary} 
      animated={true}
    />
  );
};

export default function App() {
  return (
    <AuthProvider>
      <CustomThemeProvider>
        <DataProvider> {/* CONECTANDO AS TELAS */}
          <AppStatusBar />
          <Routes />
        </DataProvider>
      </CustomThemeProvider>
    </AuthProvider>
  );
}