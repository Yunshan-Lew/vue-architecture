<template>
  <div class="file-upload-box">
    <input type="file" name="file" class="file-upload-input" @change="onChange" @input="onInput" v-model="files"/>
    <img :src="icon" class="file-upload-icon"/>
  </div>
</template>
<script>
  export default {
    name: 'ft-file-upload',
    data () {
      return {
        files: ''
      }
    },
    props: {
      icon: String
    },
    methods: {
      onChange () {
        this.$emit('change', this.files)
      },
      onInput () {
        this.$emit('input', this.files)
      }
    }
  }
</script>
<style lang="less">
  .file-upload{
    &-box{
      position: relative;
      width: 24px;
      height: 24px;
    }
    &-icon{
      position: absolute;
      z-index: 0;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    &-input{
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }
  }
</style>