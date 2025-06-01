<template>
    <div class="container">
        <h1>Computer Inventory Management System</h1>
        <computer-list />
    </div>
</template>

<script>
import ComputerList from "./ComputerList.vue";

export default {
    components: {
        ComputerList,
    },
};
</script>

<style>
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}
</style>
