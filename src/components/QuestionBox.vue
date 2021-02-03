<template>
    <div class='question-box-container'>
        <b-jumbotron>
            <!-- <template #header>BootstrapVue</template> -->

            <template #lead>
                <!-- 取得question property -->
                {{ currentQuestion.question }}
            </template>

            <hr class="my-4">
            <!-- v-for需要v-bind:key去指定unique identifier，
            index是內建的-->
            <p v-for="(answer, index) in answers" v-bind:key="index">
                {{ answer }}
            </p>
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
    computed:{
        answers: function(){
            //利用「...」去copy this.currentQuestion.incorrect_answers，
            //而不是去reference it，所以不會更動到原本的this.currentQuestion.incorrect_answers
            let answers = [...this.currentQuestion.incorrect_answers];
            answers.push(this.currentQuestion.correct_answer);
            return answers
        }
    }
}
</script>