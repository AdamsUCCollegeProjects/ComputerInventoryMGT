<template>
    <div>
        <div
            class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4"
        >
            <div class="relative w-full sm:w-64">
                <div
                    class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                >
                    <svg
                        class="h-5 w-5 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </div>
                <input
                    v-model="searchTerm"
                    type="text"
                    placeholder="Search computers..."
                    class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>
            <button
                @click="showAddForm = true"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                <svg
                    class="-ml-1 mr-2 h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                </svg>
                Add Computer
            </button>
        </div>

        <!-- Add Computer Modal -->
        <Modal :show="showAddForm" @close="showAddForm = false">
            <template #title>Add New Computer</template>
            <template #content>
                <ComputerForm
                    @submit="addComputer"
                    @cancel="showAddForm = false"
                />
            </template>
        </Modal>

        <!-- Edit Computer Modal -->
        <Modal :show="!!editingComputer" @close="editingComputer = null">
            <template #title>Edit Computer</template>
            <template #content>
                <ComputerForm
                    v-if="editingComputer"
                    :computer="editingComputer"
                    @submit="updateComputer"
                    @cancel="editingComputer = null"
                />
            </template>
        </Modal>

        <!-- Computer Table -->
        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
            <div v-if="loading" class="p-6 text-center">
                <Spinner className="h-8 w-8 text-blue-500 mx-auto" />
            </div>
            <div
                v-else-if="filteredComputers.length === 0"
                class="p-6 text-center text-gray-500"
            >
                No computers found
            </div>
            <table v-else class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th
                            scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Name
                        </th>
                        <th
                            scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Serial
                        </th>
                        <th
                            scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Manufacturer
                        </th>
                        <th
                            scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Model
                        </th>
                        <th
                            scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            RAM
                        </th>
                        <th
                            scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Storage
                        </th>
                        <th
                            scope="col"
                            class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    <tr
                        v-for="computer in filteredComputers"
                        :key="computer.id"
                        class="hover:bg-gray-50"
                    >
                        <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center">
                                <div
                                    class="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center"
                                >
                                    <svg
                                        class="h-6 w-6 text-blue-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                </div>
                                <div class="ml-4">
                                    <div
                                        class="text-sm font-medium text-gray-900"
                                    >
                                        {{ computer.name }}
                                    </div>
                                    <div class="text-sm text-gray-500">
                                        {{ computer.operating_system }}
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td
                            class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono"
                        >
                            {{ computer.serial_number }}
                        </td>
                        <td
                            class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                        >
                            {{ computer.manufacturer }}
                        </td>
                        <td
                            class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                        >
                            {{ computer.model }}
                        </td>
                        <td
                            class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                        >
                            {{ computer.ram }} GB
                        </td>
                        <td
                            class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                        >
                            {{ computer.storage }} GB
                        </td>
                        <td
                            class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                        >
                            <button
                                @click="editComputer(computer)"
                                class="text-blue-600 hover:text-blue-900 mr-3"
                                title="Edit"
                            >
                                <svg
                                    class="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                    />
                                </svg>
                            </button>
                            <button
                                @click="deleteComputer(computer.id)"
                                class="text-red-600 hover:text-red-900"
                                title="Delete"
                            >
                                <svg
                                    class="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                </svg>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <div
            v-if="filteredComputers.length > 0"
            class="mt-4 flex items-center justify-between"
        >
            <div class="text-sm text-gray-500">
                Showing
                <span class="font-medium">{{ filteredComputers.length }}</span>
                computers
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useDebounceFn } from "@vueuse/core";
import axios from "axios";
import ComputerForm from "./ComputerForm.vue";
import Modal from "./Modal.vue";
import Spinner from "./Spinner.vue";

const computers = ref([]);
const showAddForm = ref(false);
const editingComputer = ref(null);
const searchTerm = ref("");
const loading = ref(true);

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
