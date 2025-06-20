import Link from "next/link";

import MealsGrid from "@/component/meals/meals-grid";
import classes from "./page.module.css";
import { getMeals } from "@/lib/meals";

export default async function MealsPage() {
  const meals = await getMeals();

  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious meals created {""}{" "}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>Choose your favorite recipe and cook it yourself</p>
        <p className={classes.cta}>
          <Link href="/meals/share"> Share your recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <MealsGrid meals={meals} />
      </main>
    </>
  );
}
