<template>
    <form @submit.prevent="handleSubmit">
        <div class="form-group">
            <label>Name:</label>
            <input v-model="formData.name" required class="form-control" />
        </div>

        <div class="form-group">
            <label>Serial Number:</label>
            <input
                v-model="formData.serial_number"
                required
                class="form-control"
            />
        </div>

        <div class="form-group">
            <label>Manufacturer:</label>
            <input
                v-model="formData.manufacturer"
                required
                class="form-control"
            />
        </div>

        <div class="form-group">
            <label>Model:</label>
            <input v-model="formData.model" required class="form-control" />
        </div>

        <div class="form-group">
            <label>RAM (GB):</label>
            <input
                v-model="formData.ram"
                type="number"
                required
                class="form-control"
            />
        </div>

        <div class="form-group">
            <label>Storage (GB):</label>
            <input
                v-model="formData.storage"
                type="number"
                required
                class="form-control"
            />
        </div>

        <div class="form-group">
            <label>Operating System:</label>
            <input
                v-model="formData.operating_system"
                required
                class="form-control"
            />
        </div>

        <div class="form-group">
            <label>Purchase Date:</label>
            <input
                v-model="formData.purchase_date"
                type="date"
                required
                class="form-control"
            />
        </div>

        <div class="form-group">
            <label>Cost:</label>
            <input
                v-model="formData.cost"
                type="number"
                step="0.01"
                required
                class="form-control"
            />
        </div>

        <div class="form-group">
            <label>Notes:</label>
            <textarea v-model="formData.notes" class="form-control"></textarea>
        </div>

        <div class="form-actions">
            <button type="submit" class="btn btn-primary">Submit</button>
            <button
                type="button"
                @click="$emit('cancel')"
                class="btn btn-secondary"
            >
                Cancel
            </button>
        </div>
    </form>
</template>

<script>
export default {
    props: {
        computer: {
            type: Object,
            default: null,
        },
    },
    data() {
        return {
            formData: {
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
            },
        };
    },
    created() {
        if (this.computer) {
            this.formData = { ...this.computer };
            // Format date for input field
            if (this.formData.purchase_date) {
                const date = new Date(this.formData.purchase_date);
                this.formData.purchase_date = date.toISOString().split("T")[0];
            }
        }
    },
    methods: {
        handleSubmit() {
            this.$emit("submit", this.formData);
        },
    },
};
</script>

<style scoped>
.form-group {
    margin-bottom: 15px;
}
.form-control {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
}
.form-actions {
    margin-top: 20px;
    text-align: right;
}
</style>
