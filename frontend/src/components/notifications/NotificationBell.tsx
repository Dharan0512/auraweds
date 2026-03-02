"use client";

import { useState, useEffect, useRef } from "react";
import { Bell, X } from "lucide-react";
import {
  notificationService,
  Notification,
} from "@/services/notificationService";
import { formatTimeAgo } from "@/lib/dateUtils";
import Link from "next/link";

export default function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchNotifications = async () => {
    try {
      const data = await notificationService.getNotifications();
      setNotifications(data.notifications || []);
      const unread = (data.notifications || []).filter(
        (n: Notification) => !n.isRead,
      ).length;
      setUnreadCount(unread);
    } catch (error) {
      console.error("Error fetching notifications", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMarkAsRead = async (id: number) => {
    try {
      await notificationService.markAsRead(id);
      fetchNotifications();
    } catch (error) {
      console.error("Error marking notification as read", error);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Icon Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all duration-300 group"
      >
        <Bell
          className={`w-6 h-6 transition-colors ${unreadCount > 0 ? "text-[#D4AF37]" : "text-slate-400 group-hover:text-white"}`}
        />
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2 w-4 h-4 bg-red-500 rounded-full border-2 border-slate-950 flex items-center justify-center text-[8px] font-black text-white shadow-lg shadow-red-500/40">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Custom Dropdown Content */}
      {isOpen && (
        <div className="absolute right-0 mt-4 w-80 bg-slate-900/90 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden z-[100] animate-in fade-in zoom-in-95 slide-in-from-top-4 duration-300">
          <div className="p-6 flex items-center justify-between border-b border-white/5 bg-white/5">
            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-widest">
                Notifications
              </h3>
              <p className="text-[10px] text-slate-500 font-bold mt-0.5">
                {unreadCount} New Alerts
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 hover:bg-white/10 rounded-full text-slate-500 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          <div className="max-h-[350px] overflow-y-auto custom-scrollbar">
            {notifications.length === 0 ? (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-slate-950/60 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/5 text-slate-700">
                  <Bell size={24} className="opacity-20" />
                </div>
                <p className="text-slate-500 text-xs font-semibold">
                  No notifications yet.
                </p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => handleMarkAsRead(notification.id)}
                  className={`p-5 cursor-pointer border-b border-white/5 transition-all duration-300 hover:bg-white/5 flex flex-col gap-1.5 group ${
                    !notification.isRead ? "bg-[#D4AF37]/5" : ""
                  }`}
                >
                  <div className="text-xs font-bold text-slate-200 leading-relaxed group-hover:text-[#D4AF37] transition-colors">
                    {notification.message}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] text-slate-500 font-black uppercase tracking-tighter">
                      {formatTimeAgo(notification.createdAt)}
                    </span>
                    {!notification.isRead && (
                      <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-4 bg-slate-950/60 text-center border-t border-white/5">
            <button
              onClick={() => {
                setIsOpen(false);
                setIsHistoryModalOpen(true);
              }}
              className="w-full text-[10px] font-black text-[#D4AF37] uppercase tracking-widest hover:text-white transition-colors py-2"
            >
              View All History
            </button>
          </div>
        </div>
      )}

      {/* History Modal */}
      {isHistoryModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            <div className="p-8 flex items-center justify-between border-b border-white/5 bg-white/5">
              <div>
                <h2 className="text-xl font-black text-white uppercase tracking-tighter">
                  Notification History
                </h2>
                <p className="text-xs text-slate-500 font-bold mt-1">
                  Review all your past alerts and messages
                </p>
              </div>
              <button
                onClick={() => setIsHistoryModalOpen(false)}
                className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl text-slate-400 hover:text-white transition-all border border-white/5"
              >
                <X size={20} />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2 custom-scrollbar">
              {notifications.length === 0 ? (
                <div className="p-20 text-center">
                  <Bell
                    size={48}
                    className="mx-auto text-slate-800 mb-6 opacity-20"
                  />
                  <p className="text-slate-500 font-bold">
                    Your notification history is empty.
                  </p>
                </div>
              ) : (
                <div className="grid gap-3 p-4">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-6 rounded-3xl border transition-all duration-300 flex flex-col gap-2 ${
                        notification.isRead
                          ? "bg-white/[0.02] border-white/5 text-slate-400"
                          : "bg-[#D4AF37]/5 border-[#D4AF37]/20 text-slate-200 shadow-[0_8px_20px_rgba(212,175,55,0.05)]"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <p className="text-sm font-medium leading-relaxed">
                          {notification.message}
                        </p>
                        {!notification.isRead && (
                          <button
                            onClick={() => handleMarkAsRead(notification.id)}
                            className="text-[10px] font-black text-[#D4AF37] uppercase tracking-widest hover:underline shrink-0"
                          >
                            Mark Read
                          </button>
                        )}
                      </div>
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                        {formatTimeAgo(notification.createdAt)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-8 bg-slate-950/40 border-t border-white/5 flex items-center justify-center gap-4">
              <button
                onClick={async () => {
                  if (
                    confirm("Are you sure you want to clear all notifications?")
                  ) {
                    try {
                      await notificationService.clearAllNotifications();
                      fetchNotifications();
                      setIsHistoryModalOpen(false);
                    } catch (error) {
                      console.error("Error clearing notifications", error);
                    }
                  }
                }}
                className="px-8 py-4 rounded-2xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-black uppercase tracking-widest transition-all border border-red-500/20"
              >
                Clear All
              </button>
              <button
                onClick={() => setIsHistoryModalOpen(false)}
                className="px-10 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white text-xs font-black uppercase tracking-widest transition-all border border-white/10"
              >
                Close History
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global CSS for scrollbar if not present */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(212, 175, 87, 0.2);
        }
      `}</style>
    </div>
  );
}
