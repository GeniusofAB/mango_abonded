import { User, AbandonedPlace, Rating, Notification, Follow, BADGES } from '../types';

const STORAGE_KEYS = {
  CURRENT_USER: 'mango_current_user',
  USERS: 'mango_users',
  PLACES: 'mango_places',
  RATINGS: 'mango_ratings',
  NOTIFICATIONS: 'mango_notifications',
  FOLLOWS: 'mango_follows'
};

// Initialize default admin user
const initializeAdmin = () => {
  const users = getUsers();
  const adminExists = users.find(u => u.email === 'admin' && u.isAdmin);
  
  if (!adminExists) {
    const admin: User = {
      id: 'admin-user',
      email: 'admin',
      nickname: 'Администратор',
      avatar: '🍩',
      level: 999,
      xp: 999999,
      badges: BADGES,
      createdAt: new Date().toISOString(),
      isAdmin: true
    };
    
    users.push(admin);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }
};

export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return userStr ? JSON.parse(userStr) : null;
};

export const setCurrentUser = (user: User | null) => {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }
};

export const getUsers = (): User[] => {
  const usersStr = localStorage.getItem(STORAGE_KEYS.USERS);
  const users = usersStr ? JSON.parse(usersStr) : [];
  
  // Ensure admin exists
  if (users.length === 0) {
    initializeAdmin();
    return getUsers();
  }
  
  return users;
};

export const saveUser = (user: User) => {
  const users = getUsers();
  const existingIndex = users.findIndex(u => u.id === user.id);
  
  if (existingIndex >= 0) {
    users[existingIndex] = user;
  } else {
    users.push(user);
  }
  
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  
  // Update current user if it's the same
  const currentUser = getCurrentUser();
  if (currentUser && currentUser.id === user.id) {
    setCurrentUser(user);
  }
};

export const authenticateUser = (email: string, password: string): User | null => {
  // Admin login
  if (email === 'admin' && password === 'admin12345admin') {
    const users = getUsers();
    const admin = users.find(u => u.isAdmin);
    if (admin) {
      setCurrentUser(admin);
      return admin;
    }
  }
  
  // Regular user login (simplified - in real app would use proper auth)
  const users = getUsers();
  const user = users.find(u => u.email === email);
  
  if (user) {
    setCurrentUser(user);
    return user;
  }
  
  return null;
};

export const registerUser = (email: string, nickname: string): User => {
  const user: User = {
    id: crypto.randomUUID(),
    email,
    nickname,
    avatar: '🍩',
    level: 1,
    xp: 0,
    badges: [],
    createdAt: new Date().toISOString()
  };
  
  saveUser(user);
  setCurrentUser(user);
  return user;
};

export const getPlaces = (): AbandonedPlace[] => {
  const placesStr = localStorage.getItem(STORAGE_KEYS.PLACES);
  return placesStr ? JSON.parse(placesStr) : [];
};

export const savePlace = (place: AbandonedPlace) => {
  const places = getPlaces();
  const existingIndex = places.findIndex(p => p.id === place.id);
  
  if (existingIndex >= 0) {
    places[existingIndex] = place;
  } else {
    places.push(place);
  }
  
  localStorage.setItem(STORAGE_KEYS.PLACES, JSON.stringify(places));
  
  // Award badges and XP to user
  const user = getCurrentUser();
  if (user && place.authorId === user.id && place.status === 'approved') {
    awardXPAndBadges(user.id, 'upload');
  }
};

export const getRatings = (): Rating[] => {
  const ratingsStr = localStorage.getItem(STORAGE_KEYS.RATINGS);
  return ratingsStr ? JSON.parse(ratingsStr) : [];
};

export const saveRating = (rating: Rating) => {
  const ratings = getRatings();
  const existingIndex = ratings.findIndex(r => r.id === rating.id);
  
  if (existingIndex >= 0) {
    ratings[existingIndex] = rating;
  } else {
    ratings.push(rating);
  }
  
  localStorage.setItem(STORAGE_KEYS.RATINGS, JSON.stringify(ratings));
};

