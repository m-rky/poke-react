import Link from 'next/link';

function MinCard({ id, name }) {
  return (
    <Link href={`/p/${id}`} passHref>
      <a>{name}</a>
    </Link>
  );
}

export default MinCard;
