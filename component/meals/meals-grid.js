import MealItem from "./meal-item.js";
import claases from "./meal-grid.module.css";

export default function MealsGrid({ meals }) {
  return (
    <ul className={claases.meals}>
      {meals.map((meal) => (
        <li key={meal.id}>
          <MealItem {...meal} />
        </li>
      ))}
    </ul>
  );
}
