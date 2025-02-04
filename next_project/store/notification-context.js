const { createContext, useState } = require("react");

const NotificationContext = createContext({
  notification: null,
  showNotification: function (notificationData) {},
  hideNotification: () => {},
});

export function NotificationContextProvider(props) {
  const [activeNotification, setActiveNotification] = useState();
  function showNotificationHandler(notificationData) {
    setActiveNotification({
      title: notificationData.title,
      message: notificationData.message,
      status: notificationData.status,
    });
  }

  function hideNotificationHandler() {
    setActiveNotification(null);
  }

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };
  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
}
export default NotificationContext;
