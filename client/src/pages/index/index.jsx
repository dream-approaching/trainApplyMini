import Taro, {
  useState,
  useShareAppMessage,
  useShareTimeline
} from "@tarojs/taro";
import { AtTabs, AtTabsPane, AtButton } from "taro-ui";
import { View } from "@tarojs/components";
import styles from "./index.module.less";

export default function Index() {
  const [current, setCurrent] = useState(0);

  useShareAppMessage(res => {
    if (res.from === "button") {
      // 来自页面内转发按钮
      console.log(res.target);
    }
    return {
      title: "小活动来报名",
      path: "pages/index/index"
    };
  });

  useShareTimeline(res => {
    if (res.from === "button") {
      // 来自页面内转发按钮
      console.log(res.target);
    }
    return {
      title: "小活动来报名"
    };
  });
  const tabList = [{ title: "发件箱" }, { title: "收件箱" }];

  const handleToggleTab = value => setCurrent(value);

  const toNewActivity = () => {
    Taro.navigateTo({ url: "/pages/publish/index" });
  };

  return (
    <View className={styles.index}>
      <AtTabs current={current} tabList={tabList} onClick={handleToggleTab}>
        <AtTabsPane current={current} index={0}>
          <View className={styles.tabPageCon}>标签页一的内容</View>
        </AtTabsPane>
        <AtTabsPane current={current} index={1}>
          <View className={styles.tabPageCon}>标签页二的内容</View>
        </AtTabsPane>
      </AtTabs>
      <AtButton onClick={toNewActivity} className={styles.footerBtn}>
        新建活动
      </AtButton>
    </View>
  );
}

Index.config = {
  navigationBarTitleText: "首页"
};
