import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function EditRecipe() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [error, setError] = useState("");
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/recipes/${id}`);
        setTitle(response.data.title);
        setIngredients(response.data.ingredients.join(", "));
        setInstructions(response.data.instructions);
      } catch (err) {
        setError("Could not load recipe");
      }
    };

    getRecipe();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const ingredientArray = ingredients
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "");

    try {
      await axios.put(
        `http://localhost:5001/api/recipes/${id}`,
        {
          title,
          ingredients: ingredientArray,
          instructions,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      navigate(`/recipes/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update recipe");
    }
  };

  return (
    <div className="container">
      <div className="card form-box shadow-sm">
        <div className="card-body">
          <h3 className="mb-3">Edit Recipe</h3>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Ingredients</label>
              <textarea
                className="form-control"
                rows="3"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label">Instructions</label>
              <textarea
                className="form-control"
                rows="5"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                required
              ></textarea>
            </div>

            <button className="btn btn-warning w-100">Update Recipe</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditRecipe;
