import { ChangeEvent, useEffect, useRef, useState } from "react";
import profileImage from "~/images/user-06.png";
import { Loader } from "lucide-react";
import axios, { AxiosResponse } from "axios";
import { useLoaderData } from "@remix-run/react";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { getSession } from "~/utils/sessions.server";
import { client } from "~/db/db.server";
import { useRemixForm, getValidatedFormData } from "remix-hook-form";
import { Form, useActionData } from "@remix-run/react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

const schema = zod.object({
  fullName: zod.string().min(1),
  bio: zod.string().min(8),
  avatarUrl: zod.string(),
});
type FormData = zod.infer<typeof schema>;

const resolver = zodResolver(schema);

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  const user = await client.user.findUnique({
    where: { id: session.get("userId") },
    include: { profile: {} },
  });
  return json(user);
}

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const {
    errors,
    data: userdata,
    receivedValues: defaultValues,
  } = await getValidatedFormData<zod.infer<typeof schema>>(request, resolver);
  if (errors) {
    return json(errors, defaultValues);
  }
  return await client.profile
    .create({
      data: {
        fullName: userdata.fullName,
        bio: userdata.bio,
        userId: session.get("userId")!,
        avatarUrl: userdata.avatarUrl,
      },
    })
    .then(() => {
      return redirect("/dashboard/profile");
    });
}

export default function index() {
  const [uploadedImage, setUplaodedImage] = useState<string>();
  const loaderData = useLoaderData<typeof loader>();
  const inputRef = useRef<HTMLInputElement>(null);
  const inputRefAvatar = useRef<HTMLInputElement>(null);
  const handleButtonClick = () => {
    inputRef.current?.click();
  };
  const [uploadStatus, setUploadStatus] = useState<boolean>(false);
  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
    getFieldState,
  } = useRemixForm<FormData>({
    mode: "onSubmit",
    resolver,
  });
  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      // Handle the selected file (e.g., upload, process, etc.)
      const formData = new FormData();
      formData.append("image", selectedFile);
      try {
        const response: AxiosResponse = await axios.post(
          "http://localhost:5173/action/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: () => {
              setUploadStatus(true);
            },
          }
        );
        if (response.status === 200) {
          setUploadStatus(false);
          setUplaodedImage(response.data.link);
          inputRefAvatar.current?.value === response.data.link;
          setValue("avatarUrl", response.data.link);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  useEffect(() => {
    console.log(getFieldState("avatarUrl"));
  }, []);
  return (
    <div className="p-10">
      <section id="title">
        <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">
          Profile Settings
        </h1>
      </section>
      <section id="avatar">
        <div className="max-w-md w-full flex justify-between items-center">
          <div className="size-20 rounded-full">
            <img
              src={uploadedImage ? uploadedImage : profileImage}
              alt="profile"
              className="w-full h-full rounded-full"
            />
          </div>
          <div>
            {uploadStatus ? (
              <button
                disabled
                className="p-2 cursor-pointer bg-sky-500 hover:bg-sky-600 text-sky-50 rounded-lg shadow-md flex gap-x-1"
              >
                <Loader className="mr-2 size-5 animate-spin" />
                Please wait
              </button>
            ) : (
              <label
                htmlFor="change avatar"
                className="p-2 cursor-pointer bg-sky-500 hover:bg-sky-600 text-sky-50 rounded-lg shadow-md"
                onClick={handleButtonClick}
              >
                <input
                  ref={inputRef}
                  type="file"
                  name="image"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <span>Change</span>
              </label>
            )}
          </div>
        </div>
      </section>
      <section id="metadata" className="mt-5 max-w-xl gap-y-3 flex flex-col ">
        {errors.avatarUrl?.message && (
          <p className="mt-2 hidden peer-aria-[invalid='true']:flex text-rose-600 text-sm">
            {errors.avatarUrl.message}
          </p>
        )}

        <form
          method="post"
          className="flex flex-col gap-y-4"
          onSubmit={handleSubmit}
        >
          <div className="grid grod-col-1 md:grid-cols-2 gap-x-10">
            <div className="flex flex-col gap-y-3">
              <label htmlFor="fullname" className="text-slate-600 text-sm">
                FullName:
              </label>
              <input
                type="text"
                {...register("fullName")}
                className="p-2 border-2 border-slate-600 aria-[invalid='true']:border-rose-600 focus:outline-none focus:border-sky-600 disabled:opacity-55 rounded-lg disabled:border-0 bg-white dark:bg-inherit disabled:bg-slate-200"
                aria-invalid={errors.fullName?.message ? true : false}
              />
              <p className="mt-2 hidden peer-aria-[invalid='true']:flex text-rose-600 text-sm">
                {errors.fullName?.message && errors.fullName.message}
              </p>
            </div>
            <div className="flex flex-col gap-y-3">
              <label htmlFor="email" className="text-slate-600 text-sm">
                Email:
              </label>
              <input
                type="text"
                defaultValue={loaderData?.email}
                disabled
                className="p-2 border-2 border-slate-600 focus:outline-none focus:border-sky-600 disabled:opacity-55 rounded-lg disabled:border-0 bg-white dark:bg-inherit disabled:bg-slate-200"
              />
            </div>
          </div>
          <div className="grid grod-col-1 md:grid-cols-2 gap-x-10">
            <div className="flex flex-col gap-y-3">
              <label htmlFor="bio" className="text-slate-600 text-sm">
                Bio:
              </label>
              <textarea
                {...register("bio")}
                className="p-2 border-2 border-slate-600 aria-[invalid='true']:border-rose-600 focus:outline-none focus:border-sky-600 disabled:opacity-55 rounded-lg disabled:border-0 bg-white dark:bg-inherit disabled:bg-slate-200 resize"
                aria-invalid={errors.bio?.message ? true : false}
              />
              <p className="mt-2 hidden peer-aria-[invalid='true']:flex text-rose-600 text-sm">
                {errors.bio?.message && errors.bio.message}
              </p>
            </div>
          </div>
          <div className="flex  w-full">
            <button
              type="submit"
              className="text-base bg-sky-500 text-sky-50 hover:bg-sky-600 rounded-lg p-2"
            >
              Update
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
