import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, StatusBar } from 'react-native';
import { appData } from '../data/lessons.js';
import Flashcard from '../components/FlashCard.js';

const LessonScreen = ({ route, navigation }) => {
  const { langId, lessonId } = route.params;
  const lesson = appData[langId].lessons[lessonId];
  const translations = appData[langId].translations;

  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const nextCard = () => {
    if (currentCardIndex < lesson.words.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      Alert.alert(
        translations.lessonCompleteTitle,
        translations.lessonCompleteMessage,
        [
          { text: translations.notYetButton, style: 'cancel' },
          { text: translations.goQuizButton, onPress: () => navigation.navigate('Quiz', { langId, lessonId }) },
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>{lesson.title}</Text>
      <Text style={styles.progressText}>
        Card {currentCardIndex + 1} of {lesson.words.length}
      </Text>
      
      <Flashcard word={lesson.words[currentCardIndex]} />
      
      <TouchableOpacity style={styles.nextButton} onPress={nextCard}>
        <Text style={styles.buttonText}>{translations.nextCardButton}</Text>
      </TouchableOpacity>
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
    marginBottom: 10,
    textAlign: 'center',
  },
  progressText: {
    fontSize: 18,
    color: '#888',
    marginBottom: 20,
    fontWeight: '500',
  },
  flashcardContainer: {
    width: '100%',
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#8E24AA',
    paddingVertical: 18,
    paddingHorizontal: 60,
    borderRadius: 30,
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LessonScreen;