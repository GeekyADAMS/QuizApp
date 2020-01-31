<template>
    <div class="flex-row a-c main-container border-box">
        <div class="flex-row a-c border-box flex-contain w90 h90">
            <div class="left w30 h90 flex-col a-c border-box">
                <div class="logo-container round whiteBg border-box">
                    <img src="@/assets/images/logo.png" alt="" class="logo">
                </div>
                <div class="faculty-name poppins white t-center" v-html="facultyName">
                    {{facultyName}}
                </div>
                <div class="appName poppins white bolder white">
                    QUIZ APP
                </div>
            </div>

            <div class="right w60 h90 flex-col a-c border-box">
                <div class="avatarSect flex-col a-c w60p">
                    <img src="@/assets/images/avatar.png" alt="" class="">
                    <p class="poppins darkTxt">Welcome, <br> Please signin to start your test</p>
                </div>

                <form action="" class=" flex-col a-c">
                    <div class="tField-contain flex-col w100p border-box">
                        <input class="poppins border-box" type="text" name="Department" placeholder="What's your department?" v-model="Dept">
                        <input class="poppins border-box" type="text" name="Reg num" placeholder="Enter reg number" v-model="regNum">
                        <input class="poppins border-box" type="text" name="phone" placeholder="Enter phone number" v-model="phone">
                    </div>
                    <h3 class="poppins bold courses-choice">Choose courses</h3>
                    <div class="cField-contain flex-row a-c w100p">
                        <label class="poppins point label" for="english">GNS111
                            <input class="poppins point" type="checkbox" name="subject" id="english" value="GNS" v-model="selectedCourses">
                            <span class="checkmark"></span>
                        </label>
                        <label class="poppins point label" for="bus">BUS103
                            <input class="poppins point" type="checkbox" name="subject" id="bus" value="BUS" v-model="selectedCourses">
                            <span class="checkmark"></span>
                        </label>
                        <label class="poppins point label" for="econs">ECN101
                            <input class="poppins point" type="checkbox" name="subject" id="econs" value="ECN" v-model="selectedCourses">
                            <span class="checkmark"></span>
                        </label>
                        <label class="poppins point label" for="account">ACC101
                            <input class="poppins point" type="checkbox" name="subject" id="account" value="ACC" v-model="selectedCourses">
                            <span class="checkmark"></span>
                        </label>
                    </div>
                </form>

                <div class="startBtn poppins darkTxt bold  point" @click="showSelected()" v-if="showStartBtn">
                   <router-link :to="{path: 'start', query: {courses: selectedCourses, regNum: regNum, Dept: Dept, tel: phone}}"> START TEST </router-link>
                </div>

                <div :class="{ 'instruct-modal flex-col fix-mid curve-15-all big-card-shadow whiteBg border-box animated': true, fadeInRight: instructionDialog, fadeOutLeft: !instructionDialog}" v-show="instructionDialog">
                    <div class="flex-row a-c-n space-btw w100p">
                        <i></i>
                        <i class="fas fa-times-circle point darkTxt" style="margin: .7rem; color: rgba(0,0,0,.6);" @click="closeDialog()"></i>
                    </div>

                    <h2 class="t-center bold poppins t-warn">READ CAREFULLY !!!</h2>

                    <ul class="">
                        <li class="poppins" v-for="(instruction, index) in instructions" :key="index" v-html="instruction">{{instruction}}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      showStartBtn: false,
      instructionDialog: false,
      instructions: [
        'There are 2 categories and a total of 50 questions to be answered.  Please do not click submit unless you are sure of submitting.',
        'Do not refresh page.',
        'Any form of malpractice would render your test nullified, stick to the rules.  GOOD LUCK !',
        'Exam duration ::  <b>35 minutes<b>' ],
      facultyName: 'Faculty of Mangement <br> Science',
      selectedCourses: [],
      Dept: '',
      regNum: '',
      phone: ''
    }
  },
  methods: {
    closeDialog () {
      this.instructionDialog = false
    },
    showSelected () {
      console.log(this.selectedCourses)
    }
  },
  mounted () {
    this._data.instructionDialog = true
  },
  updated () {
    if (this._data.selectedCourses.length !== 0 && this._data.Dept !== '' && this._data.regNum !== '' && this._data.phone !== '') {
      this._data.showStartBtn = true
    } else {
      this._data.showStartBtn = false
    }
  }
}
</script>

<style scoped>
    router-link{
        text-decoration: none;
    }
    .instruct-modal{
        width: 45%;
        border: .5px solid rgba(0, 0, 0, .2);
        animation-delay: 2s;
    }
    .instruct-modal>ul{
        margin: 3rem 2rem 3rem 3rem;
    }
    .instruct-modal>ul>li{
        margin: 1rem 2rem;
        color: rgba(0,0,0,.8);
    }
    .startBtn{
        margin-top: 1rem;
        font-size: 1.1rem;
        border-radius: 50px;
        padding: .7rem 1.5rem;
        background: #FFDF5A;
        border: 3px solid #C582D5;
        text-decoration: none;
    }
    .cField-contain{
        margin-top: .5rem;
        margin-left: -3rem;
    }
    .cField-contain>input{
        margin-left: 1.5rem;
    }
    .cField-contain>label{
        margin-left: 2em;
    }
    .courses-choice{
        color: rgba(0, 0, 0, 0.6)
    }
    form{
        width: 60%;
        margin: 2rem 0 0 0;
    }
    .tField-contain{
        padding: 1rem 0;
    }
    .tField-contain>input{
        border-radius: 10px;
        background: #F9F9F9;
        border: 2.2px solid #C582D5;
        padding: .8rem 1rem;
        margin: .6rem 0;
        font-size: 1.05rem;
        color: rgba(0, 0, 0, 0.7)-.5rem
    }
    .avatarSect{
        background: rgba(255, 223, 90, 0.4);
        border-radius: 15px;
        border: 1px solid rgba(0, 0, 0, 0.1);
    }
    .avatarSect>img{
        width: 7rem;
        height: 7rem;
        margin-top: -3.5rem;
    }
    .avatarSect>p{
        margin-bottom: 1rem;
        font-size: 1.05rem;
        font-weight: 500;
    }
    .appName{
        padding: .2rem 1rem;
        font-size: 1.8rem;
        background: #612D6B;
        color: #FFD731;
        border-radius: 50px;
        margin-top: auto;
    }
    .faculty-name{
        margin-top: 2rem;
        font-size: 1.2rem;
        font-weight: 500;
    }
    .logo-container{
        width: 170px;
        height: 170px;
        padding: 15px;
    }
    .logo-container>img{
        width: 100%;
        height: 100%;
    }
    .main-container{
        width: 100vw;
        height: 100vh;
        padding: 3rem;
        background: url('~@/assets/images/background.png');
        overflow: hidden;
    }
    .flex-contain{
        box-shadow: 0px 0px 24px rgba(0,0,0,.15);
        border-radius: 25px;
    }
    .left{
        background: linear-gradient(343.35deg, #91519D 43.67%, #71397C 99.45%);
        padding: 5rem 0;
        border-radius: 25px;
    }
    .right{
        background: white;
        border-radius: 0 25px 25px 0;
        padding: 3rem 0;
    }

</style>
