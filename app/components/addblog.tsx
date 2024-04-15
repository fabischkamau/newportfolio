import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { useRemixForm } from "remix-hook-form";
import { Form, useFetcher, useLoaderData } from "@remix-run/react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { Loader } from "lucide-react";

const schema = zod.object({
  name: zod.string().min(3),
});

type FormData = zod.infer<typeof schema>;

const resolver = zodResolver(schema);

export default function AddBlog() {
  const [isopen, setIsOpen] = useState<boolean>(false);
  const fetcher = useFetcher();
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
  } = useRemixForm<FormData>({
    mode: "onSubmit",
    resolver,
  });
  return (
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
              action="/dashboard/categories"
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
  );
}
