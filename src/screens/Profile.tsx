import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Switch, SafeAreaView, Alert, ScrollView } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { useAppTheme } from '../hooks/useTheme';
import * as ImagePicker from 'expo-image-picker'; // IMPORTAÇÃO DA GALERIA REAL
import { Shield, Bell, Moon, LogOut, Camera } from 'lucide-react-native';

export const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme, currentTheme } = useAppTheme();
  
  // Imagem padrão inicial caso o usuário não escolha nenhuma da galeria
  const [pickedImage, setPickedImage] = useState<string>('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=250');
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);

  const { colors } = currentTheme;

  // FUNÇÃO ENGENHARIA: Abre o álbum de fotos nativo do celular
  const handlePickImage = async () => {
    // 1. Solicita a permissão do usuário para abrir os arquivos
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos de acesso às suas fotos para alterar seu perfil.');
      return;
    }

    // 2. Abre a galeria para seleção
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, // Permite cortar em formato quadrado
      aspect: [1, 1],
      quality: 0.7, // Compacta levemente para não pesar o app
    });

    // 3. Se o usuário não cancelou, injeta o caminho da foto real no estado
    if (!result.canceled) {
      setPickedImage(result.assets[0].uri);
    }
  };

  const handleLogoutPress = () => {
    Alert.alert('Sair da Conta', 'Tem certeza que deseja fechar sua sessão?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', style: 'destructive', onPress: logout }
    ]);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.backgroundPrimary }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* CABEÇALHO DO PERFIL */}
        <View style={[styles.profileHeader, { backgroundColor: colors.backgroundSecondary, borderColor: colors.border }]}>
          
          {/* CONTAINER DA IMAGEM COM BOTÃO SOBREPOSTO */}
          <TouchableOpacity style={[styles.avatarContainer, { borderColor: colors.primary }]} onPress={handlePickImage} activeOpacity={0.8}>
            <Image source={{ uri: pickedImage }} style={styles.avatar} />
            <View style={styles.cameraOverlay}>
              <Camera size={16} color="#FFF" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handlePickImage}>
            <Text style={[styles.changePhotoText, { color: colors.primary }]}>Alterar foto de perfil</Text>
          </TouchableOpacity>

          <Text style={[styles.nameText, { color: colors.textPrimary }]}>{user?.name || 'Usuário Mylist'}</Text>
          <Text style={[styles.emailText, { color: colors.textSecondary }]}>{user?.email || 'usuario@email.com'}</Text>
        </View>

        {/* PREFERÊNCIAS */}
        <View style={[styles.section, { backgroundColor: colors.backgroundSecondary, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.textLight }]}>Preferências</Text>
          
          <View style={[styles.row, { borderBottomColor: colors.backgroundPrimary }]}>
            <View style={styles.rowLeft}>
              <Moon size={20} color={colors.textSecondary} />
              <Text style={[styles.rowText, { color: colors.textPrimary }]}>Modo Escuro Global</Text>
            </View>
            <Switch 
              value={isDarkMode} 
              onValueChange={toggleTheme}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={[styles.row, { borderBottomColor: colors.backgroundPrimary }]}>
            <View style={styles.rowLeft}>
              <Bell size={20} color={colors.textSecondary} />
              <Text style={[styles.rowText, { color: colors.textPrimary }]}>Notificações Push</Text>
            </View>
            <Switch 
              value={isNotificationsEnabled} 
              onValueChange={setIsNotificationsEnabled}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* SEGURANÇA */}
        <View style={[styles.section, { backgroundColor: colors.backgroundSecondary, borderColor: colors.border }]}>
          <Text style={[styles.sectionTitle, { color: colors.textLight }]}>Conta & Segurança</Text>
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Shield size={20} color={colors.textSecondary} />
              <Text style={[styles.rowText, { color: colors.textPrimary }]}>Privacidade de Dados</Text>
            </View>
          </View>
        </View>

        {/* LOGOUT */}
        <TouchableOpacity style={[styles.logoutButton, { backgroundColor: colors.backgroundSecondary, borderColor: colors.danger + '30' }]} onPress={handleLogoutPress}>
          <LogOut size={20} color={colors.danger} />
          <Text style={[styles.logoutButtonText, { color: colors.danger }]}>Sair do Aplicativo</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  profileHeader: { alignItems: 'center', paddingVertical: 28, borderBottomWidth: 1, marginBottom: 20 },
  avatarContainer: { width: 100, height: 100, borderRadius: 50, borderWidth: 3, overflow: 'hidden', position: 'relative', marginBottom: 10 },
  avatar: { width: '100%', height: '100%' },
  cameraOverlay: { position: 'absolute', bottom: 0, width: '100%', height: 28, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  changePhotoText: { fontSize: 14, fontWeight: '600', marginBottom: 12 },
  nameText: { fontSize: 20, fontWeight: 'bold' },
  emailText: { fontSize: 14, marginTop: 2 },
  section: { borderTopWidth: 1, borderBottomWidth: 1, paddingHorizontal: 20, marginBottom: 20, paddingBottom: 8 },
  sectionTitle: { fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase', marginTop: 14, marginBottom: 12, letterSpacing: 0.5 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1 },
  rowLeft: { flexDirection: 'row', alignItems: 'center'},  /* mudei tinha gap:12 no final */
  rowText: { fontSize: 15, fontWeight: '500' },
  logoutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, marginHorizontal: 20, height: 46, borderRadius: 8, borderWidth: 1, marginTop: 8, marginBottom: 24 },
  logoutButtonText: { fontSize: 15, fontWeight: 'bold' }
});