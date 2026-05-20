import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../screens/Home';
import { Notes } from '../screens/Notes';
import { Appointments } from '../screens/Appointments';
import { Profile } from '../screens/Profile';
import { AppTabParamList } from '../types/navigation';
import { useAppTheme } from '../hooks/useTheme'; // IMPORTANTE
import { Home as HomeIcon, FileText, Calendar, User } from 'lucide-react-native';

const Tab = createBottomTabNavigator<AppTabParamList>();

export const AppRoutes: React.FC = () => {
  const { currentTheme } = useAppTheme(); // Escuta o tema global aqui nas abas também
  const { colors } = currentTheme;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textLight,
        tabBarStyle: {
          backgroundColor: colors.backgroundSecondary,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          height: 85,          // Aumentamos a altura total para dar espaço
          paddingTop: 10,      // Espaço sutil no topo interno da barra
          paddingBottom: 22,   // EMPURRA OS ITENS PARA CIMA (Evita a barra física do iPhone)
        },
      }}
    >
      <Tab.Screen name="Home" component={Home} options={{ tabBarLabel: 'Início', tabBarIcon: ({ color, size }) => <HomeIcon color={color} size={size} /> }} />
      <Tab.Screen name="Notes" component={Notes} options={{ tabBarLabel: 'Notas', tabBarIcon: ({ color, size }) => <FileText color={color} size={size} /> }} />
      <Tab.Screen name="Appointments" component={Appointments} options={{ tabBarLabel: 'Agenda', tabBarIcon: ({ color, size }) => <Calendar color={color} size={size} /> }} />
      <Tab.Screen name="Profile" component={Profile} options={{ tabBarLabel: 'Perfil', tabBarIcon: ({ color, size }) => <User color={color} size={size} /> }} />
    </Tab.Navigator>
  );
};