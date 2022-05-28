import { motion } from 'framer-motion';
import Link from 'next/link';

export function Header({ name }) {
  return (
    <nav className="container p-4 sm:mx-auto flex flex-col sm:justify-between sm:flex-row">
      <Link passHref href="/">
        <motion.a
          className="my-4 text-2xl text-center font-semibold font-title sm:text-4xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          {name}
        </motion.a>
      </Link>
      <div className="flex justify-center px-0.5">
        <Link passHref href="/all">
          <a className="self-center text-purple-500 mx-6 text-lg font-bold transition ease-in-out hover:text-purple-300 transform hover:-translate-y-px hover:scale-95">
            All
          </a>
        </Link>
      </div>
    </nav>
  );
}
