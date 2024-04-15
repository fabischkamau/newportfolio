import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import { ChevronLeft, ChevronLeftCircle, Loader } from "lucide-react";
import moment from "moment";
import { client } from "~/db/db.server";

export async function loader({ params }: LoaderFunctionArgs) {
  const blogId = params.blogId;
  if (typeof blogId !== "string") {
    return redirect("/dashboard/blog");
  }
  return json(
    await client.article.findUnique({
      where: { id: blogId },
      include: {
        author: { select: { profile: {} } },
        categories: {},
      },
    })
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const _action = formData.get("_action");
  const bid = formData.get("id");
  if (typeof bid !== "string") {
    return json("id is required");
  }
  if (_action === "delete") {
    return await client.article.delete({ where: { id: bid } }).then(() => {
      return redirect("/dashboard/blog");
    });
  }
  return await client.article
    .update({
      where: { id: bid },
      data: { published: true },
    })
    .then(() => {
      return redirect("/dashboard/blog");
    });
}

export default function index() {
  const loaderData = useLoaderData<typeof loader>();
  const fetcher = useFetcher();
  return (
    <div className="p-10">
      <div>
        <Link
          to="/dashboard/blog"
          className="p-2 rounded-xl hover:bg-slate-300 bg-slate-100 dark:bg-slate-600 dark:text-slate-300 dark:hover:bg-slate-400 flex items-center size-10"
        >
          <ChevronLeft className="size-7" />
        </Link>
      </div>
      <section id="profile">
        <div className="relative mt-8 flex items-center gap-x-4">
          <img
            src={
              loaderData?.author.profile?.avatarUrl
                ? loaderData?.author.profile.avatarUrl
                : ""
            }
            alt={
              loaderData?.author.profile?.fullName
                ? loaderData?.author.profile.fullName
                : ""
            }
            className="h-10 w-10 rounded-full bg-slate-50"
          />
          <div className="text-sm leading-6">
            <p className="font-semibold text-slate-900 dark:text-slate-100">
              <a href="#">
                <span className="absolute inset-0"></span>
                {loaderData?.author.profile?.fullName}
              </a>
            </p>
            <time dateTime="2020-03-16" className="text-slate-500">
              {moment(loaderData?.createdAt).format("MMM Do YY")}
            </time>
          </div>
        </div>
      </section>
      <section id="content" className="mt-10  ">
        <div
          className="prose relative dark:prose-invert prose-img:rounded-lg prose-p:text-sm   prose-sm  max-w-6xl prose-a:text-sky-500 lg:prose-lg xl:prose-2xl    p-2 "
          dangerouslySetInnerHTML={{ __html: loaderData?.content! }}
        />
      </section>
      <section className="mt-10 flex flex-col gap-y-3" id="footer">
        <div className="text-lg font-semibold text-slate-800 dark:text-slate-300">
          <h3>Tags</h3>
        </div>
        <div className="flex gap-x-4 ">
          {loaderData?.categories.map((cat) => (
            <span
              key={cat.id}
              className="relative z-10 rounded-full bg-slate-50 dark:bg-slate-500 dark:text-slate-100 px-3 py-1.5 font-medium text-slate-600 hover:bg-slate-100"
            >
              {cat.name}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <fetcher.Form method="post" name="delete">
            <input type="hidden" name="id" value={loaderData?.id} />
            <button
              name="_action"
              value="delete"
              className=" px-4 py-2 rounded max-w-sm items-center justify-center bg-rose-500 hover:bg-rose-400 text-white font-semibold text-center block w-full focus:outline-none  focus:ring-opacity-80 cursor-pointer"
            >
              {fetcher.state === "submitting" &&
              fetcher.formData?.get("_action") === "delete" ? (
                <p className="flex items-center justify-center">
                  <Loader className="mr-2 size-5 animate-spin" />
                  please wait
                </p>
              ) : (
                "Delete"
              )}
            </button>
          </fetcher.Form>
          {loaderData?.published ? null : (
            <fetcher.Form method="post" name="publish">
              <input type="hidden" name="id" value={loaderData?.id} />
              <button
                name="_action"
                value="publish"
                className=" px-4 py-2 rounded max-w-sm items-center justify-center bg-green-500 hover:bg-green-400 text-white font-semibold text-center block w-full focus:outline-none  focus:ring-opacity-80 cursor-pointer"
              >
                {fetcher.state === "submitting" &&
                fetcher.formData?.get("_action") === "publish" ? (
                  <p className="flex items-center justify-center">
                    <Loader className="mr-2 size-5 animate-spin" />
                    please wait
                  </p>
                ) : (
                  "Publish"
                )}
              </button>
            </fetcher.Form>
          )}
        </div>
      </section>
    </div>
  );
}
