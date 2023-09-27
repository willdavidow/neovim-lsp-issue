'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { type FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ValidatableInput as Input,
} from '@ui-lib/ui';
import { signUp } from '@web/actions/user-actions';

import {
  signUpSchema,
  type SignUpSchema,
} from '@web/validation/user';

type FormError = {
  message: string;
};
export type ServerActionResponse<FormProps> =
  | {
      status: 200;
      data?: FormProps;
    }
  | {
      status: 400;
      errors?: FieldValues;
      fieldErrors?: FieldValues;
      requestError?: FormError;
    };

export default function SignUpPage() {
  const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    mode: 'all',
  });

  const onSubmit = async (data: SignUpSchema) => {
    const formRequest = (await signUp(
      data
    )) as ServerActionResponse<SignUpSchema>;

    if (formRequest.status === 400) {
      const { errors } = formRequest;
      for (const errorKey in errors) {
        const message = errors[errorKey as keyof SignUpSchema];

        setError(errorKey as keyof SignUpSchema, {
          type: 'server',
          message,
        });
      }

      return;
    }

    if (formRequest.status === 200) {
    console.log('form success');
    }
  };

  return (
    <div className='relative flex flex-col w-[350px]'>
      <h3 className='mb-1 text-28'>Sign Up</h3>
      <p className='mb-4 text-sm'>
        <span className=''>Already signed up?</span>
        <span className='mx-1 text-13 font-bold itali'>
          -
        </span>
        <Link
          className='text-13 font-bold italic'
          href='/sign-in'
        >
          Sign in here
        </Link>
      </p>
      <form
        className={clsx('flex flex-col gap-4')}
        onSubmit={handleSubmit(
          (data) => {
            onSubmit(data);
          },
          (errors) => {
          console.log('errors ', errors);
          }
        )}
      >
        <div className='block'>
          <Input
            control={control}
            name='password'
            className='w-full'
            id='password'
            label='Password'
            type='password'
            autoComplete='password'
          />
        </div>
        <div className='block pt-2 mb-3'>
          <button
            type='submit'
            className={clsx('w-full', { 'cursor-wait': isSubmitting })}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Sign up'}
          </button>
        </div>
      </form>
    </div>
  );
};
