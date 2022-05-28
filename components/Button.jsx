import { motion } from 'framer-motion';

export function Button({ name, onClick, variant }) {
  return (
    <motion.button
      type="button"
      className="px-4 py-2 my-2 font-bold rounded shadow-md sm:py-4 sm:px-8 hover:shadow-xl"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
    >
      {name}
    </motion.button>
  );
}

/*
 * Style section
 *  Includes interfaces for styled prop types
 */

// const StyledButton = styled(motion.button)<ButtonStyleProps>`
//   ${tw``}
//   ${({ variant }) =>
//     variant === 'primary' &&
//     tw`text-white bg-purple-600 dark:bg-purple-900 dark:text-blue-50`}
//   ${({ variant }) =>
//     variant === 'secondary' &&
//     tw`bg-purple-100 dark:bg-purple-700 dark:text-blue-50`}
// `;
