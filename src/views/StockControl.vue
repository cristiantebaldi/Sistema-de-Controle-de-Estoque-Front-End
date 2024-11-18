<template>
     <div class="d-flex mt-5">
      <v-card 
        class="d-flex align-center"
        rounded="e-lg"
        height="50" 
        >
        <v-card-text>
          NOVO(A):
        </v-card-text>
      </v-card>
      
      <v-card-actions>
        <v-btn
        width="120"
        variant="tonal"
        color="green"
        prepend-icon="mdi-tag-plus"
        >Venda</v-btn>
        <v-btn
        width="120"
        variant="tonal"
        color="yellow"
        prepend-icon="mdi-package-variant-closed-check"
        >Repor</v-btn>
        <v-btn
        width="120"
        variant="tonal"
        color="orange"
        prepend-icon="mdi-package-variant-closed-plus"
        >Produto</v-btn>
        <v-btn
        width="200"
        variant="tonal"
        color="deep-orange-darken-2"
        prepend-icon="mdi-exclamation"
        >Baixo Estoque</v-btn>
      </v-card-actions>
    </div>

    <div>
      <v-container>
        <v-data-table
          :headers="headersProduct"
          :items="products"
          :height="500">
          <template #item.preco="{ item }">
            {{ formatMoney(item.preco) }}
          </template>
        </v-data-table>
      </v-container>
    </div>
</template>
  <script setup>
    import axios from "axios";
    import { ref, onMounted } from "vue";

    const products = ref([]);

    const headersProduct = ref([
    {title: "Produto", value: "nome"},
    {title: "Estoque Atual", value: "quantidade"},
    {title: "Preço unitário", value: "preco"},
    {title: "Estoque Mínimo", value: "quantidade_min"},
  ]);

    const formatMoney = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

    onMounted(() => {
      fetchProducts();
    })

    const fetchProducts = async () => {
    const response = await axios.get(`http://localhost:8080/produto`)
    products.value = response.data
  };

  </script>
  
