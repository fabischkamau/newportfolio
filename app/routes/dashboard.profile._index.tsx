import profileImage from "~/images/user-06.png";

import { LoaderFunctionArgs, json } from "@remix-run/node";
import { getSession } from "~/utils/sessions.server";
import { client } from "~/db/db.server";
import { Link, useLoaderData } from "@remix-run/react";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const user = await client.user.findUnique({
    where: { id: session.get("userId") },
    select: {
      id: true,
      email: true,
      profile: true,
    },
  });
  return json(user);
}

export default function index() {
  const loaderData = useLoaderData<typeof loader>();
  return (
    <div className="p-10">
      {loaderData?.profile ? (
        <div>
          <section id="title">
            <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              Profile Settings
            </h1>
          </section>
          <section id="avatar">
            <div className="max-w-md w-full flex justify-between items-center">
              <div className="size-20 rounded-full">
                <img
                  src={
                    loaderData.profile.avatarUrl
                      ? loaderData.profile.avatarUrl
                      : profileImage
                  }
                  alt="profile"
                  className="w-full h-full rounded-full"
                />
              </div>
            </div>
          </section>
          <section
            id="metadata"
            className="mt-5 max-w-xl gap-y-3 flex flex-col"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="space-y-3">
                <label htmlFor="fullName" className="text-slate-500 text-sm">
                  FullName:
                </label>
                <p className="text-slate-800">{loaderData.profile.fullName}</p>
              </div>
              <div className="space-y-3">
                <label htmlFor="fullName" className="text-slate-500 text-sm">
                  Email:
                </label>
                <p className="text-slate-800">{loaderData.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="space-y-3">
                <label htmlFor="bio" className="text-slate-500 text-sm">
                  Bio
                </label>
                <p className="text-slate-800">{loaderData.profile.bio}</p>
              </div>
              <div className="space-y-3">
                <label htmlFor="fullName" className="text-slate-500 text-sm">
                  Email:
                </label>
                <p className="text-slate-800">{loaderData.email}</p>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div>
          <p className="text-slate-800 text-sm">
            Your profile is empty{" "}
            <Link to="create" className="text-sky-500">
              create new
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
