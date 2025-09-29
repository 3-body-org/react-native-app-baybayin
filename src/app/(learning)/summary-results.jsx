import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

const SummaryResults = () => {
  const router = useRouter();
  const { mode, score, correctAnswers, totalQuestions } = useLocalSearchParams();

  // Mock data - replace with actual data from your state management
  const recentQuizzes = [
    { id: 1, score: 85, correct: 8, total: 10, date: 'Today' },
    { id: 2, score: 72, correct: 7, total: 10, date: 'Yesterday' },
    { id: 3, score: 90, correct: 9, total: 10, date: '2 days ago' },
  ];

  const averageScore = recentQuizzes.length > 0
    ? Math.round(recentQuizzes.reduce((sum, quiz) => sum + quiz.score, 0) / recentQuizzes.length)
    : 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Current Session Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Session</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{score || 0}</Text>
              <Text style={styles.statLabel}>Score</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>
                {totalQuestions ? Math.round((correctAnswers / totalQuestions) * 100) : 0}%
              </Text>
              <Text style={styles.statLabel}>Accuracy</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>
                {correctAnswers || 0}/{totalQuestions || 0}
              </Text>
              <Text style={styles.statLabel}>Correct</Text>
            </View>
          </View>
        </View>

        {/* Overall Performance */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overall Performance</Text>
          <View style={styles.overallStats}>
            <View style={styles.overallStat}>
              <Text style={styles.overallValue}>{averageScore}%</Text>
              <Text style={styles.overallLabel}>Average Score</Text>
            </View>
            <View style={styles.overallStat}>
              <Text style={styles.overallValue}>{recentQuizzes.length}</Text>
              <Text style={styles.overallLabel}>Quizzes Completed</Text>
            </View>
          </View>
        </View>

        {/* Recent Quiz History */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Quizzes</Text>
          {recentQuizzes.map((quiz) => (
            <View key={quiz.id} style={styles.quizItem}>
              <View style={styles.quizHeader}>
                <Text style={styles.quizDate}>{quiz.date}</Text>
                <Text style={styles.quizScore}>{quiz.score}%</Text>
              </View>
              <Text style={styles.quizDetails}>
                {quiz.correct}/{quiz.total} correct answers
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  headerRight: {
    width: 24, // Same as back button for balance
  },
  backButton: {
    padding: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  overallStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 20,
  },
  overallStat: {
    alignItems: 'center',
  },
  overallValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#573826',
    marginBottom: 4,
  },
  overallLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  quizItem: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  quizHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  quizDate: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  quizScore: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  quizDetails: {
    fontSize: 14,
    color: '#888',
  },
});

export default SummaryResults;
