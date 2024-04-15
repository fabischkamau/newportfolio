import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import DashBoardLayout from "~/components/dashboardlayout";
import { client } from "~/db/db.server";

import { getSession } from "~/utils/sessions.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.has("userId")) {
    return redirect("/login");
  }

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

type USER = {
  id: string;
  email: string;
  profile: {
    id: string;
    userId: string;
    fullName: string | null;
    bio: string | null;
    avatarUrl: string | null;
    metadata: string | null;
    updatedAt: Date;
  } | null;
} | null;

export default function dashboard() {
  const loaderData = useLoaderData<typeof loader>();
  return (
    <DashBoardLayout user={loaderData as USER}>
      <Outlet />
    </DashBoardLayout>
  );
}
