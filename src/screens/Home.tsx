import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, FlatList, TouchableOpacity, 
  SafeAreaView, Modal, TextInput, Alert, KeyboardAvoidingView, 
  Platform, ScrollView, TouchableWithoutFeedback, Keyboard
} from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { useAppTheme } from '../hooks/useTheme';
import { useAppData } from '../hooks/useDataContext';
import { TaskCard } from '../components/TaskCard';
import { PriorityLevel, CategoryType } from '../types';
import { Plus, LogOut, X } from 'lucide-react-native';

export const Home: React.FC = () => {
  const { user, logout } = useAuth();
  const { currentTheme } = useAppTheme();
  const { tasks, addQuickNote, addQuickSchedule } = useAppData();
  
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('18/05/2026');
  const [time, setTime] = useState('');
  const [priority, setPriority] = useState<PriorityLevel>('MEDIUM');
  const [category, setCategory] = useState<CategoryType>('WORK');

  const { colors } = currentTheme;

  const handleSaveQuickNote = () => {
    if (!title.trim() || !description.trim() || !date.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos da nota.');
      return;
    }
    addQuickNote(title, description, date);
    setTitle('');
    setDescription('');
    setIsNoteModalOpen(false);
  };

  const handleSaveQuickSchedule = () => {
    if (!title.trim() || !time.trim() || !date.trim()) {
      Alert.alert('Erro', 'Preencha os campos obrigatórios.');
      return;
    }
    addQuickSchedule(title, description, date, time, priority, category);
    setTitle('');
    setDescription('');
    setTime('');
    setIsScheduleModalOpen(false);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.backgroundPrimary }]}>
      <View style={[styles.header, { backgroundColor: colors.backgroundSecondary, borderColor: colors.border }]}>
        <View>
          <Text style={[styles.greeting, { color: colors.textSecondary }]}>Olá,</Text>
          <Text style={[styles.userName, { color: colors.textPrimary }]}>{user?.name || 'edson'}</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <LogOut size={20} color={colors.danger} />
        </TouchableOpacity>
      </View>

      <View style={styles.actionContainer}>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.primary }]} onPress={() => setIsNoteModalOpen(true)}>
          <Plus size={20} color="#FFFFFF" />
          <Text style={styles.actionButtonText}>Nova Nota</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, { borderColor: colors.primary, borderWidth: 1 }]} onPress={() => setIsScheduleModalOpen(true)}>
          <Plus size={20} color={colors.primary} />
          <Text style={[styles.actionButtonText, { color: colors.primary }]}>Agendamento</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listContainer}>
        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Quadro de Atividades (Geral)</Text>
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TaskCard item={item} />}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* MODAL NOTA */}
      <Modal visible={isNoteModalOpen} animationType="fade" transparent>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalOverlay}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardContainer}>
              <View style={[styles.modalContent, { backgroundColor: colors.backgroundSecondary }]}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={styles.modalHeader}>
                    <Text style={[styles.modalHeaderTitle, { color: colors.textPrimary }]}>Crie sua Nota Rápida</Text>
                    <TouchableOpacity onPress={() => setIsNoteModalOpen(false)}>
                      <X size={20} color={colors.textPrimary} />
                    </TouchableOpacity>
                  </View>
                  <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Título da Nota</Text>
                  <TextInput style={[styles.input, { borderColor: colors.border, color: colors.textPrimary }]} placeholder="Ex: Idéia de post" placeholderTextColor={colors.textLight} value={title} onChangeText={setTitle} />
                  <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Conteúdo</Text>
                  <TextInput style={[styles.input, { borderColor: colors.border, color: colors.textPrimary, height: 70 }]} multiline placeholder="Escreva os detalhes..." placeholderTextColor={colors.textLight} value={description} onChangeText={setDescription} />
                  <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Data de Execução</Text>
                  <TextInput style={[styles.input, { borderColor: colors.border, color: colors.textPrimary }]} placeholder="Ex: 18/05/2026" placeholderTextColor={colors.textLight} value={date} onChangeText={setDate} />
                  <TouchableOpacity style={[styles.saveButton, { backgroundColor: colors.primary }]} onPress={handleSaveQuickNote}>
                    <Text style={styles.saveButtonText}>Adicionar ao Quadro</Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* MODAL AGENDAMENTO */}
      <Modal visible={isScheduleModalOpen} animationType="fade" transparent>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalOverlay}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardContainer}>
              <View style={[styles.modalContent, { backgroundColor: colors.backgroundSecondary }]}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={styles.modalHeader}>
                    <Text style={[styles.modalHeaderTitle, { color: colors.textPrimary }]}>Novo Agendamento</Text>
                    <TouchableOpacity onPress={() => setIsScheduleModalOpen(false)}>
                      <X size={20} color={colors.textPrimary} />
                    </TouchableOpacity>
                  </View>
                  <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Título do Evento</Text>
                  <TextInput style={[styles.input, { borderColor: colors.border, color: colors.textPrimary }]} placeholder="Ex: Consulta Médica" placeholderTextColor={colors.textLight} value={title} onChangeText={setTitle} />
                  <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Data</Text>
                  <TextInput style={[styles.input, { borderColor: colors.border, color: colors.textPrimary }]} placeholder="Ex: 18/05/2026" placeholderTextColor={colors.textLight} value={date} onChangeText={setDate} />
                  <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Horário</Text>
                  <TextInput style={[styles.input, { borderColor: colors.border, color: colors.textPrimary }]} placeholder="Ex: 16:30" placeholderTextColor={colors.textLight} value={time} onChangeText={setTime} />
                  <TouchableOpacity style={[styles.saveButton, { backgroundColor: colors.primary }]} onPress={handleSaveQuickSchedule}>
                    <Text style={styles.saveButtonText}>Agendar Evento</Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingVertical: 16, borderBottomWidth: 1 },
  greeting: { fontSize: 14 },
  userName: { fontSize: 20, fontWeight: 'bold' },
  logoutButton: { padding: 8, borderRadius: 8, backgroundColor: 'rgba(255,86,48,0.1)' },
  actionContainer: { flexDirection: 'row', gap: 12, padding: 24 },
  actionButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, height: 44, borderRadius: 8 },
  actionButtonText: { color: '#FFFFFF', fontWeight: '600', fontSize: 14 },
  listContainer: { flex: 1, paddingHorizontal: 24 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 16 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 24 },
  keyboardContainer: { width: '100%', justifyContent: 'center' },
  modalContent: { borderRadius: 12, padding: 20, maxHeight: '85%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  modalHeaderTitle: { fontSize: 17, fontWeight: 'bold' },
  inputLabel: { fontSize: 13, fontWeight: '600', marginBottom: 4, marginTop: 10 },
  input: { borderWidth: 1, borderRadius: 8, paddingHorizontal: 12, height: 40, fontSize: 14, marginBottom: 4 },
  saveButton: { height: 42, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 22 },
  saveButtonText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 14 }
});