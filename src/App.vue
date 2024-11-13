<template>
  <v-app>
    <router-view></router-view>
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
          stacked
          @click="navigateToHome"
          >
            Relatório        
          </v-btn>
          <v-btn
          width="150"
          variant="tonal"
          color="amber-darken-3"
          prepend-icon="mdi-package-variant-closed"
          stacked
          @click="navigateToStockControl"
          >
          Estoque
          </v-btn>
        </v-card-actions>
      </v-card>
      </div>
   
  </v-app>
</template>

<script>
export default {
  methods: {
    navigateToHome() {
      this.$router.push({ name: 'Home' });
    },
    navigateToStockControl() {
      this.$router.push({ name: 'StockControl' });
    }
    
  }

  
};


</script>




