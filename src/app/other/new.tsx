import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";

const New = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const url = "https://api.example.com/data";

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
    } catch (err: unknown) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Text>New</Text>
      <TouchableOpacity onPress={fetchData}>
        <Text>Fetch Data</Text>
      </TouchableOpacity>
    </View>
  );
};

export default New;
