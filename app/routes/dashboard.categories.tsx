import { ActionFunctionArgs, json } from "@remix-run/node";
import { client } from "~/db/db.server";
import { useRemixForm, getValidatedFormData } from "remix-hook-form";
import { Form, useFetcher, useLoaderData } from "@remix-run/react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";
import { Loader, X } from "lucide-react";

const schema = zod.object({
  name: zod.string().min(3),
});

type FormData = zod.infer<typeof schema>;

const resolver = zodResolver(schema);

export async function loader() {
  return json(await client.category.findMany());
}

export async function action({ request }: ActionFunctionArgs) {
  const {
    errors,
    data: categorydata,
    receivedValues: defaultValues,
  } = await getValidatedFormData<FormData>(request, resolver);
  if (errors) {
    return json(errors, defaultValues);
  }
  return await client.category.create({
    data: { name: categorydata.name.toLowerCase() },
  });
}

export default function categories() {
  const [isopen, setIsOpen] = useState<boolean>(false);
  const loaderData = useLoaderData<typeof loader>();
  const {
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
    register,
    reset,
  } = useRemixForm<FormData>({
    mode: "onSubmit",
    resolver,
  });

  const fetcher = useFetcher();
  useEffect(() => {
    if (isSubmitted && !errors.name?.message) {
      reset();
      setIsOpen(!isopen);
    }
  }, [isSubmitted]);
  return (
    <div className=" w-full h-full p-10 flex flex-col gap-y-5">
      <section id="title" className="flex justify-between items-center">
        <h1 className="text-xl text-slate-800 dark:text-slate-100 font-semibold">
          Categories
        </h1>
        <div>
          <div>
            <button
              onClick={() => setIsOpen(!isopen)}
              className="p-2 bg-sky-500 text-sky-50 focus:outline-none hover:bg-sky-600 text-sm rounded-lg"
            >
              Add Category
            </button>
          </div>
          <Dialog
            open={isopen}
            onClose={setIsOpen}
            className="fixed inset-0 overflow-auto p-4 pt-[25vh]"
          >
            <Dialog.Overlay className="fixed inset-0 bg-slate-500/75" />
            <div className="relative mx-auto max-w-xl bg-white shadow-2xl dark:bg-slate-900 ring-1 ring-slate-950/5">
              <div className="p-4 text-slate-700">
                <div className=" text-center">
                  <h4 className="text-lg text-slate-900 dark:text-slate-100">
                    Add Category
                  </h4>
                </div>
                <Form
                  method="post"
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-y-3"
                >
                  <div className="flex flex-col gap-y-3">
                    <label
                      htmlFor="name"
                      className="text-slate-600 dark:text-slate-300 text-sm font-semibold"
                    >
                      Name
                    </label>

                    <input
                      type="text"
                      {...register("name")}
                      placeholder="react, remix"
                      aria-invalid={errors.name?.message ? true : false}
                      className="p-2 bg-white peer aria-[invalid='true']:border-rose-600  rounded-lg dark:bg-inherit text-slate-700 text-sm dark:text-slate-100 focus:outline-none focus:ring-0 focus:border-sky-500 border-2 border-slate-400"
                    />
                    <p className="mt-2 hidden peer-aria-[invalid='true']:flex text-rose-600 text-sm">
                      {errors.name?.message && errors.name.message}
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="p-2 bg-sky-500 text-sky-50 focus:outline-none hover:bg-sky-600 text-sm"
                  >
                    {isSubmitting ? (
                      <p className="flex items-center justify-center">
                        <Loader className="mr-2 size-5 animate-spin" />
                        please wait
                      </p>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </Form>
              </div>
            </div>
          </Dialog>
        </div>
      </section>
      <section id="categoriesdata">
        {loaderData.length === 0 ? (
          <p className="text-sm text-slate-700 dark:text-slate-200">
            No Categries at the moment, please add.{" "}
          </p>
        ) : (
          <div>
            <table className="table-auto">
              <thead>
                <tr className="space-x-5">
                  <th>Category</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {loaderData.map((cat) => (
                  <tr key={cat.id}>
                    <td>{cat.name}</td>
                    <td>
                      <fetcher.Form action="/action/deletecat" method="post">
                        <input type="hidden" name="id" value={cat.id} />
                        <button
                          name="_action"
                          value="delete"
                          className="text-rose-600 p-2 bg-rose-50 rounded-lg focus:outline-none disabled:opacity-80 disabled:text-slate-500 "
                          disabled={
                            fetcher.state === "submitting" &&
                            fetcher.formData?.get("id") === cat.id
                          }
                        >
                          <X className="size-4" />
                        </button>
                      </fetcher.Form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
