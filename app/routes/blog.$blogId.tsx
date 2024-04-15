import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { ChevronLeft, ChevronLeftCircle, Loader } from "lucide-react";
import moment from "moment";
import HomeLayout from "~/components/layout";
import { client } from "~/db/db.server";

export async function loader({ params }: LoaderFunctionArgs) {
  const blogId = params.blogId;

  if (typeof blogId !== "string") {
    return redirect("/blog");
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

export default function index() {
  const loaderData = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  return (
    <HomeLayout>
      <div className="p-10">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl hover:bg-slate-300 bg-slate-400 dark:bg-slate-600 dark:text-slate-300 focus:outline-none dark:hover:bg-slate-400 flex items-center size-10"
          >
            <ChevronLeft className="size-7" />
          </button>
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
                className="relative z-10 focus:outline-none rounded-full bg-slate-300 px-3 py-1.5 font-medium text-slate-600 hover:bg-slate-200"
              >
                {cat.name}
              </span>
            ))}
          </div>
        </section>
      </div>
    </HomeLayout>
  );
}
