<template>
  <div class="dashboard" >

   <div id="myNav" class="overlay">
	<div v-for="card in cards">
		<div v-if="position == card.position && index == card.index"  v-bind:class= card.class :style="{background : card1}" >
			<div class="tit">
				<h4 style="font-size:25px;"><b>{{card.title}}</b></h4>
			</div>
			<div class="img" >
			<img class="cardimg" :src= card.img >
			</div>

			<div class="container11">
			<p style="text-align: justify; font-size:14px; font-family:Arial, Helvetica, sans-serif; color:white; padding-top:10px; line-height:17px" >{{card.desc}} </p>
			</div>
		</div>
	</div>
   </div>

   <div class="dasbma">

      <div class="dasund">
         <div class="dasico">

			<section>
			  <div class="nav">
				<ul class="radial-nav" id="radial-nav">

					<li data-content="git"><a href="#"></a></li>
					<li data-content="grunt"><a href="#"></a></li>
					<li data-content="yo"><a href="#"></a></li>
					<li data-content="gulp"><a href="#"></a></li>
					<li data-content="git"><a href="#"></a></li>
          <!-- v-mail -->
          <li>
						<a href="javascript:void(0)" class="menu-item vmail" @click="goTosubscriptionplan(flowzVmailUrl)" v-on:mouseover="hoverOnSubmenu('rgba(94, 193, 182, 0.7)', 'left' ,3)">
							<div class="dashcub v-mail">
								<div class="dascutx">
									<div class="dascufo">
										<span class="tit">V-Mail </span>
										<span class="tex">This is a user
											friendly (vue based)
											email client. It can
											receives the email.</span>
									</div>
								</div>
							   <div class="dascuico"><div class="dasvubot"><img src="../assets/images/icon-3.png"> </div></div>
							</div>
						</a>
          </li>
          <!-- web-builder -->
					<li data-content="yo">
						<a href="javascript:void(0)" class="menu-item vmail" @click="goTosubscriptionplan(flowzBuilderUrl)" v-on:mouseover="hoverOnSubmenu('rgba(109, 198, 77, 0.7)', 'left' ,2)">
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

					<li class="menu"  @click="openNav1()"><span class="icon-menu"></span> <img src="../assets/images/Website.png" ></li>
				  </ul>
			  </div>

				<div class="nav">
					<ul class="radial-nav" id="radial-nav1">
          <li data-content="git"><a href="#"></a></li>
          <!-- uploader -->
					<li data-content="css">
						<a href="#" class="menu2-item " @click="goTosubscriptionplan(flowzUploaderUrl)" v-on:mouseover="hoverOnSubmenu('rgba(245, 93, 33, 0.7)', 'right' , 6)">
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
							   <div class="dascuico"><div class="dasvubot"><img src="../assets/images/icon-6.png"> </div></div>
							</div>
            </a>
          </li>
          <!-- crm -->
					<li data-content="js">
						<a href="#" class="menu2-item " @click="goTosubscriptionplan(flowzcrmUrl)" v-on:mouseover="hoverOnSubmenu('rgba(242, 168, 46, 0.7)', 'right' , 5)">
							<div class="dashcub accounting">
								<div class="dascutx">
									<div class="dascufo">
										<span class="tit">Accounting / Users</span>
										<span class="tex">It is a complete suite of
            managing invoices,
            listing all transactions.
						</span>
                  </div>
								</div>
							   <div class="dascuico"><div class="dasvubot"><img src="../assets/images/icon-5.png"> </div></div>
							</div>
            </a>
          </li>
          <!-- virualshop -->
          <li data-content="css">
              <a href="#" class="menu2-item " @click="goTosubscriptionplan(flowzVshopDataUrl)" v-on:mouseover="hoverOnSubmenu('rgba(106, 177, 135, 1)', 'right' , 9)">
                <div class="dashcub virtualshop">
                  <div class="dascutx">
                    <div class="dascufo">
                      <span class="tit">Virtual Shop Data</span>
                      <span class="tex">The Compatibility of
              your databases
              are automatically
              created</span>
                    </div>
                  </div>
                   <div class="dascuico"><div class="dasvubot"><img src="../assets/images/virtualshop.png"> </div></div>
                </div>
              </a>
          </li>
					<li data-content="jade"><a href="#"></a></li>
					<li data-content="html5"><a href="#"></a></li>
					<li data-content="grunt"><a href="#"></a></li>
					<li data-content="yo"><a href="#"></a></li>
					<li class="menu" @click="openNav()"><span class="icon-menu"></span><img src="../assets/images/CRM.png"></li>
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
      position: 'left',
      index : 0,
      leftup: 1000,
      topup: 200,
      cards : [],
      active1:false,
      active2:false,
      flowzDashboardUrl: 'https://www.dashboard.' + process.env.domainkey,
      flowzBuilderUrl: 'https://www.webbuilder.' + process.env.domainkey,
      flowzVmailUrl: 'https://www.vmail.' + process.env.domainkey,
      flowzUploaderUrl: 'https://www.uploader.' + process.env.domainkey,
      flowzcrmUrl: 'https://www.crm.' + process.env.domainkey,
      flowzVshopDataUrl: 'https://www.vshopdata.' + process.env.domainkey
    }
  },
  created() {
    $(document).ready(function() {


		/*$('.radial-nav').on('click', function(evt){
		  //evt.stopPropagation();
		  //$('.nav, .item').removeClass('active');
		  $(this).toggleClass('expanded');
		  //$(this).find('li').removeClass('selected');
		});*/
		$('.overlay').css({'opacity': '0'})

  })




        this.cards = [
          {
              img : "/assets/images/todo.png",
              color: "#FFFFFF",
              index: "1",
              class : "card11 webpart",
              title : "Work-flow",
              position : "left",
              // desc : "Build your own business flow using BPMN without a vast knoledge of coding. It defines applications as networks of black box processes, which exchange data across predefined connections  by message passing, where the connections are specified externally to the processes.",

          },
          {
              img :"/assets/images/web_builder-ss.png" ,
              color: "red",
              index: "2",
              class : "card11 webpart",
              position : "left",
              title :"Web Builder" ,
              desc : "Build the website you desire without any knowledge of coding. Flowz web builder provides all the needed tool to create a stunning website. Just drag and drop the components to your page and publish the website. It is configured with very rich components and partial you can reuse through the process."
          },
          {
              img :"/assets/images/vmail.png" ,
              color: "yellow",
              index: "3",
              class : "card11 webpart",
              position : "left",
              title : "V-Mail",
              desc : " This is a user friendly (vue based) email client. It can receive the email, list it and show the content. It can also send mail in plain or html format to multiple users in an effective and efficient way."
          },
          {
              img :"/assets/images/todo.png" ,
              color: "gray",
              index: "4",
              class : "card11 webpart",
              position : "left",
              title : "MOM",
              // desc : "It is an user friendly way of listing the tasks, assigning them, to track them, maintain comments or action taken and its status updates of minutes.The user can create subtasks upto any level in real time."
          },
          {
              img :"/assets/images/account.png" ,
              index: "5",
              class : "card11 crmpart",
              position : "left",
              title : "Accounting",
              desc : "Flowz Accounting system is a complete suite of managing invoices, listing all transactions, customer relationship, managing contacts and many more in one place. Its ability to make payments for due invoices and notifying clients through email makes it more effective in terms of your business."
          },
          {
              img :"/assets/images/databases.jpg" ,
              index: "6",
              class : "card11 crmpart",
              position : "left",
              title : "Uploader",
              desc : "The Compatibility of your databases (both local and remote) are automatically created, configured and updated through the DBETL client. Creating, repairing, deleting and renaming and maintaining multiple databases is much simpler."
          },
          {
              img :"/assets/images/web-builder-img.png" ,
              index: "7",
              class : "card11 crmpart",
              position : "right",
              title : "Quotes",
             // desc : "It is an user friendly way of listing the tasks, assigning them, to track them, maintain comments or action taken and its status updates of minutes.The user can create subtasks upto any level in real time."
          },
          {
              img :"/assets/images/web-builder.jpg" ,
              index: "8",
              class : "card11 crmpart",
              position : "right",
              title : "Users",
              // desc : "Successful CRM is about competing in the relationship dimension. Not as an alternative to having a competitive product or reasonable price- but as a differentiator.Track all your user anytime from anywhere across the globe very easily."
          },
          {
              img :"/assets/images/databases.jpg" ,
              index: "9",
              class : "card11 crmpart",
              position : "left",
              title : "Virtual Shop Data",
              desc : "The Compatibility of your databases (both local and remote) are automatically created, configured and updated through the DBETL client. Creating, repairing, deleting and renaming and maintaining multiple databases is much simpler."
          },

      ]
    },

    mounted(){
      // console.log('Mounted called...')
      $("#big-video-wrap").css("width","100%");

      let token = this.$cookie.get('auth_token') ;
      // console.log('Token::::::', token)
      // console.log('this.$store.state.isGooleLogin::::::', this.$store.state.isGooleLogin)
      // console.log('this.$store.state.isFacebookLogin::::::', this.$store.state.isFacebookLogin)
      // console.log('Gmail and FB login', (this.$store.state.isGooleLogin || this.$store.state.isFacebookLogin))
      if(token == null || token == undefined || token == '' )
      {
        if(!(this.$store.state.isGooleLogin || this.$store.state.isFacebookLogin)){
          this.$router.push('/login');
        }
      }
    },

  methods :{
    hoverOnSubmenu: function(color, position, index) {
        this.index = index;
        this.card1 = color
        this.position1 = position



		if($('.radial-nav').hasClass('expanded')){
			if (position === 'right') {
			  $('.overlay').css({'left': '30px','right': 'auto','opacity': '1' })
			} else {
			  $('.overlay').css({'left': 'auto','right': '30px','opacity': '1' })
			}
		} else {
			 $('.overlay').css({'opacity': '0'})
		}



    },

	openNav1 : function(){


		  $('#radial-nav').toggleClass('expanded');

		  // console.log(this)
		  $('.overlay').css({'opacity': '0'})
		if($('#radial-nav').hasClass('expanded')){
			$('#radial-nav1').removeClass('expanded');
        }


      },
	  openNav : function(){


		  $('#radial-nav1').toggleClass('expanded');
		 $('.overlay').css({'opacity': '0'})
		  // console.log(this)
		if($('#radial-nav1').hasClass('expanded')){
			$('#radial-nav').removeClass('expanded');
        }


      },

      // clearCard: function() {
      //   this.card1 = ''
      //   this.position1 = ''
      //   this.leftup = 0
      //   this.topup = 0
      // },
      // trigger: function(){
      //     $(".menu").toggleClass("active");
      // },
      //  trigger2: function(){
      //     $(".menu2").toggleClass("active");
      // },
      goTosubscriptionplan : function(data){
          //this.$router.push('subscriptionplan/');
         // window.location =data
         window.open(data, '_blank');
      },
      // goToMoM : function(data){
      //   console.log('Redirect to MOM')
      //   window.location='http://localhost:3000';
      //   // window.location='http://162.242.223.167';
      // },



      // closeNav : function(){
      //   document.getElementById("myNav").style.display = "none";
      //   document.getElementById("icon1").style.display = "block";
      //   this.clearCard()
      // },
      // closeNav2 : function(){
      //   document.getElementById("myNav").style.display = "none";
      //   document.getElementById("icon2").style.display = "block";
      //   this.clearCard()
      // },

      // hello:function(){
      //     var items = document.querySelectorAll('.circle a');

      //       for(var i = 0, l = items.length; i < l; i++) {
      //       items[i].style.left = (50 - 35*Math.cos(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";

      //       items[i].style.top = (50 + 35*Math.sin(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + "%";
      //       }
      //      document.querySelector('.circle').classList.toggle('open');
      // }

  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>

.nav {width: 500px;height: 500px;text-align: center;display: inline-block;vertical-align: middle;float: left;position: relative;margin-right: 20px;}
.nav:before {content: "";display: inline-block;height: 100%;vertical-align: middle;}
.nav:after {content: "";display: inline-block;position: absolute;bottom: 0;right: 0;top: 100%;border-right: 1px solid #3e5edf;transition: all 0.5s;transition-delay: 0.5s;}
.nav.active:after {top: 0;}
.radial-nav {position: relative;display: inline-block;width: 70px;height: 70px;-webkit-transform-origin: center center;}
.radial-nav .menu {border: none !important;position: relative;width: 210px; padding-top: 50px; height: 210px;z-index: 100;transition: all 0.5s;vertical-align: middle; background-color: rgba(189, 0, 0, 0);}
.radial-nav .menu:active {-webkit-transform: rotate(-15deg);}
.radial-nav li:not(.menu) {position: absolute;left: 0;  border: 1px solid transparent;text-align: center;display: inline-block;vertical-align: middle;transition: all 1s;z-index: 1;}
.radial-nav li:not(.menu).selected {-webkit-transform: rotate(0deg) translateX(120px) rotate(0deg);border: 1px solid #5151f1;}
.radial-nav li:not(.menu).selected a {opacity: 1;}
.radial-nav li:not(.menu):before {content: "";display: inline-block;vertical-align: middle;height: 100%;}
.radial-nav li:not(.menu) a {display: inline-block;vertical-align: middle;opacity: 0;-webkit-transition: all 0.5s;}
.radial-nav.expanded li:not(.menu) {}
.radial-nav.expanded li:not(.menu):hover {}

/* .radial-nav.expanded li:nth-child(1) {-webkit-transform: rotate(20deg) translateY(-210px) rotate(0deg);}
.radial-nav.expanded li:nth-child(2) {-webkit-transform: rotate(65deg) translateY(-210px) rotate(0deg);}
.radial-nav.expanded li:nth-child(3) {-webkit-transform: rotate(110deg) translateY(-210px) rotate(0deg);}
.radial-nav.expanded li:nth-child(4) {-webkit-transform: rotate(155deg) translateY(-210px) rotate(0deg);}
.radial-nav.expanded li:nth-child(5) {-webkit-transform: rotate(200deg) translateY(-210px) rotate(0deg);}
.radial-nav.expanded li:nth-child(6) {-webkit-transform: rotate(245deg) translateY(-210px) rotate(0deg);}
.radial-nav.expanded li:nth-child(7) {-webkit-transform: rotate(290deg) translateY(-210px) rotate(0deg);}
.radial-nav.expanded li:nth-child(8) {-webkit-transform: rotate(335deg) translateY(-210px) rotate(0deg);} */


.radial-nav.expanded li:nth-child(1) {-webkit-transform: rotate(10deg) translateY(-210px) rotate(0deg);}
.radial-nav.expanded li:nth-child(2) {-webkit-transform: rotate(50deg) translateY(-210px) rotate(0deg);}
.radial-nav.expanded li:nth-child(3) {-webkit-transform: rotate(95deg) translateY(-210px) rotate(0deg);}
.radial-nav.expanded li:nth-child(4) {-webkit-transform: rotate(140deg) translateY(-210px) rotate(0deg);}
.radial-nav.expanded li:nth-child(5) {-webkit-transform: rotate(200deg) translateY(-210px) rotate(0deg);}
.radial-nav.expanded li:nth-child(6) {-webkit-transform: rotate(245deg) translateY(-210px) rotate(0deg);}
.radial-nav.expanded li:nth-child(7) {-webkit-transform: rotate(290deg) translateY(-210px) rotate(0deg);}
.radial-nav.expanded li:nth-child(8) {-webkit-transform: rotate(335deg) translateY(-210px) rotate(0deg);}



.radial-nav.expanded li:nth-child(1) .dascufo {-webkit-transform: rotate(-10deg) translateY(10px) translateX(10px);}
.radial-nav.expanded li:nth-child(2) .dascufo{-webkit-transform: rotate(-56deg) translateY(-18px) translateX(-28px)}
.radial-nav.expanded li:nth-child(3) .dascufo{-webkit-transform: rotate(-94deg) translateY(-59px) translateX(-38px)}
.radial-nav.expanded li:nth-child(4) .dascufo{-webkit-transform: rotate(-138deg) translateY(-59px) translateX(-17px); width:159px;}
.radial-nav.expanded li:nth-child(5) .dascufo{-webkit-transform: rotate(-200deg) translateY(10px) translateX(10px);}
.radial-nav.expanded li:nth-child(6) .dascufo{-webkit-transform: rotate(-245deg) translateY(-70px) translateX(54px)}
.radial-nav.expanded li:nth-child(7) .dascufo{-webkit-transform: rotate(-286deg) translateY(-42px) translateX(55px);}
.radial-nav.expanded li:nth-child(8) .dascufo{-webkit-transform: rotate(-335deg) translateY(10px) translateX(10px);}




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

.radial-nav.expanded li.menu span.icon-menu { width: 87px;height: 87px;border-radius: 50px;position: absolute;top: 57px;left: 62px;background-color: #ccc;border: 0;-webkit-transition: all 0.3s;}
.radial-nav.expanded .icon-menu:after{content: "";display: inline-block;border-bottom: 3px solid #141444;width: 50%;-webkit-transition: all 0.3s;-webkit-transform:rotate(235deg) translate(-18px, -44px) rotate(-100deg); top: 0;position: absolute;}
.radial-nav.expanded .icon-menu:before{content: "";display: inline-block;border-bottom: 3px solid #141444;width: 50%;-webkit-transition: all 0.3s;-webkit-transform:rotate(235deg) translate(-18px, 18px) rotate(-190deg);top: 36px;position: absolute;left: -7px;}






.dasbordmin {background-image: url(../assets/images/BG.jpg); background-size: cover; width: 100%; height: 100%; position: fixed; }


.dashcub {margin-top: 20px;text-align: center;display: inline-block;}
.dascutx {height: 115px;width: 210px;position: relative;}
.dascuico{width: 120px;position: relative;background-color: #c8df4a;height: 47px;-webkit-border-radius: 0px 0px 126px 126px / 0px 0px 110px 110px;border-radius: 0%  0%  130%  130%  / 0   0%   260%  260%;display: inline-block;top: -1px;}
.dascutx:before {content: "";position: absolute;background-color: #ffffff;width: 210px;top: -20px;height: 40px;left: 0;border-radius: 100%;}
.dascutx:after {content: "";height: 115px;width: 210px;position: absolute;border-top: 115px solid #ffffff;border-left: 45px solid transparent;border-right: 45px solid transparent;left: 0;top: 0;}
.dascuico:after {content: "";background-color: #c8df4a;width: 100%;top: -7px;height: 17px;left: 0;border-radius: 100%;display: inline-block;position: absolute;}
.dascufo {position: relative;z-index: 1;width: 100px;margin: 0 auto;text-align: left;}
.dascufo .tit {width: 100%;display: inline-block;font-family: 'Helvetica-N-Md';font-size: 18px;text-transform: capitalize; line-height:20px; float:left;}
.dascufo .tex {font-family: 'Helvetica-LT-Roman';font-size: 13px;line-height: 15px;display: inline-block; line-height:14px; float:left;}
.dasvubot {min-height: 46px;display: inline-block;vertical-align: middle;position: relative;z-index: 1;margin-top: -5px;}
.dasico {width: auto;display:  inline-block;margin-right: 100px;}
.dasund {text-align: center;}
.nav {width: 260px;}

.flow .tit {color: #576509;}
.flow .tex {color: #666666;}
.flow .dascuico:after {}
.flow .dascuico {}

.web-builder .tit {color: #348218;}
.web-builder .tex {color: #666666;}
.web-builder .dascuico:after {background-color: #6dc64d;}
.web-builder .dascuico {background-color: #6dc64d;}

.v-mail .tit {color: #187268;}
.v-mail .tex {color: #666666;}
.v-mail .dascuico:after {background-color: #5ec1b6;}
.v-mail .dascuico {background-color: #5ec1b6;}

.mom .tit {color: #1d4585;}
.mom .tex {color: #666666;}
.mom .dascuico:after {background-color: #4c7ecb;}
.mom .dascuico {background-color: #4c7ecb;}

.accounting .tit {color: #a56c10;}
.accounting .tex {color: #666666;}
.accounting .dascuico:after {background-color: #f2a82e;}
.accounting .dascuico {background-color: #f2a82e;}

.dbetl .tit {color: #902e07;}
.dbetl .tex {color: #666666;}
.dbetl .dascuico:after {background-color: #f55d21;}
.dbetl .dascuico {background-color: #f55d21;}

.quotes .tit {color: #770154;}
.quotes .tex {color: #666666;}
.quotes .dascuico:after {background-color: #c547a0;}
.quotes .dascuico {background-color: #c547a0;}

.users .tit {color: #3b096c;}
.users .tex {color: #666666;}
.users .dascuico:after {background-color: #7e51ac;}
.users .dascuico {background-color: #7e51ac;}

.virtualshop .tit {color: #418a5f;}
.virtualshop .tex {color: #666666;}
.virtualshop .dascuico:after {background-color: #6AB187;}
.virtualshop .dascuico {background-color: #6AB187;}


.overlay {position:  fixed;right: 30px;top: 100px;width: 400px;}
.overlay .card11.webpart {width: 100%;display: inline-block;border-radius: 20px;padding: 10px;}
.overlay .card11.webpart .tit {width: 100%;display: inline-block;padding-bottom: 10px; text-align:center; color:#fff;}
.overlay .card11.webpart .img {width: 100%;display: inline-block;}
.overlay .card11.webpart .img img {max-width: 100%;}

.overlay .card11.crmpart {width: 100%;display: inline-block;border-radius: 20px;padding: 10px;}
.overlay .card11.crmpart .tit {width: 100%;display: inline-block;padding-bottom: 10px; text-align:center; color:#fff;}
.overlay .card11.crmpart .img {width: 100%;display: inline-block;}
.overlay .card11.crmpart .img img {max-width: 100%;}



</style>
<style>
  .vjs-control-bar {display:none;}
  </style>
