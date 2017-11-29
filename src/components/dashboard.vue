<template>
  <div class="dashboard">


    <div id="myNav" class="overlay">

      <div>
        <!-- <div v-if="card1 == 'red'" class="card11" :style="{ left: leftup + 'px' , top : topup + 'px'}">
            <img class="cardimg" src="../assets/images/img.png" width="100" height="250" style="background-color:red;">
            <div class="container11" style="background-color:white;padding: 10px 20px">
                <h4><b>John Doe</b></h4>
                <p>Architect & Engineer</p>
                <p>Architect & Engineer</p>
                <p>Architect & Engineer</p>
                <p>Architect & Engineer</p>
                <p>Architect & Engineer</p>
                <p>Architect & Engineer</p>
                <p>Architect & Engineer</p>
            </div>
        </div>
        <div v-if="card1 == 'purple'" class="card11" style="left: 100px;top: 250px;">
           <img src="../assets/images/img.png"width="100" height="200" style="background-color:purple;border-radius: 5px 5px 0 0;width:100%">
            <div class="container11" style="background-color:white;padding: 10px 20px">
                <h4><b>John Doe</b></h4>
                <p>Architect & Engineer</p>
                <p>Architect & Engineer</p>
                <p>Architect & Engineer</p>
                <p>Architect & Engineer</p>
                <p>Architect & Engineer</p>
                <p>Architect & Engineer</p>
                <p>Architect & Engineer</p>
            </div>
        </div>
        <div v-if="card1 == 'orange'" class="card11" style="left: 100px;top: 500px;">
            <img src="../assets/images/img.png"width="100" height="200" style="background-color:orange;border-radius: 5px 5px 0 0;width:100%">
            <div class="container11" style="background-color:white;padding: 10px 20px">
                <h4><b>John Doe</b></h4>
                <p>Architect & Engineer</p>
                <p>Architect & Engineer</p>
                <p>Architect & Engineer</p>
                <p>Architect & Engineer</p>
                <p>Architect & Engineer</p>
                <p>Architect & Engineer</p>
                <p>Architect & Engineer</p>
            </div>
        </div>
        <div v-if="card1 == 'lightblue'" class="card11" style="left: 300px;top: 600px;">
             <img src="../assets/images/img.png"width="100" height="200" style="background-color:lightblue;border-radius: 5px 5px 0 0;width:100%">
            <div class="container11" style="background-color:white;padding: 10px 20px">
                <h4><b>John Doe</b></h4>
                <p>Architect & Engineer</p>
                <p>Architect & Engineer</p>
                <p>Architect & Engineer</p>
                <p>Architect & Engineer</p>
                <p>Architect & Engineer</p>
                <p>Architect & Engineer</p>
                <p>Architect & Engineer</p>
            </div>
        </div> -->
          <div v-if="position1 == 'left'" class="card11" :style="{ left: leftup + 'px' , top : topup + 'px'}">
            <img class="cardimg" src="../assets/images/img.png" width="100" height="250" :style="{ backgroundColor: card1 }">
            <div class="container11" style="background-color:white;padding: 10px 20px">
                <h4><b>John Doe</b></h4>
                <p>Architect & Engineer</p>
                <p>Architect & Engineer</p>
                <p>Architect & Engineer</p>
                <p>Architect & Engineer</p>
                <p>Architect & Engineer</p>
                <p>Architect & Engineer</p>
                <p>Architect & Engineer</p>
            </div>
          </div>
          <div v-if="position1 == 'right'" class="card11" :style="{ left: leftup + 'px' , top : topup + 'px'}">
            <img class="cardimg" src="../assets/images/img.png" width="100" height="250" :style="{ backgroundColor: card1 }">
            <div class="container11" style="background-color:white;padding: 10px 20px">
                <h4><b>John Doe</b></h4>
                <p>Architect & Engineer</p>
                <p>Architect & Engineer</p>
                <p>Architect & Engineer</p>
                <p>Architect & Engineer</p>
                <p>Architect & Engineer</p>
                <p>Architect & Engineer</p>
                <p>Architect & Engineer</p>
            </div>
          </div>
          <nav class="menu" id="overlay-content">

                <input type="checkbox" checked href="#"  class="menu-open" @click="closeNav()" name="menu-open" id="menu-open"/>

                <label class="menu-open-button" for="menu-open">
                  <span class="lines line-1"></span>
                  <span class="lines line-2"></span>
                  <span class="lines line-3"></span>
                </label>
              <!--    <a href="#" class="menu-item blue"> <i class="fa fa-anchor"></i> </a>
                <a href="#" class="menu-item green"> <i class="fa fa-coffee"></i> </a> -->
                <a href="#" class="menu-item red" @click="goToPricing(1)" v-on:mouseover="hoverOnSubmenu('red', 'left')"> <icon name="check"  id="check"></icon> </a>
                <a href="#" class="menu-item purple" @click="goToPricing(2)" v-on:mouseover="hoverOnSubmenu('purple', 'left')"> <icon name="microphone"></icon> </a>
                <a href="#" class="menu-item orange" @click="goToPricing(3)" v-on:mouseover="hoverOnSubmenu('orange', 'left')"> <icon name="star"></icon> </a>
                <a href="#" class="menu-item lightblue" @click="goToPricing(4)" v-on:mouseover="hoverOnSubmenu('lightblue', 'left')"> <icon name="diamond"></icon> </a>

              </nav>
              <nav class="menu2" id="overlay-content2">
                <input type="checkbox" href="#" class="menu2-open" @click="closeNav2()" name="menu2-open" id="menu2-open" />
                <label class="menu2-open-button" for="menu2-open">
                  <span class="lines2 line2-1"></span>
                  <span class="lines2 line2-2"></span>
                  <span class="lines2 line2-3"></span>
                </label>
                <!--<a href="#" class="menu2-item blue"> <i class="fa fa-anchor"></i> </a>
                <a href="#" class="menu2-item green"> <i class="fa fa-coffee"></i> </a> -->
                <a href="#" class="menu2-item red2" @click="goToPricing(5)" v-on:mouseover="hoverOnSubmenu('red', 'right')"> <icon name="database"></icon> </a>
                <a href="#" class="menu2-item purple2" @click="goToPricing(6)" v-on:mouseover="hoverOnSubmenu('purple', 'right')"> <icon name="user-circle"></icon> </a>
                <a href="#" class="menu2-item orange2" @click="goToPricing(7)" v-on:mouseover="hoverOnSubmenu('orange', 'right')"> <icon name="cab"></icon> </a>
                <a href="#" class="menu2-item lightblue2" @click="goToPricing(8)" v-on:mouseover="hoverOnSubmenu('lightblue', 'right')"> <icon name="window-close"></icon> </a>
              </nav>
      </div>
    </div>


    <div class="dasbma">
      <div class="dastit dastit_pos"><span>Flowz Applications</span> Third-Party Applications</div>
        <div class="dasund">
            <div class="dasico">
               <nav class="menu">

                <a href="#"><img src="../assets/images/icon-1.png" id="icon1" @click="openNav()"> </a>

              </nav>
              <nav class="menu2">

                <a href="#"><img src="../assets/images/icon-2.png" id="icon2" @click="openNav2()"> </a>
              </nav>
            </div>
        </div>
    </div>


  </div>
