<template>
    <div class="jyc-wrap">
        <h2>Bootstrap</h2>
        <p>More infomation <a href="https://bootstrap-vue.github.io/"> https://bootstrap-vue.github.io/</a></p>
        <Card>
            <div class="line"></div>
            <Row :gutter="16">
                <Col span="12">
                <div class="comp-box">
                    <b-alert show>
                        Default Alert
                    </b-alert>
                    <b-alert state="success" show>
                        Success Alert
                    </b-alert>
                </div>
                </Col>
                <Col span="12">
                <div class="comp-box">
                    <h3>Example heading <b-badge>New</b-badge></h3>
                    <h4>Example heading <b-badge variant="primary">New</b-badge></h4>
                    <h5>Example heading <b-badge pill variant="success">New</b-badge></h5>
                </div>
                </Col>
            </Row>
        </Card>
        <Card>
            <div class="line"></div>
            <Row :gutter="16">
                <Col span="12">
                <div class="comp-box">
                    <b-breadcrumb :items="items" />
                </div>
                </Col>
                <Col span="12">
                <div class="comp-box">
                    <template v-for="variant in ['primary','secondary','success','outline-success','warning','danger','link']">
                        <div class="col-md-4 pb-2">
                            <b-button :variant="variant" href="">
                                {{variant}}
                            </b-button>
                        </div>
                    </template>
                </div>
                </Col>
            </Row>
        </Card>
        <Card>
            <div class="line"></div>
            <Row :gutter="16">
                <Col span="12">
                <div class="comp-box">
                    <b-button-group vertical>
                        <b-button variant="success">Top</b-button>
                        <b-button variant="info">Middle</b-button>
                        <b-button variant="primary">Bottom</b-button>
                    </b-button-group>
                    <b-button-group>
                        <b-button>Left</b-button>
                        <b-button>Middle</b-button>
                        <b-button>Right</b-button>
                    </b-button-group>
                    <b-button-group size="sm">
                        <b-button>Left</b-button>
                        <b-button>Middle</b-button>
                        <b-button>Right</b-button>
                    </b-button-group>
                    <b-carousel controls indicators :interval="3000" background="grey" style="margin-top:100px;margin-bottom:50px;">
                        <b-carousel-slide background="grey" height="300px" caption="First slide" text="Nulla vitae elit libero, a pharetra augue mollis interdum.">
                        </b-carousel-slide>
                        <b-carousel-slide background="grey" height="300px">
                            Hello world
                        </b-carousel-slide>
                        <b-carousel-slide background="grey" height="300px" img="http://placeskull.com/600/300/ABABAB/-1/0">
                        </b-carousel-slide>
                    </b-carousel>
                    <b-dropdown text="Dropdown" variant="success" class="m-md-2">
                        <b-dropdown-header>This is a heading</b-dropdown-header>
                        <b-dropdown-item>Action</b-dropdown-item>
                        <b-dropdown-item>Another action</b-dropdown-item>
                        <b-dropdown-divider></b-dropdown-divider>
                        <b-dropdown-item>Something else here...</b-dropdown-item>
                    </b-dropdown>
                    <b-form-checkbox value="accepted" unchecked-value="not_accepted">
                        I accept terms and use
                    </b-form-checkbox>
                </div>
                </Col>
                <Col span="12">
                <div class="comp-box">
                    <b-card class="mb-2" variant="success">Simple Card</b-card>
                    <b-card header="Card header text" class="mb-2" title="Card title" sub-title="Card subtitle" show-footer>
                        <small slot="footer" class="text-muted">
                            Last updated 3 mins ago
                        </small>
                    </b-card>
                    <b-card img="http://placeskull.com/200/200/ABABAB/-1/0" title="Skulls are nice" class="mb-2">
                        This is my opinion :)
                    </b-card>
                    <b-card overlay img="http://placeskull.com/200/200/E8117F/-1/0" class="mb-2">
                        Overlay cards are cute!
                    </b-card>
                </div>
                </Col>
            </Row>
        </Card>
        <Card>
            <div class="line"></div>
            <Row :gutter="16">
                <Col span="12">
                <div class="comp-box">
                    <b-card no-block>
                        <b-tabs small card ref="tabs" v-model="tabIndex">
                            <b-tab title="General">
                                I'm the first fading tab
                            </b-tab>
                            <b-tab title="Edit profile">
                                I'm the second tab
                                <b-card>I'm the card in tab</b-card>
                            </b-tab>
                            <b-tab title="Premium Plan" disabled>
                                Sibzamini!
                            </b-tab>
                        </b-tabs>
                    </b-card>
                </div>
                </Col>
                <Col span="12">
                <div class="comp-box">
                    <b-nav tabs>
                        <b-nav-item active>Active</b-nav-item>
                        <b-nav-item>Link</b-nav-item>
                        <b-nav-item>Another Link</b-nav-item>
                        <b-nav-item disabled>Disabled</b-nav-item>
                    </b-nav>
                </div>
                </Col>
            </Row>
        </Card>
        <Card>
            <div class="line"></div>
            <Row :gutter="16">
                <Col span="12">
                <div class="comp-box">
                    <b-form-file v-model="file"></b-form-file>
                    <br> Selected file: {{file && file.name}}
                </div>
                </Col>
                <Col span="12">
                <div class="comp-box">
                    <b-form-fieldset :feedback="feedback" description="We'll convert your name to lowercase automatically." label="Example Label" :state="state" :label-size="1">
                        <b-form-input v-model="name"></b-form-input>
                    </b-form-fieldset>
                </div>
                </Col>
            </Row>
        </Card>
    </div>
</template>
<script>
export default {
    data() {
            return {
                items: [{
                    text: 'Admin',
                    link: '#',
                }, {
                    text: 'Manage',
                    link: '#',
                }, {
                    text: 'Library',
                    active: true
                }],
                name: '',
                file: null,
                text: ''
            }
        },
        computed: {
            feedback() {
                return this.name.length ? '' : 'Please enter something';
            },
            state() {
                return this.name.length ? 'success' : 'warning';
            },
        },
        components: {},

        methods: {
            format(value) {
                return value.toLowerCase();
            }
        }
}
</script>
<style lang="scss" scoped>
.comp-box h3 {
    padding: 0;
}
</style>
