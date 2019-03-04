<template>
  <div class="mint-cell">
    <div class="mint-cell-wrapper">
      <div class="mint-cell-title upload-title">
        <span class="mint-cell-text">{{title}}</span>
        <span class="mint-cell-label">{{helper}}<slot name="cellLabel"></slot></span>
      </div>
      <div class="upload-value">
        <div v-for="(item, index) in imageList" :key="index"  class="upload-preview">
          <img :src="item.imageBaseUrl" width="80" height="80" style="border-radius: 8px;box-sizing: border-box;" @click="previewImage(index)">
          <a class="upload-del" @click="removeImage(index)">
            <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8177" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" height="30" fill="#ff0000"><path d="M512 96C281.118 96 96 281.118 96 512c0 230.872 185.118 416 416 416 230.87 0 416-185.128 416-416C928 281.118 742.872 96 512 96zM720.004 661.762l-58.24 58.234L512 570.234l-149.762 149.762-58.242-58.234L453.762 512l-149.766-149.762 58.242-58.232L512 453.762l149.762-149.756 58.24 58.232L570.238 512 720.004 661.762z" p-id="8178"></path></svg>
          </a>
        </div>
        <div class="upload-add" style="float: left" v-show="imageList.length < limit" @click="cancelUpload">
         <vue-core-image-upload
          class="upload-add-btn"
          :crop="false" 
          :isXhr="isXhr"
          inputAccept="image/*"
          :credentials="false"
          :max-file-size="10240000"
          @imageuploaded="imageUploaded"
          @imagechanged="imageChanged"
          @imageuploading="imageuploading"
          @errorhandle="imageError"
          :data="imageData()"
          :multiple="multiple"
          :multiple-size="limit"
          inputOfFile='file'
          url="//upload-z1.qiniu.com">
          <div :style="{width: uploadPercent}"  class="progress" v-if="uploading"></div>
          <div class="image-mask"  v-if="uploading"></div>
          <img v-if="uploading" :src="tempImage" width="80" height="80" style="border-radius: 8px;box-sizing: border-box;" />
          <svg v-else viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7518" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#cccccc" width="40" height="40"><path d="M512 102.68672c113.4592 0 214.95808 46.01856 289.52576 119.808 73.80992 74.56768 119.808 176.90624 119.808 289.52576 0 113.4592-45.99808 214.97856-119.808 289.52576-74.56768 73.80992-176.06656 119.808-289.52576 119.808-112.64 0-214.97856-45.9776-289.52576-119.808C148.70528 726.97856 102.68672 625.4592 102.68672 512c0-112.61952 46.01856-214.95808 119.78752-289.52576C297.02144 148.70528 399.36 102.68672 512 102.68672L512 102.68672zM771.39968 252.6208C705.55648 185.97888 613.53984 144.71168 512 144.71168c-101.53984 0-193.57696 41.2672-259.39968 107.90912C185.97888 318.44352 144.71168 410.46016 144.71168 512c0 101.56032 41.2672 193.55648 107.88864 259.39968 65.82272 66.62144 157.83936 107.88864 259.39968 107.88864 101.53984 0 193.55648-41.2672 259.39968-107.88864 66.62144-65.8432 107.90912-157.83936 107.90912-259.39968C879.3088 410.46016 838.02112 318.44352 771.39968 252.6208L771.39968 252.6208z" p-id="7519"></path><path d="M299.4176 543.76448c-11.91936 0-21.42208-9.54368-21.42208-21.44256 0-11.10016 9.5232-20.64384 21.42208-20.64384l442.65472 0c11.8784 0 21.4016 9.54368 21.4016 20.64384 0 11.89888-9.5232 21.44256-21.4016 21.44256L299.4176 543.76448z" p-id="7520"></path><path d="M533.44256 743.64928c0 11.89888-9.54368 21.4016-21.44256 21.4016-11.10016 0-20.62336-9.50272-20.62336-21.4016L491.37664 300.99456c0-11.10016 9.5232-20.62336 20.62336-20.62336 11.89888 0 21.44256 9.5232 21.44256 20.62336L533.44256 743.64928z"  p-id="7521"></path></svg>
        </vue-core-image-upload>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import config from '@/config/config'
  import compressImage from '@/utils/compressImage'
  import VueCoreImageUpload from 'vue-core-image-upload'
  import moment from 'moment'
  export default {
    name: 'image-upload',
    data () {
      return {
        imageList: [],
        uploading: false,
        tempImage: '',
        uploadPercent: '0',
        isXhr: true,
        fileType: '.jpg'
      }
    },
    props: {
      'title': String,
      'limit': {type: Number, default: 50},
      'min': {type: Number, default: 0},
      'show': Array,
      'helper': String,
      'imgType': String,
      'modules': String,
      'token': String,
      'multiple': Boolean
    },
    methods: {
      imageChanged (file) {
        const type = file.type
        this.fileType = '.' + type.split('/')[1]
        var reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = e => {
          const imageBaseUrl = e.currentTarget.result
          compressImage(imageBaseUrl).then((baseUrl) => {
            this.tempImage = baseUrl
            this.uploadPercent = '90%'
          })
        }
      },
      imageuploading () {
        this.uploading = true
        this.uploadPercent = '10%'
      },
      imageUploaded (res) {
        if (res.code === '0') {
          var imageRespose = res.info
          this.uploadPercent = '100%'
          if (imageRespose) {
            this.imageList.push({
              'imageId': imageRespose,
              'imageBaseUrl': this.tempImage
            })
            this.$emit('input', this.imageList.map(item => item.imageId))
            alert('success', '图片上传成功')
            this.clearImage()
          }
        } else {
          this.clearImage()
          var errorMsg = res.error
          alert('error', errorMsg || '图片上传失败，请重试')
        }
      },
      imageError (error) {
        this.clearImage()
        console.log(error)
        alert('error', '图片上传失败，请重试')
      },
      previewImage (index) {
        
      },
      clearImage () {
        this.uploading = false
        this.tempImage = ''
        this.uploadPercent = '0'
      },
      cancelUpload () {
        if (!this.uploading) {
          return
        }
        this.clearImage()
      },
      removeImage (index) {
        this.uploading = false
        this.imageList.splice(index, 1)
        this.$emit('input', this.imageList.map(item => item.imageId))
      },
      imageData () {
        const nameDate = moment().format('YYYYMMDD_hmmss')
        const randomKey = Math.round((Math.random() * 1000))
        const name = config.defaultParam.terminalType + '_' + this.imgType + '_' + this.modules + '_' + nameDate + randomKey + this.fileType
        return {
          'name': name,
          'chunk': 0,
          'x:terminalForm': config.defaultParam.terminalType,
          'chunks': 1,
          'key': name,
          'token': this.token,
          'x:modelname': this.modules
        }
      }
    },
    watch: {
      show: function (val) {
        if (Array.isArray(val) && val.length > 0) {
          val.forEach((item, index) => {
            this.$set(this.imageList, index, item)
          })
        }
      }
    },
    components: {
      VueCoreImageUpload
    }
  }