</template>

<script>

import Vue from 'vue'
import VueSession from 'vue-session'

//var jg = new jsGraphics("myNav");
 var img1 = document.getElementById("check");
 var img2 = document.getElementById("demoCardLeft");

Vue.use(VueSession)

export default {
  name: 'dashboard',
  data () {
    return {
      msg: 'Welcome to Dashboard',
      card1: 'red',
      position1: 'left',
      leftup: 1000,
      topup: 200
    }
  },
  created() {

        var url_string = window.location.href;
        var url = new URL(url_string);

        let token = url.searchParams.get("ob_id");
        console.log(token)
        if(token){
            this.$session.start()
            this.$session.set('token', token);
        }

        let logintoken = this.$session.get('token');
        if(logintoken == undefined || !logintoken){
            this.$router.push('login');
        }
    },
    
    mounted(){

    },

  methods :{
      hoverOnSubmenu: function(color, position) {
        this.card1 = color
        this.position1 = position
        if (position === 'right') {
          this.leftup = 200
          this.topup = 200
        } else {
          this.leftup = 1000
          this.topup = 200
        }
        // console.log(color, position, this.card1)
        // alert('skjdk')
      },
      clearCard: function() {
        this.card1 = ''
        this.position1 = ''
        this.leftup = 0
        this.topup = 0
      },
      trigger: function(){
          $(".menu").toggleClass("active");
      },
       trigger2: function(){
          $(".menu2").toggleClass("active");
      },
      logout : function(){
           this.$session.destroy('token');
            this.$router.push('/');

      },
      goToPricing : function(data){
          this.$router.push('pricing/'+data);
      },
      openNav : function(){
        document.getElementById("menu-open").checked = true;
        document.getElementById("menu2-open").checked = true;
        document.getElementById("myNav").style.display = "block";
        document.getElementById("overlay-content").style.display = "block";
        document.getElementById("overlay-content2").style.display = "none";
        document.getElementById("icon1").style.display = "none";
      },
      openNav2 : function(){
        document.getElementById("menu-open").checked = true;
        document.getElementById("menu2-open").checked = true;
        document.getElementById("myNav").style.display = "block";
        document.getElementById("overlay-content2").style.display = "block";
        document.getElementById("overlay-content").style.display = "none";
        document.getElementById("icon2").style.display = "none";
      },

      closeNav : function(){
        document.getElementById("myNav").style.display = "none";
        document.getElementById("icon1").style.display = "block";
        this.clearCard()
      },
      closeNav2 : function(){
        document.getElementById("myNav").style.display = "none";
        document.getElementById("icon2").style.display = "block";
        this.clearCard()
      },
      hello:function(){
          var items = document.querySelectorAll('.circle a');

            for(var i = 0, l = items.length; i < l; i++) {
            items[i].style.left = (50 - 35*Math.cos(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";

            items[i].style.top = (50 + 35*Math.sin(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
            }
           document.querySelector('.circle').classList.toggle('open');
      }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.card11 {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    width: 25%;
    position: absolute;
}

.card11:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

.cardimg {
    border-radius: 5px 5px 0 0;
    width:100%
}

.container11 {
    padding: 2px 16px;
}

body {
  background: #39D !important;
}
.logout{
    float:right
}


*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  height: 100%;
  overflow: hidden;
}

/* body {
  background: -webkit-linear-gradient(45deg, #e10522 0%, rgba(225, 5, 34, 0) 70%), -webkit-linear-gradient(315deg, #3105d1 10%, rgba(49, 5, 209, 0) 80%), -webkit-linear-gradient(225deg, #0adbd8 10%, rgba(10, 219, 216, 0) 80%), -webkit-linear-gradient(135deg, #09f505 100%, rgba(9, 245, 5, 0) 70%);
  background: linear-gradient(45deg, #e10522 0%, rgba(225, 5, 34, 0) 70%), linear-gradient(135deg, #3105d1 10%, rgba(49, 5, 209, 0) 80%), linear-gradient(225deg, #0adbd8 10%, rgba(10, 219, 216, 0) 80%), linear-gradient(315deg, #09f505 100%, rgba(9, 245, 5, 0) 70%);
} */



.card {
  background: #fff;
  border-radius: 2px;
  display: inline-block;
  height: 200px;
  margin: 1rem;
  position: relative;
  width: 200px;
  top:120px;
  left:20px
}



.overlay {
    height: 100%;
    width: 100%;
    display: none;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0, 0.1);
}

.overlay-content {
    position: relative;
    top: 25%;
    width: 100%;
    text-align: center;
    margin-top: 30px;

}

#overlay-content {
  display: none;
}

.overlay-content2 {
    position: relative;
    top: 25%;
    width: 100%;
    text-align: center;
    margin-top: 30px;

}

#overlay-content2 {
  display: none;
}

.overlay a {
    padding: 8px;
    text-decoration: none;
    font-size: 36px;
    color: #818181;
    display: block;
    transition: 0.3s;
}

.overlay a:hover, .overlay a:focus {
    color: #f1f1f1;
}

.overlay .closebtn {
    position: absolute;
    top: 30px;
    right: 45px;
    font-size: 60px;
}

@media screen and (max-height: 450px) {
  .overlay a {font-size: 20px}
  .overlay .closebtn {
    font-size: 40px;
    top: 15px;
    right: 35px;
  }
}
















#demoCardLeft{
  display : none;
}

.dastit_pos{
  width: 100%;top: 13%;margin: auto;position: absolute;
}

@media screen and (max-width: 700px) {
   body {
      padding: 170px 0 0 0;
      width: 100%
   }
}

a {
   color: inherit;
}

.menu-item,
.menu-open-button {
   background: #EEEEEE;
   border-radius: 100%;
   width: 80px;
   height: 80px;
    margin-left: -42px;
   position: absolute;
   color: #FFFFFF;
   text-align: center;
   line-height: 50px;
   -webkit-transform: translate3d(0, 0, 0);
   transform: translate3d(0, 0, 0);
   -webkit-transition: -webkit-transform ease-out 200ms;
   transition: -webkit-transform ease-out 200ms;
   transition: transform ease-out 200ms;
   transition: transform ease-out 200ms, -webkit-transform ease-out 200ms;
}

.menu-open {
   display: none;
}

.menu a img{
  border-radius: 50%;
}

.lines {
   width: 25px;
   height: 3px;
   background: #596778;
   display: block;
   position: absolute;
   top: 50%;
   left: 50%;
   margin-left: -12.5px;
   margin-top: -1.5px;
   -webkit-transition: -webkit-transform 200ms;
   transition: -webkit-transform 200ms;
   transition: transform 200ms;
   transition: transform 200ms, -webkit-transform 200ms;
}

.line-1 {
   -webkit-transform: translate3d(0, -8px, 0);
   transform: translate3d(0, -8px, 0);
}

.line-2 {
   -webkit-transform: translate3d(0, 0, 0);
   transform: translate3d(0, 0, 0);
}

.line-3 {
   -webkit-transform: translate3d(0, 8px, 0);
   transform: translate3d(0, 8px, 0);
}

.menu-open:checked + .menu-open-button .line-1 {
   -webkit-transform: translate3d(0, 0, 0) rotate(45deg);
   transform: translate3d(0, 0, 0) rotate(45deg);
}

.menu-open:checked + .menu-open-button .line-2 {
   -webkit-transform: translate3d(0, 0, 0) scale(0.1, 1);
   transform: translate3d(0, 0, 0) scale(0.1, 1);
}

.menu-open:checked + .menu-open-button .line-3 {
   -webkit-transform: translate3d(0, 0, 0) rotate(-45deg);
   transform: translate3d(0, 0, 0) rotate(-45deg);
}

.menu {
   margin: auto;
   position: absolute;
   top: 0;
   bottom: 0;
   left: -200px;
   right: 0;
   width: 80px;
   height: 80px;
   text-align: center;
   box-sizing: border-box;
   font-size: 26px;
}


/* .menu-item {
   transition: all 0.1s ease 0s;
} */

.menu-item:hover {
   background: #EEEEEE;
   color: #3290B1;
}

.menu-item:nth-child(3) {
   -webkit-transition-duration: 180ms;
   transition-duration: 180ms;
}

.menu-item:nth-child(4) {
   -webkit-transition-duration: 180ms;
   transition-duration: 180ms;
}

.menu-item:nth-child(5) {
   -webkit-transition-duration: 180ms;
   transition-duration: 180ms;
}

.menu-item:nth-child(6) {
   -webkit-transition-duration: 180ms;
   transition-duration: 180ms;
}

.menu-item:nth-child(7) {
   -webkit-transition-duration: 180ms;
   transition-duration: 180ms;
}

.menu-item:nth-child(8) {
   -webkit-transition-duration: 180ms;
   transition-duration: 180ms;
}

.menu-item:nth-child(9) {
   -webkit-transition-duration: 180ms;
   transition-duration: 180ms;
}

.menu-open-button {
   z-index: 2;
   -webkit-transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
   transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
   -webkit-transition-duration: 400ms;
   transition-duration: 400ms;
   -webkit-transform: scale(1.1, 1.1) translate3d(0, 0, 0);
   transform: scale(1.1, 1.1) translate3d(0, 0, 0);
   cursor: pointer;
   box-shadow: 3px 3px 0 0 rgba(0, 0, 0, 0.14);
}

.menu-open-button:hover {
   -webkit-transform: scale(1.2, 1.2) translate3d(0, 0, 0);
   transform: scale(1.2, 1.2) translate3d(0, 0, 0);
}

.menu-open:checked + .menu-open-button {
   -webkit-transition-timing-function: linear;
   transition-timing-function: linear;
   -webkit-transition-duration: 200ms;
   transition-duration: 200ms;
   -webkit-transform: scale(0.8, 0.8) translate3d(0, 0, 0);
   transform: scale(0.8, 0.8) translate3d(0, 0, 0);
}

.menu-open:checked ~ .menu-item {
   -webkit-transition-timing-function: cubic-bezier(0.935, 0, 0.34, 1.33);
   transition-timing-function: cubic-bezier(0.935, 0, 0.34, 1.33);
}

.menu-open:checked ~ .menu-item:nth-child(3) {
   transition-duration: 180ms;
   -webkit-transition-duration: 180ms;
   -webkit-transform: translate3d(0.08361px, -104.99997px, 0);
   transform: translate3d(0.08361px, -104.99997px, 0);
}

.menu-open:checked ~ .menu-item:nth-child(4) {
   transition-duration: 280ms;
   -webkit-transition-duration: 280ms;
   -webkit-transform: translate3d(90.9466px, -52.47586px, 0);
   transform: translate3d(-90.9466px, -52.47586px, 0);
}

.menu-open:checked ~ .menu-item:nth-child(5) {
   transition-duration: 380ms;
   -webkit-transition-duration: 380ms;
   -webkit-transform: translate3d(90.9466px, 52.47586px, 0);
   transform: translate3d(-90.9466px, 52.47586px, 0);
}

.menu-open:checked ~ .menu-item:nth-child(6) {
   transition-duration: 480ms;
   -webkit-transition-duration: 480ms;
   -webkit-transform: translate3d(0.08361px, 104.99997px, 0);
   transform: translate3d(0.08361px, 104.99997px, 0);
}

.menu-open:checked ~ .menu-item:nth-child(7) {
   transition-duration: 580ms;
   -webkit-transition-duration: 580ms;
   -webkit-transform: translate3d(-90.86291px, 52.62064px, 0);
   transform: translate3d(-90.86291px, 52.62064px, 0);
}

.menu-open:checked ~ .menu-item:nth-child(8) {
   transition-duration: 680ms;
   -webkit-transition-duration: 680ms;
   -webkit-transform: translate3d(-91.03006px, -52.33095px, 0);
   transform: translate3d(-91.03006px, -52.33095px, 0);
}

.menu-open:checked ~ .menu-item:nth-child(9) {
   transition-duration: 780ms;
   -webkit-transition-duration: 780ms;
   -webkit-transform: translate3d(-0.25084px, -104.9997px, 0);
   transform: translate3d(-0.25084px, -104.9997px, 0);
}

.blue {
   background-color: #669AE1;
   box-shadow: 3px 3px 0 0 rgba(0, 0, 0, 0.14);
   text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.12);
}

