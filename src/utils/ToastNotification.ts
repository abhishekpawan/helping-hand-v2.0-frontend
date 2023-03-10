import { notification } from "antd";

type NotificationType = "success" | "info" | "warning" | "error";

export const showNotification = (
  type: NotificationType,
  notificationMessage: string
) => {
  notification[type]({
    message: notificationMessage,
    placement: "topLeft",
    duration: 3,
  });
};
