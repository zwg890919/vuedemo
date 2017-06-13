<template>
	<div class="jyc-wrap">
        <h2>Grids</h2>
        <Button type="info"></Button>
        <Card>
            <Row :gutter="16">
                <Col span="12">
                    <div class="jyc-wrap-space">
                        <Row>
                            <Col span="12" class="col1">col-12</Col>
                            <Col span="12" class="col2">col-12</Col>
                        </Row>
                    </div>
                    <div class="jyc-wrap-space">
                        <Row>
                            <Col span="8" class="col1">col-8</Col>
                            <Col span="8" class="col2">col-8</Col>
                            <Col span="8" class="col1">col-8</Col>
                        </Row>
                    </div>
                    <div class="jyc-wrap-space">
                        <Row>
                            <Col span="6" class="col1">col-6</Col>
                            <Col span="6" class="col2">col-6</Col>
                            <Col span="6" class="col1">col-6</Col>
                            <Col span="6" class="col2">col-6</Col>
                        </Row>
                    </div>
                </Col>
                <Col span="12">
                    <div class="jyc-wrap-space">
                        <Row>
                            <Col span="8" class="col1">col-8</Col>
                            <Col span="8" offset="8" class="col2">col-8 | offset-8</Col>
                        </Row>
                    </div>
                    <div class="jyc-wrap-space">
                        <Row>
                            <Col span="6" offset="8" class="col1">col-6 | offset-8</Col>
                            <Col span="6" offset="4" class="col2">col-6 | offset-4</Col>
                        </Row>
                    </div>
                    <div class="jyc-wrap-space">
                        <Row>
                            <Col span="12" offset="8" class="col1">col-12 | offset-8</Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </Card>
        <Card>
            <Row :gutter="16">
                <Col span="24">
                    <div class="jyc-wrap-space">
                        <div>子元素向左排列</div>
                        <Row type="flex" justify="start" class="code-row-bg">
                            <Col span="4" class="col1">col-4</Col>
                            <Col span="4" class="col2">col-4</Col>
                            <Col span="4" class="col1">col-4</Col>
                            <Col span="4" class="col2">col-4</Col>
                        </Row>
                    </div>
                    <div class="jyc-wrap-space">
                        <div>子元素向右排列</div>
                        <Row type="flex" justify="end" class="code-row-bg">
                            <Col span="4" class="col1">col-4</Col>
                            <Col span="4" class="col2">col-4</Col>
                            <Col span="4" class="col1">col-4</Col>
                            <Col span="4" class="col2">col-4</Col>
                        </Row>
                    </div>
                    <div class="jyc-wrap-space">
                        <div>子元素居中排列</div>
                        <Row type="flex" justify="center" class="code-row-bg">
                            <Col span="4" class="col1">col-4</Col>
                            <Col span="4" class="col2">col-4</Col>
                            <Col span="4" class="col1">col-4</Col>
                            <Col span="4" class="col2">col-4</Col>
                        </Row>
                    </div>
                    <div class="jyc-wrap-space">
                        <div>子元素等宽排列</div>
                        <Row type="flex" justify="space-between" class="code-row-bg">
                            <Col span="4" class="col1">col-4</Col>
                            <Col span="4" class="col2">col-4</Col>
                            <Col span="4" class="col1">col-4</Col>
                            <Col span="4" class="col2">col-4</Col>
                        </Row>
                    </div>
                    <div class="jyc-wrap-space">
                        <div>子元素分散排列</div>
                        <Row type="flex" justify="space-around" class="code-row-bg">
                            <Col span="4" class="col1">col-4</Col>
                            <Col span="4" class="col2">col-4</Col>
                            <Col span="4" class="col1">col-4</Col>
                            <Col span="4" class="col2">col-4</Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </Card>
        <Card>
            <Row :gutter="16">
                <Col span="24">
                    <div class="jyc-wrap-space">
                        <div>顶部对齐</div>
                        <Row type="flex" justify="center" align="top" class="code-row-bg">
                            <Col span="4" class="col1"><p style="height: 80px">col-4</p></Col>
                            <Col span="4" class="col2"><p style="height: 30px">col-4</p></Col>
                            <Col span="4" class="col1"><p style="height: 100px">col-4</p></Col>
                            <Col span="4" class="col2"><p style="height: 60px">col-4</p></Col>
                        </Row>
                    </div>
                    <div class="jyc-wrap-space">
                        <div>底部对齐</div>
                        <Row type="flex" justify="center" align="bottom" class="code-row-bg">
                            <Col span="4" class="col1"><p style="height: 80px">col-4</p></Col>
                            <Col span="4" class="col2"><p style="height: 30px">col-4</p></Col>
                            <Col span="4" class="col1"><p style="height: 100px">col-4</p></Col>
                            <Col span="4" class="col2"><p style="height: 60px">col-4</p></Col>
                        </Row>
                    </div>
                    <div class="jyc-wrap-space">
                        <div>居中对齐</div>
                        <Row type="flex" justify="center" align="middle" class="code-row-bg">
                            <Col span="4" class="col1"><p style="height: 80px">col-4</p></Col>
                            <Col span="4" class="col2"><p style="height: 30px">col-4</p></Col>
                            <Col span="4" class="col1"><p style="height: 100px">col-4</p></Col>
                            <Col span="4" class="col2"><p style="height: 60px">col-4</p></Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </Card>
    </div>
</template>
<style lang="scss">
.col1{
    padding:10px 0;
    background: #4cb7ed;
    text-align: center;
    color:#fff;
}
.col2{
    padding:10px 0;
    background: #19a3e8;
    text-align: center;
    color:#fff;
}
.code-row-bg{
    background:#f2f2f2;
}
.jyc-wrap-space{
    margin-bottom: 20px;
}
</style>
