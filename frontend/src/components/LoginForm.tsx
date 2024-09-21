import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";

export const LoginForm = () => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    console.log(data);
  };
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-extrabold text-zinc-700 tracking-wide mb-8">
        Oturum aç
      </h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="E-posta" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Parola" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button variant="primary" className="w-full">
            Oturum aç
          </Button>
        </form>
      </Form>

      <div className="w-full h-[2px] bg-slate-300 my-5 relative">
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-2 text-slate-400 font-bold">
          VEYA
        </span>
      </div>

      <Button className="w-full flex items-center gap-2">
        <FcGoogle className="size-5" />
        Google
      </Button>
    </div>
  );
};
