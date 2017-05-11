<template>
	<div class="jyc-wrap">
        <h2>Css base</h2>
        <h3>色彩</h3>
        <p>iView 推荐使用以下调色板的颜色作为设计和开发规范，以保证页面和组件之间的视觉一致。</p>
    	<Card>
    		<div class="line"></div>
			<Row :gutter="16">
                <Col span="12">
                    <div class="comp-box">
                    	 <Card class="primary">Primary #3399ff</Card>
                    	 <Card class="light-primary">Light Primary #5cadff</Card>
                    	 <Card class="dark-primary">Dark Primary #3091f2</Card>
                    	 <Card class="info">Info #3399ff</Card>
                    	 <Card class="success">Success #00cc66</Card>
                    	 <Card class="warning">Warning #ff9900</Card>
                    	 <Card class="error">Error #ff3300</Card>
                    </div>
                </Col>
                <Col span="12">
                    <div class="comp-box">
                        <Card class="title">标题 Title #464c5b</Card>
                        <Card class="content">正文 Content #657180</Card>
                        <Card class="sub-color">辅助/图标 Sub Color #9ea7b4</Card>
                        <Card class="disabled">失效 Disabled #c3cbd6</Card>
                        <Card class="border">边框 Border #d7dde4</Card>
                        <Card class="divider">分割线 Divider #e3e8ee</Card>
                        <Card class="background">背景 Background #f5f7f9</Card>
                    </div>
                </Col>
        	</Row>
    	</Card>
    	<h3>Font 字体</h3>
        <p>iView 的 CSS 对字体进行了统一规范，力求在不同平台、浏览器下能显示出其最佳的效果。我们推荐  macOS（iOS）优先的策略，在不支持苹方字体的情况，使用备用字体。</p>
    	<Card>
			<img style="width:100%;" src="https://file.iviewui.com/dist/aac43973c6b6d72bf7aa852ecb2302c5.png" alt="">
    	</Card>
    	<Card>
    		<img style="width:100%;" src="https://file.iviewui.com/dist/f4b37f948e311cb4bbcb609b17b8db62.png" alt="">
    	</Card>
    </div>
</template>

<style lang="scss" scoped>
.font-box{
	font-family: "PingFang SC";
}
.primary{
    background: #3399ff;
}
.light-primary{
	background:#5cadff;
}
.dark-primary{
	background:#3091f2;
}
.info{
	background:#3399ff;
}
.success{
	background:#00cc66;
}
.warning{
	background:#ff9900;
}
.error{
	background:#ff3300;
}
.title{
	background:#464c5b;
}
.content{
	background:#657180;
}
.sub-color{
	background:#9ea7b4;
}
.disabled{
	background:#c3cbd6;
}
.border{
	background:#d7dde4;
}
.divider{
	background:#e3e8ee;
}
.background{
	background:#f5f7f9;
}


</style>
