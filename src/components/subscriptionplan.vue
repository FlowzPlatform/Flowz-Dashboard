<template>
  <div class="subscription">
    
    <!-- Contenedor -->
	<div class="subscription-wrapper clearfix">
		<!-- Titulo -->
		
		<div class="subscription-table">
			<h3 class="subscription-title">Basic</h3>
			<div class="price">$5<sup>/ month</sup></div>
			<!-- Lista de Caracteristicas / Propiedades -->
			<ul class="table-list">
				<li> 1 <span>User</span></li>
				<li>10 <span>Websites</span></li>
				<li>25  <span>inbuild Plugins</span></li>
				<li>CPanel <span>incluido</span></li>
			</ul>
			<!-- Contratar / Subscribe -->
			<div class="table-buy">
				<p>$5<sup>/ month</sup></p>
				<a href="#" class="subscription-action">Subscribe</a>
			</div>
		</div>
		
		<div class="subscription-table recommended">
			<h3 class="subscription-title">Premium</h3>
			<div class="price">$10<sup>/ month</sup></div>
			<!-- Lista de Caracteristicas / Propiedades -->
			<ul class="table-list">
				<li>2 <span>User</span></li>
				<li>20 <span>Websites</span></li>
				<li>50 <span>inbuild Plugins</span></li>
				<li>CPanel <span>incluido</span></li>
			</ul>
			<!-- Contratar / Subscribe -->
			<div class="table-buy">
				<p>$10<sup>/ month</sup></p>
				<a href="#" class="subscription-action">Subscribe</a>
			</div>
		</div>

		<div class="subscription-table">
			<h3 class="subscription-title">Ultimate</h3>
			<div class="price">$20<sup>/ month</sup></div>
			<!-- Lista de Caracteristicas / Propiedades -->
			<ul class="table-list">
				<li>5 <span>User</span></li>
				<li>50 <span>Websites</span></li>
				<li>100 <span>inbuild Plugins</span></li>
				<li>CPanel <span>incluido</span></li>
			</ul>
			<!-- Contratar / Subscribe -->
			<div class="table-buy">
				<p>$20<sup>/ month</sup></p>
				<a href="#" class="subscription-action">Subscribe</a>
			</div>
		</div>
	</div>

  </div>
</template>

<script>

export default {
	name: 'subscription',
	data () {
		return {
			msg: 'Welcome to Price'
		}
	},
	created () {

	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

* {
	margin: 0;
	padding: 0;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
}

body {
	background: #2e2a2a;
	color: #FFF;
	font-size: 62.5%;
	font-family: 'Roboto', Arial, Helvetica, Sans-serif, Verdana;
}


ul {
	list-style-type: none;
}

a {
	color: #e95846;
	text-decoration: none;
}

.subscription-table-title {
	text-transform: uppercase;
	font-weight: 700;
	font-size: 2.6em;
	color: #FFF;
	margin-top: 15px;
	text-align: left;
	margin-bottom: 25px;
	text-shadow: 0 1px 1px rgba(0,0,0,0.4);
}

.subscription-table-title a {
	font-size: 0.6em;
}

.clearfix:after {
	content: '';
	display: block;
	height: 0;
	width: 0;
	clear: both;
}
/** ========================
 * Contenedor
 ============================*/
.subscription-wrapper {
	width: 960px;
	margin: 40px auto 0;
}

.subscription-table {
	margin: 0 10px;
	text-align: center;
	width: 300px;
	float: left;
	-webkit-box-shadow: 0 0 15px rgba(0,0,0,0.4);
	box-shadow: 0 0 15px rgba(0,0,0,0.4);
	-webkit-transition: all 0.25s ease;
	-o-transition: all 0.25s ease;
	transition: all 0.25s ease;
}

.subscription-table:hover {
	-webkit-transform: scale(1.06);
	-ms-transform: scale(1.06);
	-o-transform: scale(1.06);
	transform: scale(1.06);
}

.subscription-title {
	color: #FFF;
	background: #e95846;
	padding: 20px 0;
	font-size: 2em;
	text-transform: uppercase;
	text-shadow: 0 1px 1px rgba(0,0,0,0.4);
}

.subscription-table.recommended .subscription-title {
	background: #2db3cb;
}

.subscription-table.recommended .subscription-action {
	background: #2db3cb;
}

.subscription-table .price {
	background: #403e3d;
	font-size: 2.4em;
    color: #fff;
	font-weight: 700;
	padding: 20px 0;
	text-shadow: 0 1px 1px rgba(0,0,0,0.4);
}

.subscription-table .price sup {
	font-size: 0.4em;
	position: relative;
	left: 5px;
}

.table-list {
	background: #FFF;
	color: #403d3a;
}

.table-list li {
	font-size: 1.4em;
	font-weight: 700;
	padding: 12px 8px;
}

/* .table-list li:before {
	content: "\f00c";
	font-family: 'FontAwesome';
	color: #3fab91;
	display: inline-block;
	position: relative;
	right: 5px;
	font-size: 16px;
}  */

.table-list li span {
	font-weight: 400;
}

.table-list li span.unlimited {
	color: #FFF;
	background: #e95846;
	font-size: 0.9em;
	padding: 5px 7px;
	display: inline-block;
	-webkit-border-radius: 38px;
	-moz-border-radius: 38px;
	border-radius: 38px;
}


.table-list li:nth-child(2n) {
	background: #F0F0F0;
}

.table-buy {
	background: #FFF;
	padding: 15px;
	text-align: left;
	overflow: hidden;
}

.table-buy p {
	float: left;
	color: #37353a;
	font-weight: 700;
	font-size: 2.4em;
}

.table-buy p sup {
	font-size: 0.5em;
	position: relative;
	left: 5px;
}

.table-buy .subscription-action {
	float: right;
	color: #FFF;
	background: #e95846;
	padding: 10px 16px;
	-webkit-border-radius: 2px;
	-moz-border-radius: 2px;
	border-radius: 2px;
	font-weight: 700;
	font-size: 1.4em;
	text-shadow: 0 1px 1px rgba(0,0,0,0.4);
	-webkit-transition: all 0.25s ease;
	-o-transition: all 0.25s ease;
	transition: all 0.25s ease;
}

.table-buy .subscription-action:hover {
	background: #cf4f3e;
}

.recommended .table-buy .subscription-action:hover {
	background: #228799;	
}

/** ================
 * Responsive
 ===================*/
 @media only screen and (min-width: 768px) and (max-width: 959px) {
 	.subscription-wrapper {
 		width: 768px;
 	}

 	.subscription-table {
 		width: 236px;
 	}
	
	.table-list li {
		font-size: 1.3em;
	}

 }

 @media only screen and (max-width: 767px) {
 	.subscription-wrapper {
 		width: 420px;
 	}

 	.subscription-table {
 		display: block;
 		float: none;
 		margin: 0 0 20px 0;
 		width: 100%;
 	}
 }

@media only screen and (max-width: 479px) {
	.subscription-wrapper {
		width: 300px;
	}
} 



#wheelDiv {
  height: 400px;
  width: 400px;
  margin: auto;
}

#wheelDiv>svg {
  height: 100%;
  width: 100%;
}

@media (max-width: 600px) {
  #wheelDiv {
    height: 350px;
    width: 350px;
  }
}

@media (max-width: 400px) {
  #wheelDiv {
    height: 300px;
    width: 300px;
  }
}
</style>
