import { z } from "zod";

export const emailSchema = z.string().email("Please enter a valid email address");
export const phoneSchema = z.string().min(10, "Phone number must be at least 10 digits");
export const nameSchema = z.string().min(2, "Name must be at least 2 characters");

