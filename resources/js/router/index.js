import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/auth/Login.vue";
import Dashboard from "../components/Dashboard.vue";
import ComputerList from "../components/ComputerList.vue";
import { useAuthStore } from "../store/auth";
import Assignment from "../components/Assignment.vue";

const routes = [
    {
        path: "/login",
        name: "Login",
        component: Login,
        meta: { requiresGuest: true },
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: { requiresAuth: true },
    },
    {
        path: "/computers",
        name: "Computers",
        component: ComputerList,
        meta: { requiresAuth: true },
    },
    {
        path: "/assignments",
        name: "Assignments",
        component: Assignment,
        meta: { requiresAuth: true },
    },
    {
        path: "/",
        redirect: "/dashboard",
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore();

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        const isAuthenticated = await authStore.checkAuth();
        if (!isAuthenticated) {
            return next("/login");
        }
    }

    if (to.meta.requiresGuest && authStore.isAuthenticated) {
        return next("/dashboard");
    }

    next();
});

export default router;
