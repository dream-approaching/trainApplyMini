import Taro, { useState } from "@tarojs/taro";
import { AtTabBar } from "taro-ui";
import { View } from "@tarojs/components";
import styles from "./index.module.less";

export default function Index() {
  const [current, setCurrent] = useState(0);

  console.log("%c zjs styles:", "color: #0e93e0;background: #aaefe5;", styles);
  return (
    <View className="index">
      <AtTabBar
        tabList={[{ title: "发件箱" }, { title: "收件箱" }]}
        onClick={value => setCurrent(value)}
        current={current}
      />
    </View>
  );
}

Index.config = {
  navigationBarTitleText: "首页"
};
