<template>
  <div class="flex-row a-c main-container border-box">
    <div class="flex-row a-c border-box flex-contain w90 h90">
      <div class="left w30 h90 flex-col a-c border-box">
        <div class="flex-row a-c" style="margin-bottom: 2rem;">
          <div class="logo-container round whiteBg border-box no-select">
            <img src="@/assets/images/logo.png" alt="" class="logo no-select" />
          </div>
          <div class="faculty-name poppins white" v-html="facultyName">
            {{ facultyName }}
          </div>
        </div>

        <div class="boxed-opts flex-col align-center border-box">
          <div class="w100p flex-col timestamp">
            <span class="white poppins"
              >Start Time :::: &ensp; &ensp;<b style="color: #FFDF5A">{{
                startTime
              }}</b></span
            >
            <span class="white poppins"
              >Stop Time :::: &ensp; &ensp;<b style="color: #FFDF5A">{{
                stopTime
              }}</b></span
            >
          </div>
          <div class="cats flex-col a-c w100p">
            <div
              :class="{
                selected: questions[index].selected === true,
                unselected: questions[index].selected === false,
                'catItems t-center flex-row a-c poppins w100p point no-select': true
              }"
              v-for="(category, index) in questions"
              :key="index"
              @click="selectCategory(index)"
            >
              {{ category.name }}
            </div>
          </div>

          <button class="poppins white submit bold point" type="submit">
            END TEST
          </button>
        </div>
      </div>

      <div class="right w60 h90 flex-col a-c-n border-box">
        <div class="flex-row a-c-n space-btw border-box" style="width: 90%;">
          <i class="poppins time-left"
            >Time left::: &nbsp; &nbsp;
            <b style="color: red">{{ minutes }} mins : {{ seconds }} secs</b></i
          >
          <div class="question-number flex-row a-c">
            <h1 class="">Question</h1>
            <span class="poppins darkTxt">
              <b style="font-size: 1.7rem; color: #91519D;">{{
                actives.activeQuestion
              }}</b
              >/{{
                actives.courseLength
              }}</span
            >
          </div>
        </div>
        <span class="question-instruction poppins">
          Choose the option that best answers the question given below, think
          twice.
        </span>

        <div class="w100p">
          <p class="question border-box poppins no-select">
            {{ questions[actives.courseIndex].questions[actives.questionIndex].question }}
          </p>
        </div>

        <!-- <div class="options flex-row a-c-n space-btw wrap">
          <div class="inputGroup point poppins">
            <input
              id="radio1"
              name="radio"
              type="radio"
              v-model="nowAsking[nowAskingCat][nowAskingNum].userChoice"
            />
            <label for="radio1">{{
              nowAsking[nowAskingCat][nowAskingNum].options[0]
            }}</label>
          </div>
          <div class="inputGroup point poppins">
            <input
              id="radio2"
              name="radio"
              type="radio"
              v-model="nowAsking[nowAskingCat][nowAskingNum].userChoice"
            />
            <label for="radio2">{{
              nowAsking[nowAskingCat][nowAskingNum].options[1]
            }}</label>
          </div>
          <div class="inputGroup point poppins">
            <input
              id="radio3"
              name="radio"
              type="radio"
              v-model="nowAsking[nowAskingCat][nowAskingNum].userChoice"
            />
            <label for="radio3">{{
              nowAsking[nowAskingCat][nowAskingNum].options[2]
            }}</label>
          </div>
          <div class="inputGroup point poppins">
            <input
              id="radio4"
              name="radio"
              type="radio"
              v-model="nowAsking[nowAskingCat][nowAskingNum].userChoice"
            />
            <label for="radio4">{{
              nowAsking[nowAskingCat][nowAskingNum].options[3]
            }}</label>
          </div>
        </div> -->

        <div class="flex-row a-c-n space-btw nav-flex">
          <!-- <button class="poppins point" @click="prev">
            <i class="fas fa-arrow-left" style="padding-right: .5rem;"></i>
            Previous
          </button> -->
          <button class="poppins point" @click="next">
            Next <i class="fas fa-arrow-right" style="padding-left: .5rem;"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const questions = require('../../public/questions.json')
export default {
  name: 'QuizPage',
  data () {
    return {
      minutes: 30,
      seconds: 60,
      startTime: '10:45 AM',
      stopTime: '11:30 AM',
      facultyName: 'Faculty of Mangement <br> Science',
      questions: []
    }
  },
  computed: {
    actives () {
      const course = this.questions.find(v => v.selected)
      const question = course.questions.find(v => v.current)
      return {
        courseLength: course.questions.length,
        activeQuestion: course.questions.indexOf(question) + 1,
        courseIndex: this.questions.indexOf(course),
        questionIndex: course.questions.indexOf(question)
      }
    }
  },
  beforeMount () {
    const { courses } = this.$store.state.testDetails
    for (let i = 0; i < courses.length; i++) {
      const course = courses[i]
      for (let j = 0; j < questions.length; j++) {
        const question = questions[j]
        if (question.name === course) {
          const { name, questions } = question
          if (this.questions.length > 0) {
            this.questions.push({ name, questions, selected: false })
          } else {
            questions[0].current = true
            this.questions.push({ name, questions, selected: true })
          }
        }
      }
    }
  },
  mounted () {
    var timer = setInterval(() => {
      this._data.seconds--
      if (this._data.seconds === 0) {
        this._data.minutes--
        this._data.seconds = 60
        if (this._data.minutes === 0 && this._data.minutes === 0) {
          this._data.seconds = 0
          clearInterval(timer)
        }
      }
    }, 700)
  },
  methods: {
    selectCategory (index) {
      for (let i = 0; i < this.questions.length; i++) {
        const question = this.questions[i]
        if (i === index) {
          question.selected = true
        } else {
          question.selected = false
        }
      }
    },
    next () {
      const actives = this.actives
      if (actives.activeQuestion === actives.courseLength) {
        if (actives.courseIndex + 1 === this.questions.length) {
          alert('done')
        } else if (actives.courseIndex + 1 < actives.courseLength) {
          this.questions[actives.courseIndex].selected = false
          this.questions[actives.courseIndex].questions[actives.questionIndex].current = false
          this.questions[actives.courseIndex + 1].questions[0].current = true
          this.questions[actives.courseIndex + 1].selected = true
        }
      } else if (actives.activeQuestion < actives.courseLength) {
        this.questions[actives.courseIndex].questions[actives.questionIndex].current = false
        this.questions[actives.courseIndex].questions[actives.questionIndex + 1].current = true
      }
    }
  }
}
</script>

