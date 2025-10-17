"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Utensils } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const DietFormDataSchema = z.object({
  name: z.string().min(2, "Por favor, insira um nome"),
  age: z.number().int().positive(),
  height: z.number().positive(),
  weight: z.number().positive(),
  gender: z.enum(["masculino", "feminino"], {
    error: "Por favor, selecione um sexo",
  }),
  activity_level: z.enum(["sedentario", "2x_semana", "4x_semana"], {
    error: "Por favor, selecione o nível de atividade",
  }),
  objective: z.enum(["perder_peso", "hipertrofia", "manter_massa_muscular"], {
    error: "Por favor, selecione um objetivo",
  }),
});

type DietFormData = z.infer<typeof DietFormDataSchema>;

interface DietFormProps {
  onSubmit: (data: DietFormData) => void;
}

export function DietForm({ onSubmit }: DietFormProps) {
  const form = useForm<DietFormData>({
    resolver: zodResolver(DietFormDataSchema),
    defaultValues: {
      name: "",
      age: undefined,
      height: undefined,
      weight: undefined,
      gender: undefined,
      activity_level: undefined,
      objective: undefined,
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl border-0">
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4 mx-auto">
              <Utensils className="w-14 h-14 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-green-500 mb-2">
              Dieta fácil
            </h1>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  Dados pessoais
                </h3>
                <span className="text-sm text-gray-600">
                  Preencha o formulário para obter sua dieta personalizada.
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Digite seu nome" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Idade</FormLabel>
                      <FormControl>
                        <Input
                          {...form.register("age", {
                            setValueAs: (value) =>
                              value === "" ? undefined : Number(value),
                          })}
                          type="number"
                          step="any"
                          placeholder="Ex: 28"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Altura</FormLabel>
                      <FormControl>
                        <Input
                          {...form.register("height", {
                            setValueAs: (value) =>
                              value === "" ? undefined : parseFloat(value),
                          })}
                          type="number"
                          step="any"
                          placeholder="Ex: 174"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Peso</FormLabel>
                      <FormControl>
                        <Input
                          {...form.register("weight", {
                            setValueAs: (value) =>
                              value === "" ? undefined : parseFloat(value),
                          })}
                          type="number"
                          step="any"
                          placeholder="Ex: 67,8"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sexo</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione o sexo" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          <SelectItem value="masculino">Masculino</SelectItem>
                          <SelectItem value="feminino">Feminino</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="activity_level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nível de atividade</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione o nível de atividade" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          <SelectItem value="sedentario">Sedentário</SelectItem>
                          <SelectItem value="2x_semana">
                            2x por semana
                          </SelectItem>
                          <SelectItem value="4x_semana">
                            4x por semana
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="objective"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Objetivo</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione seu objetivo" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          <SelectItem value="perder_peso">
                            Perder peso
                          </SelectItem>
                          <SelectItem value="hipertrofia">
                            Hipertrofia
                          </SelectItem>
                          <SelectItem value="manter_massa_muscular">
                            Manter massa muscular
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>

              <Button className="w-full mt-4 hover:opacity-90 cursor-pointer">
                Gerar minha dieta
              </Button>
            </form>
          </Form>
        </div>
      </Card>
    </div>
  );
}