.blue:hover {
   color: #669AE1;
   text-shadow: none;
}

.green {
   background-color: #70CC72;
   box-shadow: 3px 3px 0 0 rgba(0, 0, 0, 0.14);
   text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.12);
}

.green:hover {
   color: #70CC72;
   text-shadow: none;
}

.red {
   background-color: #FE4365;
   box-shadow: 3px 3px 0 0 rgba(0, 0, 0, 0.14);
   text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.12);
}

.red:hover {
   color: #FE4365;
   text-shadow: none;
}

.purple {
   background-color: #C49CDE;
   box-shadow: 3px 3px 0 0 rgba(0, 0, 0, 0.14);
   text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.12);
}

.purple:hover {
   color: #C49CDE;
   text-shadow: none;
}

.orange {
   background-color: #FC913A;
   box-shadow: 3px 3px 0 0 rgba(0, 0, 0, 0.14);
   text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.12);
}

.orange:hover {
   color: #FC913A;
   text-shadow: none;
}

.lightblue {
   background-color: #62C2E4;
   box-shadow: 3px 3px 0 0 rgba(0, 0, 0, 0.14);
   text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.12);
}

.lightblue:hover {
   color: #62C2E4;
   text-shadow: none;
}












.menu2-item,
.menu2-open-button {
   background: #EEEEEE;
   border-radius: 100%;
   width: 80px;
   height: 80px;
   margin-left: -38px;
   position: absolute;
   color: #FFFFFF;
   text-align: center;
   line-height: 50px;
   -webkit-transform: translate3d(0, 0, 0);
   transform: translate3d(0, 0, 0);
   -webkit-transition: -webkit-transform ease-out 200ms;
   transition: -webkit-transform ease-out 200ms;
   transition: transform ease-out 200ms;
   transition: transform ease-out 200ms, -webkit-transform ease-out 200ms;
}

