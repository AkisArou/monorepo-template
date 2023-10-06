import { z } from "zod";
import { yeah } from "./lib/yeah";
import { BehaviorSubject } from "rxjs";

export function fromA(a: string) {
  yeah;
  return `fromA tells: ${a}`;
  console.log("From AAAAAAAAAA: ", a);
}

export const asd = z.object({
  asd: z.string(),
});

export type Asd = z.infer<typeof asd>;

const r = new BehaviorSubject("");
