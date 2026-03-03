import { motion } from "framer-motion";

interface AnimatedTitleProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
  delay?: number;
  stagger?: number;
}

/**
 * Line-reveal text animation inspired by liquidtechnology.net.
 * Each line slides up from below with overflow hidden, staggered.
 * Split by newline (\n) — use \n in the string to define line breaks.
 * If no \n, the entire text is treated as a single line.
 */
export function AnimatedTitle({
  children,
  className = "",
  as: Tag = "h2",
  delay = 0,
  stagger = 0.12,
}: AnimatedTitleProps) {
  const lines = children.split("\n").filter(Boolean);

  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className="block"
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.7,
              delay: delay + i * stagger,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
