import { defineStore } from "pinia";
import axios from "axios";
import router from "../router";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: JSON.parse(localStorage.getItem("user")) || null,
        token: localStorage.getItem("token") || null,
        isAuthenticated: !!localStorage.getItem("token"),
    }),

    actions: {
        async login(credentials) {
            try {
                const response = await axios.post("/auth/login", credentials);
                this.setAuth(response.data);
            } catch (error) {
                throw error;
            }
        },

        async register(userData) {
            try {
                const response = await axios.post("/api/auth/register", userData);
                this.setAuth(response.data);
            } catch (error) {
                throw error;
            }
        },

        setAuth(data) {
            this.user = data.user;
            this.token = data.access_token;
            this.isAuthenticated = true;

            // Store in localStorage
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.access_token);
            
            // Set axios default header
            axios.defaults.headers.common["Authorization"] = `Bearer ${data.access_token}`;
        },

        logout() {
            this.user = null;
            this.token = null;
            this.isAuthenticated = false;

            // Clear localStorage
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            
            // Remove axios header
            delete axios.defaults.headers.common["Authorization"];

            router.push("/login");
        },

        async checkAuth() {
            if (this.token) {
                axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;

                try {
                    const response = await axios.get("/api/auth/me");
                    this.user = response.data;
                    this.isAuthenticated = true;
                    return true;
                } catch (error) {
                    this.logout();
                    return false;
                }
            }
            return false;
        },

        // Add this new method to initialize auth state
        initializeAuth() {
            const token = localStorage.getItem("token");
            const user = JSON.parse(localStorage.getItem("user"));
            
            if (token && user) {
                this.token = token;
                this.user = user;
                this.isAuthenticated = true;
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            }
        }
    },
});
