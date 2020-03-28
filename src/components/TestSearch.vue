<template>
  <el-upload action=""
             :http-request="fnUploadRequest"
             :show-file-list="true"
             :limit=2
             :on-exceed="beyondFile"
             :on-success="handleVideoSuccess"
             :before-upload="beforeUploadVideo">
    <span class="buttomStyle">上传视频</span>
  </el-upload>
</template>

<script>
  var OSS = require('ali-oss')
  import Utils from '../myjs/util'
  // import {TOAST_TIME} from "../myjs/aliOss";

  export default {

    methods: {
      /**
       * @description [fnUploadRequest 覆盖默认的上传行为，实现自定义上传]
       * @param    {object}   option [上传选项]
       * @return   {null}   [没有返回]
       */
      fnUploadRequest (option) {
        // let a = oss.ossUploadFile(option)
        const client = new OSS({
          region: 'oss-cn-shanghai',
          accessKeyId: 'LTAI4FpTkn8F1HptUPiRrSPV',
          accessKeySecret: 'ELkOTI31FEHonj2qjQBRQXejeIPbqQ',
          bucket: 'sevenforum'
        });
        let date = Utils.dateFormat(new Date(), 'yyyyMMdd') // 当前时间
        let dateTime = Utils.dateFormat(new Date(), 'yyyyMMddhhmmss') // 当前时间
        let uuid = this.generateUUID();
        let extensionName = option.file.name.substr(option.file.name.indexOf('.')) // 文件扩展名
        console.log("extensionName:" + extensionName)
        let fileName = 'post/' + date + '/' + dateTime + '_' + uuid + extensionName // 文件名字（相对于根目录的路径 + 文件名）
        client.put(fileName, option.file).then(function (success) {
          console.log(success.url)
        })
      },
      // 视频上传
      beforeUploadVideo (file) {
        //todo
      },
      // 视频上传成功后
      handleVideoSuccess (response, file, fileList) {
        console.log("视频上传成功后response:" + response)
        console.log("视频上传成功后file:" + file)
        console.log("视频上传成功后fileList:" + fileList)
      },
      // 视频添加多个视频文件事件
      beyondFile (files, fileList) {
        alert("不能再上传了")
        console.log("不能再file:" + files)
        console.log("不能再fileList:" + fileList)
      },
      generateUUID() {
        var d = new Date().getTime();
        if (window.performance && typeof window.performance.now === "function") {
          d += performance.now(); //use high-precision timer if available
        }
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          var r = (d + Math.random() * 16) % 16 | 0;
          d = Math.floor(d / 16);
          return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
      }
    }
  }
</script>
<style scoped>

</style>
