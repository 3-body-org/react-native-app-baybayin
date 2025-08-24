import React from "react";
import { Text, SafeAreaView, Button } from "react-native";
import Card from "../components/card";
import Container from "../components/container";    
import BackButton from "../components/back-button";


export default function LearnScreen( { navigation } ) {
    return (
        <SafeAreaView >
            <Container>
                <BackButton navigation={navigation}/>
                   

                <Card backgroundColor={"#fff"} >
                    <Text style={{ color: "#333", fontSize: 20, textAlign: "center" }}>
                        Iba pang mga kategorya
                    </Text>
                
                </Card>
            </Container>
            
     
        </SafeAreaView>
    );
    }