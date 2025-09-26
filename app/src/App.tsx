import  {useState, useEffect}  from 'react';
import './App.css'


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
          <div className="loading-container">
            <div className="text-xl font-semibold">Carregando receitas...</div>
          </div>
        );
      }

      if (error) {
        return (
          <div className="error-container">
            <div className="text-xl font-semibold">{error}</div>
          </div>
        );
      }

      return (
        <div className="main-container">
          <h1 className="title">
            Receitas Deliciosas
          </h1>
          <div className="recipe-grid">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="recipe-card">
                <img src={recipe.image} alt={recipe.name} className="card-image" />
                <div className="card-content">
                  <h2 className="recipe-title">{recipe.name}</h2>
                  <div className="card-details">
                    <p>
                      <span className="info-label">Tipo:</span> {recipe.mealType.join(', ')}
                    </p>
                  </div>
                  <div className="card-flex">
                    <p className="card-detail-group">
                      <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" />
                      </svg>
                      <span>Preparo: {recipe.prepTimeMinutes} min</span>
                    </p>
                    <p className="card-detail-group">
                      <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" />
                      </svg>
                      <span>Cozimento: {recipe.cookTimeMinutes} min</span>
                    </p>
                  </div>
                  <div className="card-info">
                    <p className="info-item">
                      <span className="info-label">Porções:</span> {recipe.servings}
                    </p>
                    <p className="info-item">
                      <span className="info-label">Kcal/Porção:</span> {recipe.caloriesPerServing}
                    </p>
                    <p className="info-item">
                      <span className="info-label">Dificuldade:</span> {recipe.difficulty}
                    </p>
                    <p className="info-item">
                      <span className="info-label">Nota:</span> <span className="rating-star">{'⭐'.repeat(Math.round(recipe.rating))}</span> ({recipe.rating.toFixed(1)})
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
export default App;
