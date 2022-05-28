import { motion } from 'framer-motion';

const BUTTON_CONFIG = {
  primary: 'text-white bg-purple-600 dark:bg-purple-900 dark:text-blue-50',
  secondary: 'bg-purple-100 dark:bg-purple-700 dark:text-blue-50',
};

export function Button({ name, onClick, variant }) {
  return (
    <motion.button
      type="button"
      className={`px-4 py-2 my-2 font-bold rounded shadow-md sm:py-4 sm:px-8 hover:shadow-xl ${BUTTON_CONFIG[variant]}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
    >
      {name}
    </motion.button>
  );
}
