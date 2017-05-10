<template>
    <div class="jyc-wrap">
        <h2>Chart</h2>
        <h3>vue-echarts-v3</h3>
        <p><a class="link" href="https://github.com/xlsdg/vue-echarts-v3">https://github.com/xlsdg/vue-echarts-v3 </a>Vue.js(v2.x+) component wrap for ECharts.js(v3.x+) <a class="link" href="http://echarts.baidu.com/">http://echarts.baidu.com/</a></p>
        <Card>
            <div class="line"></div>
            <Row :gutter="16">
                <Col span="12">
                    <div class="comp-box">
                        <div class="echarts">
                            <IEcharts :option="option1"></IEcharts>
                        </div>
                    </div>
                </Col>
                <Col span="12">
                    <div class="comp-box">
                        <div class="echarts">
                            <IEcharts :option="option2"></IEcharts>
                        </div>
                    </div>
                </Col>
            </Row>
        </Card>
        <Card>
            <div class="line"></div>
            <Row :gutter="16">
                <Col span="12">
                    <div class="comp-box">
                         <div class="echarts">
                            <IEcharts :option="option3"></IEcharts>
                        </div>
                    </div>
                </Col>
                <Col span="12">
                    <div class="comp-box">
                        <div class="echarts">
                            <IEcharts :option="option4"></IEcharts>
                        </div>
                    </div>
                </Col>
            </Row>
        </Card>
        <Card>
            <div class="line"></div>
            <Row :gutter="16">
                <Col span="12">
                    <div class="comp-box">
                         <div class="echarts">
                            <IEcharts :option="option5"></IEcharts>
                        </div>
                    </div>
                </Col>
                <Col span="12">
                    <div class="comp-box">
                        <div class="echarts">
                            <IEcharts :option="option6"></IEcharts>
                        </div>
                    </div>
                </Col>
            </Row>
        </Card>
    </div>
</template>

<script type="text/babel">
  import IEcharts from 'vue-echarts-v3/src/full.vue';
    var data = [];
    for (var i = 0; i <= 360; i++) {
        var t = i / 180 * Math.PI;
        var r = Math.sin(2 * t) * Math.cos(2 * t);
        data.push([r, i]);
    }
  export default {
    name: 'view',
    components: {
      IEcharts
    },
    props: {
    },
    created() {
    },
    data: () => ({
      option1: {
        title: {
          text: 'ECharts Hello World'
        },
        tooltip: {},
        xAxis: {
          data: ['Shirt', 'Sweater', 'Chiffon Shirt', 'Pants', 'High Heels', 'Socks']
        },
        yAxis: {},
        series: [{
          name: 'Sales',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20],
        }]
      },
      option2:{
            title: {
                text: '极坐标双数值轴'
            },
            legend: {
                data: ['line']
            },
            polar: {
                center: ['50%', '54%']
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                }
            },
            angleAxis: {
                type: 'value',
                startAngle: 0
            },
            radiusAxis: {
                min: 0
            },
            series: [{
                coordinateSystem: 'polar',
                name: 'line',
                type: 'line',
                showSymbol: false,
                data: data
            }],
            animationDuration: 2000
        },
        option3: {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
            },
            series: [
                {
                    name:'访问来源',
                    type:'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[
                        {value:335, name:'直接访问'},
                        {value:310, name:'邮件营销'},
                        {value:234, name:'联盟广告'},
                        {value:135, name:'视频广告'},
                        {value:1548, name:'搜索引擎'}
                    ]
                }
            ]
        },
        option4: {
            title: {
                text: '基础雷达图'
            },
            tooltip: {},
            legend: {
                data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
            },
            radar: {
                indicator: [
                   { name: '销售（sales）', max: 6500},
                   { name: '管理（Administration）', max: 16000},
                   { name: '信息技术（Information Techology）', max: 30000},
                   { name: '客服（Customer Support）', max: 38000},
                   { name: '研发（Development）', max: 52000},
                   { name: '市场（Marketing）', max: 25000}
                ]
            },
            series: [{
                name: '预算 vs 开销（Budget vs spending）',
                type: 'radar',
                data : [
                    {
                        value : [4300, 10000, 28000, 35000, 50000, 19000],
                        name : '预算分配（Allocated Budget）'
                    },
                     {
                        value : [5000, 14000, 28000, 31000, 42000, 21000],
                        name : '实际开销（Actual Spending）'
                    }
                ]
            }]
        },
        option5: {
            tooltip : {
                formatter: "{a} <br/>{b} : {c}%"
            },
            toolbox: {
                feature: {
                    restore: {},
                    saveAsImage: {}
                }
            },
            series: [
                {
                    name: '业务指标',
                    type: 'gauge',
                    detail: {formatter:'{value}%'},
                    data: [{value: 50, name: '完成率'}]
                }
            ]
        },
        option6: {
            title: {
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c}'
            },
            legend: {
                left: 'left',
                data: ['2的指数', '3的指数']
            },
            xAxis: {
                type: 'category',
                name: 'x',
                splitLine: {show: false},
                data: ['一', '二', '三', '四', '五', '六', '七', '八', '九']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            yAxis: {
                type: 'log',
                name: 'y'
            },
            series: [
                {
                    name: '3的指数',
                    type: 'line',
                    data: [1, 3, 9, 27, 81, 247, 741, 2223, 6669]
                },
                {
                    name: '2的指数',
                    type: 'line',
                    data: [1, 2, 4, 8, 16, 32, 64, 128, 256]
                },
                {
                    name: '1/2的指数',
                    type: 'line',
                    data: [1/2, 1/4, 1/8, 1/16, 1/32, 1/64, 1/128, 1/256, 1/512]
                }
            ]
        }
    }),
    methods: {

    }
  };
</script>

<style scoped>
  .echarts {
    width: 400px;
    height: 400px;
  }
  a.link{
    color: #0366d6;
  }
</style>