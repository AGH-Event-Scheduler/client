import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [inputText, setInputText] = useState('');
  const [displayText, setDisplayText] = useState('');

  const handleInputChange = (text: string): void => {
    setInputText(text);
  }

  const handleButtonPress = () => {
    setDisplayText(inputText);
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={handleInputChange}
        value={inputText}
        placeholder='Greet yourself!'
      />
      <Pressable
        style={styles.button}
        onPress={handleButtonPress}
      >
        <Text style={styles.buttonText}>
          Submit
        </Text>
      </Pressable>
      <Text style={styles.displayText}>
        Hello {!displayText ? 'World' : displayText}!
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20
  },
  displayText: {
    fontSize: 20,
  },
  button: {
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    elevation: 3,
    backgroundColor: 'white',
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
  },
  input: {
    width: '40%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
  }
});
