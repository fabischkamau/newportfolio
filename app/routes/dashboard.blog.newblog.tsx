import { useLoaderData, useNavigate } from "@remix-run/react";
import { ChevronLeftCircle, Loader } from "lucide-react";
import Tiptap from "~/components/tiptap";
import { useRemixForm, getValidatedFormData } from "remix-hook-form";
import { Form } from "@remix-run/react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import SearchableCategorySelector from "~/components/categoryselect";
import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { getSession } from "~/utils/sessions.server";
import { client } from "~/db/db.server";

const schema = zod.object({
  title: zod.string().min(5),
  description: zod.string().min(10),
  categories: zod.string().min(1),
  content: zod.string().min(255),
});
type FormData = zod.infer<typeof schema>;

const resolver = zodResolver(schema);

export async function loader() {
  return await client.category.findMany();
}

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const {
    errors,
    data: postdata,
    receivedValues: defaultValues,
  } = await getValidatedFormData<zod.infer<typeof schema>>(request, resolver);
  if (errors) {
    return json(errors);
  }

  const categories = postdata.categories.split(",").map((item) => {
    return { id: item };
  });

  return await client.article
    .create({
      data: {
        title: postdata.title,
        description: postdata.description,
        content: postdata.content,
        author: { connect: { id: session.get("userId") } },
        categories: { connect: categories },
      },
    })
    .then((data) => {
      return redirect(`/dashboard/blog/${data.id}`);
    })
    .catch((error) => {
      return json(error);
    });
}

export default function newblog() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    setValue,
  } = useRemixForm<FormData>({
    mode: "onSubmit",
    resolver,
  });
  const loaderData = useLoaderData<typeof loader>();
  const categories = loaderData.map((cat) => {
    return { value: cat.id, label: cat.name };
  });
  return (
    <div className="p-10 flex flex-col gap-y-4">
      <div>
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          <ChevronLeftCircle />
        </button>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg text-slate-900 dark:text-slate-100 font-semibold">
            Create Your Content
          </h3>
        </div>
      </div>
      <div>
        <Form
          method="post"
          onSubmit={handleSubmit}
          className="flex flex-col gap-y-4"
        >
          <div className="flex flex-col gap-y-3">
            <label htmlFor="title" className="text-slate-700 text-sm">
              Title:
            </label>
            <input
              type="text"
              {...register("title")}
              className="p-2 max-w-md peer border-2 border-slate-400 aria-[invalid='true']:border-rose-600 focus:outline-none focus:border-sky-600 disabled:opacity-55 rounded-lg disabled:border-0 bg-white dark:bg-inherit disabled:bg-slate-200"
              aria-invalid={errors.title?.message ? true : false}
            />
            <p className="mt-2 hidden peer-aria-[invalid='true']:flex text-rose-600 text-sm">
              {errors.title?.message && errors.title.message}
            </p>
          </div>
          <div className="flex flex-col gap-y-3">
            <label htmlFor="description" className="text-slate-700 text-sm">
              Description:
            </label>
            <textarea
              {...register("description")}
              className="p-2 max-w-md resize border-2 peer border-slate-400 aria-[invalid='true']:border-rose-600 focus:outline-none focus:border-sky-600 disabled:opacity-55 rounded-lg disabled:border-0 bg-white dark:bg-inherit disabled:bg-slate-200"
              aria-invalid={errors.description?.message ? true : false}
            />
            <p className="mt-2 hidden peer-aria-[invalid='true']:flex text-rose-600 text-sm">
              {errors.description?.message && errors.description.message}
            </p>
          </div>
          <div className="flex flex-col gap-y-3">
            {errors.categories?.message && (
              <p className="mt-2  text-rose-600 text-sm">
                {errors.categories?.message}
              </p>
            )}
            <label htmlFor="categories" className="text-slate-700 text-sm">
              Category:
            </label>
            <SearchableCategorySelector
              categories={categories}
              setValue={setValue}
            />
          </div>
        </Form>
      </div>
      <div className="flex flex-col gap-y-3">
        <label htmlFor="article" className="text-slate-700 text-sm">
          Article:
        </label>
        {errors.content?.message && (
          <p className="mt-2  text-rose-600 text-sm">
            {errors.content?.message}
          </p>
        )}
        <div>
          <Tiptap setValue={setValue} />
        </div>
      </div>
      <div>
        <button
          onClick={handleSubmit}
          className=" px-4 py-2 rounded max-w-sm items-center justify-center bg-sky-500 hover:bg-sky-400 text-white font-semibold text-center block w-full focus:outline-none  focus:ring-opacity-80 cursor-pointer"
        >
          {" "}
          {isSubmitting ? (
            <p className="flex items-center justify-center">
              <Loader className="mr-2 size-5 animate-spin" />
              please wait
            </p>
          ) : (
            "submit"
          )}
        </button>
      </div>
    </div>
  );
}
