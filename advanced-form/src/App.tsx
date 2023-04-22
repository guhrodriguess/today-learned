// React
import { useState } from "react";

// React Hook Form
import { useForm, useFieldArray } from "react-hook-form";

// Zod
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const createUserFormSchema = z.object({
  name: z
    .string()
    .nonempty("O nome é obrigatório")
    .transform((name) => {
      return name
        .trim()
        .split(" ")
        .map((word) => {
          return word[0].toLocaleUpperCase().concat(word.substring(1));
        })
        .join(" ");
    }),
  email: z
    .string()
    .nonempty("O e-mail é obrigatório")
    .email("Formato de e-mail inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  techs: z
    .array(
      z.object({
        title: z.string().nonempty("O título é obrigatório"),
        knowledge: z.coerce.number().min(1).max(100),
      })
    )
    .min(2, "Insira pelo menos 2 tecnologias")
    .refine((techs) => {
      return techs.some((tech) => tech.knowledge > 50);
    }, "Você está aprendendo!"),
});

type CreateUserFormData = z.infer<typeof createUserFormSchema>;

export default function App() {
  const [output, setOutput] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  });

  const { fields, append } = useFieldArray({
    control,
    name: "techs",
  });

  function addNewTech() {
    append({ title: "", knowledge: 0 });
  }

  function createUser(data: CreateUserFormData) {
    setOutput(JSON.stringify(data, null, 2));
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen gap-10 bg-zinc-950 text-zinc-300">
      <form
        onSubmit={handleSubmit(createUser)}
        className="flex flex-col w-full max-w-xs gap-4"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            {...register("name")}
            className="h-10 px-3 text-white border rounded shadow-sm bg-zinc-900 border-zinc-600"
          />
          {errors.name && (
            <span className="text-sm text-red-500">{errors.name.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            {...register("email")}
            className="h-10 px-3 text-white border rounded shadow-sm bg-zinc-900 border-zinc-600"
          />
          {errors.email && (
            <span className="text-sm text-red-500">{errors.email.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            {...register("password")}
            className="h-10 px-3 text-white border rounded shadow-sm bg-zinc-900 border-zinc-600"
          />
          {errors.password && (
            <span className="text-sm text-red-500">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="" className="flex items-center justify-between">
            Tecnologias
            <button
              type="button"
              onClick={addNewTech}
              className="text-sm text-emerald-500"
            >
              Adicionar
            </button>
          </label>

          {fields.map((field, index) => {
            return (
              <div key={field.id} className="flex gap-2">
                <div className="flex flex-col flex-1 gap-1">
                  <input
                    type="text"
                    {...register(`techs.${index}.title`)}
                    className="h-10 px-3 text-white border rounded shadow-sm bg-zinc-900 border-zinc-600"
                  />
                  {errors.techs?.[index]?.title && (
                    <span className="text-sm text-red-500">
                      {errors.techs?.[index]?.title?.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <input
                    type="number"
                    {...register(`techs.${index}.knowledge`)}
                    className="w-16 h-10 px-3 text-white border rounded shadow-sm bg-zinc-900 border-zinc-600"
                  />
                  {errors.techs?.[index]?.knowledge && (
                    <span className="text-sm text-red-500">
                      {errors.techs?.[index]?.knowledge?.message}
                    </span>
                  )}
                </div>
              </div>
            );
          })}

          {errors.techs && (
            <span className="text-sm text-red-500">{errors.techs.message}</span>
          )}
        </div>

        <button
          type="submit"
          className="h-10 font-semibold text-white rounded bg-emerald-500 hover:bg-emerald-600"
        >
          Salvar
        </button>
      </form>
      <pre>{output}</pre>
    </main>
  );
}
