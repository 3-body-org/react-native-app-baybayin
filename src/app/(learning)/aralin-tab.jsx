import React, { useState } from "react";
import { ScrollView, Text, StyleSheet, Image, View, TouchableOpacity, Modal, Dimensions, TouchableHighlight } from "react-native";
import Card from "@components/card";
import { lessonModules } from "@data/lesson-data";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import SectionHeader from "@components/section-header";


const { width } = Dimensions.get('window');

export default function AralinTab() {
  const [selectedModule, setSelectedModule] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [titleWidth, setTitleWidth] = useState(0);

  const insets = useSafeAreaInsets();

  const openLessonDetail = (moduleId) => {
    setSelectedModule(moduleId);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedModule(null);
  };

  const renderLessonCard = (module) => (
    <TouchableOpacity
      key={module.id}
      onPress={() => openLessonDetail(module.id)}
      activeOpacity={.8}
      statusbarTranslucent={true}
      navigationBarTranslucent={true}
    >
      <Card  style={styles.lessonCard}>
        <View style={styles.lessonHeader}>
          <View style={styles.iconContainer}>
            <Text style={styles.lessonIcon}>{module.icon}</Text>
          </View>
          <View style={styles.lessonInfo}>
            <Text style={styles.lessonTitle}>{module.title}</Text>
            <Text style={styles.lessonDescription}>{module.description}</Text>
          </View>
        </View>
        <View style={styles.learnMoreContainer}>
          <Text style={styles.tapToLearn}>Tap to learn</Text>
          <Text style={styles.arrowIcon}>→</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );

  const renderLessonDetail = () => {
    if (!selectedModule) return null;
    
    const module = lessonModules[selectedModule];
    if (!module) return null;

    return (
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}
        paddingTop={insets.top}
        >
          <SafeAreaView style={styles.modalContainer}i
          >
          {/* <View style={styles.modalContainer}> */}
            <View style={styles.modalHeader}>
              <View style={styles.titleContainer}>
                <Text style={styles.modalTitle}>{module.title}</Text>
              </View>
              <TouchableOpacity 
                onPress={closeModal} 
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView 
              style={styles.modalContent}
              showsVerticalScrollIndicator={false}
            >
              {/* Content Section */}
              {module.content && (
                <View style={styles.section}>
                  <SectionHeader title={module.contentTitle}/>
                  {module.content.map((item, index) => {
                    if (typeof item === "string") {
                      return (
                        <Text key={index} style={styles.contentText}>{item}</Text>
                      );
                    } else if (item.type === "image") {
                      return (
                        <View key={index} style={styles.imageContainer}>
                          <Image source={item.src} style={styles.contentImage} resizeMode="contain" />
                        </View>
                      );
                    }
                    return null;
                  })}
                </View>
              )}

              {/* Characters Section */}
              {module.characters && (
                <View style={styles.section}>
                  <SectionHeader title={"Characters"}/>
                  <View style={styles.charactersGrid}>
                    {module.characters.map((char, index) => (
                      <View key={index} style={styles.characterItem}>
                        <View style={styles.baybayinCharContainer}>
                          <Text style={styles.baybayinChar}>{char.baybayin}</Text>
                        </View>
                        <View style={styles.characterInfo}>
                          <Text style={styles.latinText}>{char.latin}</Text>
                          <Text style={styles.pronunciationText}>{char.pronunciation}</Text>
                          <Text style={styles.descriptionText}>{char.description}</Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {/* Examples Section */}
              {module.examples && (
                <View style={styles.section}>
                  <SectionHeader title={"Halimbawa"}/>
                  {module.examples.map((example, index) => (
                    <View key={index} style={styles.exampleItem}>
                      <View style={styles.baybayinExampleContainer}>
                        <Text style={styles.baybayinExample}>{example.baybayin}</Text>
                      </View>
                      <View style={styles.exampleInfo}>
                        <Text style={styles.latinExample}>{example.latin}</Text>
                        <Text style={styles.meaningText}>{example.meaning}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </ScrollView>
          </SafeAreaView>
          {/* </View> */}
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.pageTitle}>Baybayin Lessons</Text>
          <Text style={styles.pageSubtitle}>Choose a module to start learning</Text>
        </View>
        
        <View style={styles.cardsContainer}>
          {Object.values(lessonModules).map(renderLessonCard)}
        </View>
      </ScrollView>
      
      {renderLessonDetail()}
    </View>
  );
}

const styles = StyleSheet.create({
  // ===== MAIN CONTAINER STYLES =====
  container: { 
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: { 
    padding: 10,
    paddingBottom: 30,
  },
  
  // ===== HEADER STYLES =====
  headerContainer: {
    marginBottom: 16,
    alignItems: "center",
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "#573826",
    textAlign: "center",
    marginBottom: 8,
  },
  pageSubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 15,
  },
  
  // ===== CARD STYLES =====
  cardsContainer: {
    marginTop: 8,
  },
  lessonCard: {

    marginVertical: 10,
    padding: 20,
    borderRadius: 16,
    backgroundColor: "#FEF3EC",
    shadowColor: "#573826",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 4,
    elevation: 3,
  },
  lessonHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  iconContainer: {
    backgroundColor: "#F5E6D3",
    borderRadius: 12,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  lessonIcon: {
    fontSize: 32,
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#573826",
    marginBottom: 6,
  },
  lessonDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  learnMoreContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  tapToLearn: {
    fontSize: 14,
    color: "#573826",
    fontWeight: "600",
    marginRight: 8,
  },
  arrowIcon: {
    fontSize: 16,
    color: "#573826",
    fontWeight: "bold",
  },
  // ===== MODAL STYLES =====
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    flex: 1,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 24,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#FEF3EC",
    borderBottomWidth: 1,
    borderBottomColor: "#E8D5C2",
  },
  titleContainer: {
    flex: 1,
    marginRight: 10,
  },
  modalTitle: {
    fontSize: 25,
    fontWeight: "700",
    color: "#573826",
    letterSpacing: -0.5,
  },
  closeButton: {
    backgroundColor: "#573826",
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  // ===== SECTION STYLES =====
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    marginBottom: 24,
  },
  charactersGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginHorizontal: -8,
  },
  // ===== CHARACTER STYLES =====
  characterItem: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEF3EC",
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  baybayinCharContainer: {
    backgroundColor: "#F5E6D3",
    borderRadius: 16,
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  baybayinChar: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#573826",
  },
  characterInfo: {
    flex: 1,
  },
  latinText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#573826",
    marginBottom: 6,
  },
  pronunciationText: {
    fontSize: 16,
    color: "#666",
    fontStyle: "italic",
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: "#888",
    lineHeight: 20,
  },
  // ===== EXAMPLE STYLES =====
  exampleItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5E6D3",
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  baybayinExampleContainer: {
    backgroundColor: "#FEF3EC",
    borderRadius: 12,
    width: 130,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  baybayinExample: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#573826",
  },
  exampleInfo: {
    flex: 1,
  },
  latinExample: {
    fontSize: 18,
    fontWeight: "700",
    color: "#573826",
    marginBottom: 6,
  },
  meaningText: {
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
  },
  // ===== CONTENT TEXT STYLES =====
  contentText: {
    fontSize: 16,
    lineHeight: 26,
    color: "#333",
    textAlign: "justify",
    marginBottom: 20,
  },
  
  // ===== IMAGE STYLES =====
  imageContainer: {
    backgroundColor: "#FEF3EC",
    borderRadius: 16,
    padding: 16,
    marginVertical: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  contentImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
  },
});