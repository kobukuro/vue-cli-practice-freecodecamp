<template>
  <div id="app">
    <Header/>
    <b-container class="bv-example-row">
      <b-row>
        <b-col sm='6' offset='3'>
          <!-- 用v-if="questions.length"的用意是
          要確保questions的長度非0，才會把變數和函數傳給QuestionBox -->
          <QuestionBox
            v-if="questions.length"
              v-bind:currentQuestion="questions[index]"
              v-bind:next="next"
          />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import QuestionBox from './components/QuestionBox.vue'
export default {
  name: 'App',
  components: {
    Header,
    QuestionBox
  },
  // data 寫法
  data(){
    return{
      questions:[], //在Chrome裝Vue devtool, 可以在F12去看vue的變數等
      index:0
    }
  },
  methods:{
    //可以簡寫成next(){}
    next:function(){
      //將index變數+1
      this.index++
    }
  },
  mounted :function(){
    var uri = 'https://opentdb.com/api.php?amount=10&category=27&type=multiple';
    fetch(uri,{method:'get'})
      .then(response => {
        return response.json()
        })
      .then(jsonData => {
        this.questions = jsonData.results //jsonData回傳response_code以及results，所以要取results
      })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
