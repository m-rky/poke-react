import { motion } from 'framer-motion';
import React from 'react';
import tw, { styled } from 'twin.macro';

interface ButtonProps {
  name: string;
  variant?: string;
  value?: string;
  type: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button = ({ name, onClick, variant }: ButtonProps): JSX.Element => (
  <StyledButton
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.9 }}
    onClick={onClick}
    variant={variant}
  >
    {name}
  </StyledButton>
);

/*
 * Style section
 *  Includes interfaces for styled prop types
 */

interface ButtonStyleProps {
  variant?: string;
}

const StyledButton = styled(motion.button)<ButtonStyleProps>`
  ${tw`px-4 py-2 my-2 font-bold rounded shadow-md sm:py-4 sm:px-8 hover:shadow-xl`}
  ${({ variant }) =>
    variant === 'primary' && tw`text-white bg-purple-600 dark:bg-purple-900 dark:text-blue-50`}
  ${({ variant }) =>
    variant === 'secondary' && tw`bg-purple-100 dark:bg-purple-700 dark:text-blue-50`}
`;
