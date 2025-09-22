import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, StatusBar } from 'react-native';
import { appData } from '../data/lessons.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const QuizScreen = ({ route, navigation }) => {
  const { langId, lessonId } = route.params;
  const lesson = appData[langId]?.lessons[lessonId];
  const translations = appData[langId]?.translations;
  const languageWords = Object.values(appData[langId]?.lessons || {}).flatMap(l => l.words);

  const [questions, setQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    if (!lesson || !translations) {
      Alert.alert("Error", "Lesson data not found.");
      navigation.goBack();
      return;
    }

    const quizQuestions = lesson.words.map(word => {
      const wrongAnswers = languageWords
        .filter(w => w.translation !== word.translation)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(w => w.translation);
      
      const options = [...wrongAnswers, word.translation];
      options.sort(() => 0.5 - Math.random());
      
      return {
        question: word.english,
        correctAnswer: word.translation,
        options,
      };
    });
    setQuestions(quizQuestions);
  }, [langId, lessonId]);

  const handleAnswer = (answer) => {
    if (showFeedback) return;

    setSelectedAnswer(answer);
    const correct = answer === questions[currentQIndex].correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);
    
    if (correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    setShowFeedback(false);
    setSelectedAnswer(null);

    if (currentQIndex === questions.length - 1) {
      saveScore(score);
      Alert.alert(
        translations.quizCompleteTitle,
        translations.quizCompleteMessage(score, questions.length),
        [{ text: translations.okButton, onPress: () => navigation.goBack() }]
      );
    } else {
      setCurrentQIndex(currentQIndex + 1);
    }
  };

  const saveScore = async (finalScore) => {
    try {
      const quizHistory = await AsyncStorage.getItem('quizHistory');
      const history = quizHistory ? JSON.parse(quizHistory) : [];
      const newEntry = {
        langId,
        lessonId,
        score: finalScore,
        total: questions.length,
        date: new Date().toISOString(),
      };
      history.push(newEntry);
      await AsyncStorage.setItem('quizHistory', JSON.stringify(history));
    } catch (e) {
      console.error("Failed to save quiz history", e);
    }
  };

  if (questions.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Preparing Quiz...</Text>
      </View>
    );
  }

  const currentQuestion = questions[currentQIndex];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>Quiz Time!</Text>
      <Text style={styles.questionText}>{currentQuestion.question}</Text>
      
      <View style={styles.optionsContainer}>
        {currentQuestion.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              showFeedback && selectedAnswer === option && (isCorrect ? styles.correctOption : styles.incorrectOption),
              showFeedback && option === currentQuestion.correctAnswer && styles.correctOption,
            ]}
            onPress={() => handleAnswer(option)}
            activeOpacity={0.7}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {showFeedback && (
        <View style={styles.feedbackContainer}>
          <Text style={[styles.feedbackText, isCorrect ? styles.correctText : styles.incorrectText]}>
            {isCorrect ? translations.correctFeedback : translations.incorrectFeedback}
            {!isCorrect && <Text style={styles.correctAnswerText}> {currentQuestion.correctAnswer}</Text>}
          </Text>
          <TouchableOpacity style={styles.nextButton} onPress={nextQuestion}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3E5F5',
    alignItems: 'center',
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A148C',
    marginBottom: 20,
  },
  questionText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  optionsContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  optionButton: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  optionText: {
    fontSize: 18,
    color: '#333333',
    textAlign: 'center',
    fontWeight: '500',
  },
  loadingText: {
    fontSize: 18,
    color: '#7f8c8d',
  },
  feedbackContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  feedbackText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  correctText: {
    color: '#28a745', // A vibrant green
  },
  incorrectText: {
    color: '#dc3545', // A strong red
  },
  correctAnswerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  correctOption: {
    backgroundColor: '#C8E6C9', // Lighter green for correct answer button
  },
  incorrectOption: {
    backgroundColor: '#F8D7DA', // Lighter red for incorrect answer button
  },
  nextButton: {
    backgroundColor: '#8E24AA',
    paddingVertical: 18,
    paddingHorizontal: 60,
    borderRadius: 30,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default QuizScreen;