// src/components/ui/Toaster.tsx
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface Toast {
  id: number;
  title: string;
  description?: string;
  type?: "success" | "warning" | "error";
}

interface ToasterProps {
  onDismiss: (id: number) => void;
  toast: Toast;
}

const ToastComponent: React.FC<ToasterProps> = ({ onDismiss, toast }) => {
  const [isVisible, setIsVisible] = useState(true);

  // 토스트 타입에 따라 색상 클래스 결정
  const typeClasses = {
    success: "bg-green-500 text-white",
    warning: "bg-orange-400 text-white",
    error: "bg-red-500 text-white",
    default: "bg-gray-800 text-white",
  };

  const colorClass = typeClasses[toast.type || "default"];

  // 3초 후 자동으로 사라지게 설정
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onDismiss(toast.id);
    }, 3000); // 3초
    return () => clearTimeout(timer);
  }, [onDismiss, toast.id]);

  if (!isVisible) return null;

  return (
    <div
      className={`
        max-w-xs w-full p-4 rounded-lg shadow-lg mb-4 text-sm font-Dotum
        transform transition-transform duration-300 ease-out translate-y-0 opacity-100
        ${colorClass}
      `}
    >
      <div className="font-bold">{toast.title}</div>
      {toast.description && (
        <div className="mt-1 opacity-90">{toast.description}</div>
      )}
    </div>
  );
};

// 토스트를 관리하는 컨테이너와 API
let toastCount = 0;
let container: HTMLDivElement | null = null;
const toasts: Toast[] = [];
let updateCallback: (() => void) | null = null;

const create = (options: Omit<Toast, "id">) => {
  const newToast: Toast = { ...options, id: toastCount++ };
  toasts.push(newToast);
  if (updateCallback) {
    updateCallback();
  }
};

const dismiss = (id: number) => {
  const index = toasts.findIndex((t) => t.id === id);
  if (index !== -1) {
    toasts.splice(index, 1);
    if (updateCallback) {
      updateCallback();
    }
  }
};

export const toaster = { create };

const ToasterContainer: React.FC = () => {
  const [currentToasts, setCurrentToasts] = useState<Toast[]>([]);

  useEffect(() => {
    updateCallback = () => {
      setCurrentToasts([...toasts]);
    };
    return () => {
      updateCallback = null;
    };
  }, []);

  useEffect(() => {
    if (!container) {
      container = document.createElement("div");
      container.className =
        "fixed bottom-4 right-4 z-[9999] flex flex-col items-end pointer-events-none";
      document.body.appendChild(container);
    }
    return () => {
      if (container) {
        document.body.removeChild(container);
        container = null;
      }
    };
  }, []);

  if (!container) return null;

  return createPortal(
    currentToasts.map((toast) => (
      <ToastComponent key={toast.id} toast={toast} onDismiss={dismiss} />
    )),
    container
  );
};

export default ToasterContainer;
