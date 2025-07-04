import fs from 'node:fs'
import sql from "better-sqlite3";
import { resolve } from "styled-jsx/css";
import slugify from 'slugify';
import xss from 'xss';

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return db.prepare("SELECT * from meals").all();
}

export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function saveMeal(meal){
  meal.slug = slugify(meal.title, {lower: true});
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split('.').pop();
  const filename = `${meal.slug}.${extension}`;

 const stream = fs.createWriteStream(`public/images/${filename}`);
 const bufferedImage = await meal.image.arrayBuffer();

 stream.write(Buffer.from(bufferedImage), (error) => {
  if(error){
    throw new Error('Saving image failed')
  }
 });

 meal.image = `/image/${filename}`;

 db.prepare(`
    INSERT INTO meals (title, summary, instructions, slug, image, creator, creator_email) 
    VALUES (
      @title,
      @summary,
      @instructions,
      @slug,
      @image,
      @creator,
      @creator_email
    )
  `).run(meal);
}