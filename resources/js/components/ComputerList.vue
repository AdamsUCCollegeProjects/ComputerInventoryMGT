<template>
    <div>
        <v-row class="mb-4" align="center">
            <v-col cols="12" sm="6" md="4">
                <v-text-field
                    v-model="searchTerm"
                    label="Search computers..."
                    prepend-inner-icon="mdi-magnify"
                    variant="outlined"
                    hide-details
                ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="8" class="text-sm-right">
                <v-btn
                    color="primary"
                    @click="showAddForm = true"
                    prepend-icon="mdi-plus"
                >
                    Add Computer
                </v-btn>
            </v-col>
        </v-row>

        <!-- Add Computer Dialog -->
        <v-dialog v-model="showAddForm" max-width="800">
            <v-card>
                <v-card-title class="headline">Add New Computer</v-card-title>
                <v-card-text>
                    <ComputerForm
                        @submit="addComputer"
                        @cancel="showAddForm = false"
                    />
                </v-card-text>
            </v-card>
        </v-dialog>

        <!-- Edit Computer Dialog -->
        <v-dialog v-model="editingComputer" max-width="800">
            <v-card v-if="editingComputer">
                <v-card-title class="headline">Edit Computer</v-card-title>
                <v-card-text>
                    <ComputerForm
                        :computer="editingComputer"
                        @submit="updateComputer"
                        @cancel="editingComputer = null"
                    />
                </v-card-text>
            </v-card>
        </v-dialog>

        <!-- Computer Table -->
        <v-card>
            <v-progress-linear
                v-if="loading"
                indeterminate
                color="primary"
            ></v-progress-linear>

            <v-data-table
                v-else
                :headers="headers"
                :items="filteredComputers"
                :search="searchTerm"
                :items-per-page="10"
                class="elevation-1"
            >
                <template v-slot:item.actions="{ item }">
                    <v-icon
                        small
                        class="mr-2"
                        @click="editComputer(item)"
                        title="Edit"
                    >
                        mdi-pencil
                    </v-icon>
                    <v-icon
                        small
                        @click="deleteComputer(item.id)"
                        title="Delete"
                    >
                        mdi-delete
                    </v-icon>
                </template>

                <template v-slot:item.ram="{ item }">
                    {{ item.ram }} GB
                </template>

                <template v-slot:item.storage="{ item }">
                    {{ item.storage }} GB
                </template>

                <template v-slot:no-data>
                    <v-alert type="info" class="ma-4">
                        No computers found
                    </v-alert>
                </template>
            </v-data-table>
        </v-card>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useDebounceFn } from "@vueuse/core";
import axios from "axios";
import ComputerForm from "./ComputerForm.vue";

const computers = ref([]);
const showAddForm = ref(false);
const editingComputer = ref(null);
const searchTerm = ref("");
const loading = ref(true);

const headers = [
    { title: "Name", key: "name" },
    { title: "Serial Number", key: "serial_number" },
    { title: "Manufacturer", key: "manufacturer" },
    { title: "Model", key: "model" },
    { title: "RAM", key: "ram" },
    { title: "Storage", key: "storage" },
    { title: "Actions", key: "actions", sortable: false },
];

const filteredComputers = computed(() => {
    if (!searchTerm.value) return computers.value;
    const term = searchTerm.value.toLowerCase();
    return computers.value.filter(
        (computer) =>
            computer.name.toLowerCase().includes(term) ||
            computer.serial_number.toLowerCase().includes(term) ||
            computer.manufacturer.toLowerCase().includes(term) ||
            computer.model.toLowerCase().includes(term)
    );
});

const fetchComputersDebounced = useDebounceFn(async () => {
    try {
        const response = await axios.get("/api/computers");
        computers.value = response.data;
    } catch (error) {
        console.error("Error fetching computers:", error);
    } finally {
        loading.value = false;
    }
}, 300);

onMounted(fetchComputersDebounced);

async function addComputer(computerData) {
    try {
        const response = await axios.post("/api/computers", computerData);
        computers.value.push(response.data);
        showAddForm.value = false;
    } catch (error) {
        console.error("Error adding computer:", error);
    }
}

function editComputer(computer) {
    editingComputer.value = { ...computer };
}

async function updateComputer(updatedComputer) {
    try {
        const response = await axios.put(
            `/api/computers/${updatedComputer.id}`,
            updatedComputer
        );
        const index = computers.value.findIndex(
            (c) => c.id === updatedComputer.id
        );
        if (index !== -1) {
            computers.value.splice(index, 1, response.data);
        }
        editingComputer.value = null;
    } catch (error) {
        console.error("Error updating computer:", error);
    }
}

async function deleteComputer(id) {
    if (confirm("Are you sure you want to delete this computer?")) {
        try {
            await axios.delete(`/api/computers/${id}`);
            computers.value = computers.value.filter(
                (computer) => computer.id !== id
            );
        } catch (error) {
            console.error("Error deleting computer:", error);
        }
    }
}
</script>
