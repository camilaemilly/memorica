<template>
  <q-page padding>
    <div class="row justify-center">
      <p class="text_title">Você ganhou o jogo, parabéns!</p>
    </div>
    <div class="row justify-center">
      <p class="text_score"> Sua pontuação foi de {{ getUser.score }} rodadas nessa partida</p>
    </div>
    <div class="row justify-center">
      <h6>Ranking com as melhores rodadas</h6>
    </div>
    <table class="q-table responsive">
      <thead>
        <tr>
          <th class="text-center">Posição</th>
          <th class="text-center">Jogador</th>
          <th class="text-center">Tempo</th>
          <th class="text-center">Número de rodadas</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(gamer, index) in getGamers" :key="index">
          <td class="text-center"> {{ index + 1}} º</td>
          <td class="text-center">{{ gamer.name }}</td>
          <td class="text-center">{{ gamer.time }}</td>
          <td class="text-center">{{ gamer.score }}</td>
        </tr>
      </tbody>
    </table>
    <div class="row justify-center button">
      <q-btn to="/" color="secondary">Jogar novamente</q-btn>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  computed: {
    getGamers () {
      return this.$store.getters.getGamers
    },
    getUser () {
      return this.$store.getters.getUser
    }
  }
}
</script>

<style>
.button {
  padding-top: 5%
}
.text_title {
  padding-top: 5%;
  font-size: 50px;
}
.text_score {
  color: rgb(34, 139, 104);
}
</style>
