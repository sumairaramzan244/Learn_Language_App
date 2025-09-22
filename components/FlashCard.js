import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Flashcard = ({ word }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.englishText}>{word.english}</Text>
      <Text style={styles.translationText}>{word.translation}</Text>
      <Text style={styles.pronunciationText}>({word.pronunciation})</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#E1BEE7',
    width: '90%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
    padding: 20,
    marginBottom: 20,
  },
  englishText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A148C',
    textAlign: 'center',
    marginBottom: 10,
  },
  translationText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4A148C',
    textAlign: 'center',
  },
  pronunciationText: {
    fontSize: 18,
    color: '#7B1FA2',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default Flashcard;