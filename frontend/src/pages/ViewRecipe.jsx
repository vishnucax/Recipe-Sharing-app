import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import RecipeImage from "../components/RecipeImage";

function ViewRecipe() {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/recipes/${id}`);
        setRecipe(response.data);
      } catch (err) {
        setError("Recipe not found");
      } finally {
        setLoading(false);
      }
    };

    getRecipe();
  }, [id]);

  if (loading) {
    return <div className="container page-box alert alert-info">Loading...</div>;
  }

  if (error) {
    return <div className="container page-box alert alert-danger">{error}</div>;
  }

  const isOwner = user && recipe.user && user._id === recipe.user._id;

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this recipe?");

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(`http://localhost:5001/api/recipes/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete recipe");
    }
  };

  return (
    <div className="container page-box">
      <div className="card shadow-sm">
        <RecipeImage title={recipe.title} className="card-img-top recipe-image" />

        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h2>{recipe.title}</h2>
              <p className="text-muted">
                By {recipe.user ? recipe.user.name : "Unknown"}
              </p>
            </div>

            {isOwner && (
              <div className="d-flex gap-2">
                <Link className="btn btn-warning" to={`/edit/${recipe._id}`}>
                  Edit
                </Link>
                <button className="btn btn-danger" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            )}
          </div>

          <h5>Ingredients</h5>
          <ul>
            {recipe.ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h5>Instructions</h5>
          <p>{recipe.instructions}</p>
        </div>
      </div>
    </div>
  );
}

export default ViewRecipe;
