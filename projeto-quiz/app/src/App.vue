<template>
  <div>
    <h1 style="color: #3498db;">{{ question }}</h1>

    <form @submit.prevent="submitAnswer">
      <div v-for="(option, index) in answers" :key="index">
        <input type="radio" v-model="selectedAnswer" :value="option" style="margin-right: 5px;" />
        <label style="font-weight: bold;">{{ option }}</label>
        <br>
      </div>

      <button type="submit" style="background-color: #2ecc71; color: #fff; padding: 8px 12px; border: none; cursor: pointer;">
        Enviar resposta
      </button>
    </form>

  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      question: undefined,
      answers: [],
      selectedAnswer: null,
      correctAnswer: undefined,
    };
  },
  created() {
    this.getNewQuestion();
  },
  methods: {
    submitAnswer() {
      if (this.selectedAnswer === null) {
        console.log('Por favor, selecione uma resposta antes de enviar.');
        return;
      }

      if (this.selectedAnswer === this.correctAnswer) {
        alert('Parabéns, você acertou!');
      } else {
        alert('Incorreto!');
      }
    },
    getNewQuestion() {
      this.axios
        .get('https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple')
        .then((response) => {
          const data = response.data.results[0];
          this.question = data.question;
          this.correctAnswer = response.data.results[0].correct_answer;
          this.answers = [...data.incorrect_answers, data.correct_answer];
          console.log(this.correctAnswer);
        })
        .catch((error) => {
          console.error('Erro ao obter os dados:', error);
        });
    },
  },
};
</script>

<style scoped>
/* App.css */

h1 {
  color: #3498db;
}

input[type="radio"] {
  margin-right: 5px;
}

label {
  font-weight: bold;
}

button {
  background-color: #2ecc71;
  color: #fff;
  padding: 8px 12px;
  border: none;
  cursor: pointer;
}
</style>