<style scoped>
.nav-flex {
  width: 85%;
  margin-left: -4rem;
  margin-top: 1rem;
}
.nav-flex > button {
  background: rgba(0, 0, 0, 0.65);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  border: none;
  font-size: 1.1rem;
}
.nav-flex > button:hover {
  background: orange;
}
.options {
  padding: 0 5rem 1rem 1rem;
  width: 85%;
  margin-top: 3rem;
}
.time-left {
  color: rgba(0, 0, 0, 0.9);
}
.question {
  padding: 1.5rem;
  border-radius: 5px;
  border: 2px dashed #c582d5;
  color: rgba(0, 0, 0, 0.7);
  font-size: 1.3rem;
  width: 85%;
  margin-left: 2rem;
}
.question-number {
  margin-right: 3rem;
}
.question-number > h1 {
  color: rgba(0, 0, 0, 0.5);
}
.question-number > span {
  margin-left: 1rem;
  font-size: 1.2rem;
  font-weight: 500;
}
.question-instruction {
  color: rgba(0, 0, 0, 0.65);
  margin: 4rem 2rem 2rem -2rem;
}
.selected {
  background: rgb(27, 235, 148);
}
.unselected {
  background: rgb(255, 232, 139);
}
.submit {
  background: black;
  border: none;
  border-radius: 50px;
  padding: 0.5rem 1.5rem;
  font-size: 1.2rem;
  margin-top: 1rem;
}
.submit:hover {
  opacity: 0.7;
}
.timestamp {
  margin-bottom: 2rem;
}
.catItems {
  padding: 0.5rem 0;
  margin: 0.3rem 0;
  border-radius: 7px;
}
.boxed-opts {
  width: 90%;
  border-radius: 10px;
  border: 4px solid rgb(197, 130, 213, 0.3);
  margin-top: auto;
  padding: 1rem;
}

.main-container {
  width: 100vw;
  height: 100vh;
  padding: 3rem;
  background: url("~@/assets/images/background.png");
  overflow: hidden;
}
.flex-contain {
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.15);
  border-radius: 25px;
}
.left {
  background: linear-gradient(343.35deg, #91519d 43.67%, #71397c 99.45%);
  padding: 2rem 0 2rem 0;
  border-radius: 25px;
}
.right {
  background: white;
  border-radius: 0 25px 25px 0;
  padding: 3rem 0 3rem 1rem;
}

.faculty-name {
  margin: 2rem 0 1rem 1rem;
  font-size: 1.25rem;
  font-weight: 600;
}
.logo-container {
  width: 100px;
  height: 100px;
  padding: 15px;
}
.logo-container > img {
  width: 100%;
  height: 100%;
}

.inputGroup {
  background-color: #fff;
  display: block;
  margin: 10px 0;
  position: relative;
  width: 45%;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  word-wrap: break-word;
  overflow: hidden;
}

.inputGroup label {
  padding: 16px 15px;
  width: 100%;
  display: block;
  text-align: left;
  color: #3c454c;
  cursor: pointer;
  position: relative;
  z-index: 2;
  -webkit-transition: color 200ms ease-in;
  transition: color 200ms ease-in;
  overflow: hidden;
  border: none;
}
.inputGroup label:before {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  content: "";
  background-color: #5562eb;
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%) scale3d(1, 1, 1);
  transform: translate(-50%, -50%) scale3d(1, 1, 1);
  -webkit-transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  z-index: -1;
  border: none;
}
.inputGroup label:after {
  width: 32px;
  height: 32px;
  content: "";
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.15);
  border: 2px solid rgba(0, 0, 0, 0.1);
  background-color: #fff;
  background-image: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.414 11L4 12.414l5.414 5.414L20.828 6.414 19.414 5l-10 10z' fill='%23fff' fill-rule='nonzero'/%3E%3C/svg%3E ");
  background-repeat: no-repeat;
  background-position: 2px 3px;
  border-radius: 50%;
  z-index: 2;
  position: absolute;
  right: 30px;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  cursor: pointer;
  -webkit-transition: all 200ms ease-in;
  transition: all 200ms ease-in;
}
.inputGroup input:checked ~ label {
  color: #fff;
}
.inputGroup input:checked ~ label:before {
  -webkit-transform: translate(-50%, -50%) scale3d(56, 56, 1);
  transform: translate(-50%, -50%) scale3d(56, 56, 1);
  opacity: 1;
}
.inputGroup input:checked ~ label:after {
  background-color: #54e0c7;
  border-color: #54e0c7;
}

.inputGroup input {
  width: 32px;
  height: 32px;
  -webkit-box-ordinal-group: 2;
  order: 1;
  z-index: 2;
  position: absolute;
  right: 30px;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  cursor: pointer;
  visibility: hidden;
  border: none;
}
</style>
