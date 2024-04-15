import { Link, json, useLoaderData } from "@remix-run/react";
import { ArrowRight, Search } from "lucide-react";
import { client } from "~/db/db.server";
import moment from "moment";
import HomeLayout from "~/components/layout";
import { useEffect, useState } from "react";

export async function loader() {
  return json(
    await client.article.findMany({
      include: { author: { select: { profile: {} } }, categories: {} },
    })
  );
}

export default function index() {
  const loaderData = useLoaderData<typeof loader>();
  const [distinctCategories, setDistinctCategories] = useState<any>([]);
  const [filteredPosts, setFilteredPosts] = useState(loaderData); // State to hold the filtered posts

  // Function to handle category change
  const handleCategoryChange = (name: string) => {
    // Filter posts based on selected category
    const filtered = loaderData.filter((post) =>
      post.categories.some((category) => category.name === name)
    );
    setFilteredPosts(filtered);
  };

  useEffect(() => {
    // Function to filter distinct categories
    const getDistinctCategories = () => {
      const categoriesSet = new Set(); // Using Set to store unique categories

      // Iterate over each post and add categories to the set
      loaderData.forEach((post) => {
        post.categories.forEach((category) => {
          categoriesSet.add(category.name); // Add category name to the set
        });
      });

      // Convert Set back to an array to set in state
      const uniqueCategories = Array.from(categoriesSet);
      setDistinctCategories(uniqueCategories);
    };

    // Call the function to filter distinct categories when the component mounts
    getDistinctCategories();
  }, [loaderData, filteredPosts]);
  return (
    <HomeLayout>
      <div className="p-5 w-full flex-1">
        <section className="w-full">
          <div className="my-10 flex flex-col justify-center items-center gap-y-5">
            <h3 className="text-slate-600 dark:text-slate-300 ">
              filter categories
            </h3>
            <div className="flex gap-x-4 text-sm items-center justify-center w-full">
              {distinctCategories.map((cat) => {
                return (
                  <button
                    className="relative z-10 focus:outline-none rounded-full bg-slate-300 px-3 py-1.5 font-medium text-slate-600 hover:bg-slate-200"
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="space-y-5">
            <div className="flex flex-col  divide-y divide-slate-400 gap-y-4 w-full justify-center items-center ">
              {filteredPosts.length >= 0 ? (
                filteredPosts.map((item) => (
                  <article
                    key={item.id}
                    className="flex max-w-2xl py-5 flex-col items-start "
                  >
                    <div className="flex items-center gap-x-4 text-xs">
                      <time
                        dateTime={moment(item.createdAt).format("MMM Do YY")}
                        className="text-slate-500"
                      >
                        {moment(item.createdAt).format("MMM Do YY")}
                      </time>
                      <div className="flex gap-x-4">
                        {item.categories.map((cat) => (
                          <span
                            key={cat.id}
                            className="relative z-10 rounded-full bg-slate-300 px-3 py-1.5 font-medium text-slate-600 hover:bg-slate-200"
                          >
                            {cat.name}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="group relative">
                      <div className="flex justify-between">
                        <h3 className="mt-3 text-lg font-semibold leading-6 text-slate-900 dark:text-slate-300 dark:group-hover:text-slate-100 group-hover:text-slate-600">
                          <p>
                            <span className="absolute inset-0"></span>
                            {item.title}
                          </p>
                        </h3>
                      </div>

                      <p className="mt-5 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
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
                  No Blogs at the moment!
                </p>
              )}
            </div>
          </div>
        </section>
      </div>
    </HomeLayout>
  );
}
