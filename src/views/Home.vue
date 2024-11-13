<template>
    <div class="d-flex mt-5">
          <v-card 
          class="d-flex align-center"
          rounded="e-lg"
          height="50" 
          >
          <v-card-text>
            FILTRAR POR:
          </v-card-text>
          <v-card-actions>
              <v-btn
              width="120"
              variant="tonal"
              color="red"
              >Vendas</v-btn>
              <v-btn
              width="120"
              variant="tonal"
              color="green"
              >Compras</v-btn>
            </v-card-actions>
          </v-card>
        </div>
  
        <v-container>
          <v-data-table
          :items="sales"
          :height="380">
          </v-data-table>
        </v-container>
  </template>
  
  <script setup>

  import axios from "axios";
  import { ref, onMounted } from "vue";
  
  const sales = ref([]);

  onMounted(() => {
    fetchSales();
  })

  const fetchSales = async () => {
    const response = await axios.get(`http://localhost:8080/venda/relatorio-por-dia?data_busca=2024-11-01`)
    sales.value = response.data
  };


  </script>

  