# TableTree
表格树组件

## install && run

```
npm i

npm run start
```

如果本地9093端口被占用，请在webpack.config.js中改一下。

## Table Attributes

<table width="600" style="border:1px solid #ddd;line-height: 30px" >
    <thead>
		<tr bgColor="#eee">
	        <th>参数</th>
	        <th>说明</th>
	        <th>类型</th>
	    </tr>
	</thead>
	<tbody style="text-align:center">
		<tr>
	        <td>tblHead</td>
	        <td>表头</td>
	        <td>Array</td>
	    </tr>
	    <tr>
	        <td>tblData</td>
	        <td>表格内容</td>
	        <td>Array</td>
	    </tr>
	    <tr>
	        <td>postData</td>
	        <td>请求附带数据</td>
	        <td>Object</td>
	    </tr>
	    <tr>
	        <td>postUrl</td>
	        <td>请求url</td>
	        <td>String</td>
	    </tr>
	    <tr>
	        <td>fclass</td>
	        <td>自定义class，加在最外层</td>
	        <td>String</td>
	    </tr>
	</tbody> 
</table>