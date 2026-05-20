import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useAppTheme } from '../hooks/useTheme';
import { useAppData } from '../hooks/useDataContext'; // CONEXÃO DE DADOS
import { Clock, Trash2 } from 'lucide-react-native';

export const Appointments: React.FC = () => {
  const { currentTheme } = useAppTheme();
  const { tasks, deleteEvent } = useAppData(); // PUXANDO TAREFAS TBM NA AGENDA
  const [selectedDate, setSelectedDate] = useState('2026-05-18');
  const { colors } = currentTheme;

  const weekDays = useMemo(() => {
    const days = [];
    const baseDate = new Date(2026, 4, 18);
    const weekLabels = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB', 'DOM'];
    for (let i = 0; i < 7; i++) {
      const current = new Date(baseDate);
      current.setDate(baseDate.getDate() + i);
      const dayNum = String(current.getDate()).padStart(2, '0');
      const monthNum = String(current.getMonth() + 1).padStart(2, '0');
      days.push({ label: weekLabels[i], dayNumber: dayNum, dateString: `${current.getFullYear()}-${monthNum}-${dayNum}` });
    }
    return days;
  }, []);

 const dayEvents = tasks.filter(
  ev => ev.date === selectedDate && (ev as any).type !== 'NOTE'
);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.backgroundPrimary }]}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Agenda</Text>
          <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>Maio de 2026</Text>
        </View>
      </View>

      <View style={styles.calendarContainer}>
        {weekDays.map(item => {
          const isActive = item.dateString === selectedDate;
          return (
            <TouchableOpacity key={item.dateString} style={[styles.calendarCard, { backgroundColor: colors.backgroundSecondary, borderColor: colors.border }, isActive && { backgroundColor: colors.primary, borderColor: colors.primary }]} onPress={() => setSelectedDate(item.dateString)}>
              <Text style={[styles.calendarLabel, { color: colors.textSecondary }, isActive && { color: '#FFF', opacity: 0.9 }]}>{item.label}</Text>
              <Text style={[styles.calendarDayNum, { color: colors.textPrimary }, isActive && { color: '#FFFFFF' }]}>{item.dayNumber}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.eventsContainer}>
        <FlatList
          data={dayEvents}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={[styles.eventCard, { backgroundColor: colors.backgroundSecondary, borderColor: colors.border }]}>
              <View style={styles.eventContent}>
                <View style={styles.eventHeader}>
                  <Text style={[styles.eventTitle, { color: colors.textPrimary }]}>{item.title}</Text>
                  <TouchableOpacity onPress={() => deleteEvent(item.id)}><Trash2 size={14} color={colors.danger} /></TouchableOpacity>
                </View>
                <Text style={[styles.eventDesc, { color: colors.textSecondary }]}>{item.description}</Text>
                <View style={styles.eventFooter}>
                  <Clock size={12} color={colors.textLight} />
                  <Text style={[styles.timeText, { color: colors.textSecondary }]}>{item.time}</Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

// Mantenha os estilos (styles) anteriores de Appointments...
const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 24 },
  headerTitle: { fontSize: 24, fontWeight: 'bold' },
  headerSubtitle: { fontSize: 14, marginTop: 2 },
  calendarContainer: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 20 },
  calendarCard: { alignItems: 'center', paddingVertical: 10, paddingHorizontal: 8, borderRadius: 8, width: '13%', borderWidth: 1 },
  calendarLabel: { fontSize: 10, fontWeight: '600', marginBottom: 4 },
  calendarDayNum: { fontSize: 15, fontWeight: 'bold' },
  eventsContainer: { flex: 1, paddingHorizontal: 24 },
  eventCard: { flexDirection: 'row', borderRadius: 8, marginBottom: 12, borderWidth: 1, overflow: 'hidden' },
  eventContent: { flex: 1, padding: 14 },
  eventHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  eventTitle: { fontSize: 15, fontWeight: 'bold' },
  eventDesc: { fontSize: 13, marginTop: 4 },
  eventFooter: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 10 },
  timeText: { fontSize: 12 }
});