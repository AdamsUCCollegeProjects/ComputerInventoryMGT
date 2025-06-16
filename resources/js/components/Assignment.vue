<template>
    <v-card>
        <v-card-title class="d-flex align-center">
            <span class="text-h5">Users Management</span>
            <v-spacer></v-spacer>
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
                class="mr-4"
            ></v-text-field>
            <v-btn color="primary" @click="openCreateDialog">
                <v-icon left>mdi-plus</v-icon>
                Add User
            </v-btn>
        </v-card-title>
        <v-data-table
            :headers="headers"
            :items="users"
            :search="search"
            :loading="loading"
            :items-per-page="10"
            :page.sync="page"
            :server-items-length="totalUsers"
            :options.sync="options"
            @update:options="fetchUsers"
            class="elevation-1"
        >
            <template v-slot:item.avatar="{ item }">
                <v-avatar size="36" class="my-2">
                    <img
                        :src="
                            item.avatar ||
                            'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'
                        "
                        :alt="item.name"
                    />
                </v-avatar>
            </template>

            <template v-slot:item.status="{ item }">
                <v-chip :color="item.active ? 'success' : 'error'" small>
                    {{ item.active ? "Active" : "Inactive" }}
                </v-chip>
            </template>

            <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editUser(item)">
                    mdi-pencil
                </v-icon>
                <v-icon small @click="confirmDelete(item)"> mdi-delete </v-icon>
            </template>

            <template #item.role="{ item }">
                {{ capitalize(item.role) }}
            </template>
        </v-data-table>

        <!-- Create/Edit Dialog -->
        <v-dialog v-model="dialog" max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                    <v-container>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-row>
                                <v-col cols="12" sm="6">
                                    <v-text-field
                                        v-model="editedItem.name"
                                        label="Full Name"
                                        :rules="[
                                            (v) => !!v || 'Name is required',
                                        ]"
                                        required
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field
                                        v-model="editedItem.email"
                                        label="Email"
                                        :rules="emailRules"
                                        required
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field
                                        v-model="editedItem.phone"
                                        label="Phone"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-select
                                        v-model="editedItem.role"
                                        :items="roles"
                                        item-title="text"
                                        item-value="value"
                                        label="Role"
                                        :rules="[
                                            (v) => !!v || 'Role is required',
                                        ]"
                                        required
                                    ></v-select>
                                </v-col>
                                <!-- Password and confirm password -->
                                <v-col cols="12" sm="6">
                                    <v-text-field
                                        v-model="editedItem.password"
                                        label="Password"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field
                                        v-model="editedItem.confirmPassword"
                                        label="Confirm Password"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-switch
                                        v-model="editedItem.active"
                                        label="Active"
                                    ></v-switch>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDialog">
                        Cancel
                    </v-btn>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="save"
                        :loading="saving"
                    >
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- Delete Confirmation Dialog -->
        <v-dialog v-model="deleteDialog" max-width="400px">
            <v-card>
                <v-card-title class="text-h5"
                    >Are you sure you want to delete this user?</v-card-title
                >
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="deleteDialog = false"
                        >Cancel</v-btn
                    >
                    <v-btn
                        color="error"
                        text
                        @click="deleteUser"
                        :loading="deleting"
                        >Delete</v-btn
                    >
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-card>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import axios from "axios";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

const $toast = useToast();

// Table headers
const headers = ref([
    { title: "Avatar", key: "avatar", sortable: false },
    { title: "Name", key: "name" },
    { title: "Email", key: "email" },
    { title: "Role", key: "role" },
    { title: "Status", key: "status" },
    { title: "Actions", key: "actions", sortable: false },
]);

// Data
const users = ref([]);
const loading = ref(false);
const search = ref("");
const page = ref(1);
const totalUsers = ref(0);
const options = ref({
    page: 1,
    itemsPerPage: 10,
    sortBy: ["name"],
    sortDesc: [false],
});

