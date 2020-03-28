'use strict'
import Utils from './util'

var OSS = require('ali-oss')
let TOAST_TIME = 'a'

export default {
  TOAST_TIME,

  /**
   * 创建随机字符串
   * @param num
   * @returns {string}
   */
  randomString (num) {
    let chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    let res = ''
    for (let i = 0; i < num; i++) {
      var id = Math.ceil(Math.random() * 35)
      res += chars[id]
    }
    return res
  },

  /**
   * 创建oss客户端对象
   * @returns {*}
   */
  createOssClient () {
    return new Promise((resolve, reject) => {
      let client = new OSS({
        region: 'oss-cn-shanghai',
        accessKeyId: 'LTAI4FpTkn8F1HptUPiRrSPV',
        accessKeySecret: 'ELkOTI31FEHonj2qjQBRQXejeIPbqQ',
        bucket: 'sevenforum'
      })
      resolve(client)
    })
  },
  /**
   * 文件上传
   * @param option 参考csdn: https://blog.csdn.net/qq_27626333/article/details/81463139
   */
  ossUploadFile (option) {
    let imgUrl = '';
    let file = option.file
    const self = this
    console.log("this:" + this)
    self.createOssClient().then(client => {
      // 异步上传,返回数据
      // resolve({
      //   fileName: file.name,
      //   fileUrl: fileName
      // })
      let date = Utils.dateFormat(new Date(), 'yyyyMMdd') // 当前时间
      //   console.log("date:" + date)
        let dateTime = Utils.dateFormat(new Date(), 'yyyyMMddhhmmss') // 当前时间
        console.log("dateTime:" + dateTime)
        let randomStr = self.randomString(4)//  4位随机字符串
        console.log("randomStr:" + randomStr)
        let extensionName = file.name.substr(file.name.indexOf('.')) // 文件扩展名
        console.log("extensionName:" + extensionName)
        let fileName = 'video/' + date + '/' + dateTime + '_' + randomStr + extensionName // 文件名字（相对于根目录的路径 + 文件名）
      client.put(fileName,file).then(function (response) {
        console.log(response.url)
        TOAST_TIME = response.url
        return response.url
        // let _this = this
        // _this.TOAST_TIME =  response.url
        // console.log(this.TOAST_TIME)
      })
    })
    // return new Promise((resolve, reject) => {
    //   let date = Utils.dateFormat(new Date(), 'yyyyMMdd') // 当前时间
    //   console.log("date:" + date)
    //   let dateTime = Utils.dateFormat(new Date(), 'yyyyMMddhhmmss') // 当前时间
    //   console.log("dateTime:" + dateTime)
    //   let randomStr = self.randomString(4)//  4位随机字符串
    //   console.log("randomStr:" + randomStr)
    //   let extensionName = file.name.substr(file.name.indexOf('.')) // 文件扩展名
    //   console.log("extensionName:" + extensionName)
    //   let fileName = 'video/' + date + '/' + dateTime + '_' + randomStr + extensionName // 文件名字（相对于根目录的路径 + 文件名）
    //   console.log("fileName:" + fileName)
    //   // 执行上传
    //
    // })
  }
}

















































