</script>
<style lang="css">
  .upload-value{
    padding: 10px 0;
    box-sizing: border-box;
  }
  .g-core-image-upload-btn{
    float: left;
    position: relative;
  }
  .upload-title{
    width: 105px;
    flex: none !important;
    font-size: 16px;
  }
  .upload-preview{
    float: left;
    position: relative;
    border-radius: 8px;
    box-sizing: border-box;
    border: 1px solid #bbbbbb;
    margin: 0 5px 5px 0; 
  }
  .upload-del{
    position: absolute;
    top: -8px;
    right: -10px;
    z-index: 99;
    width: 30px;
    height: 30px;
  }
  .upload-add{
    width: 80px;
    height: 80px;
    border: 1px dotted #bbbbbb;
    border-radius: 8px;
    box-sizing: border-box;
    margin: 0 3px 3px 0; 
  }
  .upload-add-btn{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .helper-text{
    text-align: right;
    padding: .2rem .8rem;
    color: #999999;
    font-size: .6rem;
  }
  .progress{
    height: 2px; 
    background: #26a2ff;
    position: absolute;
    bottom: .2rem;
    left: 0;
    width: 0;
    transition: width 3s;
    z-index: 999;
  }
  .image-mask{
    background: #000000;
    filter:alpha(Opacity=30);
    opacity: 0.3;
    width: 100%;
    position: absolute;
    height: 100%;
    z-index: 10;
    border-radius: 8px;
  }
</style>