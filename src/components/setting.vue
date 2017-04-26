<template>
  <div class="settings" v-show="settingshow">
    <div class="settings-switch">
      <p>
        <span>头部不滚动</span>
        <label>
          <i-switch v-model="headerFixed" @on-change="changSetting(1)">
            <span slot="open">开</span>
            <span slot="close">关</span>
          </i-switch>
        </label>
      </p>
      <p>
        <span>菜单栏固定</span>
        <label>
          <i-switch v-model="Asidefixed" @on-change="changSetting(2)">
            <span slot="open">开</span>
            <span slot="close">关</span>
          </i-switch>
        </label>
      </p>
      <p>
        <span>固定页面宽</span>
        <label>
          <i-switch v-model="container" @on-change="changSetting(4)">
            <span slot="open">开</span>
            <span slot="close">关</span>
          </i-switch>
        </label>
      </p>
      <p>
        <span>菜单栏折叠</span>
        <label>
          <i-switch v-model="asideIndent" @on-change="changSetting(3)">
            <span slot="open">开</span>
            <span slot="close">关</span>
          </i-switch>
        </label>
      </p>

    </div>
    <div class="settings-theme">
      <Row :gutter="20">
        <Col span="12">
        <span class="theme-item theme-1">
                        <span>
                          <i></i>
                        </span>
        <b class="header"></b>
        <b class="header"></b>
        <b></b>
        </span>
        </Col>
        <Col span="12">col-12</Col>
      </Row>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      headerFixed: state => state.systemSetting.headerFixed,
      Asidefixed: state => state.systemSetting.Asidefixed,
      container: state => state.systemSetting.container,
      asideIndent: state => state.systemSetting.asideIndent,
    }),
  },
  props: ['settingshow'],
  methods: {
    changSetting(type) {
      this.$store.commit("changeSetting", type)
    }
  }
}
</script>
<style lang="scss" scoped>
@mixin button {
  font-size: 1em;
  padding: 0.5em 1.0em;
  text-decoration: none;
  color: #fff;
  @content;
}

.settings {
  position: fixed;
  top: 50px;
  right: -1px;
  z-index: 1050;
  width: 240px;
  height: 100%;
  background: #fff;
  border: 1px solid #dee5e7;
  &-switch {
    padding: 15px;
    p {
      overflow: hidden;
      margin-bottom: 15px;
      &>span {
        line-height: 24px;
      }
      label {
        float: right
      }
    }
  }
  &-theme {
    padding: 15px;
    background: #f6f8f8;
    .theme-item {
      display: block;
      width: 100%;
      background: #edf1f2;
      overflow: hidden;
      cursor: pointer;
      b {
        float: left;
        width: 50%;
        height: 20px;
        &.header {
          height: 10px;
          height: 10px;
        }
      }
    }
    .theme-1 {
      b {
        background: #1c2b36;
        &.header:nth-of-type(2) {
          background: #ffffff;
        }
      }
    }

    // @each $animal,$logo-color,$header-color, $aside-color in  (1, #1c2b36, #ffffff, #1c2b36),(2, #1c2b36, #1c2b36, #ffffff),(3, #3a3f51, default),(4, black, default),
    //                                                           (5, black, default),(6, black, default),(7, black, default),(9, black, default),
    //                                                           (9, black, default),(10, black, default),(11, black, default),(12, black, default),
    //                                                           (13, black, default),(14, black, default),{
    //   .#{$animal}-icon {
    //     background-image: url('/images/#{$animal}.png');
    //     border: 2px solid $color;
    //     cursor: $cursor;
    //   }
    // }
  }
}
</style>
