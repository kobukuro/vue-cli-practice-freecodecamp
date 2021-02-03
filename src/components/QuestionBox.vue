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
                    v-for="(answer, index) in answers" 
                    v-bind:key="index"
                    v-on:click.prevent="selectAnswer(index)"
                    v-bind:class="[selectedIndex === index ? 'selected' : '']"
                >
                    {{ answer }}
                </b-list-group-item>
            </b-list-group>

            <b-button variant="primary" href="#">Submit</b-button>
            <b-button v-on:click="next" variant="success" href="#">Next</b-button>
        </b-jumbotron>
    </div>
</template>

<script>
export default {
    //從parent component要傳進來的變數，要寫在這裡
    props:{
        currentQuestion : Object, //type
        next : Function
    },
    data: function(){
        return{
            selectedIndex: null
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
    methods:{
        selectAnswer: function(index){
            this.selectedIndex = index;
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