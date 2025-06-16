import { Link } from 'react-router-dom';

export const Page404 = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-400 to-amber-500 px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-md w-full text-center">
        <h1 className="text-6xl font-extrabold text-indigo-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Страница не найдена</h2>
        <p className="text-gray-600 mb-6">
          Кажется, вы зашли не туда. Такой страницы не существует.
        </p>
        <Link
          to="/"
          className="inline-block bg-indigo-900 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-xl transition-all duration-300"
        >
          На главную
        </Link>
      </div>
    </div>
  );
};
