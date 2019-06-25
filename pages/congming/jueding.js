const app = getApp()
Page({
  hello: function() {
    this.setData({
      pd: true
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    tittle: "机器人聊天室",
    syas: [],
    nr: '',
    pd: false,
    headLeft: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4139308026,2925331886&fm=26&gp=0.jpg',
    headRight: '',
    token: '',
    tulingspeak: '' ,
    filePath:'',
    bianliang:'',
    scrollTop: 600
  },
  methods: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    let that = this
    wx.getUserInfo({
      success: function(e) {
        let header = e.userInfo.avatarUrl
        that.setData({
          headRight: header
        })
      }
    })

  },
  converSation: function(e) {
    let that = this
    var obj = {},
      isay = e.detail.value.says, //获取输入了什么
      syas = that.data.syas, //获取当前数组的内容并且把它付给syas变量
      length = syas.length, //获取当前的数组长度
      key = '2972a46feda14f908df7537da16d4f46' //这里填入你得到的图灵机器人的apikey
    console.log(length)
    wx.request({ //请求图灵机器人的接口
      url: 'http://www.tuling123.com/openapi/api?key=' + key + '&info=' + isay,
      success: function(res) {
        let tuling = res.data.text; //这个是图聆机器人返回值
        obj.robot = tuling; //把返回值发给正常 给这个对象robot属性
        obj.isay = isay; //获取输入的东西给obj.isay
        obj.id = "div"+length
        syas[length] = obj;; //把这个obj对象变成 syas【length】的数组的值
        that.setData({
          syas: syas, //把整个syas给Data里的syas
          nr: '',
          pd: false,
          tulingspeak: res.data.text   ,//把这个机器人返回的值附加给全局变量
          scrollTop: that.data.scrollTop + 350  //这是啥
        });
        that.to();
      }
    })
    
  },
  delectChat: function() { //清除syas里边的内容
    let that = this
    that.setData({
      syas: [], //清空
      nr: ''
    })
  },
  to: function() {
    var that  =  this ;
    var grant_type = "client_credentials";
    var appKey = "ohNbirS0WGjKbCOR8FpxOeF5";
    var appSecret = "dnIdDq8szxqCQ0yLMt25NPTTwezbMRoI";
    var url = "https://openapi.baidu.com/oauth/2.0/token?" + "grant_type=" + grant_type + "&client_id=" + appKey + "&client_secret=" + appSecret;
    wx.request({
      url:url,
      method: "GET",
      dataType:'json',
      success: function(res) { //设置1这个成功时候的返回的TOKEN码
        that.setData({
          token: res.data.access_token, //把这个TOKEN码给一个常量
       
        })
        that.cancel();
      }
    })
  },
  cancel: function(e) { //具体翻译每一句话
    var text = e.currentTarget.dataset.text; //把全局变量图灵机器人的话给到一个局部变量
    var tex = encodeURI(text); //转换编码url_encode UTF8编码
    var tok = this.data.token; //把TOKEN值给到一个变量+
    var cuid = 12345685; // 字符编码
    var ctp = 1; //表示语音种类
    var lan = "zh"; // zh表示中文
    var per = 3;
    var spd = 5; // 表示朗读的语速，9代表最快，1是最慢
    var url = "https://tsn.baidu.com/text2audio?tex=" + tex + "&lan=" + lan + "&cuid=" + cuid + "&ctp=" + ctp + "&tok=" + tok + "&spd=" + spd + "&per=" +per
    wx.downloadFile({ //下载资源后返回的路径位置
      url: url,
      success: (res)=> {
        console.log(res)
        console.log('chenggong')
        this.setData({
          filePath : res.tempFilePath,//临时文件路径 
          scrollTop: this.data.scrollTop + 350  //这是啥
        })
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
       
          this.play()
        
      },
      filePath: () => { },
      complete: () => { }
    });
  },
  //播放
  play: function() {
    const tolingtextspeak = wx.getBackgroundAudioManager()//调用微信的音乐播放功能
    tolingtextspeak.title="语音播放"
    tolingtextspeak.src = this.data.filePath//把播放的地址给这个
    tolingtextspeak.play()
  },
})