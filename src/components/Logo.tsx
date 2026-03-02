type LogoVariant = 'mark' | 'mark-white' | 'full' | 'full-white';

export function Logo({ className = 'w-16 h-16', variant = 'mark' }: { className?: string; variant?: LogoVariant }) {
  const isMark = variant === 'mark' || variant === 'mark-white';

  if (isMark) {
    return (
      <span className={`inline-flex items-center justify-center overflow-hidden rounded-xl bg-white ${className}`}>
        <img src="/logo.png" alt="云途护航 Logo" className="w-[180%] h-[180%] max-w-none object-cover object-top" />
      </span>
    );
  }

  return <img src="/logo.png" alt="云途护航 Logo" className={`object-contain ${className}`} />;
}
