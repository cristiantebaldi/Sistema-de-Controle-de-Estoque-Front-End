<template>
    <div class="d-flex mt-5">
      <v-card 
        class="d-flex align-center"
        rounded="e-lg"
        height="50" 
        >
        <v-card-text>
          BUSCAR
        </v-card-text>
      </v-card>
      <v-card-actions>
        <v-btn
        prepend-icon="mdi-calendar"
        width="120"
        variant="tonal"
        color="blue"
        >DATA</v-btn>
      </v-card-actions>
      
    </div>
        
    <div>
      <v-container>
        <v-data-table
          :headers="headersSale"
          :items="sales"
          :height="420"
          >
          <template #item.total_arrecadado="{ item }">
            {{ formatMoney(item.total_arrecadado) }}
          </template>
          <template #item.data_venda="{ item }">
            {{ formatDate(item.data_venda) }}
          </template>
        </v-data-table>
      </v-container>
    </div>
  </template>
  
  <script setup>

  import axios from "axios";
  import { ref, onMounted } from "vue";
  
  const sales = ref([]);

  const headersSale = ref([
    {title: "Produto", value: "produto"},
    {title: "Data", value: "data_venda"},
    {title: "Quantidade", value: "quantidade_vendida"},
    {title: "Valor Total", value: "total_arrecadado"},
  ]);
  
  const formatMoney = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  };

  onMounted(() => {
    fetchSales();
  })

  const fetchSales = async () => {
    const response = await axios.get(`http://localhost:8080/venda/relatorio-por-dia?data_busca=2024-11-01`)
    sales.value = response.data
  };


  </script>

  