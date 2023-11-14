<template>
  <div class="home">
    <div class="section" id="Empresa">
      <button @click="show = !show">
        Empresa
      </button>
      <transition name="fade">
        <div v-if="show">
          <p>
            Nome: <input v-model="nome" type="text" class="input-field" name="nome" id="nome" />
            Ramo: <input v-model="ramo" type="text" class="input-field" name="ramo" id="ramo" />
            <button @click="createEmpresa" class="btn-cadastrar">Cadastrar</button>
          </p>

        
          <div v-if="empresas.length > 0">
            <h2>Empresas Cadastradas:</h2>
            <ul>
              <li v-for="(empresa, index) in empresas" :key="index">
                {{ empresa }}
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>


    <div class="section" id="Funcionario">
      <button @click="showFuncionario = !showFuncionario">
        Funcionario
      </button>
      <transition name="fade">
        <div v-if="showFuncionario">
          <p>
            Id: <input type="number" class="input-field" name="id" id="id" v-model="funcionarioId" />
            Name: <input type="text" class="input-field" name="name" id="name" v-model="funcionarioName" />
            <button @click="cadastrarFuncionario" class="btn-cadastrar">Cadastrar</button>
          </p>
        </div>
      </transition>
    </div>

    <div class="section" id="Equipe">
      <button @click="showEquipe = !showEquipe">
        Equipe
      </button>
      <transition name="fade">
        <div v-if="showEquipe">
          <p>
            Cadastrar lider: <input v-model="liderNome" type="text" class="input-field" name="nome" id="nome" />
            <button @click="cadastrarLider" class="btn-cadastrar">Cadastrar</button>
          </p>
          <ul v-for="(funcionario, index) in funcionarios" :key="index">
            <table>
              <th>Nomes</th>
              <tr>{{ funcionario }}</tr>
            </table>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import http from '@/services/http';

export default defineComponent({
  data() {
    return {
      show: false,
      showFuncionario: false,
      showEquipe: false,
      funcionarios: ['a', 'b', 'c'] as string[],
      empresas: [] as string[],
      nome: '',
      ramo: '',
      funcionarioId: 0,
      funcionarioName: '',
      liderNome: '',
    };
  },
  methods: {
    async createEmpresa() {
      const empresa = {
        nome: this.nome,
        ramo: this.ramo,
      };
      try {
        const response = await http.post('/empresa', empresa);
        this.empresas.push(response.data);
        this.nome = '';
        this.ramo = '';
      } catch (error) {
        console.error('Erro ao cadastrar empresa:', error);
      }
    },
    async getEmpresa() {
      http.get('/empresa').then((x: any) => this.empresas = x.data)
        .catch(err => alert('Algo deu errado, tente novamente mais tarde.'));
    },
    async cadastrarFuncionario() {
      const funcionario = {
        id: this.funcionarioId,
        name: this.funcionarioName,
      };

      const response = await http.post('/funcionario', funcionario);
      this.funcionarioId = 0;
      this.funcionarioName = '';
    },
    async cadastrarLider() {
      const lider = {
        nome: this.liderNome,
      };

      const response = await http.post('/lider', lider);
      // Faça algo com a resposta, se necessário
      this.liderNome = '';
    },
  },
});
</script>

<style scoped>
.input-field {
  margin-bottom: 10px;
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
}

.btn-cadastrar {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.btn-cadastrar:hover {
  background-color: #45a049;
}
</style>