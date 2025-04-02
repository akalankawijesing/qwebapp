"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FormErrorMessage } from "@/components/FormError";
import { useRouter } from "next/navigation";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const error = await response.json();
        form.setError("root", { message: error.error });
        return;
      }

      // Handle successful registration
      const user = await response.json();
      console.log("Registered user:", user);
      router.push("/auth/login");
    } catch (error) {
      console.error("Registration error:", error);
      form.setError("root", {
        message: "An error occurred during registration",
      });
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your full name"
                    {...form.register("name")}
                  />
                  {form.formState.errors.name && (
                    <FormErrorMessage>
                      {form.formState.errors.name.message}
                    </FormErrorMessage>
                  )}
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    {...form.register("email")}
                  />
                  {form.formState.errors.email && (
                    <FormErrorMessage>
                      {form.formState.errors.email.message}
                    </FormErrorMessage>
                  )}
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="password"
                    {...form.register("password")}
                  />
                  {form.formState.errors.password && (
                    <FormErrorMessage>
                      {form.formState.errors.password.message}
                    </FormErrorMessage>
                  )}
                </div>

                {form.formState.errors.root && (
                  <FormErrorMessage>
                    {form.formState.errors.root.message}
                  </FormErrorMessage>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? "Signing Up..." : "Sign Up"}
                </Button>
              </div>

              <div className="text-center text-sm">
                Already have an account?{" "}
                <a href="/auth/login" className="underline underline-offset-4">
                  Login
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      {/* ... rest of the component */}
    </div>
  );
}
