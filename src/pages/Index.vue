<template>
  <q-page padding>
    <div class="row justify-center">
      <p class="text">Seja bem vindo ao Memóri<b>Ca</b>!</p>
    </div>
    <div class="row justify-center">
      <p class="subtitle">Um jogo de memória feito para treinar suas habilidades cognitivas!</p>
    </div>
    <div class="row justify-center">
      <q-input type="text" v-model="name" align="center" placeholder="Qual é o seu nome?"/>
    </div>
    <br>
    <div class="row justify-center">
      <q-btn to="/game" color="secondary" @click="jogar()">Começar</q-btn>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      name: ''
    }
  },
  methods: {
    jogar () {
      let json = [{
        name: this.name
      }]
      this.$store.dispatch('insertNames', json)
      this.$router.push('/game')
    }
  }
}
</script>

<style>
.text {
  font-size: 56px;
  padding-top: 5%
}
.subtitle {
  font-size: 20px;
  padding-bottom: 5%
}
</style>
