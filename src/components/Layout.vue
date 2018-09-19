
 <template>
  <div>
    <f-header></f-header>
                <router-view></router-view>
          <f-footer></f-footer>
  </div>
</template>
<script>
import Header from './Header'
import Footer from './Footer'
export default {
	name: 'app',
	components: {
		'f-header': Header,
		'f-footer': Footer
	}
}
</script>