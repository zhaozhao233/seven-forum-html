import Utils from './util'

var OSS = require('ali-oss')

import E from 'wangeditor';

export default {
  name: 'PostInfo',
  data() {
    return {
      dataCount: '',
      pageSize: 20,
      postId: '',
      postBarInfo: '',
      replyPostInfos: '',
      replyInfos: '',
      replyTip: '',
      replyPostTip: '',
      isPrivate: true,
      favoritesName: '',
      createFavoritesTip: '',
      favoritesList: [],
      isFollow: 0,
      isCollection: 0,
      collectionList: [],
      collectGroupId: '',
      // 楼主id
      landlordId: '',
      postTitle: '',
      // 用户id
      userId: this.$store.state.user.userId
    }
  },
  filters: {
    ellipsis_title(value) {
      let len = value.length;
      if (!value) return ''
      if (value.length > 25) {
        return value.substring(0, 25) + '......'
      }
      return value
    }
  },
  created() {
    this.postId = this.$route.query.postid
    if (this.postId > 9223372036854775807 || this.postId < 0) {
      this.$router.push('/error')
    }
    this.$axios.get('/postInfos/is/exists?postId=' + this.postId)
      .then(successResponse => {
        if (successResponse.data.message !== '1') {
          this.$router.push('/error')
        }
      }).catch(error => {
        console.log(error)
    })
    this.$axios.get('/postInfos/postBars/postBarInfos', {
      params: {
        postId: this.postId
      }
    }).then(successResponse => {
      this.postBarInfo = successResponse.data.data
      this.isFollowPostBar()
    }).catch(error => {
      console.log(error)
    })

    this.$axios.get('/postInfos/postInfos?postId=' + this.postId)
      .then(successResponse => {
        this.postTitle = successResponse.data.data.postTitle
        this.landlordId = successResponse.data.data.userId
      }).catch(error => {
        console.log(error)
    })


    this.common_queryAllReplyPosts(1, this.pageSize)

    this.common_queryAllReplies()
    this.$axios.get('/postInfos/is/collections', {
      params: {
        userId: this.$store.state.user.userId,
        postId: this.postId
      }
    }).then(successResponse => {
      this.isCollection = successResponse.data.message
    }).catch(error => {
      console.log(error)
    })
    this.isCollectPost()
  },
  methods: {
    // 是否关注贴吧
    isFollowPostBar() {
      this.$axios.get('/postInfos/is/postBars', {
        params: {
          userId: this.$store.state.user.userId,
          postBarId: this.postBarInfo.postBarId
        }
      }).then(successResponse => {
        this.isFollow = successResponse.data.message
      }).catch(error => {
        console.log(error)
      })
    },
    // 取消关注贴吧
    cancelFollowPostBar() {
      this.$axios.delete('/postInfos/follows/postBars?userId=' +
        this.$store.state.user.userId +
        '&postBarId=' + this.postBarInfo.postBarId)
        .then(successResponse => {
          this.isFollowPostBar()
        }).catch(error => {
          console.log(error)
      })
    },
    // 关注贴吧
    followPostBar() {
      let isLogin = this.$store.state.user.userId
      if (isLogin === '' || isLogin === null || isLogin === 0) {
        alert('请先登录')
        return
      }
      this.$axios.post('/postInfos/postBars?userId=' +
        this.$store.state.user.userId +
        '&postBarId=' + this.postBarInfo.postBarId)
        .then(successResponse => {
        this.isFollowPostBar()
      }).catch(error => {
        console.log(error)
      })
    },
    // 是否收藏帖子
    isCollectPost() {
      this.$axios.get('/postInfos/is/collections', {
        params: {
          userId: this.$store.state.user.userId,
          postId: this.postId
        }
      }).then(successResponse => {
        this.isCollection = successResponse.data.message
      }).catch(error => {
        console.log(error)
      })
    },
    // 弹出收藏列表选择
    showCollectionList() {
      let isLogin = this.$store.state.user.userId
      if (isLogin === '' || isLogin === null || isLogin === 0) {
        alert('请先登录')
        return
      }
      this.queryAllCollectionList()
      document.getElementsByClassName("box-card")[0].style.display = "block"
    },
    // 关闭收藏列表选择
    closeCollectionList() {
      document.getElementsByClassName("box-card")[0].style.display = "none"
    },
    // 删除收藏夹列表
    deleteCollection(ev) {
      this.$axios.delete('/postInfos/collections?collectGroupId=' + this.collectGroupId)
        .then(successResponse => {
          this.queryAllCollectionList()
        })
    },
    // 添加收藏
    insertCollection(collectGroupId, ev) {
      // 按钮的点击次数
      const currentTarget = ev.currentTarget
      let clicks =  currentTarget.dataset.clicks
      if (clicks % 2 === 0) {
        // 取消收藏
        this.$axios.delete('/postInfos/favorites/collections?collectId=' + currentTarget.dataset.collectId)
          .then(successResponse => {
            this.isCollectPost()
            currentTarget.innerText = "收藏"
            currentTarget.dataset.clicks ++
          })
      } else {
        // 收藏
        this.$axios.post('/postInfos/collections/postInfos', {
          userId: this.$store.state.user.userId,
          collectObjId: this.postId,
          collectGroupId: collectGroupId
        }).then(successResponse => {
          this.isCollectPost()
          currentTarget.dataset.collectId = successResponse.data.message
          currentTarget.innerText = "取消收藏"
          currentTarget.dataset.clicks ++
        })
      }
    },
    // 获取要删除的收藏夹id赋值geicollectGroupId，方便后续的调用
    getCollectGroupId(ev) {
      this.collectGroupId = ev;
    },
    // 查询所有收藏列表
    queryAllCollectionList() {
      this.$axios.get('/postInfos/collections', {
        params: {
          userId: this.$store.state.user.userId
        }
      }).then(successResponse => {
        // 这里没找到什么办法优化，当删除一个文件夹的时候，会把取消收藏变成已收藏（不要紧，但不是最好的，可是目前做不到）
        let collects = document.getElementsByClassName("collect")
        for (let i = 0; i < collects.length; i ++) {
          collects[i].innerText = "收藏"
        }
        this.collectionList = successResponse.data.data
      }).catch(error => {
        console.log(error)
      })
    },
    // 取消收藏（帖子界面）
    cancelCollectPost() {
      this.$axios.delete('/postInfos/postInfos/collections?userId=' +
        this.$store.state.user.userId + "&postId=" +
        this.postId) .then(successResponse => {
          this.isCollectPost()
      }).catch(error => {
        console.log(error)
      })
    },
    // 得到该帖子下的所有回帖
    common_queryAllReplyPosts(pageNum, pageSize) {
      this.$axios.get('/postInfos/postBars/posts', {
        params: {
          postId: this.postId,
          pageNum: pageNum,
          // 页容量大于0就取参数，不然就只查一页出来
          pageSize: pageSize > 0 ? pageSize : 9999
        }
      }).then(successResponse => {
        this.replyPostInfos = successResponse.data.data
        this.dataCount = successResponse.data.message
      }).catch(error => {
        console.log(error)
      })
    },
    common_queryAllReplies() {
      this.$axios.get('/postInfos/replies/byPostId', {
        params: {
          postId: this.postId
        }
      }).then(successResponse => {
        this.replyInfos = successResponse.data.data
      }).catch(error => {
        console.log(error)
      })
    },
    common_insertReply(userId, replyUserId, replyPostId, replyContent) {
      this.$axios.post("/postInfos/replies", {
        userId: userId,
        replyUserId: replyUserId,
        replyPostId: replyPostId,
        replyContent: replyContent
      })
    },
    current_change(pageNum) {
      this.common_queryAllReplyPosts(pageNum, this.pageSize)
    },
    restrictLength(ev) {
      if (ev.currentTarget.innerText.length > 128) {
        ev.currentTarget.innerText = ev.currentTarget.innerText.substring(0, 128)
        this.replyTip = "超过了128个字符"
        // ev.currentTarget.contenteditable = false
      }
    },
    // 只看楼主
    just_look_landlord() {
      let isLogin = this.$store.state.user.userId
      if (isLogin === '' || isLogin === null || isLogin === 0) {
        alert('请先登录')
        return
      }
      if (this.pageSize === 20) {
        // 只看楼主
        this.$axios.get('/postInfos/postReplies/landlords', {
          params: {
            postId: this.postId
          }
        }).then(successResponse => {
          this.replyPostInfos = successResponse.data.data
        }).catch(error => {
          console.log(error)
        })
        this.pageSize = 99999
      } else {
        // 取消只看楼主
        this.common_queryAllReplyPosts(1, 9999)
        this.pageSize = 20
      }

    },
    // 点击三按钮之一的“回复”，快速定位回复框
    quick_positioning_reply_box() {
      let isLogin = this.$store.state.user.userId
      if (isLogin === '' || isLogin === null || isLogin === 0) {
        alert('请先登录')
        return
      }
      document.getElementById("editorElem").scrollIntoView()
      document.getElementById("editorElem").childNodes[1].firstChild.focus()
    },
    controlShowReplies(e) {
      let isLogin = this.$store.state.user.userId
      if (isLogin === '' || isLogin === null || isLogin === 0) {
        alert('请先登录')
        return
      }
      var replyToReply = document.getElementById(e)
      var replyToReplyDispaly = replyToReply.style.display
      replyToReply.style.display = replyToReplyDispaly === "none" ? "block" : "none"
      replyToReply.getElementsByClassName("reply_write")[0].firstElementChild.focus()
    },
    controlReply(e) {
      let isLogin = this.$store.state.user.userId
      if (isLogin === '' || isLogin === null || isLogin === 0) {
        alert('请先登录')
        return
      }
      var replyDiv = document.getElementById(e)
      var replyDivDisplay = replyDiv.style.display
      replyDiv.style.display = replyDivDisplay === "none" ? "block" : "none"
      if (replyDiv.style.display === "block") {
        replyDiv.firstChild.focus()
      }
    },
    // replyPostId: 该回帖的id，用来寻找回复用的可编辑div（该div绑定的id是回帖的id）
    // replyUserName: 回复谁，相当于@的功能
    // replyUserId: 被回复的用户的id，用于绑定“发表”按钮的class
    beginReply(replyPostId, replyUserName, replyUserId) {
      var replyDiv = document.getElementById(replyPostId)
      var editableDiv = replyDiv.firstChild
      var submitButton = replyDiv.lastChild
      submitButton.className = ""
      submitButton.className = replyUserId
      editableDiv.innerText = "回复 " + replyUserName + "："
      var range = document.createRange();
      range.selectNodeContents(editableDiv);
      range.collapse(false);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      editableDiv.scrollIntoView()
    },
    submitReply(ev) {
      //下面是回复别人的回复的，等下还要判断：之后是否为空，空就不发送
      // 如果div内容全空，就发送给层主
      const currentTarget = ev.currentTarget
      console.log(currentTarget.dataset.layermaster)
      // 如果“发表”按钮的class为“”，那么就是把内容发送给层主的，层主id就是自定义属性data-layermaster
      const replyUserId = currentTarget.className === "" ? currentTarget.dataset.layermaster : currentTarget.className
      // div的内容
      let replyContent = currentTarget.previousElementSibling.innerText
      console.log(replyContent.length)
      const replyPostId = currentTarget.parentElement.id
      console.log(replyPostId)
      if (replyContent.trim().length === 0) {
        this.replyTip = "发贴内容需包含文字"
        return
      }
      if (replyUserId === currentTarget.dataset.layermaster) {
        this.common_insertReply(this.$store.state.user.userId, replyUserId, replyPostId, replyContent)
        // 提示信息清空
        this.replyTip = ""
      } else {
        const firstColonIndex = replyContent.indexOf("：")
        const firstReplyIndex = replyContent.indexOf("回复")
        // 如果是按照标准来发言，就截取：后的文字，如果标准被修改就获取全部内容
        // 标准：“回复 xxx：” + 内容
        replyContent = firstColonIndex > firstReplyIndex && firstReplyIndex === 0 ? replyContent.substring(firstColonIndex + 1) : replyContent
        this.common_insertReply(this.$store.state.user.userId, replyUserId, replyPostId, replyContent)
      }
      this.common_queryAllReplies()
      // 清空div的内容，清空绑定的发表按钮的class，但是此时class还是有的，不过为""
      currentTarget.previousElementSibling.innerText = ""
      currentTarget.className = ""
      // 提示信息清空，但是有时候会正常显示，有时候又有再发送一条信息才会出现（也可以刷新一次就没问题）
      this.replyTip = "发送成功，若未显示可刷新界面"
    },
    replyPost() {
      let isLogin = this.$store.state.user.userId
      if (isLogin === '' || isLogin === null || isLogin === 0) {
        alert('请先登录')
        return
      }
      // 没有输入
      if (this.editorSelf.txt.text().length < 1 && this.editorSelf.txt.html().length < 12) {
        this.replyPostTip = "抱歉，您的帖子低于1字符，请您再输入一点吧"
        return
      }
      // 包括图片背后真正的<img>的src地址长度之类
      if (this.editorSelf.txt.html().length > 5000) {
        this.replyPostTip = "抱歉，您的帖子超过5000字符，建议您精简或分段后再提交"
        return
      }
      this.$axios.post('/postInfos/replyPosts', {
        postId: this.postId,
        userId: this.$store.state.user.userId,
        replyPostContent: this.editorSelf.txt.html()
      })
      this.editorSelf.txt.html('')
      this.replyPostTip = "回帖成功，如果未显示，请手动刷新界面"
      this.common_queryAllReplyPosts(1, this.pageSize)
    },
    fnUploadRequest(option) {
      if (!/image\/\w+/.test(option.file.type)) {
        this.replyPostTip = "上传的不是图片"
        return false;
      }
      //在此限制图片的大小
      var imgSize = option.file.size;
      //在此处我们限制单张图片大小为3M
      if (imgSize > 3 * 1024 * 1024) {
        this.replyPostTip = "上传的图片大小大于3M,请重新选择"
        // $(this).val('')
        return false;
      }
      let imageName = Utils.getImageName(option)
      var self = this
      this.$axios.get('/sts')
        .then(successResponse => {
          const client = new OSS({
            region: 'oss-cn-shanghai',
            accessKeyId: successResponse.data.data.credentials.accessKeyId,
            accessKeySecret: successResponse.data.data.credentials.accessKeySecret,
            bucket: 'sevenforum',
            stsToken: successResponse.data.data.credentials.securityToken
          })
          client.put(imageName, option.file).then(function (success) {
            self.editorSelf.txt.append('<img src="' + success.url + '">')
            self.replyPostTip = "该图片上传成功"
          })
        })
    },
    // 新建收藏夹
    createFavorites() {
      if (this.favoritesName.length === 0) {
        this.createFavoritesTip = "请填写文件夹名称"
        return false
      }
      if (this.favoritesName.length > 20) {
        this.createFavoritesTip = "文件夹名字不可以超过20字"
        return false
      }
      this.$axios.post('/postInfos/collections', {
        groupName: this.favoritesName,
        userId: this.$store.state.user.userId,
        status: this.isPrivate === true ? 0 : 1
      }).then(successResponse => {
        this.favoritesName = ""
        this.queryAllCollectionList()
      }).catch(error => {
        console.log(error)
      })
    },

    // 查询所有收藏夹信息
    common_queryAllFavorites() {
      this.$axios.get("/postInfos/collections", {
        params: {
          userId: this.$store.state.user.userId
        }
      }).then(successResponse => {
        this.favoritesList = successResponse.data.data
      }).catch(error => {
        console.log(error)
      })
    },
    // 回复不可见
    deleteReply(replyId) {
      this.$axios.put('/postInfos/replies?replyId=' + replyId)
        .then(successResponse => {
          this.common_queryAllReplies()
      }).catch(error => {
          console.log(error)
      })
    },
    // 回帖不可见
    deleteReplyPost(replyPostId) {
      this.$axios.put('/postInfos/replyPosts?replyPostId=' + replyPostId)
        .then(successResponse => {
          this.$router.go(0)
          // this.common_queryAllReplyPosts(1, this.pageSize)
      }).catch(error => {
          console.log(error)
      })
    }
  },
  mounted() {
    var editor = new E('#editorElem');
    editor.customConfig.onchange = (html) => {
      this.editorContent = html
    };
    editor.create()
    this.editorSelf = editor
  }
}
