import react from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Undo2 } from "lucide-react-native";

export default function BackButton( { navigation } ) {
  // const navigation = useNavigation();
  return (
    <TouchableOpacity 
     onPress={() => navigation.navigate("HomeScreen")} 
     style={styles.backButton}>
      <View>

        <Undo2 size={16} color="#573826" style={{ marginRight: 5 }} />
        <Text>Bumalik</Text>
      </View>
        
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backButton: {
    // margin: 10,
    alignSelf: "flex-start",
    paddingVertical: 10,
    paddingHorizontal: 25,
    backgroundColor: "#F1E3DA",
    borderColor: "#573826",
    borderWidth: 1.5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,       
    }
});


