import React from "react";
import { Text, SafeAreaView, ScrollView, View, Image } from "react-native";
import Card from "../components/card";
import Container from "../components/container";
import BackButton from "../components/back-button";
import lessonContent from "../data/lesson-data";

export default function LessonScreen() {
  return (
    <SafeAreaView style={{ flex: 1 , backgroundColor: 'white'}}>
      <Container>

        <BackButton />
      
          <Card backgroundColor={"#573826"}>
            <Text
              style={{
                color: "#ffffff",
                fontSize: 20,
                textAlign: 'start',
              }}
            >
              {lessonContent[0]} 
            </Text>
          </Card>

          <ScrollView 
  showsVerticalScrollIndicator={false}
  style={{
    borderRadius: 10,
  }}
  contentContainerStyle={{ 
    flexGrow: 1,
    paddingBottom: 50,
    
  }}
>
          <Card backgroundColor={"#FEF3EC"}
            style={{
              borderColor: '#5c3219',
            }}

          >
            {lessonContent.slice(1).map((item, index) => {
              if (typeof item === "string") {
                return (
                  <Text 
                    key={index}
                    style={{
                      color: "#5c3219",
                      fontSize: 16,
                      marginBottom: 15,
                      lineHeight: 24,
                      textAlign: 'justify',
                      
                    }}
                  >
                    {item}
                  </Text>
                );
              }
              return (
                <View
                  key={index}
                  style={{
                    width: "100%",
                    aspectRatio: 1.6, // reasonable default, can be adjusted
                    borderRadius: 8,
                    overflow: "hidden",
                  }}
                >
                  <Image
                    source={item.src}
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                    resizeMode="contain"
                  />
                </View>
              );
            })}
          </Card>
      </ScrollView>

      </Container>
    </SafeAreaView>
  );
}