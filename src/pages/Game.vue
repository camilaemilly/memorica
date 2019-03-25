<template>
  <q-page>
    <div id="begin">
      <div class="row text-center div_padding">
        <p>Esse jogo da memória é formado por cartas que se repetem duas vezes. Para começar o jogo, as cartas são postas com as figuras voltadas para baixo, para que não possam ser vistas. Você deve virar duas cartas, até que consiga figuras iguais. O jogo termina quando tiver todos pares encontrados. Está pronto(a)?</p>
      </div>
      <div class="row justify-center">
        <q-btn @click="startGame()" color="secondary">Sim, quero jogar!</q-btn>
      </div>
    </div>
    <div class="row text_padding">
      <p class="space">Tempo: <b>{{ this.time }}</b></p>
      <p class="space">Rodadas: <b>{{ this.numberTime }}</b></p>
    </div>
    <section class="table container-fluid">
      <div class="cards container" v-if="!stopGame">
        <div class="cards" v-for="(cards, index) in cards" :key="index" :class="{ over: cards.over, correct: cards.correct}" @click="overCards(cards)">
          <div class="back"></div>
          <div class="front" v-bind:style="{ backgroundImage: 'url(' + cards.url + ')' }"></div>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script>
import cards from '../cards.js'

let shuffleCards = () => {
  let cards1 = JSON.parse(JSON.stringify(cards))
  let cards2 = JSON.parse(JSON.stringify(cards))
  let newCards = [].concat(cards1, cards2)
  var actualIndex = newCards.length, valueTemp, indexRandom
  while (actualIndex !== 0) {
    indexRandom = Math.floor(Math.random() * actualIndex)
    actualIndex -= 1
    valueTemp = newCards[actualIndex]
    newCards[actualIndex] = newCards[indexRandom]
    newCards[indexRandom] = valueTemp
  }
  return newCards
}

export default {
  data () {
    return {
      stopGame: true,
      off: false,
      watch: 0,
      time: 0,
      cards: [],
      numberTime: 0,
      match: 0,
      overTime: 0,
      showFinal: false
    }
  },
  methods: {
    restart () {
      this.showFinal = false
      this.stopGame = true
      this.off = false
      this.time = 0
      this.numberTime = 0
      clearInterval(this.watch)
      this.watch = 0
      let cards = shuffleCards()

      cards.forEach(cards => {
        cards.over = false
        cards.correct = false
      })

      this.cards = cards
    },
    startGame () {
      document.getElementById('begin').style.display = 'none'
      this.showFinal = false
      this.stopGame = false
      this.watch = true
      this.watch = setInterval(() => {
        this.time++
      }, 1000)
    },
    endGame () {
      this.stopGame = true
      clearInterval(this.watch)
      let json = [{
        score: this.numberTime,
        time: this.time
      }]
      this.$store.dispatch('insertGamers', json)
      this.$router.push('/endGame')
    },
    cardsOver () {
      return this.cards.filter(cards => cards.over)
    },
    sameCardOver () {
      let cardsOver = this.cardsOver()
      if (cardsOver.length === 2) {
        if (cardsOver[0].name === cardsOver[1].name) {
          return true
        }
      }
    },
    overCardsTap () {
      this.cards.forEach(cards => {
        if (cards.over) {
          cards.correct = true
        }
      })
    },
    checkAll () {
      let cardsSearch = this.cards.filter(cards => cards.correct)
      this.match = cardsSearch.length
      if (cardsSearch.length === this.cards.length) {
        return true
      }
    },
    overCards (cards) {
      if (cards.correct || cards.over) return
      let cont = this.cardsOver().length
      if (cont === 0) {
        cards.over = !cards.over
        this.numberTime++
      } else if (cont === 1) {
        cards.over = !cards.over
        this.numberTime++
        if (this.sameCardOver()) {
          this.flipBackTimer = setTimeout(() => {
            this.cleanUntapTime()
            this.overCardsTap()
            this.untap()
            if (this.checkAll()) {
              this.endGame()
            }
          }, 200)
        } else {
          this.overTime = setTimeout(() => {
            this.cleanUntapTime()
            this.untap()
          }, 1000)
        }
      }
    },
    cleanUntapTime () {
      clearTimeout(this.overTime)
      this.overTime = null
    },
    untap () {
      this.cards.map(cards => {
        cards.over = false
      })
      return true
    }
  },
  created () {
    this.restart()
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}
.space {
  padding-left: 2%;
}
.div_padding {
  margin: 4%;
}
.text_padding {
  padding-top: 3%;
}
.table {
  padding: 20px;
  min-height: 100%;
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
}
.cards .cards {
  position: relative;
  display: inline-block;
  width: 218px;
  height: 127px;
  margin: 5px;
  transition: opacity 0.3s;
}
.cards .cards .front, .cards .cards .back {
  border-radius: 10px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transform: translateZ(0);
  transition: transform 0.5s;
  transform-style: preserve-3d;
}
.cards .cards .back {
  background-image: url('~assets/card.png');
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
}
.cards .cards .front {
  transform: rotateY(-180deg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.cards .cards.over .back, .cards .cards.correct .back {
  transform: rotateY(180deg);
}
.cards .cards.over .front, .cards .cards.correct .front {
  transform: rotateY(0deg);
}
.cards .cards.correct {
  opacity: 0.3;
}
</style>
