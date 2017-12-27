<template>
  <div class="dashboard" >
   <div id="myNav" class="overlay">
      <div v-for="card in cards">
         <div  v-if="position1 == card.position && index == card.index " v-bind:class= card.class :style="{background : card1}" >
            <div class="tit">
                <h4><b>{{card.title}}</b></h4>
             </div>
          <div class="img" >
               <img class="cardimg" :src= card.img >
            </div>
            
            <div class="container11">
               <p style="text-align: justify; font-size:14px; font-family: Lobster, serif" >{{card.desc}} </p>
            </div>
         </div>
      </div>
   </div>
   
   <div class="dasbma">
      <div class="dastit dastit_pos"><span>Flowz Applications</span> Third-Party Applications</div>
      <div class="dasund">
         <div class="dasico">
		 
		 <section>
			  <div class="nav">
				<ul class="radial-nav socialCircle-container-left">
					
					<li data-content="git"><a href="#"></a></li>
					<li data-content="grunt"><a href="#"></a></li>
					<li data-content="yo"><a href="#"></a></li>
					<li data-content="gulp"><a href="#"></a></li>
					<li data-content="git"><a href="#"></a></li>
					<li>
						<a href="javascript:void(0)" class="menu-item vmail" @click="goTosubscriptionplan('http://vmail.flowzcluster.tk')" v-on:mouseover="hoverOnSubmenu('rgba(94, 193, 182, 0.7)', 'left' ,3)">
					
					<div class="dashcub v-mail">
						<div class="dascutx">
							<div class="dascufo">
								<span class="tit">V-Mail</span>
								<span class="tex">This is a user 
				friendly Vue based 
				email client.It can 
				receives the mail</span>
							</div>   
						</div>
					   <div class="dascuico"><div class="dasvubot"><img src="../assets/images/icon-3.png"> </div></div>
					</div>
					
				</a>
					</li>
					<li data-content="yo">
						<a href="javascript:void(0)" class="menu-item ewbuil" @click="goTosubscriptionplan('http://webbuilder.flowzcluster.tk')" v-on:mouseover="hoverOnSubmenu('rgba(109, 198, 77, 0.7)', 'left' , 2)">
				
					<div class="dashcub web-builder">
						<div class="dascutx">
							<div class="dascufo">
								<span class="tit">Web Builder</span>
								<span class="tex">Build the website 
				you desire without 
				any knowledge 
				of coding.</span>
							</div>   
						</div>
					   <div class="dascuico"><div class="dasvubot"><img src="../assets/images/icon-2.png"> </div></div>
					</div>
					
				</a>
					</li>
					<li data-content="gulp"><a href="javascript:void(0)"></a></li>
					
					<li class="menu"  @click="openNav2()"><span class="icon-menu"></span> <img src="../assets/images/Website.png" ></li>
				  </ul>
			  </div>  
				
				
				
				
				
				
				<div class="nav">
					<ul class="radial-nav">
						<li data-content="git"><a href="#"></a></li>
						<li data-content="css">
							<a href="#" class="menu2-item " @click="goTosubscriptionplan('http://uploader.flowzcluster.tk')" v-on:mouseover="hoverOnSubmenu('rgba(245, 93, 33, 0.7)', 'right' , 6)"> 
				   
					<div class="dashcub dbetl">
						<div class="dascutx">
							<div class="dascufo">
								<span class="tit">Uploader</span>
								<span class="tex">The Compatibility of
				your databases
				are automatically
				created</span>
							</div>   
						</div>
					   <div class="dascuico" ><div class="dasvubot"><img src="../assets/images/icon-6.png"> </div></div>
					</div>
				   
				   </a>
						</li>
						<li data-content="js">
							 <a href="#" class="menu2-item " @click="goTosubscriptionplan('http://crm.flowzcluster.tk')" v-on:mouseover="hoverOnSubmenu('rgba(242, 168, 46, 0.7)', 'right' , 5)"> 
				   
					<div class="dashcub accounting">
						<div class="dascutx">
							<div class="dascufo">
								<span class="tit">Accounting</span>
								<span class="tex">It is an user friendly
				way of listing the tasks,
				assigning them</span>
							</div>   
						</div>
					   <div class="dascuico"><div class="dasvubot"><img src="../assets/images/icon-5.png"> </div></div>
					</div>
				   
				   </a>
						</li>
						<li data-content="jade"><a href="#"></a></li>
						<li data-content="html5"><a href="#"></a></li>
						
						
						<li data-content="grunt"><a href="#"></a></li>
						<li data-content="yo"><a href="#"></a></li>
						<li data-content="gulp"><a href="#"></a></li>
						<li class="menu" @click="openNav3()" ><span class="icon-menu"></span><img src="../assets/images/CRM.png"></li>
					  </ul>
				</div>  
			</section>
		 
            
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
let location = psl.parse(window.location.hostname);
Vue.use(VueSession)

