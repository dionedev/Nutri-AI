import { z } from "zod";

export const DietPlanRequestSchema = z.object({
  name: z.string().min(2),
  age: z.number().positive(),
  height: z.number().positive(),
  weight: z.number().positive(),
  gender: z.enum(["masculino", "feminino"]),
  activity_level: z.enum(["sedentario", "2x_semana", "4x_semana"]),
  objective: z.enum(["perder_peso", "hipertrofia", "manter_massa_muscular"]),
});

export type DietPlanRequest = z.infer<typeof DietPlanRequestSchema>;