.menu2-open {
   display: none;
}

.menu2 a img{
  border-radius: 50%;
}

.lines2 {
   width: 25px;
   height: 3px;
   background: #596778;
   display: block;
   position: absolute;
   top: 50%;
   left: 50%;
   margin-left: -12.5px;
   margin-top: -1.5px;
   -webkit-transition: -webkit-transform 200ms;
   transition: -webkit-transform 200ms;
   transition: transform 200ms;
   transition: transform 200ms, -webkit-transform 200ms;
}

.line2-1 {
   -webkit-transform: translate3d(0, -8px, 0);
   transform: translate3d(0, -8px, 0);
}

.line2-2 {
   -webkit-transform: translate3d(0, 0, 0);
   transform: translate3d(0, 0, 0);
}

.line2-3 {
   -webkit-transform: translate3d(0, 8px, 0);
   transform: translate3d(0, 8px, 0);
}

.menu2-open:checked + .menu2-open-button .line2-1 {
   -webkit-transform: translate3d(0, 0, 0) rotate(45deg);
   transform: translate3d(0, 0, 0) rotate(45deg);
}

.menu2-open:checked + .menu2-open-button .line2-2 {
   -webkit-transform: translate3d(0, 0, 0) scale(0.1, 1);
   transform: translate3d(0, 0, 0) scale(0.1, 1);
}

