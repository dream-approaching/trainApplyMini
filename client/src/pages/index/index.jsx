import Taro, { Component } from "@tarojs/taro";
  import { AtTabBar } from 'taro-ui'
import { View, Text } from "@tarojs/components";
import "./index.less";

import Login from "../../components/login/index.weapp";

export default class Index extends Component {
  config = {
    navigationBarTitleText: "首页"
  };

  componentWillMount() {}

  componentDidMount() {
    
    console.log('window', this.$router)
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="index">
        <Login />
      </View>
    );
  }
}
