import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Animated,
  TouchableOpacity 
} from 'react-native';

const AchievementBadge = ({ 
  achievement, 
  onPress,
  size = 'medium' 
}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const getSizeStyle = () => {
    switch (size) {
      case 'small':
        return styles.small;
      case 'large':
        return styles.large;
      default:
        return styles.medium;
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'small':
        return 20;
      case 'large':
        return 40;
      default:
        return 30;
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'small':
        return 10;
      case 'large':
        return 16;
      default:
        return 12;
    }
  };

  const getTitleSize = () => {
    switch (size) {
      case 'small':
        return 12;
      case 'large':
        return 18;
      default:
        return 14;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, getSizeStyle()]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Animated.View
        style={[
          styles.badge,
          {
            transform: [
              { scale: scaleAnim },
              {
                rotate: rotateAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg'],
                }),
              },
            ],
          },
        ]}
      >
        <Text style={[styles.icon, { fontSize: getIconSize() }]}>
          {achievement.icon}
        </Text>
        
        <View style={styles.textContainer}>
          <Text style={[styles.title, { fontSize: getTitleSize() }]}>
            {achievement.title}
          </Text>
          <Text style={[styles.description, { fontSize: getTextSize() }]}>
            {achievement.description}
          </Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 8,
  },
  small: {
    width: 120,
  },
  medium: {
    width: 150,
  },
  large: {
    width: 200,
  },
  badge: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  icon: {
    marginBottom: 8,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
  },
  description: {
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
  },
});

export default AchievementBadge;
