import React from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner"
import { Input } from "@/components/ui/input";
import { LoginValidation } from "@/lib/validation";
import { z } from "zod";
import Loader from "@/components/common/Loader";
import { Link, useNavigate } from "react-router-dom";
import { loginAccount } from "@/lib/appwrite/api";
import { useLoginAccount } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";

const LoginForm = () => {
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  const { mutateAsync: loginAccount } = useLoginAccount();

  // Define form.
  const form = useForm<z.infer<typeof LoginValidation>>({
    resolver: zodResolver(LoginValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginValidation>) => {
    const session = await loginAccount({
      email: values.email,
      password: values.password,
    });

    if (!session) {
      return toast.warning("Log in failed. Please try again");
    }

    const isLoggedIn = await checkAuthUser();


    if (isLoggedIn) {
      form.reset();
      toast("Successfully logged in!")
      console.log('Navigating')
      navigate("/");
    } else {
      toast("Log in failed. Please try again.")
      console.log("Log in failed. Please try again");
    }
  };

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Log In</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          Welcome back! Please enter your details.
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Email</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
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
                <FormLabel className="shad-form_label">Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="shad-button_primary">
            {isUserLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Login"
            )}
          </Button>

                    <p className="text-small-regular text-light-2 text-center mt-2">
                      Don't have an account?
                      <Link
                        to="/register"
                        className="text-primary-500 text-small-semibold ml-1"
                      >
                        Register
                      </Link>
                    </p>
        </form>
      </div>
    </Form>
  );
};

export default LoginForm;
