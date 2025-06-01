<template>
    <div>
        <div class="mb-4">
            <button @click="showAddForm = true" class="btn btn-primary">
                Add New Computer
            </button>
            <input
                type="text"
                v-model="searchTerm"
                placeholder="Search..."
                class="form-control mt-2"
            />
        </div>

        <div v-if="showAddForm" class="modal">
            <div class="modal-content">
                <span class="close" @click="showAddForm = false">&times;</span>
                <h2>Add New Computer</h2>
                <computer-form
                    @submit="addComputer"
                    @cancel="showAddForm = false"
                />
            </div>
        </div>

        <div v-if="editingComputer" class="modal">
            <div class="modal-content">
                <span class="close" @click="editingComputer = null"
                    >&times;</span
                >
                <h2>Edit Computer</h2>
                <computer-form
                    :computer="editingComputer"
                    @submit="updateComputer"
                    @cancel="editingComputer = null"
                />
            </div>
        </div>

        <table class="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Serial Number</th>
                    <th>Manufacturer</th>
                    <th>Model</th>
                    <th>RAM (GB)</th>
                    <th>Storage (GB)</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="computer in filteredComputers" :key="computer.id">
                    <td>{{ computer.name }}</td>
                    <td>{{ computer.serial_number }}</td>
                    <td>{{ computer.manufacturer }}</td>
                    <td>{{ computer.model }}</td>
                    <td>{{ computer.ram }}</td>
                    <td>{{ computer.storage }}</td>
                    <td>
                        <button
                            @click="editComputer(computer)"
                            class="btn btn-sm btn-info"
                        >
                            Edit
                        </button>
                        <button
                            @click="deleteComputer(computer.id)"
                            class="btn btn-sm btn-danger"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import ComputerForm from "./ComputerForm.vue";
import axios from "axios";

export default {
    components: {
        ComputerForm,
    },
    data() {
        return {
            computers: [],
            showAddForm: false,
            editingComputer: null,
            searchTerm: "",
        };
    },
    computed: {
        filteredComputers() {
            if (!this.searchTerm) return this.computers;
            const term = this.searchTerm.toLowerCase();
            return this.computers.filter(
                (computer) =>
                    computer.name.toLowerCase().includes(term) ||
                    computer.serial_number.toLowerCase().includes(term) ||
                    computer.manufacturer.toLowerCase().includes(term) ||
                    computer.model.toLowerCase().includes(term)
            );
        },
    },
    created() {
        this.fetchComputers();
    },
    methods: {
        async fetchComputers() {
            try {
                const response = await axios.get("/api/computers");
                this.computers = response.data;
            } catch (error) {
                console.error("Error fetching computers:", error);
            }
        },
        async addComputer(computerData) {
            try {
                const response = await axios.post(
                    "/api/computers",
                    computerData
                );
                this.computers.push(response.data);
                this.showAddForm = false;
            } catch (error) {
                console.error("Error adding computer:", error);
            }
        },
        editComputer(computer) {
            this.editingComputer = { ...computer };
        },
        async updateComputer(updatedComputer) {
            try {
                const response = await axios.put(
                    `/api/computers/${updatedComputer.id}`,
                    updatedComputer
                );
                const index = this.computers.findIndex(
                    (c) => c.id === updatedComputer.id
                );
                if (index !== -1) {
                    this.computers.splice(index, 1, response.data);
                }
                this.editingComputer = null;
            } catch (error) {
                console.error("Error updating computer:", error);
            }
        },
        async deleteComputer(id) {
            if (confirm("Are you sure you want to delete this computer?")) {
                try {
                    await axios.delete(`/api/computers/${id}`);
                    this.computers = this.computers.filter(
                        (computer) => computer.id !== id
                    );
                } catch (error) {
                    console.error("Error deleting computer:", error);
                }
            }
        },
    },
};
</script>

<style scoped>
.table {
    width: 100%;
    border-collapse: collapse;
}
.table th,
.table td {
    padding: 8px;
    border: 1px solid #ddd;
    text-align: left;
}
.btn {
    padding: 5px 10px;
    margin: 0 5px;
    cursor: pointer;
}
.modal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
}
.modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    max-width: 600px;
}
.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
}
</style>
