/**
 * 工具类
 */
export default {
  /**
   * 时间日期格式化
   * @param format
   * @returns {*}
   */
  dateFormat(dateObj, format) {
    let date = {
      'M+': dateObj.getMonth() + 1,
      'd+': dateObj.getDate(),
      'h+': dateObj.getHours(),
      'm+': dateObj.getMinutes(),
      's+': dateObj.getSeconds(),
      'q+': Math.floor((dateObj.getMonth() + 3) / 3),
      'S+': dateObj.getMilliseconds()
    }
    if (/(y+)/i.test(format)) {
      format = format.replace(RegExp.$1, (dateObj.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (let k in date) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length === 1
          ? date[k] : ('00' + date[k]).substr(('' + date[k]).length))
      }
    }
    return format
  },

  /**
   * 获取上传文件名
   * @param option 文件
   * @returns {boolean} 是否符合要求
   */
  getImageName(option) {
    let date = this.dateFormat(new Date(), 'yyyyMMdd') // 当前时间
    let dateTime = this.dateFormat(new Date(), 'yyyyMMddhhmmss') // 当前时间
    let uuid = this.generateUUID();
    let extensionName = option.file.name.substr(option.file.name.indexOf('.')) // 文件扩展名
    let fileName = 'post/' + date + '/' + dateTime + '_' + uuid + extensionName // 文件名字（相对于根目录的路径 + 文件名）
    return fileName
  },

  /**
   * 生成uuid
   */
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
  },

  /**
   * 回到顶部，主要用于换页后回到顶部
   */
  backtop() {
    var timer = setInterval(function () {
      let osTop = document.documentElement.scrollTop || document.body.scrollTop;
      let ispeed = Math.floor(-osTop / 5);
      document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
      this.isTop = true;
      if (osTop === 0) {
        clearInterval(timer);
      }
    }, 10)
  },
  // 判断是否登录
  isLogin() {
    let isLogin = this.$store.state.user.userId
    if (isLogin === '' || isLogin === null || isLogin === 0) {
      alert('请先登录')
      return
    }

  }
  // 以下，似乎不能用this.$axios，总是说get，post没有定义
  // // 是否关注贴吧
  // isFollowPostBar(postBarId, isFollow) {
  //   this.$axios.get('/postInfos/is/postBars', {
  //     params: {
  //       userId: this.$store.state.user.userId,
  //       postBarId: postBarId
  //     }
  //   }).then(successResponse => {
  //     isFollow = successResponse.data.message
  //   }).catch(error => {
  //     console.log(error)
  //   })
  // },
  // // 取消关注贴吧
  // cancelFollowPostBar(postBarId) {
  //   this.$axios.delete('/postInfos/follows/postBars?userId=' +
  //     this.$store.state.user.userId +
  //     '&postBarId=' + postBarId)
  //     .then(successResponse => {
  //       this.isFollowPostBar()
  //     }).catch(error => {
  //     console.log(error)
  //   })
  // },
  // // 关注贴吧
  // followPostBar(postBarId) {
  //   this.$axios.post('/postInfos/postBars?userId=' +
  //     this.$store.state.user.userId +
  //     '&postBarId=' + postBarId)
  //     .then(successResponse => {
  //       this.isFollowPostBar()
  //     }).catch(error => {
  //     console.log(error)
  //   })
  // }
}






























