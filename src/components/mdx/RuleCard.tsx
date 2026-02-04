import { useState } from 'react';
import { X, Shield, AlertTriangle, Ban, ShieldAlert, Sparkles, Scale, SearchX, Zap, UserCheck, Server, Lock, Hand, Bot, AlertOctagon } from 'lucide-react';

interface RuleCardProps {
  title: string;
  iconName?: string;
  severity?: 'high' | 'medium' | 'low';
  number?: number;
  children: React.ReactNode;
}

export default function RuleCard({ title, iconName = 'shield', severity = 'medium', number, children }: RuleCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Map icon names to Lucide components
  const iconComponents: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
    'shield': Shield,
    'alert': AlertTriangle,
    'ban': Ban,
    'shield-alert': ShieldAlert,
    'sparkles': Sparkles,
    'scale': Scale,
    'search-x': SearchX,
    'zap': Zap,
    'user-check': UserCheck,
    'server': Server,
    'lock': Lock,
    'hand': Hand,
    'bot': Bot,
    'alert-octagon': AlertOctagon,
  };

  const IconComponent = iconComponents[iconName] || Shield;

  // Design System: Using semantic tokens mapped to Electric Violet accent system
  const severityBadge = {
    high: 'bg-error-subtle text-error border-error/30',
    medium: 'bg-primary-subtle text-primary border-primary/30',
    low: 'bg-primary-subtle text-primary border-primary/30',
  };

  return (
    <>
      {/* Card - Modern elevation-based design */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="card-interactive group text-left w-full relative"
        aria-label={`Read rule: ${title}`}
      >
        {/* Rule Number Badge */}
        {number && (
          <div className="rule-number-badge">
            {number}
          </div>
        )}

        {/* Icon in elevated container */}
        <div className="mb-5">
          <div className="rule-icon-container">
            <IconComponent size={28} />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-[var(--space-4)] pr-[var(--space-10)] group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* Severity Badge */}
        <span className={`inline-block text-xs font-bold px-[var(--space-3)] py-[6px] rounded-[var(--radius-full)] ${severityBadge[severity]}`}>
          {severity.toUpperCase()}
        </span>
      </button>

      {/* Modal - z-40: Overlays/Modals layer */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center p-4"
          role="presentation"
        >
          {/* Backdrop - Simpler without glassmorphism */}
          <div
            className="absolute inset-0 bg-surface-900/80 cursor-default"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Modal Content - Modern elevated surface */}
          <div
            className="relative bg-surface-800 rounded-[var(--radius-xl)] max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-surface-750 border-b border-surface-700 px-[var(--space-6)] py-[var(--space-5)] flex items-start justify-between">
              <div className="flex items-start gap-[var(--space-4)] flex-1">
                <div className="text-text-muted">
                  <IconComponent size={28} />
                </div>
                <div>
                  <h2 id="modal-title" className="text-xl font-bold text-white mb-[var(--space-1)]">
                    {number && <span className="text-primary">Rule {number}:</span>} {title}
                  </h2>
                  <span className={`inline-block text-xs font-semibold px-[var(--space-3)] py-[6px] rounded-[var(--radius-full)] border ${severityBadge[severity]}`}>
                    {severity.toUpperCase()}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="btn btn-ghost btn-icon"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="px-[var(--space-6)] py-[var(--space-6)]">
              <div className="prose prose-invert prose-slate max-w-none">
                <div className="text-text-main leading-relaxed">
                  {children}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-surface-750 border-t border-surface-700 px-[var(--space-6)] py-[var(--space-5)]">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="btn btn-primary w-full"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
