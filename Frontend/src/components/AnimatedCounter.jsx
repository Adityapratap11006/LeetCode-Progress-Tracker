import { motion } from 'framer-motion'

export default function AnimatedCounter({ value, suffix = '', prefix = '', decimals = 0 }) {
  const display = typeof value === 'number' ? value.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) : (value ?? 0)

  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {prefix}{display}{suffix}
    </motion.span>
  )
}
