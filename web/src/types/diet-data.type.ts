export interface UserInfo {
  name: string;
  age: number;
  height: number;
  weight: number;
  gender: "masculino" | "feminino";
  activity_level: "sedentario" | "2x_semana" | "4x_semana";
  objective: "perder_peso" | "hipertrofia" | "manter_massa_muscular";
}
