import React, { useCallback, useMemo, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Share,
} from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import Icon from "react-native-vector-icons/MaterialIcons";
import Card from "./card";

export default function CustomBottomSheet({
  isVisible,
  onClose,
  children,
  title,
  snapPoints = ["25%", "50%", "90%"],
  type = "default", // 'social' for social sharing
}) {
  const bottomSheetRef = useRef(null);

  // variables
  const snapPointsMemo = useMemo(() => snapPoints, [snapPoints]);

  const shareMessage = "Halina't aralin ang baybayin gamit ang app na ito!";

  // callbacks
  const handleSheetChanges = useCallback(
    (index) => {
      if (index === -1 && onClose) {
        onClose();
      }
    },
    [onClose],
  );

  const handleClose = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const handleSocialShare = useCallback(
    async (platform) => {
      try {
        const message = `${shareMessage}\n\nDownload: https://play.google.com/store/apps/details?id=com.baynolohiya`;

        const result = await Share.share({
          message: message,
          title: "Baynolohiya: Baybayin in Your Hands",
        });

        if (result.action === Share.sharedAction && onClose) {
          onClose();
        }
      } catch (error) {
        Alert.alert("Error", "Hindi ma-share sa social media. Subukan ulit.");
      }
    },
    [shareMessage, onClose],
  );

  if (!isVisible) return null;

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPointsMemo}
      onChange={handleSheetChanges}
      enablePanDownToClose={true}
      containerStyle={styles.zIndex2}
      backgroundStyle={styles.bottomSheetBackground}
      handleIndicatorStyle={styles.handleIndicator}
    >
      <BottomSheetView style={styles.contentContainer}>
        {title && (
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
          </View>
        )}
        <View style={styles.content}>
          {type === "social" ? (
            <View style={styles.socialContainer}>
              <Text style={styles.socialSubtitle}>
                Piliin ang social media platform
              </Text>

              <View style={styles.socialGrid}>
                <TouchableOpacity
                  onPress={() => handleSocialShare("facebook")}
                  style={styles.socialButton}
                >
                  <View style={[styles.socialIcon, { backgroundColor: "#1877F2" }]}>
                    <Icon name="facebook" size={24} color="#fff" />
                  </View>
                  <Text style={styles.socialText}>Facebook</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleSocialShare("twitter")}
                  style={styles.socialButton}
                >
                  <View style={[styles.socialIcon, { backgroundColor: "#1DA1F2" }]}>
                    <Icon name="alternate-email" size={24} color="#fff" />
                  </View>
                  <Text style={styles.socialText}>Twitter</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleSocialShare("instagram")}
                  style={styles.socialButton}
                >
                  <View style={[styles.socialIcon, { backgroundColor: "#E4405F" }]}>
                    <Icon name="camera-alt" size={24} color="#fff" />
                  </View>
                  <Text style={styles.socialText}>Instagram</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleSocialShare("whatsapp")}
                  style={styles.socialButton}
                >
                  <View style={[styles.socialIcon, { backgroundColor: "#25D366" }]}>
                    <Icon name="chat-bubble" size={24} color="#fff" />
                  </View>
                  <Text style={styles.socialText}>WhatsApp</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            children
          )}
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  handleIndicator: {
    backgroundColor: "#D1D5DB",
    width: 48,
    height: 4,
    borderRadius: 2,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#573826",
    textAlign: "center",
  },
  content: {
    flex: 1,
  },
  socialContainer: {
    paddingVertical: 16,
  },
  socialSubtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 32,
    fontWeight: "500",
  },
  socialGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 16,
  },
  socialButton: {
    alignItems: "center",
    width: "45%",
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  socialIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  socialText: {
    fontSize: 14,
    color: "#573826",
    fontWeight: "600",
  },
  zIndex2: {
    zIndex: 2,
    elevation: 2,
  },
});
