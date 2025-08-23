import React from "react";
import { Text, SafeAreaView } from "react-native";
import Card from "../components/card";
import Container from "../components/container";    


export default function LearnScreen() {
    return (
        <SafeAreaView >
            <Container>
                <Card backgroundColor={"#fff"} >
                    <Text style={{ color: "#333", fontSize: 20, textAlign: "center" }}>
                        Iba pang mga kategorya
                    </Text>
                     <Text style={{ color: "#333", fontSize: 20, textAlign: "center" }}>
                        Iba pang mga kategorya
                    </Text>
                     <Text style={{ color: "#333", fontSize: 20, textAlign: "center" }}>
                        Iba pang mga kategorya
                    </Text>
                
                </Card>
            </Container>
            
     
        </SafeAreaView>
    );
    }