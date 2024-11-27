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
        @click="createSell"
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
        @click="createProductAddQtd"
        width="200"
        variant="tonal"
        color="yellow"
        prepend-icon="mdi-package-variant-closed-check"
        >Repor Estoque</v-btn>
        <v-btn
        @click="openDialogProductsLowStock"
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
            v-model="product.quantidade_min"
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
    <v-dialog v-model="dialogSell" width="500" >
      <v-card>
        <v-card
        variant="tonal"
        rounded="0"
        >
         <v-card-text
         class="d-flex justify-center "
         > 
          <h2>Realizar Venda</h2>
         </v-card-text>
        </v-card>
        <v-card-text>
          <v-row no-gutters>
            <v-col
            cols="12" md="7" sm="7">
            <v-select
            v-model="sell.nome"
            :items="products.map(product => product.nome)"
            label="Nome do Produto"/>
            </v-col>
            <v-col cols="12" md="5" sm="5">
            <v-text-field
            class="pl-2"
            :rules="amountRules"
            v-model="sell.quantidade"
            label="Quantidade"
            type="number"
            />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn
          prepend-icon="mdi-close"
          @click="dialogSell = false">
          cancelar</v-btn>
          <v-btn
          color="green"
          prepend-icon="mdi-content-save"
          @click="saveSell">salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
    <!-- Caixa de Dialogo para repor estoque -->
    <v-dialog v-model="dialogProductAddQtd" width="500" >
      <v-card>
        <v-card
        variant="tonal"
        rounded="0"
        >
         <v-card-text
         class="d-flex justify-center "
         > 
          <h2>Repor Estoque</h2>
         </v-card-text>
        </v-card>
        <v-card-text>
          <v-row no-gutters>
            <v-col
            cols="12" md="7" sm="7">
            <v-select
            v-model="productAddQtd.nome"
            :items="products.map(product => product.nome)"
            label="Nome do Produto"/>
            </v-col>
            <v-col cols="12" md="5" sm="5">
            <v-text-field
            class="pl-2"
            :rules="amountRules"
            v-model="productAddQtd.quantidade"
            label="Quantidade"
            type="number"
            />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn
          prepend-icon="mdi-close"
          @click="dialogProductAddQtd = false">
          cancelar</v-btn>
          <v-btn
          color="green"
          prepend-icon="mdi-content-save"
          @click="saveUpdateQtdProduct">salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Caixa de Dialogo para baixo estoque -->
    <v-dialog v-model="dialogLowStock" width="500" >
      <v-card>
        <v-card
        variant="tonal"
        rounded="0"
        >
         <v-card-text
         class="d-flex justify-center "
         > 
          <h2>Produtos abaixo do estoque</h2>
         </v-card-text>
        </v-card>
          <v-data-table
            :headers="headersProductsLowStock"
            :items="productsLowStock"
            :height="300"
            :width="500">
            <template #item.preco="{ item }">
            {{ formatMoney(item.preco/100) }}
            </template>
          </v-data-table>
      </v-card>
    </v-dialog>


</template>
  <script setup>
    import axios from "axios";
    import { useCurrencyInput } from 'vue-currency-input';
    import { ref, onMounted, watch } from "vue";

    const products = ref([]);
    const product = ref({});
    const dialog = ref(false);

    const sell = ref({});
    const dialogSell = ref(false);

    const productsLowStock = ref([]);
    const dialogLowStock = ref(false);

    const dialogProductAddQtd = ref(false);
    const productAddQtd = ref({});

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
    {title: "Ações", value: "actions"},
    ]);


    const headersProductsLowStock = ref([
    {title: "Produto", value: "nome"},
    {title: "Estoque Atual", value: "quantidade"},
    {title: "Preço unitário", value: "preco"},
    {title: "Quantidade Miníma", value: "quantidade_min"},
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

  const updateProduct = (item) => {
    product.value = {
        ...item,
        preco: formatMoney(item.preco),
    };
    dialog.value = true;
};

  const createProduct = async () => {
    product.value = {
    nome: "",
    quantidade: null,
    preco: null,
    quantidade_min: null,
    };
    dialog.value = true;
  };

  const saveProduct = async () => {
    product.value.preco = unformatCurrency(product.value.preco);

    if (product.value.id) {
        await axios.put(`http://localhost:8080/produto/${product.value.id}`, product.value);
    } else {
        await axios.post(`http://localhost:8080/produto`, product.value);
    }

    dialog.value = false;
    fetchProducts();
};

  const deleteProduct = async (product) => {
    
    await axios.delete(`http://localhost:8080/produto/${product.id}`, product.value);
    fetchProducts();
  }

  const createSell = async() => {
    dialogSell.value = true
  }
  const saveSell = async () => {
  try {

    await axios.post(`http://localhost:8080/venda`, {
      data_compra: new Date().toISOString(),
    });

  
    const salesResponse = await axios.get(`http://localhost:8080/venda`);
    const sales = salesResponse.data;
    const lastSell = sales[sales.length - 1]; 
    const idSell = lastSell.id;

    const selectedProduct = products.value.find(
      (p) => p.nome === sell.value.nome
    );

    if (!selectedProduct) {
      alert("Produto não encontrado.");
      return;
    }

  
    await axios.post(`http://localhost:8080/venda_produto`, {
      id_produto: selectedProduct.id,
      id_venda: idSell,
      quantidade: sell.value.quantidade,
    });

 
    fetchProducts();
    alert("Venda realizada com sucesso!");
    dialogSell.value = false; 
  } catch (error) {
    console.error("Erro ao registrar a venda:", error);
    alert("Erro ao realizar a venda. Verifique os dados e tente novamente.");
  }
  };


  const openDialogProductsLowStock = async () => {
    dialogLowStock.value = true;
    const response = await axios.get(`http://localhost:8080/produto/ver-em-falta`)
    productsLowStock.value = response.data
  };

  const createProductAddQtd = async () => {
    dialogProductAddQtd.value = true;
  }

  const saveUpdateQtdProduct = async () => {
  try {
    if (!productAddQtd.value.nome || !productAddQtd.value.quantidade) {
      alert("Preencha todos os campos.");
      return;
    }

    const selectedProduct = products.value.find(
      (p) => p.nome === productAddQtd.value.nome
    );

    if (!selectedProduct) {
      alert("Produto não encontrado.");
      return;
    }

    await axios.put(
      `http://localhost:8080/produto/${selectedProduct.id}/entrada/${productAddQtd.value.quantidade}`
    );

    alert("Quantidade atualizada com sucesso!");
    fetchProducts();
    dialogProductAddQtd.value = false;
  } catch (error) {
    console.error("Erro ao atualizar a quantidade:", error);
    alert("Erro ao atualizar a quantidade. Tente novamente.");
  }
};

  </script>
  
