import Taro, { Component, Config } from "@tarojs/taro";
import "taro-ui/dist/style/index.scss";
import dayjs from "dayjs";
import Index from "./pages/index";
import MyToast from "./components/Toast";

import "./app.less";

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: ["pages/index/index"],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#fff",
      navigationBarTitleText: "WeChat",
      navigationBarTextStyle: "black"
    },
    cloud: true
  };

  async componentDidMount() {
    if (process.env.TARO_ENV === "weapp") {
      await Taro.cloud.init();

      // 如果已经授权，则更新一下lastLogin
      const authSettings = await Taro.getSetting();
      if (authSettings.authSetting["scope.userInfo"]) {
        const openId = await this.getOpenid();
        const userInfo = await Taro.getUserInfo();
        await wx.cloud.callFunction({
          name: "setUsers",
          data: {
            userInfo: { ...userInfo, openId },
            updateObj: { lastLogin: dayjs().format("YYYY-MM-DD HH:mm:ss") }
          }
        });

        // 检查更新
        const updateManager = Taro.getUpdateManager();
        updateManager.onCheckForUpdate(function(res) {
          // 请求完新版本信息的回调
          console.log("%cres311:", "color: #0e93e0;background: #aaefe5;", res);
          // 我自己的openID
          if (openId === "os-Aw5Z6jNjBxcIf_4Uzkt6QW2PA") {
            MyToast(JSON.stringify(res), 3000);
          }
        });
        updateManager.onUpdateReady(function() {
          Taro.showModal({
            title: "更新提示",
            content: "新版本已经准备好，是否重启应用？",
            success: function(res) {
              if (res.confirm) {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                updateManager.applyUpdate();
              }
            }
          });
        });
        updateManager.onUpdateFailed(function(res) {
          console.log("%cres326:", "color: #0e93e0;background: #aaefe5;", res);
          // 新的版本下载失败
        });
      }
    }
  }

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  getCloudOpenid = async () => {
    return (this.openid =
      this.openid ||
      (await wx.cloud.callFunction({ name: "login" })).result.OPENID);
  };

  //最佳方案。
  getOpenid = async () => {
    (this.openid = this.openid || wx.getStorageSync("openid")) ||
      wx.setStorageSync("openid", await this.getCloudOpenid());
    return this.openid;
  };

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return <Index />;
  }
}

Taro.render(<App />, document.getElementById("app"));