// Form dialog
const dialog = ref(false);
const deleteDialog = ref(false);
const valid = ref(true);
const saving = ref(false);
const deleting = ref(false);
const editedIndex = ref(-1);
const editedItem = ref({
    id: null,
    name: "",
    email: "",
    phone: "",
    role: "",
    active: true,
    avatar: null,
    password: "",
    confirmPassword: "",
});
const defaultItem = ref({
    id: null,
    name: "",
    email: "",
    phone: "",
    role: "",
    active: true,
    avatar: null,
    password: "",
    confirmPassword: "",
});

// Roles options
const roles = ref([
    { text: "Admin", value: "admin" },
    { text: "User", value: "user" },
    { text: "Super Admin", value: "super-admin" },
]);

// Validation rules
const emailRules = ref([
    (v) => !!v || "E-mail is required",
    (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
]);

const capitalize = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
};

// Computed properties
const formTitle = computed(() => {
    return editedIndex.value === -1 ? "New User" : "Edit User";
});

// Methods
const fetchUsers = async () => {
    try {
        loading.value = true;

        const { page, itemsPerPage, sortBy, sortDesc } = options.value;
        const sortField = sortBy[0] || "name";
        const sortOrder = sortDesc[0] ? "desc" : "asc";

        const response = await axios.get("/users", {
            params: {
                page,
                per_page: itemsPerPage,
                search: search.value,
                sort_by: sortField,
                sort_order: sortOrder,
            },
        });

        users.value = response.data;
        totalUsers.value = response.data.total;
    } catch (error) {
        console.error("Error fetching users:", error);
    } finally {
        loading.value = false;
    }
};

const openCreateDialog = () => {
    editedIndex.value = -1;
    editedItem.value = { ...defaultItem.value };
    dialog.value = true;
};

const editUser = (item) => {
    editedIndex.value = users.value.indexOf(item);
    editedItem.value = { ...item };
    dialog.value = true;
};

const confirmDelete = (item) => {
    editedIndex.value = users.value.indexOf(item);
    editedItem.value = { ...item };
    deleteDialog.value = true;
};

const closeDialog = () => {
    dialog.value = false;
    setTimeout(() => {
        editedItem.value = { ...defaultItem.value };
        editedIndex.value = -1;
    }, 300);
};

const save = async () => {
    if (!valid.value) return;

    saving.value = true;
    if (editedItem.value.role) {
        editedItem.value.role = editedItem.value.role.toLowerCase();
    }

    if (editedItem.value.password !== editedItem.value.confirmPassword) {
        // toast error
        $toast.error("Password and confirm password do not match");
        saving.value = false;
        return;
    }

    try {
        if (editedIndex.value > -1) {
            // Update existing user
            await axios.put(`/users/${editedItem.value.id}`, editedItem.value);
        } else {
            // Create new user
            await axios.post("/users", editedItem.value);
        }
        fetchUsers();
        closeDialog();
    } catch (error) {
        console.error("Error saving user:", error);
    } finally {
        saving.value = false;
    }
};

const deleteUser = async () => {
    deleting.value = true;
    try {
        await axios.delete(`/users/${editedItem.value.id}`);
        fetchUsers();
        deleteDialog.value = false;
    } catch (error) {
        console.error("Error deleting user:", error);
    } finally {
        deleting.value = false;
    }
};

// Watchers
watch(search, (newVal, oldVal) => {
    if (newVal !== oldVal) {
        options.value.page = 1;
        fetchUsers();
    }
});

// Initial fetch
fetchUsers();
</script>

<style lang="scss" scoped>
.v-data-table {
    margin-top: 20px;
}

.v-avatar {
    cursor: pointer;
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.1);
    }
}

.v-icon {
    cursor: pointer;
    transition: color 0.2s;

    &:hover {
        color: var(--v-primary-base);
    }

    &.mdi-delete:hover {
        color: var(--v-error-base);
    }
}
</style>
