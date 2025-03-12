import express from 'express';
import { TrainModel, GenarateimageFromPack, GenarateImage } from "common/types";
import { prismaClient } from 'db';

const PORT = process.env.PORT || 8080;
const app = express();

const USER_ID = "1";

app.use(express.json());

app.post("/ai/training", async (req, res) => {
  const parsefBody = TrainModel.safeParse(req.body);
  if (!parsefBody.success) {
    res.status(411).json({
      msg: "Invalid input"
    });
    return;
  }

  const data = await prismaClient.model.create({
    data: {
      name: parsefBody.data.name,
      type: parsefBody.data.type,
      age: parsefBody.data.age,
      ethnicity: parsefBody.data.ethnicity,
      eyeColor: parsefBody.data.eyeColor,
      bald: parsefBody.data.bald,
      userId: USER_ID
    }
  });
   res.json({
     modelId: data.id
   });

  res.status(201).json({
    msg: "Model created successfully"
  });
});



app.post("/ai/generate", async (req, res) => {
  const parsefBody = GenarateImage.safeParse(req.body);

  if (!parsefBody.success) {
    res.status(411).json({
      msg: "Invalid input",
    });
    return;
  }

  const data = await prismaClient.outputImages.create({
    data: {
      modelId: parsefBody.data.modelId,
      userId: USER_ID,
      prompt: parsefBody.data.prompt,
      imageUrl: "",
    },
  });

  res.json({
    imageId: data.id,
  });
});

app.post("/pack/generate", async (req, res) => {
  const parsefBody = GenarateimageFromPack.safeParse(req.body);

  if (!parsefBody.success) {
    res.status(411).json({
      msg: "Invalid input",
    });
    return;
  }
  const prompt = await prismaClient.packPrompts.findMany({
    where: {
      packId: parsefBody.data.packId,
    },
  });

  const images = await prismaClient.outputImages.createManyAndReturn({
    data: prompt.map((p) => ({
      prompt: p.prompt,
      userId: USER_ID,
      modelId: parsefBody.data.modelId,
      imageUrl: "",
    })),
  });
  res.json({
    imageIds: images.map((image) => image.id),
  });
});

app.get("/pack/bulk", async (req, res) => {
  const packs = await prismaClient.packs.findMany({});

  res.json({
    packs: packs,
  });
});

app.get("image/bulk", async (req, res) => {
  const images = req.query.images as string[];
  const limit = req.query.limit as string;
  const offset = req.query.offset as string;

  const imagesData = await prismaClient.outputImages.findMany({
    where: {
      id: {
        in: images,
      },
      userId: USER_ID,
    },
    take: parseInt(limit),
    skip: parseInt(offset),
  });

  res.json({
    images: imagesData,
  });
});








app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

