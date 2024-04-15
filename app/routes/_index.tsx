import type { MetaFunction } from "@remix-run/node";
import {
  ArrowDownToLine,
  ArrowRight,
  BriefcaseBusiness,
  Github,
  Linkedin,
} from "lucide-react";
import javascriptImg from "~/images/javascript.svg";
import reactImg from "~/images/reaact.svg";
import remixImg from "~/images/remix.svg";
import tailwindImg from "~/images/Tailwind.svg";
import typescriptImg from "~/images/typescript.svg";
import postgressImg from "~/images/postgresql-logo-svgrepo-com.svg";
import neo4jImg from "~/images/neo4j-icon.svg";
import shadcnImg from "~/images/shadcn-ui-seeklogo.svg";
import { Link, json, useLoaderData } from "@remix-run/react";
import setup from "~/images/joan-gamell-ZS67i1HLllo-unsplash.jpg";
import setuplight from "~/images/lauren-mancke-aOC7TSLb1o8-unsplash.jpg";
import HomeLayout from "~/components/layout";
import { client } from "~/db/db.server";
import moment from "moment";

export const meta: MetaFunction = () => {
  return [
    { title: "Fabisch Kamau" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader() {
  return Promise.all([
    await client.article.findMany({
      where: {
        published: true,
      },
      include: { author: { select: { profile: {} } }, categories: {} },
    }),
    await client.project.findFirst({ take: 5 }),
  ]).then((result) => {
    return result;
  });
}

export default function Index() {
  const loaderData = useLoaderData<typeof loader>();
  console.log(loaderData);
  const articles = [1, 2, 3];
  return (
    <HomeLayout>
      <div className="sm:h-dvh md:h-full w-full mb-10">
        <section id="hero" className="my-10 flex justify-between">
          <div className="space-y-5 ">
            <h2 className="font-bold text-4xl dark:text-slate-100 text-slate-700">
              FullStack Developer and Remix Enthusiast
            </h2>
            <div>
              <p className="text-base dark:text-slate-300 text-slate-600 ">
                I’m Fabisch, a FullStack Developer with a focus on fullstack web
                development. I love building things with React and TypeScript.
                I’m currently very excited about{" "}
                <span>
                  <Link
                    to="https://remix.run/"
                    className="text-sky-500"
                    target="_blank"
                  >
                    Remix.run
                  </Link>
                </span>
                . I’m also a big fan of{" "}
                <span>
                  <Link
                    to="https://tailwindcss.com/"
                    className="text-sky-500"
                    target="_blank"
                  >
                    Tailwind CSS
                  </Link>
                </span>{" "}
                and{" "}
                <span>
                  <Link
                    to="https://ui.shadcn.com/"
                    className="text-sky-500"
                    target="_blank"
                  >
                    shadcn
                  </Link>
                  .
                </span>
              </p>
            </div>

            <div className="flex space-x-3">
              <Link to="#" target="_blank">
                <Github className="text-slate-400 dark:slate-800 h-5 w-5" />
              </Link>
              <Link to="#" target="_blank">
                <Linkedin className="text-slate-400 dark:slate-800 h-5 w-5" />
              </Link>
            </div>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-4">
              <img src={reactImg} alt="react" className="h-10" />
              <img src={javascriptImg} alt="javascript" className="h-10" />
              <img src={remixImg} alt="remix" className="h-10" />
              <img src={tailwindImg} alt="tailwind" className="h-10" />
              <img src={typescriptImg} alt="typescript" className="h-10" />
              <img src={shadcnImg} alt="shadcn" className="h-10" />
              <img src={neo4jImg} alt="neo4j" className="h-10" />
              <img src={postgressImg} alt="postgress" className="h-10" />
            </div>
          </div>
          <div className="w-full relative hidden lg:flex">
            <img
              src={setup}
              alt="setup"
              className="aspect-video rotate-3 rounded-xl shadow-xl hidden dark:flex"
              loading="lazy"
            />
            <img
              src={setuplight}
              alt="setup"
              className="aspect-video rotate-3 rounded-xl shadow-xl flex dark:hidden"
              loading="lazy"
            />
          </div>
        </section>
        <section className="my-10">
          <div className="flex flex-col-reverse gap-y-5 lg:gap-y-0 lg:flex-row ">
            <div className="space-y-5">
              <h1 className="text-xl font-semibold text-slate-700 dark:text-slate-300">
                Blog
              </h1>
              <div className="space-y-5"></div>
              {loaderData[0].length > 0 ? (
                loaderData[0].map((item) => (
                  <article
                    key={item.id}
                    className="flex max-w-xl flex-col items-start justify-between"
                  >
                    <div className="flex items-center gap-x-4 text-xs">
                      <time dateTime="2020-03-16" className="text-slate-500">
                        {moment(item?.createdAt).format("MMM Do YY")}
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
                      <h3 className="mt-3 text-lg font-semibold leading-6 text-slate-900 dark:text-slate-200 dark:group-hover:text-slate-100 group-hover:text-slate-600">
                        <Link to={`/blog/${item.id}`}>
                          <span className="absolute inset-0"></span>

                          {item.title}
                        </Link>
                      </h3>
                      <p className="mt-5 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <div className="relative mt-8 flex items-center gap-x-4">
                        <img
                          src={
                            item.author.profile?.avatarUrl
                              ? item.author.profile?.avatarUrl
                              : ""
                          }
                          alt={
                            item.author.profile?.fullName
                              ? item.author.profile?.fullName
                              : ""
                          }
                          className="h-10 w-10 rounded-full bg-slate-50"
                        />
                        <div className="text-sm leading-6">
                          <p className="font-semibold text-slate-900 dark:text-slate-100">
                            <Link to="/about">
                              <span className="absolute inset-0"></span>
                              {item.author.profile?.fullName}
                            </Link>
                          </p>
                          <p className="text-slate-600">Co-Founder / CTO</p>
                        </div>
                      </div>
                      <div>
                        <Link
                          to={`/blog/${item.id}`}
                          className="flex gap-x-3 mt-8 text-slate-800 hover:text-sky-500 dark:text-slate-400 dark:hover:text-sky-500 "
                        >
                          Read <ArrowRight className="size-6" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <p>No Blogs availble at the moment!</p>
              )}
            </div>
            <div className="lg:mx-10">
              <div className="max-w-md shadow-lg bg-inherit dark:bg-slate-800 space-y-5 p-4 rounded-xl ">
                <div className="gap-y-6 flex flex-col">
                  <div className="w-full">
                    <div className="flex items-center space-x-3 text-slate-800 font-semibold text-base dark:text-slate-300 ">
                      <BriefcaseBusiness /> <h3> Projects</h3>
                    </div>
                  </div>
                  <div className="w-full gap-y-2 flex flex-col">
                    <div className="flex justify-between items-center w-full">
                      <div>
                        <Link
                          to="#"
                          className="text-slate-800 font-semibold text-base dark:text-slate-300 dark:hover:text-slate-100"
                        >
                          Portfolio
                        </Link>
                      </div>
                      <div>
                        <span className="relative z-10 rounded-full text-xs bg-green-100 px-3 py-1.5 font-medium text-slate-600 hover:bg-slate-100">
                          completed
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-slate-600 line-clamp-3 dark:text-slate-400 text-sm">
                        I built my portfolio website where i can showcase my
                        skills, share my ideas and have a free space to write my
                        own articles.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full space-y-3 block">
                  <div>
                    <Link
                      to="about#skills"
                      className="w-full font-semibold text-base flex gap-x-2 items-center justify-center text-slate-900 dark:text-slate-300 dark:hover:text-sky-500 space-x-2 hover:text-sky-600 transform  duration-300"
                    >
                      Skills <ArrowRight className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </HomeLayout>
  );
}