.menu2-open:checked + .menu2-open-button .line2-3 {
   -webkit-transform: translate3d(0, 0, 0) rotate(-45deg);
   transform: translate3d(0, 0, 0) rotate(-45deg);
}

.menu2 {
   margin: auto;
   position: absolute;
   top: 0;
   bottom: 0;
   left: 200px;
   right: 0;
   width: 80px;
   height: 80px;
   text-align: center;
   box-sizing: border-box;
   font-size: 26px;
}


/* .menu2-item {
   transition: all 0.1s ease 0s;
} */

.menu2-item:hover {
   background: #EEEEEE;
   color: #3290B1;
}

.menu2-item:nth-child(3) {
   -webkit-transition-duration: 180ms;
   transition-duration: 180ms;
}

.menu2-item:nth-child(4) {
   -webkit-transition-duration: 180ms;
   transition-duration: 180ms;
}

.menu2-item:nth-child(5) {
   -webkit-transition-duration: 180ms;
   transition-duration: 180ms;
}

.menu2-item:nth-child(6) {
   -webkit-transition-duration: 180ms;
   transition-duration: 180ms;
}

.menu2-item:nth-child(7) {
   -webkit-transition-duration: 180ms;
   transition-duration: 180ms;
}

.menu2-item:nth-child(8) {
   -webkit-transition-duration: 180ms;
   transition-duration: 180ms;
}

