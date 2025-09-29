import { StyleSheet, Text, View } from 'react-native'
import { Stack, usePathname } from 'expo-router'
import React, { useEffect } from 'react'
import BackButton from "@components/back-button";
import SummaryResultButton from "@components/summary-result-button";
import * as NavigationBar from 'expo-navigation-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';  
import { GestureHandlerRootView } from "react-native-gesture-handler";


const RootLayout = () => {
  useEffect(() => {
   (async () => {
      await NavigationBar.setVisibilityAsync("hidden");
    })();
  }, []);
  

  return (
    <SafeAreaProvider>      
      <GestureHandlerRootView style={{ flex: 1 }}>
     <Stack>
      <Stack.Screen 
        name="index" 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="(learning)" 
        options={{
          title:"",
          headerLeft: () => <BackButton />,
          headerRight: () => {
            const pathname = usePathname();
            return pathname.includes('subukan-tab') ? <SummaryResultButton /> : null;
          },
          headerShadowVisible: false,
          headerStyle:{
            elevation:0,
            shadowOpacity:0,
          },
          headerTitleStyle:{
            color:"transparent",
          },  
        }} 
      />

      <Stack.Screen 
      name="(resources)/merch-screen"
      options={{
        title:"",
        headerLeft: () => <BackButton />,
        headerShadowVisible: false,
        headerStyle:{
          elevation:0,
          shadowOpacity:0,
        },
        headerTitleStyle:{
          color:"transparent",
        },  
      }}
      
      />
      <Stack.Screen name="(resources)/bill-screen" options={{
        title:"",
        headerLeft: () => <BackButton />,
        headerShadowVisible: false,
        headerStyle:{
          elevation:0,
          shadowOpacity:0,
        },
        headerTitleStyle:{
          color:"transparent",
        },  
      }}/>
    </Stack>

    </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}

export default RootLayout

const styles = StyleSheet.create({})