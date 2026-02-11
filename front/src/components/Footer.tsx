import { Link } from 'react-router';

export default function Footer() {
  return (
    <footer className="text-center py-3 bg-primary/20">
      <span className="text-md">
        Made with ♥️ by{' '}
        <Link to={'https://github.com/Hekimianz'} target="_blank">
          Aram Hekimian
        </Link>
      </span>
    </footer>
  );
}
