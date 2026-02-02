// Authentication Service
// Handles user authentication, registration, and session management

const STORAGE_KEY = "sc-homestyle-auth";
const USERS_KEY = "sc-homestyle-users";

export const authService = {
  // Get current user from localStorage
  getCurrentUser() {
    const authData = localStorage.getItem(STORAGE_KEY);
    return authData ? JSON.parse(authData) : null;
  },

  // Check if user is authenticated
  isAuthenticated() {
    return this.getCurrentUser() !== null;
  },

  // Get all users from localStorage
  getAllUsers() {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  },

  // Save users to localStorage
  saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  },

  // Register new user
  register(userData) {
    const users = this.getAllUsers();

    // Check if email already exists
    const existingUser = users.find((u) => u.email === userData.email);
    if (existingUser) {
      throw new Error("El correo electrónico ya está registrado");
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      password: userData.password, // In production, this should be hashed
      phone: userData.phone || "",
      address: userData.address || "",
      createdAt: new Date().toISOString(),
      orders: [],
    };

    users.push(newUser);
    this.saveUsers(users);

    // Auto login after registration
    const authData = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      address: newUser.address,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(authData));

    return authData;
  },

  // Login user
  login(email, password) {
    const users = this.getAllUsers();
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      throw new Error("Correo electrónico o contraseña incorrectos");
    }

    // Save auth data (without password)
    const authData = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(authData));

    return authData;
  },

  // Logout user
  logout() {
    localStorage.removeItem(STORAGE_KEY);
  },

  // Update user profile
  updateProfile(userData) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      throw new Error("No hay usuario autenticado");
    }

    const users = this.getAllUsers();
    const userIndex = users.findIndex((u) => u.id === currentUser.id);

    if (userIndex === -1) {
      throw new Error("Usuario no encontrado");
    }

    // Update user data
    users[userIndex] = {
      ...users[userIndex],
      name: userData.name,
      phone: userData.phone,
      address: userData.address,
    };

    this.saveUsers(users);

    // Update auth data
    const authData = {
      id: users[userIndex].id,
      name: users[userIndex].name,
      email: users[userIndex].email,
      phone: users[userIndex].phone,
      address: users[userIndex].address,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(authData));

    return authData;
  },

  // Get user orders
  getUserOrders() {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      return [];
    }

    const users = this.getAllUsers();
    const user = users.find((u) => u.id === currentUser.id);
    return user ? user.orders : [];
  },

  // Add order to user
  addOrderToUser(orderData) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      return;
    }

    const users = this.getAllUsers();
    const userIndex = users.findIndex((u) => u.id === currentUser.id);

    if (userIndex !== -1) {
      if (!users[userIndex].orders) {
        users[userIndex].orders = [];
      }
      users[userIndex].orders.unshift(orderData);
      this.saveUsers(users);
    }
  },
};
