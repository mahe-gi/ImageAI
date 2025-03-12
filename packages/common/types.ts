import { z } from "zod";

export const TrainModel = z.object({
  name: z.string(),
  type: z.enum(["Man", "Women", "Others"]),
  age: z.number(),
  ethnicity: z.enum([
    "White",
    "Black",
    "AsianAmerican",
    "EastAsian",
    "SouthEastAsian",
    "SouthAsian", 
    "MiddleEastern",
    "Pacific",
    "Hispanic",
  ]),
  eyeColor: z.enum(["Brown", "Blue", "Hazel", "Gray"]),
  bald: z.boolean(),
  images: z.array(z.string()),
});

export const GenarateImage = z.object({
  prompt: z.string(),
  modelId: z.string(),
  num: z.number(),
});

export const GenarateimageFromPack = z.object({
  modelId: z.string(),
  packId: z.string(),
});