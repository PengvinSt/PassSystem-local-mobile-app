import { Button, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import axios from 'axios';

const SERVER_URL = 'http://localhost:3001/api';

const serverConnection = axios.create({
  baseURL: SERVER_URL,
});
const getPassData = async (uuid:string, token:string) => {
  try {
    await serverConnection.post("/verify", { uuid, token })
  } catch (error) {
    console.error(error)
  }
}
type ComponentProps = {
  uuid: string,
  token: string
}

const TabOneScreen: React.FC<ComponentProps> = ({uuid, token}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Press Button to pass:</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Button title='Pass!' color="#fff" onPress={()=> {getPassData(uuid, token)}}/>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}

export default TabOneScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});