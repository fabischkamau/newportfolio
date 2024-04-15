import { Link, json, useLoaderData } from "@remix-run/react";
import { ArrowRight, Search } from "lucide-react";
import { client } from "~/db/db.server";
import moment from "moment";
import blog from "./dashboard.blog";

export async function loader() {
  return json(
    await client.article.findMany({
      include: { author: { select: { profile: {} } }, categories: {} },
    })
  );
}

export default function index() {
  const loaderData = useLoaderData<typeof loader>();
  const articles = [1, 2, 3];
  return (
    <div className="p-5 w-full flex-1">
      <section className="w-full">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-slate-700 dark:text-slate-200">
              Blogs
            </h1>
          </div>
          <div className="flex items-center gap-x-3">
            <div className="relative">
              <input
                id="search"
                type="search"
                className="peer bg-inherit border-b-2  dark:border-b-2 dark:bg-transparent dark:text-slate-100 w-full p-2 focus:outline-none placeholder-transparent focus:border-sky-500 text-slate-700 text-sm"
                placeholder="john@doe.com"
              />
              <label
                htmlFor="search"
                className="absolute flex items-center gap-x-2 left-0 -top-3.5 text-slate-600 dark:text-slate-300 text-sm transition-all peer-placeholder-shown:text-base dark:peer-placeholder-shown:text-slate-300 dark:peer-focus:text-slate-300 peer-placeholder-shown:text-slate-500 peer-placeholder-shown:top-2 peer-focus:hidden peer-focus:text-slate-600 peer-focus:text-sm"
              >
                <Search className="size-4" /> Search ...
              </label>
            </div>
            <Link
              to="newblog"
              className="mx-2 px-3 py-2 bg-sky-500 text-sky-50 font-medium rounded-lg hover:bg-sky-600 "
            >
              New Blog
            </Link>
          </div>
        </div>
        <div className="space-y-5">
          <div className="flex flex-col  divide-y divide-slate-400 gap-y-4 w-full justify-center items-center ">
            {loaderData.length >= 0 ? (
              loaderData.map((item) => (
                <article
                  key={item.id}
                  className="flex max-w-2xl py-5 flex-col items-start justify-between"
                >
                  <div className="flex items-center gap-x-4 text-xs">
                    <time dateTime="2020-03-16" className="text-slate-500">
                      {moment(item.createdAt).format("MMM Do YY")}
                    </time>
                    <div className="flex gap-x-4">
                      {item.categories.map((cat) => (
                        <span
                          key={cat.id}
                          className="relative z-10 rounded-full bg-slate-50 px-3 py-1.5 font-medium text-slate-600 hover:bg-slate-100"
                        >
                          {cat.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="group relative">
                    <div className="flex justify-between">
                      <h3 className="mt-3 text-lg font-semibold leading-6 text-slate-900 dark:text-slate-400 dark:group-hover:text-slate-100 group-hover:text-slate-600">
                        <p>
                          <span className="absolute inset-0"></span>
                          {item.title}
                        </p>
                      </h3>
                      <div>
                        {item.published ? (
                          <span className="relative z-10 text-xs rounded-full bg-green-100 px-3 py-1.5 font-medium text-slate-600 dark:text-slate-800 hover:bg-green-100">
                            published
                          </span>
                        ) : (
                          <span className="relative z-10 text-xs rounded-full bg-orange-100 px-3 py-1.5 font-medium text-slate-600 dark:text-slate-800 hover:bg-orange-100">
                            not published
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-slate-600">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <div className="relative mt-8 flex items-center gap-x-4">
                      <img
                        src={
                          item.author.profile?.avatarUrl
                            ? item.author.profile.avatarUrl
                            : ""
                        }
                        alt={
                          item.author.profile?.fullName
                            ? item.author.profile.fullName
                            : ""
                        }
                        className="h-10 w-10 rounded-full bg-slate-50"
                      />
                      <div className="text-sm leading-6">
                        <p className="font-semibold text-slate-900 dark:text-slate-100">
                          <a href="#">
                            <span className="absolute inset-0"></span>
                            {item.author.profile?.fullName}
                          </a>
                        </p>
                        <p className="text-slate-600">Co-Founder / CTO</p>
                      </div>
                    </div>
                    <div>
                      <Link
                        to={`${item.id}`}
                        className="flex gap-x-3 mt-8 text-slate-800 hover:text-sky-500 dark:text-slate-400 dark:hover:text-sky-500 "
                      >
                        Read <ArrowRight className="size-6" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <p className="text-sm text-slate-800 ">
                No posts at the moment, please create one
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
