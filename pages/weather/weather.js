// pages/weather/weather.js
Page({
  data:{
    "city": "",
    "cityValue": "",
    "temperature": "",
    "imageSrc": "",
    "time": "",
    "focus": "",
    "color": "black",
    "time": '',
    "futureWeather": ''
  },
  // Search weather by city name.
  searchWeatherByCity:function(params) {
    var city = params.detail.value;
    var requestUrl = 'https://api.map.baidu.com/telematics/v3/weather?output=json&ak=5827531cbeea4bd3954710471a61eb32&location=' + city;
    var that = this;
    wx.request({
      url: requestUrl, //仅为示例，并非真实的接口地址
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data);
        if (res.data.error == 0) {
          var responseData = res.data.results[0];
          var dressingIndex = responseData.index;
          var weatherData = responseData.weather_data;
          var todayWeather = weatherData.shift();
          var date = new Date();
          var time = (date.getHours() < 10 ? '0' : '') + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
          that.setData({
            "city": responseData.currentCity,
            "temperature": todayWeather.temperature,
            "imageSrc": todayWeather.dayPictureUrl,
            "time": time,
            "futureWeather": weatherData
          });
        }
        else {
          console.log('error');
          that.setData({
            "cityValue": "城市不存在!",
            "color": "red"
          })
        }
      }
    })
  },
  onLoad:function(options){

    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
    this.setData({
      focus: true
    });
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})