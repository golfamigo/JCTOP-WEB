import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useAuthStore } from '../../stores/authStore';
import { StatusBar } from 'expo-status-bar';

export default function AuthCallbackScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { setToken, setUser, fetchProfile } = useAuthStore();

  useEffect(() => {
    handleOAuthCallback();
  }, []);

  const handleOAuthCallback = async () => {
    try {
      // Get token from URL parameters
      const token = params.token as string;
      const error = params.error as string;

      if (error) {
        console.error('OAuth error:', error);
        // Redirect to login with error message
        router.replace({
          pathname: '/auth/login',
          params: { error: 'Google 登入失敗，請重試' }
        });
        return;
      }

      if (token) {
        // Store the token
        await setToken(token);
        
        // Fetch user profile
        await fetchProfile();
        
        // Get return URL from sessionStorage (web only)
        let returnUrl = '/(tabs)/events';
        if (typeof window !== 'undefined' && window.sessionStorage) {
          const storedUrl = sessionStorage.getItem('authReturnUrl');
          if (storedUrl && storedUrl !== '/auth/login' && storedUrl !== '/auth/callback') {
            returnUrl = storedUrl;
          }
          sessionStorage.removeItem('authReturnUrl');
        }
        
        // Redirect to home or return URL
        router.replace(returnUrl);
      } else {
        // No token received
        router.replace({
          pathname: '/auth/login',
          params: { error: '登入失敗，請重試' }
        });
      }
    } catch (error) {
      console.error('Error handling OAuth callback:', error);
      router.replace({
        pathname: '/auth/login',
        params: { error: '登入處理失敗，請重試' }
      });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ActivityIndicator size="large" color="#2563EB" />
      <Text style={styles.text}>正在完成登入...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    color: '#64748B',
  },
});