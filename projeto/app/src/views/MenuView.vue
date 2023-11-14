<template>
  <div>
    <h1>Menu Interativo</h1>

    <button @click="loadAllItens">Carregar Itens</button>

    <button @click="show = !show">
      {{ show ? "Recolher" : "Expandir" }}
    </button>

    <transition name="fade">
      <div v-if="show">
        <div v-for="(item, index) in itens" :key="index">
          <nav>
            {{ item }}
          </nav>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';

export default defineComponent({
  name: 'MenuView',
  data() {
    return {
      itens: [] as string[],
      show: false
    };
  },
  
  methods: {
    loadAllItens() {
      this.itens = ['Item 1', 'Item 2', 'Item 3'];
    }
  }
});
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to  {
  opacity: 0;
  color: red;
}
</style>
