import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';

const USER_STORAGE_KEY = '@mylist:user';

export const storage = {
  /**
   * Salva os dados do usuário no dispositivo
   */
  async saveUser(user: User): Promise<void> {
    try {
      const jsonValue = JSON.stringify(user);
      await AsyncStorage.setItem(USER_STORAGE_KEY, jsonValue);
    } catch (error) {
      console.error('Erro ao salvar usuário no AsyncStorage:', error);
    }
  },

  /**
   * Recupera os dados do usuário salvos no dispositivo
   */
  async getUser(): Promise<User | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(USER_STORAGE_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Erro ao buscar usuário no AsyncStorage:', error);
      return null;
    }
  },

  /**
   * Remove os dados do usuário (Logout)
   */
  async removeUser(): Promise<void> {
    try {
      await AsyncStorage.removeItem(USER_STORAGE_KEY);
    } catch (error) {
      console.error('Erro ao remover usuário do AsyncStorage:', error);
    }
  },
};