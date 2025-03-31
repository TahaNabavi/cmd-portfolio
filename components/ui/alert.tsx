"use client"
import { useEffect, useState } from "react";

// lib/alert.ts
type AlertType = 'show' | 'warn' | 'success' | 'error';

interface AlertConfig {
  duration?: number;
  title?: string;
  closable?: boolean;
  className?: string;
}

interface AlertOptions extends AlertConfig {
  message: string;
  type: AlertType;
}

interface AlertInstance {
  id: string;
  component: React.ReactNode;
}

let alertInstances: AlertInstance[] = [];
let updateCallback: (alerts: React.ReactNode[]) => void = () => {};

const getVariant = (type: AlertType) => {
  switch (type) {
    case 'warn': return 'bg-yellow-500/10 border-yellow-500/30';
    case 'success': return 'bg-green-500/10 border-green-500/30';
    case 'error': return 'bg-red-500/10 border-red-500/30';
    default: return 'bg-slate-500/10 border-slate-500/30';
  }
};

const createAlert = (options: AlertOptions) => {
  const id = Math.random().toString(36).substring(2, 9);
  const { message, type, duration = 5000, title, closable = true, className } = options;

  const AlertComponent = (
    <div
      key={id}
      className={`rounded-xl p-4 border-2 transition-all w-full max-w-md mb-2 ${getVariant(type)} ${className}`}
    >
      <div className="flex justify-between items-start">
        <div>
          {title && <h3 className="font-medium text-gray-700 dark:text-gray-200">{title}</h3>}
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{message}</p>
        </div>
        {closable && (
          <button
            onClick={() => removeAlert(id)}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 ml-2"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );

  alertInstances.push({ id, component: AlertComponent });
  updateCallback(alertInstances.map(a => a.component));

  if (duration) {
    setTimeout(() => removeAlert(id), duration);
  }
};

const removeAlert = (id: string) => {
  alertInstances = alertInstances.filter(alert => alert.id !== id);
  updateCallback(alertInstances.map(a => a.component));
};

export const alert = {
  show: (message: string, config?: AlertConfig) => 
    createAlert({ message, type: 'show', ...config }),
  warn: (message: string, config?: AlertConfig) => 
    createAlert({ message, type: 'warn', ...config }),
  success: (message: string, config?: AlertConfig) => 
    createAlert({ message, type: 'success', ...config }),
  error: (message: string, config?: AlertConfig) => 
    createAlert({ message, type: 'error', ...config }),
  clear: () => {
    alertInstances = [];
    updateCallback([]);
  }
};

export const AlertContainer = () => {
  const [alerts, setAlerts] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    updateCallback = setAlerts;
    return () => { updateCallback = () => {} };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {alerts}
    </div>
  );
};