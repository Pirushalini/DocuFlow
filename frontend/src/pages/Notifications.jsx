import { useState } from "react";
import {
  Bell,
  Check,
  CheckCheck,
  Trash2,
  FileText,
  ShieldCheck,
  AlertCircle,
  Info,
} from "lucide-react";

function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "approval",
      title: "Document Approved",
      message: "Your document \"Project Report.pdf\" has been approved.",
      time: "10 minutes ago",
      read: false,
    },
    {
      id: 2,
      type: "review",
      title: "Document Under Review",
      message: "Your document \"Research Paper.pdf\" is currently under review.",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      type: "rejection",
      title: "Document Rejected",
      message:
        "Your document \"HR Policy.pdf\" was rejected. Please review the rejection reason.",
      time: "3 hours ago",
      read: true,
    },
    {
      id: 4,
      type: "system",
      title: "Profile Updated",
      message: "Your profile information was successfully updated.",
      time: "Yesterday",
      read: true,
    },
    {
      id: 5,
      type: "info",
      title: "Welcome to DocuFlow",
      message:
        "Your DocuFlow account is ready. You can now upload and manage your documents.",
      time: "2 days ago",
      read: true,
    },
  ]);

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case "approval":
        return (
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F7EF] text-[#15803D]">
            <ShieldCheck size={21} strokeWidth={1.8} />
          </div>
        );

      case "review":
        return (
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF6FB] text-[#1677B8]">
            <FileText size={21} strokeWidth={1.8} />
          </div>
        );

      case "rejection":
        return (
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FEF2F2] text-[#DC2626]">
            <AlertCircle size={21} strokeWidth={1.8} />
          </div>
        );

      case "system":
        return (
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F3E8FF] text-[#7E22CE]">
            <Check size={21} strokeWidth={1.8} />
          </div>
        );

      default:
        return (
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF7ED] text-[#EA580C]">
            <Info size={21} strokeWidth={1.8} />
          </div>
        );
    }
  };

  const handleMarkAsRead = (id) => {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  const handleDelete = (id) => {
    setNotifications((currentNotifications) =>
      currentNotifications.filter((notification) => notification.id !== id)
    );
  };

  const handleClearAll = () => {
    const confirmed = window.confirm(
      "Are you sure you want to clear all notifications?"
    );

    if (!confirmed) {
      return;
    }

    setNotifications([]);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#123B5D]">
            Notifications
          </h1>

          <p className="mt-1 text-sm text-[#6B7280]">
            Stay updated with your documents and account activity.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={handleMarkAllAsRead}
              className="inline-flex items-center gap-2 rounded-lg
              border border-[#D9E2E8] bg-white px-4 py-2.5
              text-sm font-semibold text-[#263238]
              transition hover:bg-[#F4F7F9]"
            >
              <CheckCheck size={17} />
              Mark all as read
            </button>
          )}

          {notifications.length > 0 && (
            <button
              type="button"
              onClick={handleClearAll}
              className="inline-flex items-center gap-2 rounded-lg
              border border-[#FECACA] bg-white px-4 py-2.5
              text-sm font-semibold text-[#B91C1C]
              transition hover:bg-[#FEF2F2]"
            >
              <Trash2 size={17} />
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* Notification Summary */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-[#D9E2E8] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF6FB] text-[#1677B8]">
              <Bell size={21} strokeWidth={1.8} />
            </div>

            <div>
              <p className="text-sm text-[#6B7280]">Total Notifications</p>
              <p className="mt-1 text-2xl font-bold text-[#123B5D]">
                {notifications.length}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[#D9E2E8] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F7EF] text-[#15803D]">
              <CheckCheck size={21} strokeWidth={1.8} />
            </div>

            <div>
              <p className="text-sm text-[#6B7280]">Unread Notifications</p>
              <p className="mt-1 text-2xl font-bold text-[#123B5D]">
                {unreadCount}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="overflow-hidden rounded-2xl border border-[#D9E2E8] bg-white shadow-sm">
        <div className="border-b border-[#D9E2E8] p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-[#123B5D]">
                Recent Notifications
              </h2>

              <p className="mt-1 text-sm text-[#6B7280]">
                Your latest account and document updates.
              </p>
            </div>

            <div className="hidden rounded-full bg-[#EAF6FB] px-3 py-1 text-xs font-semibold text-[#1677B8] sm:block">
              {unreadCount} unread
            </div>
          </div>
        </div>

        {notifications.length > 0 ? (
          <div className="divide-y divide-[#D9E2E8]">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex flex-col gap-4 p-5 transition sm:flex-row sm:items-start ${
                  notification.read
                    ? "bg-white"
                    : "bg-[#F7FCFE]"
                } hover:bg-[#F4F7F9]`}
              >
                {getNotificationIcon(notification.type)}

                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-center gap-2">
                      <h3
                        className={`text-sm ${
                          notification.read
                            ? "font-medium"
                            : "font-semibold"
                        } text-[#123B5D]`}
                      >
                        {notification.title}
                      </h3>

                      {!notification.read && (
                        <span className="h-2 w-2 rounded-full bg-[#1677B8]" />
                      )}
                    </div>

                    <span className="text-xs text-[#9CA3AF]">
                      {notification.time}
                    </span>
                  </div>

                  <p className="mt-1.5 max-w-3xl text-sm leading-6 text-[#6B7280]">
                    {notification.message}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {!notification.read && (
                      <button
                        type="button"
                        onClick={() =>
                          handleMarkAsRead(notification.id)
                        }
                        className="inline-flex items-center gap-1.5
                        rounded-lg bg-[#EAF6FB] px-3 py-1.5
                        text-xs font-semibold text-[#1677B8]
                        transition hover:bg-[#D8F0FA]"
                      >
                        <Check size={14} />
                        Mark as read
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(notification.id)
                      }
                      className="inline-flex items-center gap-1.5
                      rounded-lg px-3 py-1.5
                      text-xs font-semibold text-[#B91C1C]
                      transition hover:bg-[#FEF2F2]"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EAF6FB] text-[#1677B8]">
              <Bell size={28} strokeWidth={1.7} />
            </div>

            <h3 className="mt-5 text-base font-semibold text-[#123B5D]">
              No notifications
            </h3>

            <p className="mt-2 max-w-md text-sm text-[#6B7280]">
              You are all caught up. New document and account
              notifications will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Notifications;