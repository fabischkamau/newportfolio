import HomeLayout from "~/components/layout";
import { useRemixForm, getValidatedFormData } from "remix-hook-form";
import { Form } from "@remix-run/react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { useEffect } from "react";
import fk from "~/images/fk.jfif";
import { Link } from "@remix-run/react";
import { commitSession, getSession } from "~/utils/sessions.server";
import { signUpUser } from "~/db/user.server";

const schema = zod.object({
  email: zod.string().email("must be email").min(1),
  password: zod.string().min(8),
});
type FormData = zod.infer<typeof schema>;

const resolver = zodResolver(schema);

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.has("userId")) {
    // Redirect to the home page if they are already signed in.
    return redirect("/dashboard");
  }
  return {};
}

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const {
    errors,
    data,
    receivedValues: defaultValues,
  } = await getValidatedFormData(request, resolver);
  if (errors) {
    return json(errors, defaultValues);
  }
  try {
    const results = await signUpUser(data.email, data.password);
    session.set("userId", results.id);
  } catch (error) {
    return json(error);
  }
  return redirect("/dashboard", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function signup() {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useRemixForm<FormData>({
    mode: "onSubmit",
    resolver,
  });
  useEffect(() => {
    console.log(errors);
  }, [errors]);
  return (
    <HomeLayout>
      <div className="h-full flex flex-col items-center justify-center">
        <div className="mt-10 flex flex-col items-center gap-y-2">
          <img
            src={fk}
            alt="fabisch kamau"
            className="size-20 rounded-full object-cover"
          />
          <h4 className="text-slate-800 dark:text-slate-100 text-xl font-semibold">
            Register for an Account
          </h4>
        </div>
        <Form
          className="mt-12 max-w-md w-full"
          onSubmit={handleSubmit}
          method="post"
        >
          <div className="relative">
            <input
              id="email"
              type="email"
              className="peer bg-inherit border-b-2 aria-[invalid='true']:border-rose-600 dark:border-b-2 dark:bg-transparent dark:text-slate-100 w-full p-2 focus:outline-none placeholder-transparent focus:border-sky-500 text-slate-700 text-sm"
              placeholder="john@doe.com"
              aria-invalid={errors.email ? true : false}
              {...register("email")}
            />
            <label
              htmlFor="email"
              className="absolute left-0 -top-3.5 text-slate-600 dark:text-slate-300 text-sm transition-all peer-placeholder-shown:text-base dark:peer-placeholder-shown:text-slate-300 dark:peer-focus:text-slate-300 peer-placeholder-shown:text-slate-500 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-slate-600 peer-focus:text-sm"
            >
              Email address
            </label>
            <p className="mt-2 hidden peer-aria-[invalid='true']:flex text-rose-600 text-sm">
              {errors.password && errors.password.message}
            </p>
          </div>
          <div className="mt-10 relative">
            <input
              id="password"
              type="password"
              className="peer bg-inherit border-b-2 aria-[invalid='true']:border-rose-600 dark:border-b-2 dark:bg-transparent dark:text-slate-100 w-full p-2 focus:outline-none placeholder-transparent focus:border-sky-500 text-slate-700 text-sm"
              placeholder="Password"
              aria-invalid={errors.password ? true : false}
              {...register("password")}
            />
            <label
              htmlFor="password"
              className="absolute left-0 -top-3.5 text-slate-600 dark:text-slate-300 text-sm transition-all peer-placeholder-shown:text-base dark:peer-placeholder-shown:text-slate-300 dark:peer-focus:text-slate-300 peer-placeholder-shown:text-slate-500 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-slate-600 peer-focus:text-sm"
            >
              Password
            </label>
            <p className="mt-2 hidden peer-aria-[invalid='true']:flex text-rose-600 text-sm">
              {errors.password && errors.password.message}
            </p>
          </div>

          <button
            type="submit"
            className="mt-20 px-4 py-2 rounded  bg-sky-500 hover:bg-sky-400 text-white font-semibold text-center block w-full focus:outline-none  focus:ring-opacity-80 cursor-pointer"
          >
            Sign Up
          </button>
        </Form>
        <p className=" text-slate-600 mt-5 dark:text-slate-400 text-sm">
          Already have an account{" "}
          <Link to={"/login"} className="text-sky-500 hover:text-sky-700">
            login
          </Link>
        </p>
      </div>
    </HomeLayout>
  );
}
