import Link from 'next/link';

function MinCard({ pokeId, name }) {
  return (
    <Link href={`/p/${pokeId}`} passHref>
      <a className="capitalize space-x-2 text-base font-bold text-purple-500 bg-purple-100 shadow-sm rounded mb-2 p-4 sm:text-xl">
        {name}
      </a>
    </Link>
  );
}

export default MinCard;
