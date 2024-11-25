<template>
     <div class="d-flex mt-5">
      <v-card 
        class="d-flex align-center"
        rounded="e-lg"
        height="50" 
        >
        <v-card-text>
          NOVO(A)
        </v-card-text>
      </v-card>
      
      <v-card-actions
      class="me-auto">
        <v-btn
        width="120"
        variant="tonal"
        color="green"
        prepend-icon="mdi-tag-plus"
        >Venda</v-btn>
        <v-btn
        @click="createProduct"
        width="120"
        variant="tonal"
        color="orange"
        prepend-icon="mdi-package-variant-closed-plus"
        >Produto</v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-btn
        width="200"
        variant="tonal"
        color="yellow"
        prepend-icon="mdi-package-variant-closed-check"
        >Repor Estoque</v-btn>
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
          :height="420">
          <template #item.preco="{ item }">
            {{ formatMoney(item.preco) }}
          </template>
          <template #item.actions="{ item }">
            <v-card-actions>
              <v-btn
                color="yellow"
                icon="mdi-pencil"
                size="small"
                @click="updateProduct(item)">
              </v-btn>
              <v-btn
              color="red"
              icon="mdi-delete"
              size="small"
              @click="deleteProduct(item)">
              </v-btn>
          </v-card-actions>
          </template>
          <template #item.valor_estoque="{ item }">
            {{ formatMoney(item.valor_estoque) }}
          </template>
        </v-data-table>
      </v-container>
    </div>

    <!-- Caixa de Dialogo para criar e editar prduto -->
    <v-dialog v-model="dialog" width="500" >
      <v-card>
        <v-card
        variant="tonal"
        rounded="0"
        >
         <v-card-text
         class="d-flex justify-center "
         > 
          <h2>Informações do Produto</h2>
         </v-card-text>
        </v-card>
        <v-card-text>
          <v-row no-gutters>
            <v-col
            cols="12" md="7" sm="7">
            <v-text-field
            v-model="product.nome"
            :rules="productRules"
            label="Nome do Produto"
            type="input"/>
            </v-col>
            <v-col cols="12" md="5" sm="5">
            <v-text-field
            class="pl-2"
            :rules="amountRules"
            v-model="product.quantidade"
            label="Quantidade"
            type="number"
            />
            </v-col>
            <v-col cols="12" md="7" sm="6">
            <v-text-field
            class="pt-2"
            v-model="product.preco"
            label="Preço"
            ref="inputRef"/>
            </v-col>
            <v-col
            cols="12"
            md="5"
            sm="6"
          >
            <v-text-field
            class="pl-2 pt-2"
            :rules="amountRules"
            v-model="product.quantidade_minima"
            label="Quantidade Mínima"
            hint="Alerta para estoque baixo"
            type="number"/>
            </v-col>
          </v-row>
        </v-card-text>
        
        <v-card-actions>
          <v-btn
          prepend-icon="mdi-close"
          @click="dialog = false">
          cancelar</v-btn>
          <v-btn
          color="orange"
          prepend-icon="mdi-content-save"
          @click="saveProduct">salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Caixa de Dialogo para excluir produto -->

    <!-- Caixa de Dialogo para venda -->

    <!-- Caixa de Dialogo para repor estoque -->

    <!-- Caixa de Dialogo para baixo estoque -->
</template>
  <script setup>
    import axios from "axios";
    import { useCurrencyInput } from 'vue-currency-input';
    import { ref, onMounted, watch } from "vue";

    const products = ref([]);
    const product = ref({});
    const dialog = ref(false);

    const productRules = [
      value => {
        if (value) return true;

        return "O campo deve ser preenchido.";
      },

      value => {
        const existingProduct = products.value.find(product => product.nome.toLowerCase() === value.toLowerCase());
        return !existingProduct || "Produto já existe.";
      }
    ]

    const amountRules = [
      value => {
          if (value) {
            return true;
          } 

          return "informe a quantidade.";
        },

      value => {
        if (/^\d+$/.test(value)) {
          return true;
        }

        return "Digte apenas números.";
      }
    ]

    const headersProduct = ref([
    {title: "Produto", value: "nome"},
    {title: "Estoque Atual", value: "quantidade"},
    {title: "Preço unitário", value: "preco"},
    {title: "Valor Total", value: "valor_estoque"},
    {title: "Ações", key: "actions"},
  ]);

  const formatMoney = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  // Funcionalidade para formatar o dinheiro
  const props = defineProps({ modelValue: Number });

  const { inputRef, setValue } = useCurrencyInput({
    currency: 'BRL',
    hideCurrencySymbolOnFocus: false,
    hideGroupingSeparatorOnFocus: false,
    autoDecimalMode: true,
    precision: 2,
  });

  watch(
    () => props.modelValue,
    (value) => {
      setValue(value);
    }
  );
  
  const unformatCurrency = (formattedValue) => {
  return parseFloat(
    formattedValue.replace(/[^0-9,-]+/g, "").replace(",", ".")
  );
  };  

  onMounted(() => {
    fetchProducts();
  })

  const fetchProducts = async () => {
    const response = await axios.get(`http://localhost:8080/produto`)
    products.value = response.data
  };

  const updateProduct = (e) => {
    product.value = e;
    dialog.value = true;
  };
  const createProduct = async () => {
    product.value = {
    nome: "",
    quantidade: null,
    preco: null,
    quantidade_minima: null,
    };
    dialog.value = true;
  };

  const saveProduct = async () => {
    product.value.preco = unformatCurrency(product.value.preco);
    if (product.value.id) {
      await axios.put(`http://localhost:8080/produto/${product.value.id}`, product.value
      );
      dialog.value = false;
      return;
    };
    await axios.post(`http://localhost:8080/produto`, product.value);
    dialog.value = false;
    fetchProducts();
  }

  const deleteProduct = async (product) => {
    await axios.delete(`http://localhost:8080/produto/${product.id}`, product.value);
    fetchProducts();
  }

  </script>
  
