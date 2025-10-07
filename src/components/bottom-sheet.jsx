import React, { useCallback, useMemo, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Share,
  Clipboard,
  ScrollView,
} from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import Icon from "react-native-vector-icons/MaterialIcons";
import Card from "./card";

export default function CustomBottomSheet({
  isVisible,
  onClose,
  children,
  title,
  snapPoints = ["50%"],
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
    [onClose]
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
    [shareMessage, onClose]
  );

  const handleCopyLink = useCallback(async () => {
    const link =
      "https://play.google.com/store/apps/details?id=com.baynolohiya";
    await Clipboard.setString(link);
    Alert.alert("Copied!", "Link copied to clipboard.");
  }, []);

  if (!isVisible) return null;

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPointsMemo}
      onChange={handleSheetChanges}
      enablePanDownToClose={true}
      enableOverDrag={false}
      containerStyle={styles.zIndex2}
      backgroundStyle={styles.bottomSheetBackground}
      handleIndicatorStyle={styles.handleIndicator}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View style={styles.content}>
          {type === "social" ? (
            <View style={styles.socialContainer}>
              <Text style={styles.socialTitle}>Social Share</Text>
              <Text style={styles.socialSubtitle}>Share this link via</Text>

              <View style={styles.socialGrid}>
                <TouchableOpacity
                  onPress={() => handleSocialShare("facebook")}
                  style={styles.socialButton}
                >
                  <View
                    style={[styles.socialIcon, { backgroundColor: "#1877F2" }]}
                  >
                    <Icon name="facebook" size={24} color="#fff" />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleSocialShare("twitter")}
                  style={styles.socialButton}
                >
                  <View
                    style={[styles.socialIcon, { backgroundColor: "#1DA1F2" }]}
                  >
                    <Icon name="alternate-email" size={24} color="#fff" />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleSocialShare("instagram")}
                  style={styles.socialButton}
                >
                  <View
                    style={[styles.socialIcon, { backgroundColor: "#E4405F" }]}
                  >
                    <Icon name="camera-alt" size={24} color="#fff" />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleSocialShare("whatsapp")}
                  style={styles.socialButton}
                >
                  <View
                    style={[styles.socialIcon, { backgroundColor: "#25D366" }]}
                  >
                    <Icon name="chat-bubble" size={24} color="#fff" />
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.copyLinkSection}>
                <Text style={styles.copyLinkTitle}>Copy link</Text>
                <View style={styles.linkInputContainer}>
                  <Icon
                    name="insert-link"
                    size={20}
                    color="#6B7280"
                    style={styles.linkIcon}
                  />
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.scrollView}
                  >
                    <TextInput
                      style={styles.linkInput}
                      value="https://play.google.com/store/apps/details?id=com.baynolohiya"
                      editable={false}
                    />
                  </ScrollView>
                </View>
                <TouchableOpacity
                  onPress={handleCopyLink}
                  style={styles.copyBtn}
                >
                  <Text style={styles.copyBtnText}>Copy</Text>
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
    backgroundColor: "#573826",
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
  socialTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#573826",
    textAlign: "left",
    marginBottom: 8,
  },
  socialSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "left",
    marginBottom: 16,
    fontWeight: "500",
  },
  copyLinkSection: {
    marginTop: 24,
  },
  copyLinkTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#573826",
    marginBottom: 8,
  },
  linkInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#573826",
    borderRadius: 8,
    backgroundColor: "#F9FAFB",
    marginBottom: 8,
  },
  linkIcon: {
    marginLeft: 12,
    marginRight: 8,
  },
  scrollView: {
    flex: 1,
  },
  linkInput: {
    paddingVertical: 12,
    paddingRight: 12,
    fontSize: 14,
    color: "#573826",
    minWidth: 200, // ensure it's scrollable
  },
  copyBtn: {
    backgroundColor: "#573826",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  copyBtnText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "600",
  },
  socialGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  socialButton: {
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  socialIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  zIndex2: {
    zIndex: 2,
    elevation: 2,
  },
});
