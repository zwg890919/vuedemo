<template>
    <div class="jyc-wrap">
        <div class="cell">
            <h2>Home Page</h2>
            <Row class-name="contanier" :gutter="30">
                <Col span="10">
                <Row :gutter="20">
                    <Col span="12">
                        <div class="col bg-white">
                            <h3>Vuejs</h3>
                            <p>JavaScript 框架</p>
                        </div>
                    </Col>
                    <Col span="12">
                        <div class="col bg-primary">
                            <h3>Iview</h3>
                            <p>UI库</p>
                        </div>
                    </Col>
                    <Col span="12">
                        <div class="col bg-blue">
                            <h3>Vuex</h3>
                            <p>状态管理</p>
                        </div>
                    </Col>
                    <Col span="12">
                        <div class="col bg-white">
                            <h3 class="cl-bl">Webpack</h3>
                            <p>构建工具</p>
                        </div>
                    </Col>
                    <Col span="24">
                        <div class="col bg-gray">
                            <h3 class="cl-bl">Webpack</h3>
                            <p>构建工具</p>
                        </div>
                    </Col>
                </Row>
                </Col>
                <Col span="14">col-12</Col>
            </Row>
        </div>
        <div class="cell"></div>
    </div>
</template>
<style lang="scss">
.jyc-wrap {
    display: table;
    width: 100%;
    .cell {
        display: table-cell;
        &:nth-child(2) {
            width: 200px;
            background: #fff;
            border-left: 1px solid #dee5e7;
            border-bottom: 1px solid #dee5e7;
        }
        .contanier {
            padding: 15px;
            .col{
                margin-bottom: 20px;
                padding:15px 0px;
                cursor: pointer;
                h3{
                    padding: 0;
                    font-size:30px;
                    font-weight: normal;
                    text-align: center;
                }
                p{
                    padding: 0;
                    font-size:14px;
                    text-align: center;
                }
            }
        }
    }
}

.bg-white {
    background: #ffffff;
    color: #999;
    h3{
        color:#23b7e5
    }
}
.cl-bl{
    color: #333!important;
}
.bg-primary {
    background: #7266ba;
    color:#fff;
}

.bg-blue {
    background: #23b7e5;
    color:#fff;
}
.bg-gray{
    background: #dde6e9;
    color: #999;
}
</style>
