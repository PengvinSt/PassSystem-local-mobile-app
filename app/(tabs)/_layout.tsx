import React, { useEffect, useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { Entypo } from '@expo/vector-icons';
import LoginForm from './LoginForm';
import TabOneScreen from '.';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const [uuid, setUuid] = useState<string>()
  const [token, setToken] = useState<string>()
  const [isAuth, setIsAuth] = useState<boolean>(false)
  const colorScheme = useColorScheme();
  const handleLogin = (uuid: string, token: string) => {
    console.log({uuid, token})
    setUuid(uuid);
    setToken(token);
    setIsAuth(true);
  };
  if (!isAuth) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <TabOneScreen uuid={uuid ?? ""} token={token ?? ""}/>
  );
}
