<template>
  <div>
    <nav>
      <h2>Um formulário</h2>
    </nav>
    <button class="toggle-button" @click="show = !show">
      {{ show ? "Recolher" : "Expandir" }}
    </button>

    <transition name="fade">
      <div v-if="show" class="form-container">
        <form action="#" method="post" @submit.prevent="cadUser">
          <label for="email">Email:</label>
          <input type="email" name="email" id="email" v-model="email" /><br>

          <label for="password">Senha:</label>
          <input type="password" name="password" id="password" v-model="senha" /><br>

          <button type="submit">Enviar</button>
        </form>
      </div>
    </transition>

    <ul v-if="listUser.length" class="user-list">
      <li
        v-for="(user, index) in listUser"
        :key="index"
        :class="{ 'user-item': true, 'user-item-done': user && user.done }"
        @click="toggleDone(index)"
      >
        <div>Email: {{ user.email }}</div>
        <div>Senha: {{ user.senha }}</div>
        <button class="delete-button" @click="delUser(index)">Excluir</button>
        <button class="delete-button" @click="edUser(index)">Editar</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
  .toggle-button {
    background-color: #3498db;
    color: #fff;
    padding: 10px;
    border: none;
    cursor: pointer;
  }

  .user-item-done {
    border: 2px solid red; /* Adicione este estilo para a linha vermelha */
  }

  .form-container {
    background-color: #f5f5f5;
    padding: 20px;
    border: 1px solid #ccc;
    margin-top: 20px;
  }

  form label {
    display: block;
    margin-top: 10px;
  }

  form input {
    width: 80%;
    padding: 5px;
    margin-top: 5px;
  }

  button[type="submit"] {
    background-color: #2ecc71;
    color: #fff;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
  }

  .user-list {
    list-style: none;
    margin-top: 20px;
  }

  .user-item {
    background-color: #f5f5f5;
    padding: 10px;
    margin-top: 10px;
    border: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .delete-button {
    background-color: #e74c3c;
    color: #fff;
    padding: 5px 10px;
    border: none;
    cursor: pointer;
  }
</style>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      show: false,
      email: '',
      senha: '',
      listUser: [] as { email: string; senha: string; done?: boolean }[],
    };
  },
  created() {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      this.listUser = JSON.parse(storedUser);
    }
  },
  methods: {
    cadUser() {
      const user = {
        email: this.email,
        senha: this.senha,
        done: false,
      };
      this.listUser.push(user);
      localStorage.setItem("user", JSON.stringify(this.listUser));
      this.email = '';
      this.senha = '';
    },
    delUser(index: number) {
      this.listUser.splice(index, 1);
      localStorage.setItem("user", JSON.stringify(this.listUser));
    },
    edUser(id: number) {
      const checkedNames = this.listUser[id];
      console.log(checkedNames);
    },
    toggleDone(index: number) {
      if (this.listUser[index]) {
        this.listUser[index].done = !this.listUser[index].done;
        localStorage.setItem("user", JSON.stringify(this.listUser));
      }
    },
  },
});
</script>
