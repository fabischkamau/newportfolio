import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
export const deletecatschema = zod.object({
  id: zod.string().min(3),
});

export type DeleteCatFormData = zod.infer<typeof deletecatschema>;

export const deletecatresolver = zodResolver(deletecatschema);
