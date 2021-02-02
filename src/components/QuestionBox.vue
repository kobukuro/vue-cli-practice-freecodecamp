<template>
    <div class='question-box-container'>
        <b-jumbotron>
            <!-- <template #header>BootstrapVue</template> -->

            <template #lead>
                <!-- 取得question property -->
                {{ currentQuestion.question }}
            </template>

            <hr class="my-4">

            <p>
                List of answers
            </p>
            <b-button variant="primary" href="#">Submit</b-button>
            <b-button variant="success" href="#">Next</b-button>
        </b-jumbotron>
    </div>
</template>

<script>
export default {
    //從parent component要傳進來的變數，要寫在這裡
    props:{
        currentQuestion : Object //type
    }
}
</script>