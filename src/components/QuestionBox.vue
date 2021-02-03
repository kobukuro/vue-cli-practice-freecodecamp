<template>
    <div class='question-box-container'>
        <b-jumbotron>
            <!-- <template #header>BootstrapVue</template> -->

            <template #lead>
                <!-- 取得question property -->
                {{ currentQuestion.question }}
            </template>

            <hr class="my-4"/>
            <!-- v-for需要v-bind:key去指定unique identifier，
            index是內建的-->
            <!-- b-list-group為套用 Bootstrap Vue的List group layout-->
            <!--  -->
            <b-list-group>
                <b-list-group-item 
                    v-for="(answer, index) in shuffledAnswers" 
                    v-bind:key="index"
                    v-on:click.prevent="selectAnswer(index)"
                    v-bind:class="[selectedIndex === index ? 'selected' : '']"
                >
                    {{ answer }}
                </b-list-group-item>
            </b-list-group>

            <b-button 
                variant="primary"
                v-on:click="submitAnswer"
            >
                Submit
            </b-button>
            <b-button v-on:click="next" variant="success" href="#">Next</b-button>
        </b-jumbotron>
    </div>
</template>

<script>
import _ from 'lodash'

export default {
    //從parent component要傳進來的變數，要寫在這裡
    props:{
        currentQuestion : Object, //type
        next : Function,
        increment: Function
    },
    data: function(){
        return{
            selectedIndex: null,
            shuffledAnswers: [],
            correctIndex: null,
        }
    },
    computed:{
        answers: function(){
            //利用「...」去copy this.currentQuestion.incorrect_answers，
            //而不是去reference it，所以不會更動到原本的this.currentQuestion.incorrect_answers
            let answers = [...this.currentQuestion.incorrect_answers];
            answers.push(this.currentQuestion.correct_answer);
            return answers
        }
    },
    // watch用來監控props裡的變數有變動時觸發function
    // 例如：currentQuestion: function(){}
    // 代表currentQuestion這個props裡的變數的值有變動時，會觸發這個function
    watch:{
        currentQuestion: {
            // 加上immediate: true，並且用handler的形式，
            // 可以在從props收到currentQuestion時，也會run，不只是currentQuestion的值變動時
            immediate: true,
            handler(){
                //清空所選的index
                this.selectedIndex = null;
                this.shuffleAnswers()
            }
            
        }
    },
    //為了import shuffle function，install using command "npm i lodash"
    methods:{
        selectAnswer: function(index){
            this.selectedIndex = index;
        },
        shuffleAnswers:function(){
            let answers = [...this.currentQuestion.incorrect_answers,this.currentQuestion.correct_answer];
            this.shuffledAnswers = _.shuffle(answers);
            this.correctIndex = this.shuffledAnswers.indexOf(this.currentQuestion.correct_answer)
        },
        submitAnswer:function(){
            let isCorrect = false
            if (this.selectedIndex === this.correctIndex) {
                isCorrect = true
            }
            this.increment(isCorrect)
        }
    }
}
</script>
// 寫scoped代表這個style只會影響這個vue component，不是global的
<style scoped>
.list-group {
    /* 讓每一個選項上下隔開 */
    margin-bottom: 15px;
}
/* 滑鼠移到選項上的反應 */
.list-group-item:hover {
    background: #EEE;
    cursor: pointer;
}
.btn {
    /* 讓Submit按鈕和Next按紐左右隔開 */
    margin: 0 5px;
}
.selected {
    background-color: lightblue;
}
.correct {
    background-color: lightgreen;
}
.incorrect {
    background-color: red;
}
</style>