.menu2-item:nth-child(9) {
   -webkit-transition-duration: 180ms;
   transition-duration: 180ms;
}

.menu2-open-button {
   z-index: 2;
   -webkit-transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
   transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
   -webkit-transition-duration: 400ms;
   transition-duration: 400ms;
   -webkit-transform: scale(1.1, 1.1) translate3d(0, 0, 0);
   transform: scale(1.1, 1.1) translate3d(0, 0, 0);
   cursor: pointer;
   box-shadow: 3px 3px 0 0 rgba(0, 0, 0, 0.14);
}

.menu2-open-button:hover {
   -webkit-transform: scale(1.2, 1.2) translate3d(0, 0, 0);
   transform: scale(1.2, 1.2) translate3d(0, 0, 0);
}

.menu2-open:checked + .menu2-open-button {
   -webkit-transition-timing-function: linear;
   transition-timing-function: linear;
   -webkit-transition-duration: 200ms;
   transition-duration: 200ms;
   -webkit-transform: scale(0.8, 0.8) translate3d(0, 0, 0);
   transform: scale(0.8, 0.8) translate3d(0, 0, 0);
}

.menu2-open:checked ~ .menu2-item {
   -webkit-transition-timing-function: cubic-bezier(0.935, 0, 0.34, 1.33);
   transition-timing-function: cubic-bezier(0.935, 0, 0.34, 1.33);
}

.menu2-open:checked ~ .menu2-item:nth-child(3) {
   transition-duration: 180ms;
   -webkit-transition-duration: 180ms;
   -webkit-transform: translate3d(0.08361px, -104.99997px, 0);
   transform: translate3d(81.08361px, -104.99997px, 0);
}

