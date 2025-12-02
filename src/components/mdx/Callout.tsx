import type { ReactNode } from 'react';
import { AlertCircle, CheckCircle, Info, XCircle, Lightbulb } from 'lucide-react';
import { clsx } from 'clsx';

type CalloutType = 'info' | 'warning' | 'error' | 'success' | 'tip';

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}

const CalloutIcon = ({ type, className }: { type: CalloutType; className?: string }) => {
  const props = { className, size: 20, strokeWidth: 2.5 };

  switch (type) {
    case 'warning':
      return <AlertCircle {...props} />;
    case 'error':
      return <XCircle {...props} />;
    case 'success':
      return <CheckCircle {...props} />;
    case 'tip':
      return <Lightbulb {...props} />;
    case 'info':
    default:
      return <Info {...props} />;
  }
};

const styles = {
  info: {
    container: 'bg-info-subtle border-info/30',
    title: 'text-info',
    text: 'text-text-primary',
    icon: 'text-info'
  },
  warning: {
    container: 'bg-warning-subtle border-warning/30',
    title: 'text-warning',
    text: 'text-text-primary',
    icon: 'text-warning'
  },
  error: {
    container: 'bg-error-subtle border-error/30',
    title: 'text-error',
    text: 'text-text-primary',
    icon: 'text-error'
  },
  success: {
    container: 'bg-success-subtle border-success/30',
    title: 'text-success',
    text: 'text-text-primary',
    icon: 'text-success'
  },
  tip: {
    container: 'bg-secondary-subtle border-secondary/30',
    title: 'text-secondary',
    text: 'text-text-primary',
    icon: 'text-secondary'
  }
};

export const Callout = ({ type = 'info', title, children }: CalloutProps) => {
  const style = styles[type];

  return (
    <div className={clsx(
      "rounded-xl border p-6 my-6 flex gap-4",
      style.container
    )}>
      <div className="shrink-0 mt-0.5">
        <div className={clsx("w-10 h-10 rounded-lg flex items-center justify-center bg-surface-900/50", style.icon)}>
          <CalloutIcon type={type} className="w-5 h-5" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        {title && (
          <h4 className={clsx("font-bold mb-2 text-lg", style.title)}>
            {title}
          </h4>
        )}
        <div className={clsx("text-base leading-relaxed prose prose-invert max-w-none", style.text)}>
          {children}
        </div>
      </div>
    </div>
  );
};