export const getNotifications = (userId: string): Notification[] => {
  const notificationsStr = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
  const allNotifications: Notification[] = notificationsStr ? JSON.parse(notificationsStr) : [];
  return allNotifications.filter(n => n.userId === userId);
};

export const addNotification = (notification: Notification) => {
  const notificationsStr = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
  const notifications: Notification[] = notificationsStr ? JSON.parse(notificationsStr) : [];
  notifications.push(notification);
  localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
};

export const markNotificationAsRead = (notificationId: string) => {
  const notificationsStr = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
  const notifications: Notification[] = notificationsStr ? JSON.parse(notificationsStr) : [];
  const notification = notifications.find(n => n.id === notificationId);
  if (notification) {
    notification.read = true;
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }
};

export const getFollows = (): Follow[] => {
  const followsStr = localStorage.getItem(STORAGE_KEYS.FOLLOWS);
  return followsStr ? JSON.parse(followsStr) : [];
};

export const toggleFollow = (followerId: string, followingId: string) => {
  const follows = getFollows();
  const existingFollow = follows.find(f => f.followerId === followerId && f.followingId === followingId);
  
  if (existingFollow) {
    const newFollows = follows.filter(f => !(f.followerId === followerId && f.followingId === followingId));
    localStorage.setItem(STORAGE_KEYS.FOLLOWS, JSON.stringify(newFollows));
  } else {
    const newFollow: Follow = {
      followerId,
      followingId,
      createdAt: new Date().toISOString()
    };
    follows.push(newFollow);
    localStorage.setItem(STORAGE_KEYS.FOLLOWS, JSON.stringify(follows));
    
    // Send notification
    addNotification({
      id: crypto.randomUUID(),
      userId: followingId,
      type: 'follow',
      message: `Пользователь подписался на вас`,
      read: false,
      createdAt: new Date().toISOString()
    });
  }
};

export const awardXPAndBadges = (userId: string, action: 'upload' | 'like' | 'rating') => {
  const users = getUsers();
  const user = users.find(u => u.id === userId);
  if (!user) return;
  
  let xpGain = 0;
  switch (action) {
    case 'upload':
      xpGain = 100;
      break;
    case 'like':
      xpGain = 5;
      break;
    case 'rating':
      xpGain = 10;
      break;
  }
  
  user.xp += xpGain;
  user.level = Math.floor(user.xp / 1000) + 1;
  
  // Check for new badges
  const places = getPlaces().filter(p => p.authorId === userId && p.status === 'approved');
  const totalLikes = places.reduce((acc, place) => acc + place.likes.length, 0);
  const totalRatings = places.reduce((acc, place) => acc + place.rating.filter(r => r.status === 'approved').length, 0);
  
  const newBadges = [];
  
  if (places.length >= 1 && !user.badges.find(b => b.id === 'first-upload')) {
    newBadges.push(BADGES.find(b => b.id === 'first-upload')!);
  }
  if (places.length >= 5 && !user.badges.find(b => b.id === 'explorer')) {
    newBadges.push(BADGES.find(b => b.id === 'explorer')!);
  }
  if (places.length >= 20 && !user.badges.find(b => b.id === 'veteran')) {
    newBadges.push(BADGES.find(b => b.id === 'veteran')!);
  }
  if (places.length >= 50 && !user.badges.find(b => b.id === 'legend')) {
    newBadges.push(BADGES.find(b => b.id === 'legend')!);
  }
  if (totalLikes >= 100 && !user.badges.find(b => b.id === 'popular')) {
    newBadges.push(BADGES.find(b => b.id === 'popular')!);
  }
  if (totalRatings >= 50 && !user.badges.find(b => b.id === 'rated')) {
    newBadges.push(BADGES.find(b => b.id === 'rated')!);
  }
  
  user.badges.push(...newBadges);
  saveUser(user);
  
  // Send notifications for new badges
  newBadges.forEach(badge => {
    addNotification({
      id: crypto.randomUUID(),
      userId,
      type: 'approval',
      message: `Получен новый бейдж: ${badge.name}!`,
      read: false,
      createdAt: new Date().toISOString()
    });
  });
};

// Initialize on load
initializeAdmin();
