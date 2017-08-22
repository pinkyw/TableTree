/**
 * 功能: 地区树表头
 * @author 王璐平
 * @date 2017-07-25 09:58
 */

 <template>
		<thead class="m-TableTreeHeader">
			<tr v-for = "(row,rowIndex) in columns" >
				<th v-for = "(col, index) in row" 
					:colspan="col.colSpan" 
					:rowspan="col.rowSpan"
					:width="col.width || ''"
					:class="setClassName(index, rowIndex)">
					<span>{{col.title}}</span>
				</th>
			</tr>
		</thead>
 </template>

 <script type="text/javascript">
	const convertToRows = (originColumns) => {
		let maxLevel = 1;
		let keys = [];
		// 深度递归colSpan
		const getColumns = (column, parent) =>{
			column.forEach((col) =>{
				if(col.key) keys.push(col.key);
				col.level = parent ? parent.level+1 : 1;
				if(maxLevel < col.level) maxLevel = col.level;
				if(col.children){
					var colSpan = 0;
					getColumns(col.children, col);
					col.children.forEach((subCol) => {
						colSpan += subCol.colSpan;
					})
					col.colSpan = colSpan;
				} else col.colSpan = 1;
			})
		}
		getColumns(originColumns);
		var rows = [];
		for(let i = 0; i < maxLevel; i++){
			rows.push([]);
		}
		// 深度递归rowSpan
		const getRows = (column) => {
			column.forEach((col)=>{
				col.rowSpan = col.children ? 1 : (maxLevel - col.level + 1);
				rows[col.level-1].push(col);
				if(col.children) getRows(col.children);
			})
		}
		getRows(originColumns);
		return [rows, keys];
	}

	export default {
		props: {
			tblHead: {
				type: Array,
				default: []
			},
			getTblKeys: {
				type: Function,
				default: function(keys) {}
			}
		},
		data() {
			return {
				//table数据
				columns: [],
			}
		},
		methods: {
			setClassName(key, index){
				return "tableTreeCell-row" + index + "-col" + key;
			},
		},
		beforeMount(){
			let covertsRows = convertToRows(this.tblHead);
			this.columns = covertsRows[0];
			this.getTblKeys(covertsRows[1]);

		}
	}
</script>