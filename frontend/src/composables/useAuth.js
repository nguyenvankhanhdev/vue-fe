// Auth composable để quản lý trạng thái đăng nhập toàn cục
import { ref, computed } from "vue";

// Global auth state
const isAuthenticated = ref(false);
const currentUser = ref(null);
const authToken = ref(null);

// Check authentication from localStorage
const checkAuthFromStorage = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (token && user) {
    try {
      const userData = JSON.parse(user);
      authToken.value = token;
      currentUser.value = userData;
      isAuthenticated.value = true;
      return true;
    } catch (error) {
      console.error("Error parsing stored user data:", error);
      clearAuth();
      return false;
    }
  } else {
    clearAuth();
    return false;
  }
};

// Clear auth state
const clearAuth = () => {
  isAuthenticated.value = false;
  currentUser.value = null;
  authToken.value = null;
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// Set auth state
const setAuth = (token, user) => {
  authToken.value = token;
  currentUser.value = user;
  isAuthenticated.value = true;
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};

// Initialize auth state on module load
checkAuthFromStorage();

// Listen for storage changes (multi-tab support)
if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key === "token" || e.key === "user") {
      checkAuthFromStorage();
    }
  });
}

// Composable function
export function useAuth() {
  // Computed properties
  const userName = computed(() => {
    if (!currentUser.value) return "";

    return (
      currentUser.value.first_name ||
      currentUser.value.name ||
      currentUser.value.email?.split("@")[0] ||
      "User"
    );
  });

  const userEmail = computed(() => {
    return currentUser.value?.email || "";
  });

  const userFullName = computed(() => {
    if (!currentUser.value) return "";

    const firstName = currentUser.value.first_name || "";
    const lastName = currentUser.value.last_name || "";

    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    }

    return firstName || lastName || currentUser.value.name || "";
  });

  // Methods
  const login = (token, user) => {
    setAuth(token, user);
  };

  const logout = () => {
    clearAuth();
  };

  const refresh = () => {
    return checkAuthFromStorage();
  };

  const isLoggedIn = computed(() => isAuthenticated.value);

  return {
    // State
    isAuthenticated: isLoggedIn,
    currentUser: computed(() => currentUser.value),
    authToken: computed(() => authToken.value),

    // Computed
    userName,
    userEmail,
    userFullName,

    // Methods
    login,
    logout,
    refresh,
    checkAuthFromStorage,
  };
}

// Export for direct access if needed
export {
  isAuthenticated,
  currentUser,
  authToken,
  setAuth,
  clearAuth,
  checkAuthFromStorage,
};
