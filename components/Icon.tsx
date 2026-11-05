type IconProps = {
  name: string;
  className?: string;
};

/** Material Symbols glyph; decorative, so hidden from assistive tech. */
export function Icon({ name, className = "" }: IconProps) {
  return (
    <span
      aria-hidden="true"
      className={`material-symbols-outlined ${className}`}
    >
      {name}
    </span>
  );
}

