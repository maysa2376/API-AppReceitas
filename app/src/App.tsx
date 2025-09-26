import React, { useEffect, useState } from "react";
import "./app.css";

interface Recipe {
  id: number;
  name: string;
  image: string;
  cuisine: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  caloriesPerServing: number;
  rating: number;
  difficulty: string;
  ingredients: string[];
  instructions: string[];
}

export default function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);

  // Controle de busca, ordenação e paginação
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [order, setOrder] = useState("asc");
  const [page, setPage] = useState(0);
  const limit = 6;

  // Controle do modal de detalhes
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    fetchRecipes();
  }, [search, sortBy, order, page]);

  async function fetchRecipes() {
    setLoading(true);
    try {
      const skip = page * limit;
      const res = await fetch(
        `https://dummyjson.com/recipes/search?q=${search}&limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}`
      );
      const data = await res.json();
      setRecipes(data.recipes || []);
    } catch (err) {
      console.error("Erro ao buscar receitas:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>🍲 Lista de Receitas</h1>

      {/* Busca e ordenação */}
      <div className="controls">
        <input
          type="text"
          placeholder="Buscar receita..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(0);
          }}
        />

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name">Nome</option>
          <option value="caloriesPerServing">Calorias</option>
          <option value="rating">Nota</option>
          <option value="difficulty">Dificuldade</option>
        </select>

        <select value={order} onChange={(e) => setOrder(e.target.value)}>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
      </div>

      {/* Lista de receitas */}
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div className="grid">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="card"
              onClick={() => setSelectedRecipe(recipe)}
            >
              <img src={recipe.image} alt={recipe.name} />
              <div className="card-body">
                <h3>{recipe.name}</h3>
                <p>🍴 {recipe.cuisine}</p>
                <p>
                  ⏱ Prep: {recipe.prepTimeMinutes}m | Cook:{" "}
                  {recipe.cookTimeMinutes}m
                </p>
                <p>
                  👥 {recipe.servings} porções | 🔥 {recipe.caloriesPerServing} kcal
                </p>
                <p>
                  ⭐ {recipe.rating} | 🎯 {recipe.difficulty}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Paginação */}
      <div className="pagination">
        <button onClick={() => setPage((p) => p - 1)} disabled={page === 0}>
          Anterior
        </button>
        <span>Página {page + 1}</span>
        <button onClick={() => setPage((p) => p + 1)}>Próxima</button>
      </div>

      {/* Modal de detalhes */}
      {selectedRecipe && (
        <div className="modal" onClick={() => setSelectedRecipe(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedRecipe.name}</h2>
            <img src={selectedRecipe.image} alt={selectedRecipe.name} />
            <p>🍴 Tipo: {selectedRecipe.cuisine}</p>
            <p>
              ⏱ Tempo de preparo: {selectedRecipe.prepTimeMinutes} min
              <br />
              🍳 Tempo de cozimento: {selectedRecipe.cookTimeMinutes} min
            </p>
            <p>
              👥 Rende {selectedRecipe.servings} porções <br />
              🔥 {selectedRecipe.caloriesPerServing} kcal
            </p>
            <p>
              ⭐ Nota: {selectedRecipe.rating} <br /> 🎯 Dificuldade:{" "}
              {selectedRecipe.difficulty}
            </p>

            <h3>Ingredientes</h3>
            <ul>
              {selectedRecipe.ingredients.map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>

            <h3>Instruções</h3>
            <ol>
              {selectedRecipe.instructions.map((inst, i) => (
                <li key={i}>{inst}</li>
              ))}
            </ol>

            <button onClick={() => setSelectedRecipe(null)}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
}
