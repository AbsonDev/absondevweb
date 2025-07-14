'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { useToast, type Toast, type ToastType } from '@/contexts/ToastContext';

const ToastIcon = ({ type }: { type: ToastType }) => {
  const iconProps = { className: "w-5 h-5 flex-shrink-0" };
  
  switch (type) {
    case 'success':
      return <CheckCircle {...iconProps} style={{ color: 'var(--color-green-500)' }} />;
    case 'error':
      return <XCircle {...iconProps} style={{ color: 'var(--color-red-500)' }} />;
    case 'warning':
      return <AlertTriangle {...iconProps} style={{ color: 'var(--color-yellow-500)' }} />;
    case 'info':
      return <Info {...iconProps} style={{ color: 'var(--color-blue-500)' }} />;
    default:
      return <Info {...iconProps} />;
  }
};

const ToastItem = ({ toast }: { toast: Toast }) => {
  const { removeToast } = useToast();

  const getToastStyles = (type: ToastType) => {
    const baseStyles = {
      backgroundColor: 'var(--bg-card)',
      borderColor: 'var(--border-color)',
      color: 'var(--text-primary)'
    };

    const accentColors = {
      success: 'var(--color-green-500)',
      error: 'var(--color-red-500)',
      warning: 'var(--color-yellow-500)',
      info: 'var(--color-blue-500)'
    };

    return {
      ...baseStyles,
      borderLeftColor: accentColors[type]
    };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      whileHover={{ scale: 1.02 }}
      className="flex items-start gap-3 p-4 rounded-xl backdrop-blur-md border-l-4 border shadow-lg max-w-md w-full"
      style={getToastStyles(toast.type)}
    >
      <ToastIcon type={toast.type} />
      
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium leading-relaxed">
          {toast.message}
        </p>
        
        {toast.action && (
          <motion.button
            onClick={toast.action.onClick}
            className="mt-2 text-xs font-semibold px-3 py-1 rounded-lg transition-all duration-200"
            style={{
              color: 'var(--color-primary-500)',
              backgroundColor: 'var(--bg-glass)',
              border: `1px solid var(--color-primary-500)`
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {toast.action.label}
          </motion.button>
        )}
      </div>
      
      <motion.button
        onClick={() => removeToast(toast.id)}
        className="flex-shrink-0 p-1 rounded-lg transition-all duration-200"
        style={{
          color: 'var(--text-muted)',
          backgroundColor: 'transparent'
        }}
        whileHover={{ 
          scale: 1.1,
          backgroundColor: 'var(--bg-glass)'
        }}
        whileTap={{ scale: 0.9 }}
      >
        <X className="w-4 h-4" />
      </motion.button>
    </motion.div>
  );
};

const ToastContainer = () => {
  const { toasts } = useToast();

  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastItem toast={toast} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;