import z from 'zod';

const userValidationSchema = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string(),
  fullName: z.object({
    firstName: z.string().trim(),
    lastName: z.string().trim(),
  }),
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: z.object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
  }),
});

export const orderValidation = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

export default userValidationSchema;
