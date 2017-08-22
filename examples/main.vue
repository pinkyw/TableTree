<template>
    <div>
        <table-tree :tblHead="tblHead" 
            :tblData = "tblData" 
            :postData="postData" 
            :postUrl="postUrl"></table-tree>
    </div>
</template>

<script type="text/javascript">
    import Vue from 'vue';
    import TableTree from '../src/components/TableTree.vue';
    export default {
        components: {
            TableTree
        },
        data () {
            return {
                searchData: {
                    entityType: "",
                    statDate: ""
                },
                postUrl: "/statsrv/devicetrend",
                tblHead: [
                        {
                            title: '地区',
                            key: 'areaName',
                            width: "300"
                        }, {
                            title: '受理数',
                            children: [
                                {
                                    title: '到达数',
                                    key: 'acceptArriveNum',
                                    width: "100"
                                },
                                {
                                    title: '新增数',
                                    key: 'acceptNewNum',
                                    width: "100"
                                },
                                {
                                    title: '拆机数',
                                    key: 'acceptUnbindeNum',
                                    width: "100"
                                }
                            ]
                        },
                        {
                            title: '绑定数',
                            children: [
                                {
                                    title: '到达数',
                                    key: 'apArriveNum',
                                    width: "100"
                                },
                                {
                                    title: '新增数',
                                    key: 'apNewNum',
                                    width: "100"
                                },
                                {
                                    title: '解绑数',
                                    key: 'apActiveNum',
                                    width: "100"
                                },
                                {
                                    title: '活跃数',
                                    key: 'acceptUnbindeNum',
                                    width: "100"
                                }
                            ]
                        },
                        {
                            title: '商户数',
                            children: [
                                {
                                    title: '到达数',
                                    key: 'arriveMerchantNum',
                                    width: "100"
                                },
                                {
                                    title: '活跃数',
                                    key: 'activeMerchantNum',
                                    width: "100"
                                }
                            ]
                        }
                    ],
                tblData: [],
                postData: {}
            }
        },
        mounted: function () {
            this.postData = JSON.parse(JSON.stringify(this.searchData));
        }
    }
</script>
