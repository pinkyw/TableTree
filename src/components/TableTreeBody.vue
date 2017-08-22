/**
 * 功能: 地区树表头
 * @author 王璐平
 * @date 2017-07-25 09:58
 */

 <template>
	<tbody class="m-TableTreeBody">
		<tr v-for = "(item, index) in columns" v-if="!item.hide">
			<td v-for = "(key, colIndex) in tblKeys" :class="setClassName(key, colIndex, index)">
				<span :style = "getWhiteSpace(key, item)">
					<a @click="getAreaChild(item, index)" v-if="key=='areaName' && item.hasChild">
						<a class="expandIcon" v-if="item.expand">-</a>
						<a class="expandIcon" v-if="!item.expand">+</a>
					</a>
					{{item[key]}}
				</span>
			</td>
		</tr>
		<tr v-if="!columns.length"><td :colSpan="tblKeys.length" class="noresult">未查询到相关信息</td></tr>
	</tbody>
 </template>

 <script type="text/javascript">
	import $http from '../hub/http';
	import query from '../hub/query';
	export default {
		props: {
			tblKeys: {
				type: Array,
				default: []
			},
			tblData: {
				type: Array,
				default: []
			},
			postData: {
				type: Object,
				default(){
					return {}
				}
			},
			postUrl: {
				type: String,
				default: ""
			}
		},
		data() {
			return {
				//table数据
				columns: this.tblData
			}
		},
		methods: {
			// index为行号，colIndex为列号
			setClassName(key, colIndex, index){
				return ["tableTreeCell-",colIndex," tableTreeCell-",index, "-", key].join("");
			},
			// 计算子节点间距
			getWhiteSpace(key, item){
				if(item.whiteSpace && key=="areaName")
					return {'margin-left': (item.whiteSpace || 0) * 15 + 'px'};
			},
			// 获取子节点
			getAreaChild(item, index) {
				this.columns[index].expand = !item.expand;
				if(this.columns[index].expand) this.loadColumns(item, index);
				else this.hideColumns(item, index);
			},
			// 增加子节点
			loadColumns(item, index, init){
				// 如果已经请求过子节点
				if(item.gotChild) this.showColumns(item, index);
				else { 
					if(!this.postUrl) return;
					if(item.areaId) this.postData.areaId = item.areaId;
					this.postData.hasTotal = init ? true : false;
					let httpConfig = {
						_this: this,
						_key: 'tblTreeColumns' + item.areaId,
						params: {
							params:JSON.stringify(query.paramFilter(this.postData))
						}
					};
					$http.get(this.postUrl, httpConfig, function(_this){
						// 查询条件更新直接赋值
						if(init) _this.columns = _this['tblTreeColumns' + item.areaId];
						// 如果是展开动作，则更新子节点
						else {
							_this.columns[index].gotChild = true;
							let cols = JSON.parse(JSON.stringify(_this['tblTreeColumns' + item.areaId]));
							cols.forEach((col,i) => {
								// 空格数
								cols[i].whiteSpace = (item.whiteSpace || 0) + 1;
								// 是否隐藏
								cols[i].hide = false;
								// 父节点id
								cols[i].parentId = item.areaId;
								_this.columns.splice(++index, 0, cols[i]);
							});
						}
						_this['tblTreeColumns' + item.areaId] = null;
					});
				}
			},
			// 显示子节点
			showColumns(item, index){
				for(var i = index + 1; i < this.columns.length; i++){
					if(((!item.whiteSpace && this.columns[i].whiteSpace==1) || (item.whiteSpace + 1 == this.columns[i].whiteSpace)) && this.columns[i].parentId == item.areaId){
						this.columns[i].hide = false;
					}
				}
			},
			// 隐藏子节点
			hideColumns(item, index){
				for(var i = index + 1; i < this.columns.length; i++){
					if((!item.whiteSpace && this.columns[i].whiteSpace) || item.whiteSpace < this.columns[i].whiteSpace){
						this.columns[i].hide = true;
						this.columns[i].expand = false;
					}
					else return;
				}
			}
		},
		watch:{
			postData(val){
				this.loadColumns(val, 0, true);
			}
		}
	}
</script>