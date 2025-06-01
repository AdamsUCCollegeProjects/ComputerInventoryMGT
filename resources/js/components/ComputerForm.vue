<template>
    <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
                <label
                    for="name"
                    class="block text-sm font-medium text-gray-700"
                    >Name</label
                >
                <input
                    id="name"
                    v-model="formData.name"
                    type="text"
                    required
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>

            <div>
                <label
                    for="serial_number"
                    class="block text-sm font-medium text-gray-700"
                    >Serial Number</label
                >
                <input
                    id="serial_number"
                    v-model="formData.serial_number"
                    type="text"
                    required
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>
        </div>

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
                <label
                    for="manufacturer"
                    class="block text-sm font-medium text-gray-700"
                    >Manufacturer</label
                >
                <input
                    id="manufacturer"
                    v-model="formData.manufacturer"
                    type="text"
                    required
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>

            <div>
                <label
                    for="model"
                    class="block text-sm font-medium text-gray-700"
                    >Model</label
                >
                <input
                    id="model"
                    v-model="formData.model"
                    type="text"
                    required
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>
        </div>

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
                <label for="ram" class="block text-sm font-medium text-gray-700"
                    >RAM (GB)</label
                >
                <input
                    id="ram"
                    v-model.number="formData.ram"
                    type="number"
                    min="1"
                    required
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>

            <div>
                <label
                    for="storage"
                    class="block text-sm font-medium text-gray-700"
                    >Storage (GB)</label
                >
                <input
                    id="storage"
                    v-model.number="formData.storage"
                    type="number"
                    min="1"
                    required
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>
        </div>

        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
                <label
                    for="operating_system"
                    class="block text-sm font-medium text-gray-700"
                    >Operating System</label
                >
                <select
                    id="operating_system"
                    v-model="formData.operating_system"
                    required
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                    <option value="">Select OS</option>
                    <option value="Windows 10">Windows 10</option>
                    <option value="Windows 11">Windows 11</option>
                    <option value="macOS">macOS</option>
                    <option value="Linux">Linux</option>
                    <option value="Chrome OS">Chrome OS</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            <div>
                <label
                    for="purchase_date"
                    class="block text-sm font-medium text-gray-700"
                    >Purchase Date</label
                >
                <input
                    id="purchase_date"
                    v-model="formData.purchase_date"
                    type="date"
                    required
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>
        </div>

        <div>
            <label for="cost" class="block text-sm font-medium text-gray-700"
                >Cost ($)</label
            >
            <div class="mt-1 relative rounded-md shadow-sm">
                <div
                    class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                >
                    <span class="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                    id="cost"
                    v-model.number="formData.cost"
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    class="block w-full pl-7 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>
        </div>

        <div>
            <label for="notes" class="block text-sm font-medium text-gray-700"
                >Notes</label
            >
            <textarea
                id="notes"
                v-model="formData.notes"
                rows="3"
                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
        </div>

        <div class="flex justify-end space-x-3 pt-4">
            <button
                type="button"
                @click="$emit('cancel')"
                class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                Cancel
            </button>
            <button
                type="submit"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
                {{ computer ? "Update" : "Add" }} Computer
            </button>
        </div>
    </form>
</template>

<script setup>
import { ref, watch } from "vue";

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
        }
    },
    { immediate: true }
);

function handleSubmit() {
    emit("submit", formData.value);
}
</script>
