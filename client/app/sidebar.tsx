import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView, Animated, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const router = useRouter();

  const profile = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    image: 'https://via.placeholder.com/100', // Replace with dynamic user image URL
  };

  const slideAnim = new Animated.Value(-300); // Initial position off the screen

  // Animation to slide the sidebar in or out
  React.useEffect(() => {
    if (isOpen) {
      Animated.timing(slideAnim, {
        toValue: 0, // Slide to the left of the screen (0 means fully visible)
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -300, // Slide out the sidebar (off the screen)
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isOpen]);

  const navigateAndClose = (route: `/profile` | `/wallet` | `/transactions` | `/promotions` | `/settings` | `/help` | `/logout`) => {
    router.push(route);
    onClose();
};

  return (
    <Modal visible={isOpen} transparent={true} animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <Animated.View style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}>
          {/* Profile Section */}
          <View style={styles.profileSection}>
            <Image source={{ uri: profile.image }} style={styles.profileImage} />
            <Text style={styles.profileName}>{profile.name}</Text>
            <Text style={styles.profileEmail}>{profile.email}</Text>
          </View>

          <ScrollView contentContainerStyle={styles.menuContainer}>
            <Text style={styles.sidebarTitle}>Menu</Text>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigateAndClose('/profile')}>
              <Feather name="user" size={20} color="#4A4A4A" />
              <Text style={styles.menuText}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigateAndClose('/wallet')}>
              <Feather name="credit-card" size={20} color="#4A4A4A" />
              <Text style={styles.menuText}>Wallet</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigateAndClose('/transactions')}>
              <Feather name="credit-card" size={20} color="#4A4A4A" />
              <Text style={styles.menuText}>Transactions</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigateAndClose('/promotions')}>
              <Feather name="gift" size={20} color="#4A4A4A" />
              <Text style={styles.menuText}>Promotions</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigateAndClose('/settings')}>
              <Feather name="settings" size={20} color="#4A4A4A" />
              <Text style={styles.menuText}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigateAndClose('/help')}>
              <Feather name="help-circle" size={20} color="#4A4A4A" />
              <Text style={styles.menuText}>Help & Support</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => navigateAndClose('/logout')}>
              <Feather name="log-out" size={20} color="#4A4A4A" />
              <Text style={styles.menuText}>Logout</Text>
            </TouchableOpacity>
          </ScrollView>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Feather name="x" size={24} color="#4A4A4A" />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay background
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  sidebar: {
    backgroundColor: '#fff',
    width: '80%', // Sidebar width (adjusted to fit better)
    height: '100%',
    padding: 16,
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 2, height: 0 }, // Shadow position
    shadowOpacity: 0.1, // Shadow transparency
    shadowRadius: 4, // Shadow blur radius
    elevation: 4, // For Android shadow support
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#4A4A4A',
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A4A4A',
  },
  profileEmail: {
    fontSize: 14,
    color: '#7A7A7A',
    marginTop: 5,
  },
  sidebarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#4A4A4A',
  },
  menuContainer: {
    paddingBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  menuText: {
    fontSize: 16,
    color: '#4A4A4A',
    marginLeft: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
});

export default Sidebar;