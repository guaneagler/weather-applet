// pages/weather/weather.js
/**
 * Storage user search city record with weight.
 */
function storageUserSearchCity(city) {
  var cities = wx.getStorageSync('cities');
  if (cities.hasOwnProperty(city)) {
    cities[city]++;
  }
  else if (cities == ''){
    cities = {};
    cities[city] = 1;
  }
  else {
    cities[city] = 1;
  }
  wx.setStorageSync('cities', cities);
}

Page({
  data:{
    city: '',
    cityValue: '',
    temperature: '',
    imageSrc: '',
    time: '',
    color: 'black',
    time: '',
    futureWeather: '',
    isOpen: false,
    hotCities: [],
  },
  // Search weather by city name.
  searchWeatherByCity: function(params) {
    var city = '';
    if (params.type == 'tap') {
      city = params.currentTarget.dataset.hotCity;
    }
    else {
      var city = params.detail.value;
    }
    var requestUrl = 'https://api.map.baidu.com/telematics/v3/weather?output=json&ak=5827531cbeea4bd3954710471a61eb32&location=' + city;
    var that = this;
    wx.request({
      url: requestUrl,
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        if (res.data.error == 0) {
          var responseData = res.data.results[0];
          var dressingIndex = responseData.index;
          var weatherData = responseData.weather_data;
          var todayWeather = weatherData.shift();
          var date = new Date();
          var time = (date.getHours() < 10 ? '0' : '') + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
          that.setData({
            city: responseData.currentCity,
            temperature: todayWeather.temperature,
            imageSrc: todayWeather.dayPictureUrl,
            time: time,
            futureWeather: weatherData,
            hotCities: []
          });
          // Storage user search city records.
          storageUserSearchCity(city);
        }
        else {
          console.log('error');
          that.setData({
            cityValue: '城市不存在!',
            color: 'red'
          })
        }
      }
    })
  },
  toggleFuture: function(event) {
    var isOpen = !this.data.isOpen;
    this.setData({
      isOpen: isOpen
    })
  },
  listHotSearchCities: function(event) {
    this.setData({
      'hotCities': wx.getStorageSync('cities')
    });
  },
  onLoad:function(options){

    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})