'use server';

import { cookies } from 'next/headers';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Invalid Email'),
});

export async function loginUser(formData) {
  const validatedFields = schema.safeParse({
    email: formData.get('email'),
  });

  const cookieStore = cookies();
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  cookieStore.set('user', formData.get('email'));
}

export const signOut = async () => {
  const cookieStore = cookies();
  cookieStore.delete('user');
  console.log(cookieStore.get('user'));
};
