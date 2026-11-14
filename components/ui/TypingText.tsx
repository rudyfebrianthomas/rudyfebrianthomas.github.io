"use client";

import { useEffect, useState } from "react";

type TypingTextProps = {
  words: readonly string[];
};

/** Typewriter loop; renders the first word statically when reduced motion is preferred. */
export function TypingText({ words }: TypingTextProps) {
  const [text, setText] = useState(words[0]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const word = words[wordIndex];
      charIndex += deleting ? -1 : 1;
      setText(word.slice(0, charIndex));

      let delay = deleting ? 45 : 80 + Math.floor(Math.random() * 40);
      if (!deleting && charIndex === word.length) {
        deleting = true;
        delay = 1800;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        delay = 400;
      }
      timer = setTimeout(tick, delay);
    };

    timer = setTimeout(tick, 500);
    return () => clearTimeout(timer);
  }, [words]);

  return (
    <span className="bg-linear-to-r from-teal-600 via-teal-500 to-cyan-600 bg-clip-text font-semibold text-transparent dark:from-teal-400 dark:via-teal-300 dark:to-cyan-400">
      {/* Zero-width space keeps the line height while the text is empty. */}
      {text || "\u200b"}
    </span>
  );
}

