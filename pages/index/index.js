//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    select: 0, //当前的
    time: 1,
    input: 1,
  },
  onLoad: function() {},
  start: function() {
    var that = this;
    var ii = 50; //先一开始快速转个50次
    var inter = setInterval(function() {
      ii--;
      if (ii < 0) {
        clearInterval(inter);
        //50下转完后进入既定的中奖流程
        that.finish(1, 1, that.data.input);
      }
      that.setData({
        select: (that.data.select) % 8 + 1,
      })
    }, 30)




  },
  finish: function(time, now, finish) {
    var that = this;
    setTimeout(function() {
      that.setData({
        select: (that.data.select) % 8 + 1,
      })
      //now的作用是必须要转的大于一圈才能停下，不然会有忽然停下的情况
      if (now > 8 && that.data.select == finish) {
        wx.showToast({
          title: '恭喜你获得奖品' + finish,
          icon: "none",
        })
      } else {
        that.finish(time + 1, now + 1, finish);
      }


    }, 30 + time * 50) //设置time越来越大，转盘的速度越来越慢
  },
  input: function(e) {
    var that = this;
    var value = e.detail.value;
    if (value > 0 && value < 9) {
      that.setData({
        input: value,
      })
    } else {
      wx.showToast({
        title: '需要1-8',
      })
      that.setData({
        input: 1,
      })
    }

  }
})