import  useState  from 'react';
import  useEffect  from 'react';


// Este componente único em React busca e exibe uma lista de receitas.
// Ele utiliza o Tailwind CSS para o estilo e a API dummyjson.com para os dados.

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('https://dummyjson.com/recipes');
        if (!response.ok) {
          throw new Error('Falha ao carregar as receitas. Por favor, tente novamente mais tarde.');
        }
        const data = await response.json();
        setRecipes(data.recipes);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="text-xl font-semibold">Carregando receitas...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-red-400">
        <div className="text-xl font-semibold">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen text-white p-8">
      <div className="container mx-auto">
        <h1 className="text-5xl font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
          Receitas Deliciosas
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="bg-gray-800 rounded-3xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer">
              <img src={recipe.image} alt={recipe.name} className="w-full h-56 object-cover rounded-t-3xl" />
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2 text-teal-300">{recipe.name}</h2>
                <div className="text-sm text-gray-400 mb-4">
                  <p>
                    <span className="font-semibold text-teal-400">Tipo:</span> {recipe.mealType.join(', ')}
                  </p>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-300 mb-4">
                  <p className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" />
                    </svg>
                    <span>Preparo: {recipe.prepTimeMinutes} min</span>
                  </p>
                  <p className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" />
                    </svg>
                    <span>Cozimento: {recipe.cookTimeMinutes} min</span>
                  </p>
                </div>
                <div className="text-sm text-gray-300 space-y-2">
                  <p>
                    <span className="font-semibold text-teal-400">Porções:</span> {recipe.servings}
                  </p>
                  <p>
                    <span className="font-semibold text-teal-400">Kcal/Porção:</span> {recipe.caloriesPerServing}
                  </p>
                  <p>
                    <span className="font-semibold text-teal-400">Dificuldade:</span> {recipe.difficulty}
                  </p>
                  <p>
                    <span className="font-semibold text-teal-400">Nota:</span> <span className="text-yellow-400">{'⭐'.repeat(Math.round(recipe.rating))}</span> ({recipe.rating.toFixed(1)})
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
