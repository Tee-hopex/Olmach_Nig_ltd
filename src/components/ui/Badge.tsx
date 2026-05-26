import { cn } from '../../lib/utils';

interface BadgeProps {
  label: string;
  variant?: 'gold' | 'navy' | 'green' | 'red' | 'gray';
  size?: 'sm' | 'md';
  className?: string;
}

const variants = {
  gold: 'bg-gold-500 text-navy-900',
  navy: 'bg-navy-900 text-white',
  green: 'bg-green-500 text-white',
  red: 'bg-red-500 text-white',
  gray: 'bg-gray-200 text-gray-700',
};

const sizes = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-2.5 py-1',
};

export default function Badge({
  label,
  variant = 'gold',
  size = 'sm',
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-block font-semibold rounded-full leading-none',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {label}
    </span>
  );
}
