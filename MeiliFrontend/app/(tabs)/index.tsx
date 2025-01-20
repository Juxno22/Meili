import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const App = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const searchMovies = async () => {
    try {
      const response = await axios.get(`http://192.168.1.32:3001/search?q=${query}`);
      setResults(response.data); // Guardar resultados
    } catch (error) {
      console.error('Error al buscar películas:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscador de Pelis</Text>
      <TextInput
        style={styles.input}
        placeholder="Pelicula"
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Buscar" onPress={searchMovies} />
      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text style={styles.movie}>{item.title}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    textAlign: 'center',
    margin: 20
  },
  input: {
    borderWidth: 2,
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    borderColor: 'black',
  },
  movie: {
    padding: 10,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  }
});

export default App;