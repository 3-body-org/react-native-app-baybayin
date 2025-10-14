import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { getQuizResults } from "../../data/quiz-results";
import Container from "../../components/container";

const SummaryResults = () => {
  const router = useRouter();
  const { mode, score, correctAnswers, totalQuestions } =
    useLocalSearchParams();
  const [recentQuizzes, setRecentQuizzes] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const results = await getQuizResults();
      setRecentQuizzes(results);
    };

    fetchResults();
  }, []);

  const averageScore =
    recentQuizzes.length > 0
      ? Math.round(
          recentQuizzes.reduce((sum, quiz) => sum + quiz.score, 0) /
            recentQuizzes.length
        )
      : 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Buod ng Resulta</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.container}>
        <Container>
          {/* Current Session Stats */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Huling Resulta</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <View style={styles.statIconContainer}>
                  <Text style={styles.statIcon}>⭐</Text>
                </View>
                <Text style={styles.statValue}>{score || 0}</Text>
                <Text style={styles.statLabel}>Iskor</Text>
              </View>
              <View style={styles.statCard}>
                <View style={styles.statIconContainer}>
                  <Text style={styles.statIcon}>🎯</Text>
                </View>
                <Text style={styles.statValue}>
                  {totalQuestions
                    ? Math.round((correctAnswers / totalQuestions) * 100)
                    : 0}
                  %
                </Text>
                <Text style={styles.statLabel}>kawastuhan</Text>
              </View>
              <View style={styles.statCard}>
                <View style={styles.statIconContainer}>
                  <Text style={styles.statIcon}>✅</Text>
                </View>
                <Text style={styles.statValue}>
                  {correctAnswers || 0}/{totalQuestions || 0}
                </Text>
                <Text style={styles.statLabel}>Tamang Nasagot</Text>
              </View>
            </View>
          </View>

          {/* Overall Performance */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Kabuuang Kakayahan</Text>
            <View style={styles.overallStats}>
              <View style={styles.overallStat}>
                <Text style={styles.overallValue}>{averageScore}%</Text>
                <Text style={styles.overallLabel}>Average na Iskor</Text>
              </View>
              <View style={styles.overallStat}>
                <Text style={styles.overallValue}>{recentQuizzes.length}</Text>
                <Text style={styles.overallLabel}>Mga Quiz na Nakumpleto</Text>
              </View>
            </View>
          </View>

          {/* Recent Quiz History */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Mga Kamakailang Quiz</Text>
            {recentQuizzes.length > 0 ? (
              recentQuizzes.map((quiz, index) => (
                <View key={index} style={styles.quizItem}>
                  <Text style={styles.quizDate}>
                    {new Date(quiz.date).toLocaleDateString()}
                  </Text>
                  <View style={styles.quizStatsGrid}>
                    <View style={styles.quizStat}>
                      <Text style={styles.quizStatIcon}>⭐</Text>
                      <Text style={styles.quizStatValue}>{quiz.score}</Text>
                      <Text style={styles.quizStatLabel}>Iskor</Text>
                    </View>
                    <View style={styles.quizStat}>
                      <Text style={styles.quizStatIcon}>✅</Text>
                      <Text style={styles.quizStatValue}>
                        {quiz.correctAnswers}/{quiz.totalQuestions}
                      </Text>
                      <Text style={styles.quizStatLabel}>Tamang Nasagot</Text>
                    </View>
                    <View style={styles.quizStat}>
                      <Text style={styles.quizStatIcon}>❤️</Text>
                      <Text style={styles.quizStatValue}>{quiz.lives}</Text>
                      <Text style={styles.quizStatLabel}>Natitirang Buhay</Text>
                    </View>
                  </View>
                </View>
              ))
            ) : (
              <Text style={styles.noQuizzesText}>
                Wala pang mga resulta ng quiz. Maglaro ng quiz upang makita ang
                iyong progreso!
              </Text>
            )}
          </View>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 15,
    marginTop: 15,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: "#FEF3EC",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#573826",
  },
  headerRight: {
    width: 24,
  },
  backButton: {
    padding: 4,
  },
  container: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#573826",
    marginBottom: 16,
    alignSelf: "flex-start",
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FEF3EC",
    borderRadius: 16,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#573826",
  },
  statIconContainer: {
    marginBottom: 8,
  },
  statIcon: {
    fontSize: 24,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#573826",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: "#8B4513",
    textAlign: "center",
    fontWeight: "500",
  },
  overallStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#FEF3EC",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#573826",
  },
  overallStat: {
    alignItems: "center",
  },
  overallValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#573826",
    marginBottom: 4,
  },
  overallLabel: {
    fontSize: 14,
    color: "#8B4513",
    textAlign: "center",
    fontWeight: "500",
  },
  quizItem: {
    backgroundColor: "#FEF3EC",
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: "#573826",
  },
  quizDate: {
    fontSize: 14,
    color: "#8B4513",
    fontWeight: "500",
    marginBottom: 12,
  },
  quizStatsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  quizStat: {
    flex: 1,
    alignItems: "center",
  },
  quizStatIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  quizStatValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#573826",
    marginBottom: 2,
  },
  quizStatLabel: {
    fontSize: 12,
    color: "#8B4513",
    textAlign: "center",
    fontWeight: "500",
  },
  noQuizzesText: {
    textAlign: "center",
    color: "#8B4513",
    marginTop: 20,
    fontSize: 16,
    fontWeight: "500",
  },
});

export default SummaryResults;
