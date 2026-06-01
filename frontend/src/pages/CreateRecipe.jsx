import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function CreateRecipe() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [error, setError] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const ingredientArray = ingredients
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "");

    try {
      await axios.post(
        "http://localhost:5001/api/recipes",
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

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create recipe");
    }
  };

  return (
    <div className="container">
      <div className="card form-box shadow-sm">
        <div className="card-body">
          <h3 className="mb-3">Create Recipe</h3>

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
                placeholder="Example: rice, salt, water"
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

            <button className="btn btn-success w-100">Save Recipe</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateRecipe;
