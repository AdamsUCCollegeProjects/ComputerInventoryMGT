<template>
    <div class="min-h-screen bg-gray-50">
        <nav class="bg-white shadow-sm">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16">
                    <div class="flex items-center">
                        <h1 class="text-xl font-semibold text-gray-900">
                            Computer Inventory System
                        </h1>
                    </div>
                </div>
            </div>
        </nav>

        <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div class="px-4 py-6 sm:px-0">
                <ComputerList />
            </div>
        </main>
    </div>
</template>

<script setup>
import ComputerList from "./ComputerList.vue";
</script>
