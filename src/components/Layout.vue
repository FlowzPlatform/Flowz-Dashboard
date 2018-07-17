
 <template>
  <div>
    <f-header></f-header>
    <!-- <i-row type="flex">
      <i-col :span="24"> -->
                <router-view></router-view>
          <f-footer></f-footer>
      <!-- </i-col>
    </i-row> -->
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