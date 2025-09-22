import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { appData } from '../data/lessons.js';

const LanguageSelectScreen = ({ navigation }) => {
  const languages = Object.keys(appData);

  return (
    <LinearGradient
      colors={['#6A1B9A', '#9B59B6']}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>Learn a New Language</Text>
      <Text style={styles.subtitle}>Choose your learning path below.</Text>
      
      <View style={styles.buttonContainer}>
        {languages.map((langId) => (
          <TouchableOpacity
            key={langId}
            style={styles.languageButton}
            onPress={() => navigation.navigate('Home', { langId })}
          >
            <Text style={styles.buttonText}>{appData[langId].language}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#E0E0E0',
    marginBottom: 40,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  languageButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent white
    width: '80%',
    paddingVertical: 20,
    borderRadius: 50,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '600',
  },
});

export default LanguageSelectScreen;