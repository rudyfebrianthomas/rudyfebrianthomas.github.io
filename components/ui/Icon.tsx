type IconProps = {
  name: string;
  className?: string;
};

/** Material Symbols glyph; decorative, so hidden from assistive tech. */
export function Icon({ name, className = "" }: IconProps) {
  return (
    <span
      aria-hidden="true"
      className={`material-symbols-outlined inline-flex w-[1em] shrink-0 overflow-hidden ${className}`}
    >
      {name}
    </span>
  );
}

