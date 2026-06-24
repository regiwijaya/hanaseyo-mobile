import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ActivityScreen } from "../screens/ActivityScreen";
import { HiraganaChartScreen } from "../screens/HiraganaChartScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { KatakanaChartScreen } from "../screens/KatakanaChartScreen";
import { LessonListScreen } from "../screens/LessonListScreen";
import { LettersHomeScreen } from "../screens/LettersHomeScreen";
import { LevelListScreen } from "../screens/LevelListScreen";
import { SoloScreen } from "../screens/SoloScreen";
import { colors } from "../theme/colors";
import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerShadowVisible: false,
          headerTitleStyle: {
            fontWeight: "700",
            color: colors.text,
          },
          contentStyle: {
            backgroundColor: colors.background,
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Hanaseyo" }}
        />

        <Stack.Screen
          name="Solo"
          component={SoloScreen}
          options={{ title: "Mode Solo" }}
        />

        <Stack.Screen
          name="LevelList"
          component={LevelListScreen}
          options={{ title: "Pilih Level" }}
        />

        <Stack.Screen
          name="LettersHome"
          component={LettersHomeScreen}
          options={{ title: "Belajar Huruf Jepang" }}
        />

        <Stack.Screen
          name="LessonList"
          component={LessonListScreen}
          options={{ title: "Daftar Lesson" }}
        />

        <Stack.Screen
          name="Activity"
          component={ActivityScreen}
          options={{ title: "Belajar" }}
        />

        <Stack.Screen
          name="HiraganaChart"
          component={HiraganaChartScreen}
          options={{ title: "Tabel Hiragana" }}
        />

        <Stack.Screen
          name="KatakanaChart"
          component={KatakanaChartScreen}
          options={{ title: "Tabel Katakana" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}