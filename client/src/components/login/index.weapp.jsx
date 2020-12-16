import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button } from '@tarojs/components';

export default class Login extends Component {
  state = {
    context: {}
  };

  componentWillMount() {}

  componentDidMount() {
    // this.getLogin()
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  getLogin = () => {
    Taro.cloud
      .callFunction({
        name: 'login',
        data: {}
      })
      .then(res => {
        console.log('res.result', res.result)
        this.setState({
          context: res.result
        });
      });
  };

  render() {
    return (
      <View className='index'>
        <Button onClick={this.getLogin}>获取登录云函数</Button>
        <Text>context：{JSON.stringify(this.state.context)}</Text>
      </View>
    );
  }
}
