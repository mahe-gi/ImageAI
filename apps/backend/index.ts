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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

