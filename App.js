import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: true,
      shouldSetBadge: true,
      shouldShowAlert: true,
    };
  },
});

export default function App() {
  useEffect(() => {
    const subscription1 = Notifications.addNotificationReceivedListener(
      (notification) => {
        // console.log("Receieved Notification: ", notification);
        const userName = notification.request.content.data.userName;
        // console.log(userName);
      }
    );

    const subscription2 = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log("Recieved response: ", response);
      }
    );
    return () => {
      subscription1.remove();
      subscription2.remove();
    };
  }, []);
  return (
    <View style={styles.container}>
      <Text>Push Notifications Demo</Text>
      <Button
        title="Scheduele Notiification"
        onPress={schedueleNotificationHandler}
      />
      <StatusBar style="auto" />
    </View>
  );

  function schedueleNotificationHandler() {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "My first notification",
        body: "This is the body of the notification!",
        data: { userName: "Salwa" },
        sound: true,
        vibrate: true,
        color: "#ff0000",
      },
      trigger: {
        seconds: 5,
      },
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
