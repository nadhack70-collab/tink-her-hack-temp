/*
* Clean City - Application Logic
* Handles: Mock Auth, Routing, Mock AI Verification, UI Updates
*/

// --- MOCK DATABASE & STATE ---
const db = {
    users: JSON.parse(localStorage.getItem('users')) || [],
    currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
    
    saveUsers() {
        localStorage.setItem('users', JSON.stringify(this.users));
    },
    
    saveSession(user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUser = user;
    },
    
    clearSession() {
        localStorage.removeItem('currentUser');
        this.currentUser = null;
    }
};

// --- MOCK SERVICES ---

const auth = {
    login() {
        const email = document.getElementById('auth-email').value;
        const password = document.getElementById('auth-password').value;
        
        if (!email || !password) {
            ui.toast('Please fill in all fields', 'error');
            return;
        }

        const user = db.users.find(u => u.email === email && u.password === password);
        
        if (user) {
            db.saveSession(user);
            ui.toast('Login successful!', 'success');
            router.navigate('dashboard');
        } else {
            ui.toast('Invalid credentials', 'error');
        }
    },

    register() {
        const name = document.getElementById('auth-name').value;
        const email = document.getElementById('auth-email').value;
        const password = document.getElementById('auth-password').value;

        if (!name || !email || !password) {
            ui.toast('Please fill in all fields', 'error');
            return;
        }

        if (db.users.find(u => u.email === email)) {
            ui.toast('User already exists', 'error');
            return;
        }

        const newUser = {
            name,
            email,
            password,
            points: 0,
            badges: []
        };

        db.users.push(newUser);
        db.saveUsers();
        db.saveSession(newUser);
        
        ui.toast('Registration successful!', 'success');
        router.navigate('dashboard');
    },

    logout() {
        db.clearSession();
        router.navigate('login');
        ui.toast('Logged out', 'success');
    }
};

const wasteService = {
    submitReport() {
        const location = document.getElementById('report-location').value;
        const desc = document.getElementById('report-desc').value;
        const fileInput = document.getElementById('report-file');

        if (!location || !desc || !fileInput.files[0]) {
            ui.toast('Please complete all fields and upload a photo', 'error');
            return;
        }

        const file = fileInput.files[0];
        const fileName = file.name.toLowerCase();

        // Show AI Loading
        const loading = document.getElementById('ai-loading');
        loading.classList.remove('hidden');

        // Simulate AI Processing Delay
        setTimeout(() => {
            loading.classList.add('hidden');
            
            let pointsChange = 0;
            let isReal = false;

            // Mock AI Logic
            // If filename contains 'garbage' -> +5 points
            // If filename contains 'ai' -> -5 points
            // Else -> Random true/false
            
            if (fileName.includes('garbage')) {
                isReal = true;
            } else if (fileName.includes('ai')) {
                isReal = false;
            } else {
                isReal = Math.random() > 0.3; // 70% chance of being real
            }

            if (isReal) {
                pointsChange = 5;
                ui.toast('Verified: Real Waste. +5 Points!', 'success');
                ui.confetti();
            } else {
                pointsChange = -5;
                ui.toast('Verified: Fake/AI Image. -5 Points.', 'error');
            }

            this.updatePoints(pointsChange);
            
            // Navigate to Thank You page only on success
            if (isReal) {
                document.getElementById('earned-points-display').textContent = `+${pointsChange}`;
                router.navigate('thank-you');
            } else {
                router.navigate('dashboard');
            }

        }, 2000); // 2 second delay
    },

    updatePoints(amount) {
        if (!db.currentUser) return;

        db.currentUser.points += amount;
        if (db.currentUser.points < 0) db.currentUser.points = 0; // No negative total points

        // Check for new badges
        this.checkBadges();

        // Update persistence
        const userIndex = db.users.findIndex(u => u.email === db.currentUser.email);
        if (userIndex !== -1) {
            db.users[userIndex] = db.currentUser;
            db.saveUsers();
            db.saveSession(db.currentUser);
        }
    },

    checkBadges() {
        const points = db.currentUser.points;
        const badges = db.currentUser.badges || [];
        
        let newBadge = null;

        if (points >= 500 && !badges.includes('hero')) {
            newBadge = 'Clean City Hero';
            badges.push('hero');
        } else if (points >= 200 && !badges.includes('ambassador')) {
            newBadge = 'Green Ambassador';
            badges.push('ambassador');
        } else if (points >= 100 && !badges.includes('citizen')) {
            newBadge = 'New Citizen';
            badges.push('citizen');
        }

        if (newBadge) {
            ui.toast(`🎉 New Badge Unlocked: ${newBadge}!`, 'success');
            ui.confetti();
        }
        
        db.currentUser.badges = badges;
    }
};

