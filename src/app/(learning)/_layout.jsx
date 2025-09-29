import React from 'react';
import { Slot, usePathname } from 'expo-router';
import TabNavigator from '@components/tab-navigation';

export default function LearningLayout() {
  const pathname = usePathname();
  const isQuizScreen = pathname.includes('latin-to-baybayin') || 
                    pathname.includes('baybayin-to-latin') || 
                    pathname.includes('summary-results');
  return (
    <>
      {!isQuizScreen && <TabNavigator />}
      <Slot/>
    </>
  );
}

