// src/utils/notificationManager.js
// Sistem notifikasi terpusat untuk menghindari penumpukan

class NotificationManager {
    constructor() {
      this.activeNotifications = new Set();
      this.maxNotifications = 3; // Maksimal 3 notifikasi bersamaan
    }
  
    // Bersihkan semua notifikasi yang ada
    clearAll() {
      this.activeNotifications.forEach(notification => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      });
      this.activeNotifications.clear();
    }
  
    // Bersihkan notifikasi berdasarkan tipe
    clearByType(type) {
      this.activeNotifications.forEach(notification => {
        if (notification.dataset.type === type && document.body.contains(notification)) {
          document.body.removeChild(notification);
          this.activeNotifications.delete(notification);
        }
      });
    }
  
    // Tampilkan notifikasi dengan management otomatis
    show(message, options = {}) {
      const {
        type = 'success',
        duration = 3000,
        position = 'top-right',
        bgColor = 'bg-green-500',
        textColor = 'text-white',
        clearPrevious = false,
        isHTML = false
      } = options;
  
      // Bersihkan notifikasi sebelumnya jika diminta
      if (clearPrevious) {
        this.clearByType(type);
      }
  
      // Jika sudah mencapai batas maksimal, hapus yang tertua
      if (this.activeNotifications.size >= this.maxNotifications) {
        const oldestNotification = Array.from(this.activeNotifications)[0];
        if (document.body.contains(oldestNotification)) {
          document.body.removeChild(oldestNotification);
        }
        this.activeNotifications.delete(oldestNotification);
      }
  
      // Buat elemen notifikasi
      const notification = document.createElement('div');
      notification.dataset.type = type;
      notification.dataset.timestamp = Date.now();
  
      // Set konten
      if (isHTML) {
        notification.innerHTML = message;
      } else {
        notification.textContent = message;
      }
  
      // Set positioning berdasarkan jumlah notifikasi yang ada
      const existingCount = Array.from(this.activeNotifications).filter(n => 
        document.body.contains(n)
      ).length;
  
      let positionClasses = '';
      switch (position) {
        case 'top-right':
          positionClasses = `fixed right-4 z-50`;
          // Stack notifikasi dengan jarak 70px untuk setiap notifikasi
          notification.style.top = `${16 + (existingCount * 70)}px`;
          break;
        case 'top-left':
          positionClasses = `fixed left-4 z-50`;
          notification.style.top = `${16 + (existingCount * 70)}px`;
          break;
        case 'bottom-right':
          positionClasses = `fixed right-4 z-50`;
          notification.style.bottom = `${16 + (existingCount * 70)}px`;
          break;
        case 'bottom-left':
          positionClasses = `fixed left-4 z-50`;
          notification.style.bottom = `${16 + (existingCount * 70)}px`;
          break;
        default:
          positionClasses = `fixed top-4 right-4 z-50`;
      }
  
      // Set kelas CSS
      notification.className = `${positionClasses} ${bgColor} ${textColor} px-4 py-3 rounded-xl shadow-lg max-w-sm transition-all duration-300 ease-in-out transform`;
  
      // Animasi masuk
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(100%)';
  
      // Tambahkan ke DOM dan set aktif
      document.body.appendChild(notification);
      this.activeNotifications.add(notification);
  
      // Trigger animasi masuk
      requestAnimationFrame(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
      });
  
      // Auto remove setelah duration
      const timeoutId = setTimeout(() => {
        this.remove(notification);
      }, duration);
  
      // Tambahkan event listener untuk hover (pause auto-remove)
      let isHovered = false;
      notification.addEventListener('mouseenter', () => {
        isHovered = true;
        clearTimeout(timeoutId);
      });
  
      notification.addEventListener('mouseleave', () => {
        if (isHovered) {
          isHovered = false;
          setTimeout(() => this.remove(notification), 1000); // 1 detik setelah mouse leave
        }
      });
  
      // Klik untuk tutup
      notification.addEventListener('click', () => {
        this.remove(notification);
      });
  
      return notification;
    }
  
    // Hapus notifikasi dengan animasi
    remove(notification) {
      if (!document.body.contains(notification)) {
        this.activeNotifications.delete(notification);
        return;
      }
  
      // Animasi keluar
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(100%)';
  
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
        this.activeNotifications.delete(notification);
        
        // Reposisi notifikasi yang tersisa
        this.repositionNotifications();
      }, 300);
    }
  
    // Reposisi notifikasi setelah ada yang dihapus
    repositionNotifications() {
      const notifications = Array.from(this.activeNotifications).filter(n => 
        document.body.contains(n)
      );
  
      notifications.forEach((notification, index) => {
        notification.style.top = `${16 + (index * 70)}px`;
      });
    }
  
    // Shortcut methods untuk tipe notifikasi umum
    success(message, options = {}) {
      return this.show(message, {
        type: 'success',
        bgColor: 'bg-green-500',
        clearPrevious: true,
        ...options
      });
    }
  
    error(message, options = {}) {
      return this.show(message, {
        type: 'error',
        bgColor: 'bg-red-500',
        clearPrevious: true,
        ...options
      });
    }
  
    info(message, options = {}) {
      return this.show(message, {
        type: 'info',
        bgColor: 'bg-blue-500',
        clearPrevious: true,
        ...options
      });
    }
  
    warning(message, options = {}) {
      return this.show(message, {
        type: 'warning',
        bgColor: 'bg-yellow-500',
        textColor: 'text-black',
        clearPrevious: true,
        ...options
      });
    }
  
    random(message, options = {}) {
      return this.show(message, {
        type: 'random',
        bgColor: 'bg-purple-500',
        clearPrevious: true,
        ...options
      });
    }
  
    copy(message, options = {}) {
      return this.show(message, {
        type: 'copy',
        bgColor: 'bg-blue-500',
        duration: 2000,
        clearPrevious: true,
        ...options
      });
    }
  
    generation(message, options = {}) {
      return this.show(message, {
        type: 'generation',
        bgColor: 'bg-green-500',
        duration: 5000,
        clearPrevious: true,
        isHTML: true,
        ...options
      });
    }
  }
  
  // Singleton instance
  const notificationManager = new NotificationManager();
  
  export default notificationManager;