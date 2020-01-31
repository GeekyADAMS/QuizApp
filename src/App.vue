<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import login from './components/login'
// import quizPage from './components/quiz_page'
export default {
  components: {
  // login,
  // quizPage
  },
  data () {
    return {
      userSelectedCats: [ ]
    }
  }
}
</script>

<style src="@/assets/styles/custom-css-library.css">
</style>
