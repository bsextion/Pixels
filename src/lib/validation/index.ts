import { z } from "zod";

//Define the validation schema for the register form.
export const RegisterValidation = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    username: z.string().min(2, { message: "Username must be at least 2 characters." }),
    email: z.string().email(),
    password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});