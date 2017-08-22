/**
 * 功能: 地区树表格
 * @author PinkyW
 * @date 2017-07-25 09:58
 */

 <template>
	<table cellspacing="0" cellpadding="0" :class="tblClass">
		<tabletree-header :tblHead = "tblHead" :getTblKeys = "getTblKeys"></tabletree-header>
		<tabletree-body :tblData="tblData" :postData="postData" :postUrl="postUrl" :tblKeys = "tblKeys"></tabletree-body>
	</table>
 </template>

 <script type="text/javascript">
 	import "../../assets/TableTree.scss";
	import $http from '../hub/http';
	import TabletreeHeader from './TableTreeHeader.vue';
	import TabletreeBody from './TableTreeBody.vue';
	export default {
		components: {
			TabletreeHeader,
			TabletreeBody
		},
		props: {
			tblHead: {
				type: Array,
				default () {
					return []
				}
			},
			tblData: {
				type: Array,
				default: []
				
			},
			postData: {
				type: Object,
				default: ""
			},
			postUrl: {
				type: String,
				default: ""
			},
			fclass: {
				type: String,
				default: ""
			}
		},
		data() {
			return {
				tblKeys: [],
				tblClass: "m-TableTree " + this.fclass
			}
			
		},
		methods: {
			// 获取key的顺序
			getTblKeys: function(keys) {
				this.tblKeys = keys;
			}
		}
	}
</script>