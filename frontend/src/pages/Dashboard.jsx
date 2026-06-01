import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import RecipeImage from "../components/RecipeImage";

function Dashboard() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/recipes");
        setRecipes(response.data);
      } catch (err) {
        setError("Failed to load recipes");
      } finally {
        setLoading(false);
      }
    };

    getRecipes();
  }, []);

  return (
    <div className="container page-box">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Recipe Dashboard</h2>
        {user && (
          <Link className="btn btn-success" to="/create">
            Add Recipe
          </Link>
        )}
      </div>

      {loading && <div className="alert alert-info">Loading recipes...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        {recipes.map((recipe) => (
          <div className="col-md-4 mb-3" key={recipe._id}>
            <div className="card h-100 shadow-sm">
              <RecipeImage title={recipe.title} className="card-img-top dashboard-image" />
              <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                <p className="card-text">
                  By {recipe.user ? recipe.user.name : "Unknown"}
                </p>
                <Link
                  className="btn btn-primary btn-sm"
                  to={`/recipes/${recipe._id}`}
                >
                  View
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!loading && recipes.length === 0 && (
        <div className="alert alert-secondary">No recipes added yet.</div>
      )}
    </div>
  );
}

export default Dashboard;
