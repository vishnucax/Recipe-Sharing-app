import { useEffect, useState } from "react";
import axios from "axios";

const defaultImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnNDueBTAc3Q6v4gmqPWLNnB1sw9jCfFOBDQ&s";

function RecipeImage({ title, className }) {
  const [imageUrl, setImageUrl] = useState(defaultImage);

  useEffect(() => {
    const getImage = async () => {
      if (!title) {
        setImageUrl(defaultImage);
        return;
      }

      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${title}`
        );

        if (response.data.meals && response.data.meals.length > 0) {
          setImageUrl(response.data.meals[0].strMealThumb);
        } else {
          setImageUrl(defaultImage);
        }
      } catch (error) {
        setImageUrl(defaultImage);
      }
    };

    getImage();
  }, [title]);

  return <img src={imageUrl} className={className} alt={title} />;
}

export default RecipeImage;
