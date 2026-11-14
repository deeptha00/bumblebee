export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

export const cardHover = { scale: 1.03, y: -6, transition: { duration: 0.25 } };
