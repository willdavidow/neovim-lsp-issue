'use server';

import { signUpSchema, type SignUpSchema } from '@web/validation/user';

export const signUp = async (formData: SignUpSchema) => {
  const validateSignUp = signUpSchema.safeParse(formData);

  if (!validateSignUp.success) {
    let fieldErrors = {};
    validateSignUp.error.issues.forEach((issue) => {
      fieldErrors = { ...fieldErrors, [issue.path[0]]: issue.message };
    });

    return { status: 400, fieldErrors };
  }

  const { email, firstName, lastName } = formData;

  return {
    status: 200,
    data: {
      email,
      firstName,
      lastName,
      message: `Please check ${email} to confirm and activate your account.`,
    },
  };
};