// --- UI HELPERS ---

const ui = {
    toast(message, type = 'success') {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        
        container.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'fadeOut 0.5s ease-out forwards';
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    },

    confetti() {
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = ['#f00', '#0f0', '#00f', '#ff0', '#f0f', '#0ff'][Math.floor(Math.random() * 6)];
            confetti.style.animationDuration = (Math.random() * 2 + 1) + 's';
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 3000);
        }
    },
    
    updateDashboard() {
        if (!db.currentUser) return;
        
        document.getElementById('user-name-display').textContent = db.currentUser.name;
        document.getElementById('user-points-display').textContent = db.currentUser.points;
        
        const badgeInfo = this.getBadgeInfo(db.currentUser.points);
        document.getElementById('current-badge-display').textContent = badgeInfo.current;
        document.getElementById('badge-progress').style.width = badgeInfo.percent + '%';
    },

    updateProfile() {
        if (!db.currentUser) return;

        document.getElementById('profile-name').textContent = db.currentUser.name;
        document.getElementById('profile-email').textContent = db.currentUser.email;
        document.getElementById('profile-initial').textContent = db.currentUser.name.charAt(0).toUpperCase();
        document.getElementById('profile-points').textContent = db.currentUser.points;

        const badgeInfo = this.getBadgeInfo(db.currentUser.points);
        document.getElementById('profile-badge-name').textContent = badgeInfo.current;
        document.getElementById('next-badge-name').textContent = badgeInfo.next;
        document.getElementById('profile-progress').style.width = badgeInfo.percent + '%';
        
        // Update badge icon conceptually (could be more SVGs)
        const icons = { 'New Citizen': '🌱', 'Green Ambassador': '🌿', 'Clean City Hero': '🌳' };
        document.getElementById('profile-badge-icon').textContent = icons[badgeInfo.current] || '🌱';
    },

    getBadgeInfo(points) {
        if (points >= 500) return { current: 'Clean City Hero', next: 'Max Level', percent: 100 };
        if (points >= 200) return { current: 'Green Ambassador', next: 'Clean City Hero', percent: ((points - 200) / 300) * 100 };
        if (points >= 100) return { current: 'New Citizen', next: 'Green Ambassador', percent: ((points - 100) / 100) * 100 };
        return { current: 'New Citizen', next: 'Green Ambassador', percent: (points / 100) * 100 };
    }
};

// --- ROUTING ---

const router = {
    pages: ['landing', 'login', 'dashboard', 'report', 'profile', 'thank-you'],
    
    navigate(pageId) {
        // Toggle visibility
        this.pages.forEach(p => {
            const el = document.getElementById(p + '-page');
            if (el) {
                if (p === pageId) {
                    el.classList.remove('hidden');
                    el.classList.add('active'); // active class triggers display:block
                } else {
                    el.classList.add('hidden');
                    el.classList.remove('active');
                }
            }
        });

        // Route specific logic
        if (pageId === 'dashboard') ui.updateDashboard();
        if (pageId === 'profile') ui.updateProfile();
    },

    init() {
        // Simple auth guard
        if (db.currentUser) {
            this.navigate('dashboard');
        } else {
            this.navigate('landing');
        }
    }
};

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    router.init();
    
    // File input name update helper
    const fileInput = document.getElementById('report-file');
    if(fileInput) {
        fileInput.addEventListener('change', (e) => {
            const fileName = e.target.files[0] ? e.target.files[0].name : "No file selected";
            document.getElementById('file-name').textContent = fileName;
        });
    }
});
