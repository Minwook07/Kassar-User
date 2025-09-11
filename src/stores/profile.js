import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useProfileStore = defineStore('profile', () => {
  // State
  const profile = ref({
    id: null,
    name: '',
    email: '',
    gender: null,
    phone: null,
    avatar: '',
    roles: [],
    history: ''
  });
  
  const isLoading = ref(false);
  const error = ref(null);

  // Helper function to get token
  const getToken = () => {
    return localStorage.getItem("token") || sessionStorage.getItem("token");
  };

  // Actions
  const fetchProfile = async () => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await axios.get('/api/profile', {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      profile.value = response.data.data.user;
      return response.data.data.user;
    } catch (err) {
      error.value = err.response?.data?.message || 'បរាជ័យក្នុងការទាញយកប្រវត្តិរូប';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const updateProfile = async (profileData) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await axios.post('/api/profile', profileData, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      
      // Update local profile data
      await fetchProfile();
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'បរាជ័យក្នុងការកែប្រែប្រវត្តិរូប';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const updateAvatar = async (formData) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await axios.post('/api/profile/avatar', formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Update only the avatar in the local state
      profile.value.avatar = response.data.avatar;
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'បរាជ័យក្នុងការផ្លាស់ប្តូររូបភាព';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const removeAvatar = async () => {
    isLoading.value = true;
    error.value = null;
    
    try {
      await axios.delete('/api/profiles/avatar', {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      
      // Update avatar in local state
      profile.value.avatar = '';
      return { success: true };
    } catch (err) {
      error.value = err.response?.data?.message || 'បរាជ័យក្នុងការលុបរូបភាព';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const updatePassword = async (passwordData) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await axios.post('/api/profile/password', passwordData, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'បរាជ័យក្នុងការផ្លាស់ប្តូរពាក្យសម្ងាត់';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const deleteAccount = async (password) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await axios.post('/api/profile/delete', 
        { password },
        { headers: { Authorization: `Bearer ${getToken()}` }}
      );
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'បរាជ័យក្នុងការលុបគណនី';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  // Normalize and translate gender
  const normalizeGender = (gender) => {
    if (gender === 'Male' || gender === 'male' || gender === 1) return 'Male';
    if (gender === 'Female' || gender === 'female' || gender === 2) return 'Female';
    return 'Unkown';
  };

  const translateGender = (gender) => {
    if (gender === 'Male') return 'ប្រុស';
    if (gender === 'Female') return 'ស្រី';
    return 'មិនបញ្ជាក់';
  };

  // Translate role
  const translateRole = (roleName) => {
    const translations = {
      "Regular User": "អតិថិជន",
      "Seller User": "អ្នកលក់",
      "System Admin": "អ្នកគ្រប់គ្រង"
    };
    return translations[roleName] || roleName;
  };

  return {
    profile,
    isLoading,
    error,
    fetchProfile,
    updateProfile,
    updateAvatar,
    removeAvatar,
    updatePassword,
    deleteAccount,
    normalizeGender,
    translateGender,
    translateRole
  };
});