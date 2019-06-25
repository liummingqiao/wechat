var pageSelf = undefined;
var plugin = requirePlugin("WechatSI");
let manager = plugin.getRecordRecognitionManager();
Page({
  data: {
    currentText: '',
  },
  onShow: function () {
    manager.onRecognize = function (res) {
      // console.log('manager.onRecognize')
      console.log(res)
      // wx.showToast({
      //   title: res.result,
      // })
      // cons.log("current result", res.result)
    }
    manager.onStop = function (res) {
      console.log('manager.onStop')
      console.log(res)//语音识别信息打印
      wx.showToast({
        title: res.result,
      })
      this.data.currentText = title;
      console.log(this.data.currentText)
      
      // UTIL.log("record file path", res.tempFilePath)
      // UTIL.log("result", res.result)
      //res.result is the asr result, change the follow step to your source
      //NLI.process(res.result, pageSelf);
    }
    manager.onError = function (res) {
      console.log('manager.onError')
      console.log(res)//报错信息打印
      wx.showToast({
        title: res.msg,
      })
      // UTIL.log("error msg", res.msg)
    }
  },
  //添加两个方法
  touchdown_plugin: function () {
    var _this = this
    // UTIL.stopTTS();
    manager.start({
      duration: 30000,
      lang: "zh_CN"
    })
  },
  //手指松开
  touchup_plugin: function () {
    manager.stop();
    wx.showToast({
      title: '正在识别……',
      icon: 'loading',
      duration: 2000
    })
    onShow();
  },
  })

