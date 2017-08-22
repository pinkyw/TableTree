# TableTree
表格树组件

## install && run

```
npm i

npm run start
```

如果本地9093端口被占用，请在webpack.config.js中改一下。

## Table Attributes

| 参数          | 说明                     | 类型    |
| ------------- |:---------------------- :| ------:|
| tblHead      | 表头                      | Array  |
| tblData      | 表格内容                  | Array  |
| postData     | 请求附带数据               | Object |
| postUrl      | 请求url                   | String |
| fclass       | 自定义class，加在最外层    | String  |
