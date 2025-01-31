import { useState, useEffect } from 'react';

interface Joke {
  setup?: string;
  delivery?: string;
  joke?: string;
}

export default function RandomJoke() {
  const [joke, setJoke] = useState<Joke | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchNewJoke = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch('https://v2.jokeapi.dev/joke/Any?safe-mode');
      const data = await response.json();
      setJoke(data);
    } catch (err) {
      setError('Failed to fetch joke. Please try again!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewJoke();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        <p>{error}</p>
        <button
          onClick={fetchNewJoke}
          className="mt-4 bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-full"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-purple-800/30 rounded-xl shadow-xl">
      <div className="min-h-[200px] flex flex-col justify-center">
        {joke?.setup ? (
          <>
            <p className="text-2xl mb-4 text-white">{joke.setup}</p>
            <p className="text-xl text-purple-200">{joke.delivery}</p>
          </>
        ) : (
          <p className="text-2xl text-white">{joke?.joke}</p>
        )}
      </div>
      <button
        onClick={fetchNewJoke}
        className="mt-6 w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105"
      >
        Get Another Joke
      </button>
    </div>
  );
}
