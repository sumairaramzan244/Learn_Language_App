import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LanguageSelectScreen from './screens/LanguageSelectScreen';
import HomeScreen from './screens/HomeScreen';
import LessonScreen from './screens/LessonScreen';
import QuizScreen from './screens/QuizScreen';
import { appData } from './data/lessons.js';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="LanguageSelect"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#6A1B9A', // A rich, deep purple for a more premium feel
          },
          headerTintColor: '#FFFFFF', // White text for headers
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="LanguageSelect" component={LanguageSelectScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Lessons' }} />
        <Stack.Screen name="Lesson" component={LessonScreen} options={({ route }) => ({ title: appData[route.params.langId].lessons[route.params.lessonId].title })} />
        <Stack.Screen name="Quiz" component={QuizScreen} options={{ title: 'Take a Quiz' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;