import React, { useState, useMemo } from "react";
import {
  View,
  Image,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const ImageModal = ({ isVisible, onClose, imageSource }) => {
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const isImageLoading = imageSize.width === 0 && imageSize.height === 0;

  const onImageLoad = (event) => {
    const { width, height } = event.nativeEvent.source;
    setImageSize({ width, height });
  };

  const imageContainerStyle = useMemo(() => {
    const maxWidth = SCREEN_WIDTH * 0.9;
    const maxHeight = SCREEN_HEIGHT * 0.8;

    if (imageSize.width === 0 || imageSize.height === 0) {
      return { width: maxWidth, height: maxWidth };
    }

    const ratio = Math.min(
      maxWidth / imageSize.width,
      maxHeight / imageSize.height,
    );

    return {
      width: imageSize.width * ratio,
      height: imageSize.height * ratio,
    };
  }, [imageSize]);

  return (
    <Modal
      animationType="fade"
      transparent
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.modalBackground} />
        </TouchableWithoutFeedback>

        <View style={[styles.modalContainer, imageContainerStyle]}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            activeOpacity={0.7}
          >
            <Ionicons name="close" size={24} color="#fff" />
          </TouchableOpacity>
          <Image
            source={imageSource}
            style={styles.modalImage}
            resizeMode="contain"
            onLoad={onImageLoad}
          />
          {isImageLoading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="#fff" />
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
  },
  modalImage: {
    width: "100%",
    height: "100%",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
});

ImageModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  imageSource: PropTypes.oneOfType([
    PropTypes.shape({
      uri: PropTypes.string,
      headers: PropTypes.objectOf(PropTypes.string),
    }),
    PropTypes.number,
    PropTypes.arrayOf(
      PropTypes.shape({
        uri: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number,
        headers: PropTypes.objectOf(PropTypes.string),
      }),
    ),
  ]).isRequired,
};

export default React.memo(ImageModal);
