<template>
    <div id="echartsBox" class="echartsBox" >

    </div>
</template>
<script>
// import myEcharts from 'echarts'
import myEcharts from 'echarts'
export default {
    data(){
        return {
            nodes: [{
                    name: '操作系统集团',
                    category: 0
                }, {
                    name: '浏览器有限公司',
                    category: 0
                }, {
                    name: 'HTML科技',
                    category: 0
                }, {
                    name: 'JavaScript科技',
                    category: 0
                }, {
                    name: 'CSS科技',
                    category: 0
                }, {
                    name: 'Chrome',
                    category: 1
                }, {
                    name: 'IE',
                    category: 1
                }, {
                    name: 'Firefox',
                    category: 1
                }, {
                    name: 'Safari',
                    category: 1
                }]
        }
    },
    mounted(){
        this.createRelationPic()
    },
    methods:{
        test( e ){
        },
        createRelationPic(){
            //     myEcharts.on('click', function(params) {
            //     console.log(params.name);
            // });
            let data = {
                nodes: this.nodes,
                
                links: [{
                    source: '浏览器有限公司',
                    target: '操作系统集团',
                    name: '参股'
                }, {
                    source: 'HTML科技',
                    target: '浏览器有限公司',
                    name: '参股'
                }, {
                    source: 'CSS科技',
                    target: '浏览器有限公司',
                    name: '参股'
                }, {
                    source: 'JavaScript科技',
                    target: '浏览器有限公司',
                    name: '参股'
                }, {
                    source: 'Chrome',
                    target: '浏览器有限公司',
                    name: '董事'
                }, {
                    source: 'IE',
                    target: '浏览器有限公司',
                    name: '董事'
                }, {
                    source: 'Firefox',
                    target: '浏览器有限公司',
                    name: '董事'
                }, {
                    source: 'Safari',
                    target: '浏览器有限公司',
                    name: '董事'
                }, {
                    source: 'Chrome',
                    target: 'JavaScript科技',
                    name: '法人'
                }]
                }

                const color1 = '#006acc';
                const color2 = '#ff7d18';
                const color3 = '#10a050';

                data.nodes.forEach(node => {
                if (node.category === 0) {
                    node.symbolSize = 60;
                    node.itemStyle = {
                    color: color1
                    };
                } else if (node.category === 1) {
                    node.itemStyle = {
                    color: color2
                    };
                }
                });

                data.links.forEach(link => {
                link.label = {
                    align: 'center',
                    fontSize: 12
                };
                
                if (link.name === '参股') {
                    link.lineStyle = {
                    color: color2
                    }
                } else if (link.name === '董事') {
                    link.lineStyle = {
                    color: color1
                    }
                } else if (link.name === '法人') {
                    link.lineStyle = {
                    color: color3
                    }
                }
                });

                let categories = [{
                    name: '公司',
                    itemStyle: {
                        color: color1
                    }
                },
                {
                    name: '董事',
                    itemStyle: {
                        color: color2
                    }
                }]

                option = {
                title: {
                    text: '知识图谱',
                },
                legend: [{
                    // selectedMode: 'single',
                    data: categories.map(x => x.name),
                    // icon: 'circle'
                }],
                series: [{
                    type: 'graph',
                    layout: 'force',
                    symbolSize: 40,
                    draggable: true,
                    roam: true,
                    focusNodeAdjacency: true,
                    categories: categories,
                    edgeSymbol: ['', 'arrow'],
                    // edgeSymbolSize: [80, 10],
                    edgeLabel: {
                    normal: {
                        show: true,
                        textStyle: {
                            fontSize: 20
                        },
                        formatter(x) {
                            return x.data.name;
                        }
                    }
                    },
                    label: {
                        show: true
                    },
                    force: {
                        repulsion: 1000,
                        edgeLength: 60
                    },
                    data: data.nodes,
                    links: data.links
                }]
                }
            let node = myEcharts.init(document.getElementById('echartsBox'));
            node.setOption(option);
            node.on('click', function(params) {
                if (params.name == '浏览器有限公司'){
                    this.nodes =  {
                    name: '编程语言有限公司',
                    category: 0
                } 
                console.log( this.nodes )
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
    .echartsBox {
        width: 96%;
        margin: 0 2%;
        height: 400px;
    }
</style>