.menu2-open:checked ~ .menu2-item:nth-child(4) {
   transition-duration: 280ms;
   -webkit-transition-duration: 280ms;
   -webkit-transform: translate3d(90.9466px, -52.47586px, 0);
   transform: translate3d(175.9466px, -52.47586px, 0);
}

.menu2-open:checked ~ .menu2-item:nth-child(5) {
   transition-duration: 380ms;
   -webkit-transition-duration: 380ms;
   -webkit-transform: translate3d(90.9466px, 52.47586px, 0);
   transform: translate3d(175.9466px, 52.47586px, 0);
}

.menu2-open:checked ~ .menu2-item:nth-child(6) {
   transition-duration: 480ms;
   -webkit-transition-duration: 480ms;
   -webkit-transform: translate3d(0.08361px, 104.99997px, 0);
   transform: translate3d(81.08361px, 104.99997px, 0);
}

.menu2-open:checked ~ .menu2-item:nth-child(7) {
   transition-duration: 580ms;
   -webkit-transition-duration: 580ms;
   -webkit-transform: translate3d(-90.86291px, 52.62064px, 0);
   transform: translate3d(-90.86291px, 52.62064px, 0);
}

.menu2-open:checked ~ .menu2-item:nth-child(8) {
   transition-duration: 680ms;
   -webkit-transition-duration: 680ms;
   -webkit-transform: translate3d(-91.03006px, -52.33095px, 0);
   transform: translate3d(-91.03006px, -52.33095px, 0);
}

.menu2-open:checked ~ .menu2-item:nth-child(9) {
   transition-duration: 780ms;
   -webkit-transition-duration: 780ms;
   -webkit-transform: translate3d(-0.25084px, -104.9997px, 0);
   transform: translate3d(-0.25084px, -104.9997px, 0);
}

.red2 {
   background-color: #FE4365;
   box-shadow: 3px 3px 0 0 rgba(0, 0, 0, 0.14);
   text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.12);
}

.red2:hover {
   color: #FE4365;
   text-shadow: none;
}

.purple2 {
   background-color: #C49CDE;
   box-shadow: 3px 3px 0 0 rgba(0, 0, 0, 0.14);
   text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.12);
}

.purple2:hover {
   color: #C49CDE;
   text-shadow: none;
}

.orange2 {
   background-color: #FC913A;
   box-shadow: 3px 3px 0 0 rgba(0, 0, 0, 0.14);
   text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.12);
}

.orange2:hover {
   color: #FC913A;
   text-shadow: none;
}

.lightblue2 {
   background-color: #62C2E4;
   box-shadow: 3px 3px 0 0 rgba(0, 0, 0, 0.14);
   text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.12);
}

.lightblue2:hover {
   color: #62C2E4;
   text-shadow: none;
}


















.wrapper {
  display: table;
  height: 100%;
  width: 100%;
}

.container-fostrap {
  display: table-cell;
  padding: 1em;
  text-align: center;
  vertical-align: middle;
}
.fostrap-logo {
  width: 100px;
  margin-bottom:15px
}
h1.heading {
  color: #fff;
  font-size: 1.15em;
  font-weight: 900;
  margin: 0 0 0.5em;
  color: #505050;
}
@media (min-width: 450px) {
  h1.heading {
    font-size: 3.55em;
  }
}
@media (min-width: 760px) {
  h1.heading {
    font-size: 3.05em;
  }
}
@media (min-width: 900px) {
  h1.heading {
    font-size: 3.25em;
    margin: 0 0 0.3em;
  }
}
.card {
  display: block;
    margin-bottom: 20px;
    line-height: 1.42857143;
    background-color: gray;
    border-radius: 2px;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12);
    transition: box-shadow .25s;
}
.card:hover {
  box-shadow: 0 8px 17px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
}
.img-card {
  width: 100%;
  height:200px;
  border-top-left-radius:2px;
  border-top-right-radius:2px;
  display:block;
    overflow: hidden;
}
.img-card img{
  width: 100%;
  height: 200px;
  object-fit:cover;
  transition: all .25s ease;
}
.card-content {
  padding:15px;
  text-align:left;
}
.card-title {
  margin-top:0px;
  font-weight: 700;
  font-size: 1.65em;
}
.card-title a {
  color: #000;
  text-decoration: none !important;
}
.card-read-more {
  border-top: 1px solid #D4D4D4;
}
.card-read-more a {
  text-decoration: none !important;
  padding:10px;
  font-weight:600;
  text-transform: uppercase
}


</style>
