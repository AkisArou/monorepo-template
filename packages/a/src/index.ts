import { z } from "zod";
import { yeah } from "./lib/yeah";

export function fromA(a: string) {
  yeah;
  return `fromA tells: ${a}`;
  console.log("From AAAAAAAAAA: ", a);
}

export const asd = z.object({
  asd: z.string(),
});

export type Asd = z.infer<typeof asd>;
