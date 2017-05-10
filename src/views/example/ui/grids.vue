<template>
	<div class="jyc-wrap">
        <h2>Grids</h2>
    	<Card>
    		<div class="line"></div>
			<Row :gutter="16">
                <Col span="12">
                    <div class="comp-box">
                        <Row>
                            <Col span="12" class="col1">col-12</Col>
                            <Col span="12" class="col2">col-12</Col>
                        </Row>
                        <br>
                        <Row>
                            <Col span="8" class="col1">col-8</Col>
                            <Col span="8" class="col2">col-8</Col>
                            <Col span="8" class="col1">col-8</Col>
                        </Row>
                        <br>
                        <Row>
                            <Col span="6" class="col1">col-6</Col>
                            <Col span="6" class="col2">col-6</Col>
                            <Col span="6" class="col1">col-6</Col>
                            <Col span="6" class="col2">col-6</Col>
                        </Row>
                    </div>
                </Col>
                <Col span="12">
                    <div class="comp-box">
                        <Row :gutter="16">
                            <Col span="6" class="col1">
                                <div>col-6</div>
                            </Col>
                            <Col span="6" class="col2">
                                <div>col-6</div>
                            </Col>
                            <Col span="6" class="col1">
                                <div>col-6</div>
                            </Col>
                            <Col span="6" class="col2">
                                <div>col-6</div>
                            </Col>
                        </Row>
                    </div>
                </Col>
        	</Row>
    	</Card>
    	<Card>
    		<div class="line"></div>
			<Row :gutter="16">
                <Col span="12">
                    <div class="comp-box">
                    	<Row type="flex">
                            <Col span="6" order="4" class="col1">1 | order-4</Col>
                            <Col span="6" order="3" class="col2">2 | order-3</Col>
                            <Col span="6" order="2" class="col1">3 | order-2</Col>
                            <Col span="6" order="1" class="col2">4 | order-1</Col>
                        </Row>
                    </div>
                </Col>
                <Col span="12">
                    <div class="comp-box">
                        <Col span="18" push="6" class="col1">col-18 | push-6</Col>
                        <Col span="6" pull="18" class="col2">col-6 | pull-18</Col>
                    </div>
                </Col>
        	</Row>
    	</Card>
    	<Card>
    		<div class="line"></div>
			<Row :gutter="16">
                <Col span="12">
                    <div class="comp-box">
                    	<Row>
                            <Col span="8" class="col1">col-8</Col>
                            <Col span="8" offset="8" class="col2">col-8 | offset-8</Col>
                        </Row>
                        <br>
                        <Row>
                            <Col span="6" offset="8" class="col1">col-6 | offset-8</Col>
                            <Col span="6" offset="4" class="col2">col-6 | offset-4</Col>
                        </Row>
                        <br>
                        <Row>
                            <Col span="12" offset="8" class="col1">col-12 | offset-8</Col>
                        </Row>
                    </div>
                </Col>
                <Col span="12">
                    <div class="comp-box">
                        <p>子元素向左排列</p>
                    <Row type="flex" justify="start" class="code-row-bg">
                        <Col span="4" class="col1">col-4</Col>
                        <Col span="4" class="col2">col-4</Col>
                        <Col span="4" class="col1">col-4</Col>
                        <Col span="4" class="col2">col-4</Col>
                    </Row>
                    <p>子元素向右排列</p>
                    <Row type="flex" justify="end" class="code-row-bg">
                        <Col span="4" class="col1">col-4</Col>
                        <Col span="4" class="col2">col-4</Col>
                        <Col span="4" class="col1">col-4</Col>
                        <Col span="4" class="col2">col-4</Col>
                    </Row>
                    <p>子元素居中排列</p>
                    <Row type="flex" justify="center" class="code-row-bg">
                        <Col span="4" class="col1">col-4</Col>
                        <Col span="4" class="col2">col-4</Col>
                        <Col span="4" class="col1">col-4</Col>
                        <Col span="4" class="col2">col-4</Col>
                    </Row>
                    <p>子元素等宽排列</p>
                    <Row type="flex" justify="space-between" class="code-row-bg">
                        <Col span="4" class="col1">col-4</Col>
                        <Col span="4" class="col2">col-4</Col>
                        <Col span="4" class="col1">col-4</Col>
                        <Col span="4" class="col2">col-4</Col>
                    </Row>
                    <p>子元素分散排列</p>
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
            <div class="line"></div>
            <Row :gutter="16">
                <Col span="12">
                    <div class="comp-box">
                        <p>顶部对齐</p>
                        <Row type="flex" justify="center" align="top" class="code-row-bg">
                            <Col span="4" class="col1"><p style="height: 80px">col-4</p></Col>
                            <Col span="4" class="col2"><p style="height: 30px">col-4</p></Col>
                            <Col span="4" class="col1"><p style="height: 100px">col-4</p></Col>
                            <Col span="4" class="col2"><p style="height: 60px">col-4</p></Col>
                        </Row>
                        <p>底部对齐</p>
                        <Row type="flex" justify="center" align="bottom" class="code-row-bg">
                            <Col span="4" class="col1"><p style="height: 80px">col-4</p></Col>
                            <Col span="4" class="col2"><p style="height: 30px">col-4</p></Col>
                            <Col span="4" class="col1"><p style="height: 100px">col-4</p></Col>
                            <Col span="4" class="col2"><p style="height: 60px">col-4</p></Col>
                        </Row>
                        <p>居中对齐</p>
                        <Row type="flex" justify="center" align="middle" class="code-row-bg">
                            <Col span="4" class="col1"><p style="height: 80px">col-4</p></Col>
                            <Col span="4" class="col2"><p style="height: 30px">col-4</p></Col>
                            <Col span="4" class="col1"><p style="height: 100px">col-4</p></Col>
                            <Col span="4" class="col2"><p style="height: 60px">col-4</p></Col>
                        </Row>
                    </div>
                </Col>
                <Col span="12">
                    <div class="comp-box">
                        <Row>
                            <Col class="col1" :xs="2" :sm="4" :md="6" :lg="8">Col</Col>
                            <Col class="col2" :xs="20" :sm="16" :md="12" :lg="8">Col</Col>
                            <Col class="col1" :xs="2" :sm="4" :md="6" :lg="8">Col</Col>
                        </Row>
                        <Row style="margin-top:20px;">
                            <Col class="col1" :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }">Col</Col>
                            <Col class="col2" :xs="{ span: 11, offset: 1 }" :lg="{ span: 6, offset: 2 }">Col</Col>
                            <Col class="col1" :xs="{ span: 5, offset: 1 }" :lg="{ span: 6, offset: 2 }">Col</Col>
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
</style>
