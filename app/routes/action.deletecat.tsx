import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { client } from "~/db/db.server";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const _action = formData.get("_action");
  const id = formData.get("id");
  if (_action === "delete" && typeof id === "string") {
    return await client.category
      .delete({
        where: {
          id: id,
        },
      })
      .then(() => {
        return redirect("/dashboard/categories");
      });
  }
  return null;
}
