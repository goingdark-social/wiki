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
    high: 'bg-red-500/10 text-red-400 border-red-500/20',
    medium: 'bg-primary/10 text-primary border-primary/20',
    low: 'bg-primary/10 text-primary border-primary/20',
  };

  return (
    <>
      {/* Card - Modern elevation-based design */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="card-interactive group text-left w-full"
        aria-label={`Read rule: ${title}`}
      >
        {/* Rule Number Badge */}
        {number && (
          <div className="absolute top-5 right-5 w-10 h-10 rounded-xl bg-primary/20 text-primary font-bold text-base flex items-center justify-center">
            {number}
          </div>
        )}

        {/* Icon in elevated container */}
        <div className="mb-5">
          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 group-hover:scale-110 transition-all">
            <IconComponent size={28} />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-4 pr-10 group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* Severity Badge */}
        <span className={`inline-block text-xs font-bold px-3 py-1.5 rounded-full ${severityBadge[severity]}`}>
          {severity.toUpperCase()}
        </span>
      </button>

      {/* Modal - Simplified, using Design System */}
      {isOpen && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center p-4"
          role="presentation"
        >
          {/* Backdrop - Simpler without glassmorphism */}
          <div
            className="absolute inset-0 bg-black/80 cursor-default"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Modal Content - Modern elevated surface */}
          <div
            className="relative bg-surface-800 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-surface-750 border-b border-surface-700 px-6 py-5 flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="text-text-muted">
                  <IconComponent size={28} />
                </div>
                <div>
                  <h2 id="modal-title" className="text-xl font-bold text-white mb-1">
                    {number && <span className="text-primary">Rule {number}:</span>} {title}
                  </h2>
                  <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full border ${severityBadge[severity]}`}>
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
            <div className="px-6 py-6">
              <div className="prose prose-invert prose-slate max-w-none">
                <div className="text-text-main leading-relaxed">
                  {children}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-surface-750 border-t border-surface-700 px-6 py-5">
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
