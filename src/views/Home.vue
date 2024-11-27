<template>
  <!--
    <div class="d-flex mt-5">
      <v-card 
        class="d-flex align-center"
        rounded="e-lg"
        height="75" 
        >
        <v-card-text>
          BUSCAR
        </v-card-text>
      </v-card>
        <v-card-actions >
          <v-date-input
            v-model="model"
            label="Selecione intervalo"
            width="330px"
            multiple="range"
          ></v-date-input>
      </v-card-actions>
      
    </div>
  -->
    <div>
      <v-container>
        <v-data-table
          :headers="headersSale"
          :items="sales"
          :height="485"
          >
          <template #item.total_arrecadado="{ item }">
            {{ formatMoney(item.total_arrecadado/100) }}
          </template>
          <template #item.data_compra="{ item }">
            {{ formatDate(item.data_compra) }}
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
    {title: "Produto", key: "nome_produto"},
    {title: "Quantidade", key: "quantidade"},
    {title: "Data da Venda", key: "data_compra"},
    {title: "Valor Total", key: "total_arrecadado"},
    
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
    const response = await axios.get("http://localhost:8080/venda_produto")
    sales.value = response.data
  };
  

  </script>

  