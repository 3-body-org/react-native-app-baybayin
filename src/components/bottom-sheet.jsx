import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Share } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Card from './card';

export default function CustomBottomSheet({ 
  isVisible, 
  onClose, 
  children, 
  title,
  snapPoints = ['25%', '50%', '90%'],
  type = 'default' // 'social' for social sharing
}) {
  const bottomSheetRef = useRef(null);

  // variables
  const snapPointsMemo = useMemo(() => snapPoints, [snapPoints]);

  const shareMessage = "Halina't aralin ang baybayin gamit ang app na ito!";

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    if (index === -1 && onClose) {
      onClose();
    }
  }, [onClose]);

  const handleClose = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const handleSocialShare = useCallback(async (platform) => {
    try {
      const message = `${shareMessage}\n\nDownload: https://play.google.com/store/apps/details?id=com.baynolohiya`;
      
      const result = await Share.share({
        message: message,
        title: 'Baynolohiya: Baybayin in Your Hands',
      });

      if (result.action === Share.sharedAction && onClose) {
        onClose();
      }
    } catch (error) {
      Alert.alert('Error', 'Hindi ma-share sa social media. Subukan ulit.');
    }
  }, [shareMessage, onClose]);

  if (!isVisible) return null;

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPointsMemo}
      onChange={handleSheetChanges}
      enablePanDownToClose={true}
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
          {type === 'social' ? (
            <View style={{ paddingVertical: 10 }}>
              <Text style={{ fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 20 }}>
                Piliin ang social media platform
              </Text>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 30 }}>
                <TouchableOpacity 
                  onPress={() => handleSocialShare('facebook')}
                  style={styles.socialButton}
                >
                  <View style={[styles.socialIcon, { backgroundColor: '#1877F2' }]}>
                    <Icon name="facebook" size={30} color="#fff" />
                  </View>
                  <Text style={styles.socialText}>Facebook</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  onPress={() => handleSocialShare('twitter')}
                  style={styles.socialButton}
                >
                  <View style={[styles.socialIcon, { backgroundColor: '#1DA1F2' }]}>
                    <Icon name="alternate-email" size={30} color="#fff" />
                  </View>
                  <Text style={styles.socialText}>Twitter</Text>
                </TouchableOpacity>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 }}>
                <TouchableOpacity 
                  onPress={() => handleSocialShare('instagram')}
                  style={styles.socialButton}
                >
                  <View style={[styles.socialIcon, { backgroundColor: '#E4405F' }]}>
                    <Icon name="instagram" size={30} color="#fff" />
                  </View>
                  <Text style={styles.socialText}>Instagram</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  onPress={() => handleSocialShare('whatsapp')}
                  style={styles.socialButton}
                >
                  <View style={[styles.socialIcon, { backgroundColor: '#25D366' }]}>
                    <Icon name="chat" size={30} color="#fff" />
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
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  handleIndicator: {
    backgroundColor: '#D1D5DB',
    width: 40,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#573826',
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  socialButton: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  socialIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  socialText: {
    fontSize: 12,
    color: '#573826',
    fontWeight: '500',
  },
});