export default {
  name: 'dashboard',
  data () {
    return {
      msg: 'Welcome to Dashboard',
      card1: '',
      position1: '',
      index : '',
      leftup: 1000,
      topup: 200,
      cards : [],
      active1:false,
      active2:false
    }
  },
  created() {

    $(document).ready(function() {
      
      setTimeout(() => {
      $( ".right-menu" ).socialCircle({
      rotate: 270,
      radius:140,
      circleSize: 2,
      speed:500
  });
    $( ".left-menu" ).socialCircle({
    rotate: 90,
    radius:140,
    circleSize: 2,
    speed:500
  });
    }, 1500);

  })
        
var url_string = window.location.href;
        var url = new URL(url_string);
        location = location.domain === null ? location.input : location.domain ;
        

        let token = url.searchParams.get("ob_id");
        console.log("dash ", token)
        if(token){
            //this.$session.start()
            //this.$session.set('auth_token', token);
            console.log("dash ", token)
            this.$cookie.set('auth_token', token, {expires: 1, domain: location});
        }

        //let logintoken = this.$session.get('auth_token');
        let logintoken =this.$cookie.get('auth_token')
        if(logintoken == undefined || !logintoken){
            this.$router.push('login');
        }


        

        this.cards = [
          {
              img : "../src/assets/images/todo.png",
              color: "#FFFFFF",
              index: "1",
              class : "card11 webpart",
              title : "Work-flow",
              position : "left",
              // desc : "Build your own business flow using BPMN without a vast knoledge of coding. It defines applications as networks of black box processes, which exchange data across predefined connections  by message passing, where the connections are specified externally to the processes.",
              
          },
          {
              img :"../src/assets/images/todo.png" ,
              color: "red",
              index: "2",
              class : "card11 webpart",
              position : "left",
              title :"Web Builder" ,
              // desc : "Build the website you desire without any knowledge of coding.Flowz Web builder provides all the needed tool to create a stunning website.Just drag and drop the components to your page and publish the website.It is configured with very rich components and partial you can reuse through the process."
          },
          {
              img :"../src/assets/images/vmail.png" ,
              color: "yellow",
              index: "3",
              class : "card11 webpart",
              position : "left",
              title : "V-Mail",
              // desc : "This is a user friendly Vue based email client.It can receives the mail , list it and show the email content. It can also send mail in plain or html format to multiple User in a effective and efficient way."
          },
          {
              img :"../src/assets/images/todo.png" ,
              color: "gray",
              index: "4",
              class : "card11 webpart",
              position : "left",
              title : "MOM",
              // desc : "It is an user friendly way of listing the tasks, assigning them, to track them, maintain comments or action taken and its status updates of minutes.The user can create subtasks upto any level in real time."
          },
          {
              img :"../src/assets/images/account.png" ,
              index: "5",
              class : "card11 crmpart",
              position : "right",
              title : "Accounting",
              // desc : "It is an user friendly way of listing the tasks, assigning them, to track them, maintain comments or action taken and its status updates of minutes.The user can create subtasks upto any level in real time."
          },
          {
              img :"../src/assets/images/databases.jpg" ,
              index: "6",
              class : "card11 crmpart",
              position : "right",
              title : "Uploader",
             // desc : "The Compatibility of your databases (both local and remote) are automatically created, configured and updated through the DBETL client. Creating, repairing, deleting and renaming and maintaining multiple databases is much simpler."
          },
          {
              img :"../src/assets/images/web-builder-img.png" ,
              index: "7",
              class : "card11 crmpart",
              position : "right",
              title : "Quotes",
             // desc : "It is an user friendly way of listing the tasks, assigning them, to track them, maintain comments or action taken and its status updates of minutes.The user can create subtasks upto any level in real time."
          },
          {
              img :"../src/assets/images/web-builder.jpg" ,
              index: "8",
              class : "card11 crmpart",
              position : "right",
              title : "Users",
              // desc : "Successful CRM is about competing in the relationship dimension. Not as an alternative to having a competitive product or reasonable price- but as a differentiator.Track all your user anytime from anywhere across the globe very easily."
          }
          
      ]
    },
    
    mounted(){

    },

  methods :{
    hoverOnSubmenu: function(color, position, index) {
        if((position=='left' && this.active1) || (position=='right' && this.active2)){

        
        this.index = index;
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
      }
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
     
      goTosubscriptionplan : function(data){
          //this.$router.push('subscriptionplan/');
          window.location =data
      },
      goToMoM : function(data){
        console.log('Redirect to MOM')
        window.location='http://localhost:3000';
        // window.location='http://162.242.223.167';
      },
      openNav : function(){
        this.clearCard();
        if(this.active2){
          $( ".right-menu" ).click();
          this.active2=!this.active2;
        }
        console.log("OPen Nav")
       this.active1=!this.active1;
      },
       openNav2 : function(){
        $('.radial-nav').on('click', function(){
		  //evt.stopPropagation();
		  //$('.nav, .item').removeClass('active');
		  $(this).toggleClass('expanded');
		  //$(this).find('li').removeClass('selected');
		})
      },
		openNav3 : function(){
        $('.radial-nav').on('click', function(){
		  //evt.stopPropagation();
		  //$('.nav, .item').removeClass('active');
		  $(this).toggleClass('expanded');
		  //$(this).find('li').removeClass('selected');
		})
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



.dashboard::after {    content: "";
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-image: url(../assets/images/logo-bg.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    opacity: 0.08;
    animation: logozoom 5s;
    z-index: -1; } 

    @keyframes logozoom {
      0% {
        opacity: 0.01;
    }
    30% {
      opacity: 0.05;
    }
    50% {
      opacity: 0.02;
    }
    100% {
      opacity: 0.08;
    }
    }

    .menu2-open:checked + .menu2-open-button{ 
      width: 60px;
      height: 70px;
      background-color: #e4e4e4;
      transform: scale(1.2, 1) translate3d(0, 0, 0) !important;
      left: 55%;
      top: 15px;
      }
  .menu-open:checked + .menu-open-button {    
      width: 60px;
      height: 70px;
      background-color: #e4e4e4;
      transform: scale(1.2, 1) translate3d(0, 0, 0) !important;
      left: 55%;
      top: 15px;}
/*.menu2 a img,
.menu a img {display: inline-block !important;}*/
.menus-icon img {width: 64px;
    height: 64px;}

.card11.webpart {
    position: fixed;
    right: 2%;
    top: 120px;
    max-height: 60%;
    overflow: auto;    padding: 10px;background-color: #f3d9e5;
	border-radius:10px;
}
.webpart .img {
    margin-top: 5px;
    width: auto;
    max-height: auto;
    display: inline-block;
    /* border: 1px solid #b3afaf; */
}
.webpart .img img { 
    max-width: -webkit-fill-available;
    max-height: -webkit-fill-available;}
.webpart .tit {display: inline-block;    width: -webkit-fill-available; font-family: 'Helvetica-N-Md'; color: white; text-align:center;}
.webpart .container11 {    padding: 2px 16px;
    /*border-top: solid 1px #ccc;
    padding-top: 10px;
    margin-top: 10px;*/
    color: white}
  

.card11.crmpart {
    position: fixed;
    left: 2%;
    top: 120px;
    max-height: 60%;
    overflow: auto;    padding: 10px;background-color: #fff;
	    border-radius: 9px;
}
.crmpart .img {
    margin-top: 5px;
    width: auto;
    max-height: auto;
    display: inline-block
}
.crmpart .img img { max-width: -webkit-fill-available;
    max-height: -webkit-fill-available;}
.crmpart .tit {display: inline-block;    width:100%; font-family: 'Noto serif'; color: white; font-family: 'Helvetica-N-Md';}
.crmpart .tit h4 {width:100%; text-align:center;}
.crmpart .container11 {    padding: 2px 16px;
   /* border-top: solid 1px #ccc;
    padding-top: 10px;
    margin-top: 10px;
    color: white*/}

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
    /* border-radius: 5px 5px 0 0; */
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



/* .overlay {
    height: 100%;
    width: 100%;
    display: none;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: rgba(251, 251, 251, 0.1);
} */

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
  width: 100%;top: 13%;margin: auto;position: absolute; opacity: 0
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



.menu-open {
   display: none;
}

/*.menu a img{
  border-radius: 50%;
}*/

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




.menu2-open {
   display: none;
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


.dasbordmin {background-image: url(../assets/images/BG.jpg); background-size: cover; width: 100%; height: 100%; position: fixed; }

.dashcub {margin-top: 20px;text-align: center;display: inline-block;}
.dascutx {height: 115px;width: 210px;position: relative;}
.dascuico{width: 120px;position: relative;background-color: #c8df4a;height: 47px;-webkit-border-radius: 0px 0px 126px 126px / 0px 0px 110px 110px;border-radius: 0%  0%  130%  130%  / 0   0%   260%  260%;display: inline-block;top: -1px;}
.dascutx:before {content: "";position: absolute;background-color: #ffffff;width: 210px;top: -20px;height: 40px;left: 0;border-radius: 100%;}
.dascutx:after {content: "";height: 115px;width: 210px;position: absolute;border-top: 115px solid #ffffff;border-left: 45px solid transparent;border-right: 45px solid transparent;left: 0;top: 0;}
.dascuico:after {content: "";background-color: #c8df4a;width: 100%;top: -7px;height: 17px;left: 0;border-radius: 100%;display: inline-block;position: absolute;}
.dascufo {position: relative;z-index: 1;width: 149px;margin: 0 auto;text-align: left;}
.dascufo .tit {width: 100%;display: inline-block;font-family: 'Helvetica-N-Md';font-size: 18px;text-transform: capitalize; line-height:20px; float:left;}
.dascufo .tex {font-family: 'Helvetica-LT-Roman';font-size: 13px;line-height: 15px;display: inline-block; line-height:14px; float:left;}
.dasvubot {min-height: 46px;display: inline-block;vertical-align: middle;position: relative;z-index: 1;margin-top: -19px;}

.flow .tit {color: #576509;}
.flow .tex {color: #666666;}
.flow .dascuico:after {}
.flow .dascuico {}

.web-builder .tit {color: #348218;}
.web-builder .tex {color: #666666;}
.web-builder .dascuico:after {background-color: #6dc64d;}
.web-builder .dascuico {
    background-color: #6dc64d;
}

.v-mail .tit {color: #187268;}
.v-mail .tex {color: #666666;}
.v-mail .dascuico:after {background-color: #5ec1b6;}
.v-mail .dascuico {
    background-color: #5ec1b6;
}

.mom .tit {color: #1d4585;}
.mom .tex {color: #666666;}
.mom .dascuico:after {background-color: #4c7ecb;}
.mom .dascuico {
    background-color: #4c7ecb;
}

.accounting .tit {color: #a56c10;}
.accounting .tex {color: #666666;}
.accounting .dascuico:after {background-color: #f2a82e;}
.accounting .dascuico {
    background-color: #f2a82e;
}

.dbetl .tit {color: #902e07;}
.dbetl .tex {color: #666666;}
.dbetl .dascuico:after {background-color: #f55d21;}
.dbetl .dascuico {
    background-color: #f55d21;
}

.quotes .tit {color: #770154;}
.quotes .tex {color: #666666;}
.quotes .dascuico:after {background-color: #c547a0;}
.quotes .dascuico {
    background-color: #c547a0;
}

.users .tit {color: #3b096c;}
.users .tex {color: #666666;}
.users .dascuico:after {background-color: #7e51ac;}
.users .dascuico {
    background-color: #7e51ac;
}


.nav {width: 500px;height: 500px;text-align: center;display: inline-block;vertical-align: middle;float: left;position: relative;margin-right: 20px;}
.nav:before {content: "";display: inline-block;height: 100%;vertical-align: middle;}
.nav:after {content: "";display: inline-block;position: absolute;bottom: 0;right: 0;top: 100%;border-right: 1px solid #3e5edf;transition: all 0.5s;transition-delay: 0.5s;}
.nav.active:after {top: 0;}
.radial-nav {position: relative;display: inline-block;width: 70px;height: 70px;-webkit-transform-origin: center center;}
.radial-nav .menu {border: none !important;position: relative;width: 70px;height: 70px;z-index: 100;transition: all 0.5s;display: table-cell;vertical-align: middle; left: 50px;top: 30px;}
.radial-nav .menu:active {-webkit-transform: rotate(-15deg);}
.radial-nav li:not(.menu) {position: absolute;left: 0;  border: 1px solid transparent;text-align: center;display: inline-block;vertical-align: middle;transition: all 1s;z-index: 1;}
.radial-nav li:not(.menu).selected {-webkit-transform: rotate(0deg) translateX(120px) rotate(0deg);border: 1px solid #5151f1;}
.radial-nav li:not(.menu).selected a {opacity: 1;}
.radial-nav li:not(.menu):before {content: "";display: inline-block;vertical-align: middle;height: 100%;}
.radial-nav li:not(.menu) a {display: inline-block;vertical-align: middle;opacity: 0;-webkit-transition: all 0.5s;}
.radial-nav.expanded li:not(.menu) {}
.radial-nav.expanded li:not(.menu):hover {}

.radial-nav.expanded li:nth-child(1) {-webkit-transform: rotate(20deg) translateY(-210px) rotate(0deg);}
.radial-nav.expanded li:nth-child(2) {-webkit-transform: rotate(65deg) translateY(-210px) rotate(0deg);}
.radial-nav.expanded li:nth-child(3) {-webkit-transform: rotate(110deg) translateY(-210px) rotate(0deg);}
.radial-nav.expanded li:nth-child(4) {-webkit-transform: rotate(155deg) translateY(-210px) rotate(0deg);}
.radial-nav.expanded li:nth-child(5) {-webkit-transform: rotate(200deg) translateY(-210px) rotate(0deg);}
.radial-nav.expanded li:nth-child(6) {-webkit-transform: rotate(245deg) translateY(-210px) rotate(0deg);}
.radial-nav.expanded li:nth-child(7) {-webkit-transform: rotate(290deg) translateY(-210px) rotate(0deg);}
.radial-nav.expanded li:nth-child(8) {-webkit-transform: rotate(335deg) translateY(-210px) rotate(0deg);}

.radial-nav.expanded li a {opacity: 1;}
.radial-nav.expanded .icon-menu {border-color: #5151f1;-webkit-transform: rotate(90deg);}
.radial-nav.expanded .icon-menu:before {border-color: #5151f1;}
.radial-nav.expanded .icon-menu:after {border-color: #5151f1;}
.radial-nav.expanded .menu:active {-webkit-transform: rotate(15deg) !important;}


.icon-menu:hover {border-color: #00003a;}
.icon-menu:hover:before {border-color: #00003a;}
html, body {height: 100%;background-color: #2d2dc2;}
a {color: inherit;text-decoration: none;}
* {box-sizing: border-box;-webkit-box-sizing: border-box;}
body {color: #d1d1d1;}
.content {padding-top: 65px;overflow: hidden;}
.content .item {opacity: 0;transition: all 0.5s;transition-delay: 1.3s;position: absolute;}
.content .item.active {opacity: 1;position: static;}
.content .item h1 {font-size: 25px;margin-bottom: 0.3em;}

.radial-nav.expanded li.menu span.icon-menu { width: 87px;height: 87px;border-radius: 50px;position: absolute;top: 7px;left: 7px;background-color: #ccc;border: 0;-webkit-transition: all 0.3s;}
.radial-nav.expanded .icon-menu:after{content: "";display: inline-block;border-bottom: 3px solid #141444;width: 100%;-webkit-transition: all 0.3s;-webkit-transform: rotate(235deg) translate(-8px, -59px) rotate(-90deg); top: 0;position: absolute;}
.radial-nav.expanded .icon-menu:before{content: "";display: inline-block;border-bottom: 3px solid #141444;width: 100%;-webkit-transition: all 0.3s;-webkit-transform: rotate(235deg) translateX(-8px) rotate(-190deg);top: 36px;position: absolute;left: -7px;}






.dasbordmin {background-image: url(../assets/images/BG.jpg); background-size: cover; width: 100%; height: 100%; position: fixed; }


.dashcub {margin-top: 20px;text-align: center;display: inline-block;}
.dascutx {height: 115px;width: 210px;position: relative;}
.dascuico{width: 120px;position: relative;background-color: #c8df4a;height: 47px;-webkit-border-radius: 0px 0px 126px 126px / 0px 0px 110px 110px;border-radius: 0%  0%  130%  130%  / 0   0%   260%  260%;display: inline-block;top: -1px;}
.dascutx:before {content: "";position: absolute;background-color: #ffffff;width: 210px;top: -20px;height: 40px;left: 0;border-radius: 100%;}
.dascutx:after {content: "";height: 115px;width: 210px;position: absolute;border-top: 115px solid #ffffff;border-left: 45px solid transparent;border-right: 45px solid transparent;left: 0;top: 0;}
.dascuico:after {content: "";background-color: #c8df4a;width: 100%;top: -7px;height: 17px;left: 0;border-radius: 100%;display: inline-block;position: absolute;}
.dascufo {position: relative;z-index: 1;width: 149px;margin: 0 auto;text-align: left;}
.dascufo .tit {width: 100%;display: inline-block;font-family: 'Helvetica-N-Md';font-size: 18px;text-transform: capitalize; line-height:20px; float:left;}
.dascufo .tex {font-family: 'Helvetica-LT-Roman';font-size: 13px;line-height: 15px;display: inline-block; line-height:14px; float:left;}
.dasvubot {min-height: 46px;display: inline-block;vertical-align: middle;position: relative;z-index: 1;margin-top: -5px;}
.dasico {width: auto;display:  inline-block;margin-right: 100px;}
.dasund {text-align: center;}
.nav {width: 260px;}

</style>

