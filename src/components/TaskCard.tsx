import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Appointment } from '../types';
import { useAppTheme } from '../hooks/useTheme';
import { Calendar, Clock, AlertCircle } from 'lucide-react-native';

interface TaskCardProps {
  item: Appointment;
}

export const TaskCard: React.FC<TaskCardProps> = ({ item }) => {
  const { currentTheme } = useAppTheme();
  const { colors, borderRadius } = currentTheme;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH':
        return colors.danger;

      case 'MEDIUM':
        return colors.warning;

      default:
        return colors.success;
    }
  };

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.backgroundSecondary,
          borderColor: colors.border,
          shadowColor: colors.shadow,
        },
      ]}
    >
      {/* HEADER */}
      <View style={styles.cardHeader}>
        <Text
          style={[
            styles.title,
            {
              color: colors.textPrimary,
            },
          ]}
        >
          {item.title}
        </Text>

        <View
          style={[
            styles.priorityBadge,
            {
              backgroundColor:
                getPriorityColor(item.priority) + '15',
              borderRadius: borderRadius.small,
            },
          ]}
        >
          <AlertCircle
            size={12}
            color={getPriorityColor(item.priority)}
          />

          <Text
            style={[
              styles.priorityText,
              {
                color: getPriorityColor(item.priority),
                marginLeft: 4,
              },
            ]}
          >
            {item.priority}
          </Text>
        </View>
      </View>

      {/* DESCRIPTION */}
      {item.description ? (
        <Text
          style={[
            styles.description,
            {
              color: colors.textSecondary,
            },
          ]}
          numberOfLines={2}
        >
          {item.description}
        </Text>
      ) : null}

      {/* FOOTER */}
      <View style={styles.cardFooter}>
        {/* DATE */}
        <View style={styles.metaInfo}>
          <Calendar
            size={14}
            color={colors.textLight}
          />

          <Text
            style={[
              styles.metaText,
              {
                color: colors.textSecondary,
                marginLeft: 4,
              },
            ]}
          >
            {item.date}
          </Text>
        </View>

        {/* TIME */}
        <View style={styles.metaInfo}>
          <Clock
            size={14}
            color={colors.textLight}
          />

          <Text
            style={[
              styles.metaText,
              {
                color: colors.textSecondary,
                marginLeft: 4,
              },
            ]}
          >
            {item.time}
          </Text>
        </View>

        {/* CATEGORY */}
        <View
          style={[
            styles.categoryBadge,
            {
              backgroundColor:
                colors.backgroundPrimary,
              borderRadius: borderRadius.small,
            },
          ]}
        >
          <Text
            style={[
              styles.categoryText,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            {item.category}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
    borderRadius: 8,
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 8,
  },

  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  priorityText: {
    fontSize: 10,
    fontWeight: 'bold',
  },

  description: {
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
  },

  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },

  metaText: {
    fontSize: 12,
  },

  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 'auto',
  },

  categoryText: {
    fontSize: 10,
    fontWeight: '600',
  },
});