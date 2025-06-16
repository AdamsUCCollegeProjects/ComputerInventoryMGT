<template>
    <v-form @submit.prevent="handleSubmit">
        <v-row>
            <v-col cols="12" md="6">
                <v-text-field
                    v-model="formData.name"
                    label="Name"
                    required
                    variant="outlined"
                ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
                <v-text-field
                    v-model="formData.serial_number"
                    label="Serial Number"
                    required
                    variant="outlined"
                ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
                <v-text-field
                    v-model="formData.manufacturer"
                    label="Manufacturer"
                    required
                    variant="outlined"
                ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
                <v-text-field
                    v-model="formData.model"
                    label="Model"
                    required
                    variant="outlined"
                ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
                <v-text-field
                    v-model.number="formData.ram"
                    label="RAM (GB)"
                    type="number"
                    min="1"
                    required
                    variant="outlined"
                ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
                <v-text-field
                    v-model.number="formData.storage"
                    label="Storage (GB)"
                    type="number"
                    min="1"
                    required
                    variant="outlined"
                ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
                <v-select
                    v-model="formData.operating_system"
                    :items="osOptions"
                    label="Operating System"
                    required
                    variant="outlined"
                ></v-select>
            </v-col>

            <v-col cols="12" md="6">
                <v-text-field
                    v-model="formData.purchase_date"
                    label="Purchase Date"
                    type="date"
                    required
                    variant="outlined"
                ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
                <v-text-field
                    v-model.number="formData.cost"
                    label="Cost"
                    type="number"
                    step="0.01"
                    min="0"
                    prefix="$"
                    required
                    variant="outlined"
                ></v-text-field>
            </v-col>

            <v-col cols="12" md="6">
                <v-select
                    v-model="formData.user_id"
                    :items="users"
                    item-title="name"
                    item-value="id"
                    label="User"
                ></v-select>
            </v-col>

            <v-col cols="12">
                <v-textarea
                    v-model="formData.notes"
                    label="Notes"
                    variant="outlined"
                    rows="2"
                ></v-textarea>
            </v-col>

            <v-col cols="12" class="text-right">
                <v-btn
                    type="button"
                    @click="$emit('cancel')"
                    color="grey"
                    variant="outlined"
                    class="mr-2"
                >
                    Cancel
                </v-btn>
                <v-btn type="submit" color="primary">
                    {{ computer ? "Update" : "Add" }} Computer
                </v-btn>
            </v-col>
        </v-row>
    </v-form>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import axios from "axios";

const osOptions = [
    "Windows 10",
    "Windows 11",
    "macOS",
    "Linux",
    "Chrome OS",
    "Other",
];

const props = defineProps({
    computer: {
        type: Object,
        default: null,
    },
});

const emit = defineEmits(["submit", "cancel"]);

const formData = ref({
    name: "",
    serial_number: "",
    manufacturer: "",
    model: "",
    ram: "",
    storage: "",
    operating_system: "",
    purchase_date: "",
    cost: "",
    notes: "",
});

const users = ref([]);
const fetchUsers = async () => {
    try {
        const response = await axios.get("/users");
        users.value = response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
    }
};

onMounted(() => {
    fetchUsers();
});

watch(
    () => props.computer,
    (newComputer) => {
        if (newComputer) {
            formData.value = { ...newComputer };
            // Format date for input field
            if (formData.value.purchase_date) {
                const date = new Date(formData.value.purchase_date);
                formData.value.purchase_date = date.toISOString().split("T")[0];
            }
            // formData.value.user_id = newComputer.user_id;
        }
    },
    { immediate: true }
);

function handleSubmit() {
    emit("submit", formData.value);
}
</script>
