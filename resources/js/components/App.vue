<template>
    <v-app>
      <v-app-bar app color="primary" dark>
        <v-toolbar-title>Computer Inventory System</v-toolbar-title>
      </v-app-bar>
  
      <v-main>
        <v-container fluid>
          <ComputerList />
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script setup>
  import ComputerList from './ComputerList.vue'
  </script>