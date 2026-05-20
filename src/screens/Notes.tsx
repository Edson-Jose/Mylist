import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useAppTheme } from '../hooks/useTheme';
import { useAppData } from '../hooks/useDataContext'; // CONEXÃO DE DADOS
import { Search, Trash2, FileText } from 'lucide-react-native';

export const Notes: React.FC = () => {
  const { currentTheme } = useAppTheme();
  const { notes, deleteNote } = useAppData(); // CONECTANDO COM AS NOTAS GLOBAIS
  const [searchQuery, setSearchQuery] = useState('');
  const { colors } = currentTheme;

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteNote = (id: string) => {
    Alert.alert('Excluir Nota', 'Deseja apagar permanentemente?', [
      { text: 'Cancelar' },
      { text: 'Excluir', style: 'destructive', onPress: () => deleteNote(id) }
    ]);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.backgroundPrimary }]}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Minhas Notas</Text>
          <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>{notes.length} notas salvas</Text>
        </View>
      </View>

      <View style={[styles.searchContainer, { backgroundColor: colors.backgroundSecondary, borderColor: colors.border }]}>
        <Search size={18} color={colors.textLight} />
        <TextInput style={[styles.searchInput, { color: colors.textPrimary }]} placeholder="Pesquisar..." placeholderTextColor={colors.textLight} value={searchQuery} onChangeText={setSearchQuery} />
      </View>

      <FlatList
        data={filteredNotes}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item }) => (
          <View style={[styles.noteCard, { backgroundColor: colors.backgroundSecondary, borderColor: colors.border }]}>
            <View style={styles.noteHeader}>
              <Text style={[styles.noteTitle, { color: colors.textPrimary }]} numberOfLines={1}>{item.title}</Text>
              <TouchableOpacity onPress={() => handleDeleteNote(item.id)}><Trash2 size={14} color={colors.danger} /></TouchableOpacity>
            </View>
            <Text style={[styles.noteContentText, { color: colors.textSecondary }]} numberOfLines={4}>{item.content}</Text>
            <Text style={[styles.noteDate, { color: colors.textLight }]}>{item.createdAt}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

// Mantenha os estilos (styles) anteriores de Notes...
const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 24 },
  headerTitle: { fontSize: 24, fontWeight: 'bold' },
  headerSubtitle: { fontSize: 14, marginTop: 2 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 24, paddingHorizontal: 12, height: 42, borderRadius: 8, borderWidth: 1, marginBottom: 16 },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 14 },
  listContent: { paddingHorizontal: 18, paddingBottom: 24 },
  columnWrapper: { justifyContent: 'space-between', paddingHorizontal: 6 },
  noteCard: { width: '48%', borderRadius: 8, borderWidth: 1, padding: 12, marginBottom: 12, minHeight: 130, justifyContent: 'space-between' },
  noteHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  noteTitle: { fontSize: 14, fontWeight: 'bold', flex: 1, marginRight: 4 },
  noteContentText: { fontSize: 12, lineHeight: 16, flex: 1 },
  noteDate: { fontSize: 10, fontWeight: '600', marginTop: 8 }
});