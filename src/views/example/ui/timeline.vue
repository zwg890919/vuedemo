<template>
	<div class="jyc-wrap">
        <h2>Timeline</h2>
        	<Card>
        		<div class="line"></div>
				<Row :gutter="16">
                    <Col span="12">
                        <div class="comp-box">
                        	 <Timeline>
                                <Timeline-item>
                                    <p class="time">1976年</p>
                                    <p class="content">Apple I 问世</p>
                                </Timeline-item>
                                <Timeline-item>
                                    <p class="time">1984年</p>
                                    <p class="content">发布 Macintosh</p>
                                </Timeline-item>
                                <Timeline-item>
                                    <p class="time">2007年</p>
                                    <p class="content">发布 iPhone</p>
                                </Timeline-item>
                                <Timeline-item>
                                    <p class="time">2010年</p>
                                    <p class="content">发布 iPad</p>
                                </Timeline-item>
                                <Timeline-item>
                                    <p class="time">2011年10月5日</p>
                                    <p class="content">史蒂夫·乔布斯去世</p>
                                </Timeline-item>
                            </Timeline>
                        </div>
                    </Col>
                    <Col span="12">
                        <div class="comp-box">
                            <Timeline>
                                <Timeline-item color="green">发布1.0版本</Timeline-item>
                                <Timeline-item color="green">发布2.0版本</Timeline-item>
                                <Timeline-item color="red">严重故障</Timeline-item>
                                <Timeline-item color="blue">发布3.0版本</Timeline-item>
                            </Timeline>
                        </div>
                    </Col>
            	</Row>
        	</Card>
        	<Card>
        		<div class="line"></div>
				<Row :gutter="16">
                	<Col span="12">
                        <div class="comp-box">
                            <Timeline pending>
                                <Timeline-item>发布1.0版本</Timeline-item>
                                <Timeline-item>发布2.0版本</Timeline-item>
                                <Timeline-item>发布3.0版本</Timeline-item>
                                <Timeline-item><a href="#">查看更多</a></Timeline-item>
                            </Timeline>
                        </div>
                    </Col>
                	<Col span="12">
                        <div class="comp-box">
                            <Timeline>
                                <Timeline-item color="green">
                                    <Icon type="trophy" slot="dot"></Icon>
                                    <span>发布里程碑版本</span>
                                </Timeline-item>
                                <Timeline-item>发布1.0版本</Timeline-item>
                                <Timeline-item>发布2.0版本</Timeline-item>
                                <Timeline-item>发布3.0版本</Timeline-item>
                            </Timeline>
                        </div>
                    </Col>
            	</Row>
        	</Card>
    </div>
</template>
<style scope lang="scss">
.time{
        font-size: 14px;
        font-weight: bold;
    }
    .content{
        padding-left: 5px;
    }
</style>
