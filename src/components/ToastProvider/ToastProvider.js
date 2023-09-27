import React from 'react';
import useEscapeKey from '../../hooks/use-escape-hook';

export const ToastContext = React.createContext();

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([
    {
      id: crypto.randomUUID(),
      message: 'Oh hai!',
      variant: 'notice',
    },
    {
      id: crypto.randomUUID(),
      message: 'Oh Yeah',
      variant: 'warning',
    },
  ]);

  const [variant, setVariant] = React.useState(VARIANT_OPTIONS[0]);
  const [message, setMessage] = React.useState('');

  function handleCreateToasts(e) {
    e.preventDefault();
    const nextToasts = [
      ...toasts,
      {
        id: crypto.randomUUID(),
        message,
        variant,
      },
    ];
    setToasts(nextToasts);

    // reset the message form field
    setMessage('');
    // reset the variate option to the first one
    setVariant(VARIANT_OPTIONS[0]);
  }

  function handleDismiss(id) {
    const nextToasts = toasts.filter((toast) => toast.id !== id);
    setToasts(nextToasts);
  }
  const handleEscape = React.useCallback(() => {
    setToasts([]);
  }, []);
  useEscapeKey(handleEscape);

  return (
    <ToastContext.Provider
      value={{
        toasts,
        variant,
        setVariant,
        message,
        setMessage,
        handleCreateToasts,
        handleDismiss,
        VARIANT_OPTIONS,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
