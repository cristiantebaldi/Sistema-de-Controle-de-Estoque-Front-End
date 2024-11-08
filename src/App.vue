<template>
  <v-app>
    <v-main>

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
          :headers="headers"
          :items="products"
        >
        <template v-slot:item.product="{ product 
        }">
            <v-chip :color="getColor(nome)">
              {{ product }}
            </v-chip>
          </template>
        </v-data-table>
      </v-container>

     <div class="d-flex justify-center" 
     style="position: absolute;
     bottom: 0;
     width: 100%;">
      <v-card 
      rounded="sm"
      height="95"
      >
        <v-card-actions>
          <v-btn
          width="150"
          variant="tonal"
          color="amber-darken-3"
          prepend-icon="mdi-chart-box-outline"
          stacked>Relatório</v-btn>
          <v-btn
          width="150"
          variant="tonal"
          color="amber-darken-3"
          prepend-icon="mdi-package-variant-closed"
          stacked>Estoque</v-btn>
        </v-card-actions>
      </v-card>
     </div>
    
    </v-main>

    
  </v-app>
</template>

<script setup>
  import axios from "axios";
  import { ref, onMounted } from "vue";

  const products = ref([]);


  onMounted(() => {
    fetchProducts();
  })


  const fetchProducts = async () => {
    const response = await axios.get(`http://localhost:8080/produto`)
    products.value = response.data
  };
</script>
