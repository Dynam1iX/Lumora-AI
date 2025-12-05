// components/icons/BotIcon.tsx

interface IconProps {
  className?: string;
}

export const BotIcon = ({ className = 'w-6 h-6' }: IconProps) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9V2h12v7" />
      <path d="M6 18H4c-.55 0-1.02-.196-1.41-.59A1.92 1.92 0 0 1 2 16v-5c0-.55.196-1.02.59-1.41A1.92 1.92 0 0 1 4 9h16c.55 0 1.02.196 1.41.59.39.39.59.86.59 1.41v5c0 .55-.196 1.02-.59 1.41A1.92 1.92 0 0 1 20 18h-2" />
      <path d="M18 14h-12v8h12v-8Z" />
    </svg>
  );
};
