// uncomment the next line t
// import { Control, FieldValues } from 'react-hook-form';
import * as z from 'zod';

export const signUpSchema = z.object({
  firstName: z.string().min(1, { message: 'Please enter your first name.' }),
  lastName: z.string().min(1, { message: 'Please enter your last name.' }),
  email: z
    .string()
    .min(1, { message: 'Please enter an email address.' })
    .email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, { message: 'Please enter a password.' }),
});

/* export type SignUpSchema = z.infer<typeof signUpSchema> &
  Control<FieldValues, any>; */

// remove the comment block on SignUpSchema the type above this line, and
// comment-out the one below to show that the issue seems to only
// happen when we include the imported Control and FieldValues types
// from react-hook-form as part of the exported type

export type SignUpSchema = z.infer<typeof signUpSchema>;
