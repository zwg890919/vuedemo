<template>
    <div class="jyc-wrap">
        <h2>Editor</h2>
        <Card>
            <quill-editor v-model="content"></quill-editor>
        </Card>
    </div>
</template>
<script>
// You can also register quill modules in the component
import { quillEditor } from 'vue-quill-editor'

export default {
    components: {
        quillEditor
    },
    data() {
        return {
            content: '<h1>Hello World</h1>'
        }
    }
}
</script>
<style lang="scss">
    .ql-editor {
        min-height: 200px;
    }
</style>