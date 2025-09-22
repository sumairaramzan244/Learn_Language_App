import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { appData } from '../data/lessons.js';

const HomeScreen = ({ route, navigation }) => {
  const { langId } = route.params;
  const languageData = appData[langId];

  if (!languageData) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.listContainer}>
        {Object.keys(languageData.lessons).map((lessonId) => {
          const lesson = languageData.lessons[lessonId];
          return (
            <TouchableOpacity
              key={lessonId}
              style={styles.lessonButton}
              onPress={() => navigation.navigate('Lesson', { langId, lessonId })}
            >
              <Text style={styles.lessonTitle}>{lesson.title}</Text>
              <Text style={styles.lessonDescription}>{lesson.description}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3E5F5', // A soft, light purple background
    paddingTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 20,
    color: '#7f8c8d',
  },
  listContainer: {
    width: '100%',
    paddingHorizontal: 15,
  },
  lessonButton: {
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
  },
  lessonTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6A1B9A', // Matches the header
  },
  lessonDescription: {
    fontSize: 16,
    color: '#757575',
    marginTop: 8,
  },
});

export default HomeScreen;