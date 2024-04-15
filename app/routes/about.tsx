import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Github, Linkedin, MessageSquare } from "lucide-react";
import javascriptImg from "~/images/javascript.svg";
import reactImg from "~/images/reaact.svg";
import remixImg from "~/images/remix.svg";
import tailwindImg from "~/images/Tailwind.svg";
import typescriptImg from "~/images/typescript.svg";
import postgressImg from "~/images/postgresql-logo-svgrepo-com.svg";
import neo4jImg from "~/images/neo4j-icon.svg";
import shadcnImg from "~/images/shadcn-ui-seeklogo.svg";
import setup from "~/images/setup.jpg";
import HomeLayout from "~/components/layout";

export const meta: MetaFunction = () => {
  return [
    { title: "About" },
    { name: "description", content: "Fabisch Kamau About" },
  ];
};

export default function Index() {
  return (
    <HomeLayout>
      <div className="my-5  ">
        <section className="flex flex-col-reverse md:flex-row" id="aboutme">
          <div className="block space-y-3  mt-8 md:mt-0">
            <h1 className="dark:text-slate-100 text-slate-700 font-bold text-4xl">
              Hi, I'm Fabisch Kamau
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300  ">
              Welcome to my corner of the web! I'm thrilled to have you here.
            </p>
            <br />
            <p className="text-sm text-slate-600 dark:text-slate-300  ">
              My journey into the world of web development wasn't exactly a
              straight line. In fact, it was a meandering path filled with
              detours, experimentation, and, of course, a healthy dose of
              passion. From my early encounters with HTML and CSS tinkering to
              delving into the depths of JavaScript and backend technologies,
              every step along the way has been a lesson and an adventure.
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300  ">
              {" "}
              What drives me most in this ever-evolving field is the boundless
              potential for creativity and problem-solving. The ability to craft
              digital experiences that seamlessly blend form and function
              ignites a fire within me like nothing else. Whether it's building
              sleek, responsive websites or architecting robust web
              applications, I thrive on the challenges and rewards that come
              with each project.
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300  ">
              But beyond the code, my ambitions extend far into the future. I
              envision myself not just as a proficient developer, but as a
              visionary architect shaping the digital landscape. From mastering
              emerging technologies to fostering inclusive and accessible
              designs, I aspire to leave a lasting impact on the web development
              community and beyond.{" "}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300  ">
              {" "}
              So, join me on this exhilarating journey as we navigate the
              ever-changing currents of web development together. Whether you're
              a fellow enthusiast, a curious learner, or a prospective
              collaborator, I'm excited to connect and explore the endless
              possibilities that lie ahead. Let's code, create, and conquer the
              digital realm, one line at a time.
            </p>{" "}
          </div>
          <div className="w-full space-y-4 flex-nowrap">
            <div>
              <img
                src={setup}
                alt="coding setup"
                className="rounded-md object-cover md:rotate-6 md:aspect-square aspect-video"
                loading="lazy"
              />
            </div>
            <div>
              <Link
                to="https://github.com/fabischkamau"
                target="_blank"
                className="group flex space-x-3 items-center font-semibold text-slate-700 dark:text-slate-500 dark:hover:text-sky-500 hover:text-sky-500 transform  duration-700"
              >
                <Github className="text-slate-700 dark:slate-300 h-5 w-5 group-hover:text-sky-500 dark:group-hover:text-sky-500" />{" "}
                <p>Follow on Github</p>
              </Link>
              <Link
                to="https://www.linkedin.com/in/fabisch-kamau-398694113/"
                target="_blank"
                className="group flex space-x-3 items-center font-semibold text-slate-700 dark:text-slate-500 hover:text-sky-500 dark:hover:text-sky-500  transform  duration-700"
              >
                <Linkedin className="text-slate-700 dark:slate-300 h-5 w-5 group-hover:text-sky-500 dark:group-hover:text-sky-500" />{" "}
                <p> Follow on LinkedIn</p>
              </Link>
            </div>

            <div>
              <Link
                to="mailto:developerfabisch@gmail.com"
                target="_blank"
                className=" font-semibold flex items-center justify-center gap-x-4 text-slate-500 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-500  transform  duration-700"
              >
                <MessageSquare /> Message Me
              </Link>
            </div>
          </div>
        </section>
        <section id="skills" className="mt-10 block space-y-5">
          <div>
            <h3 className="font-bold text-xl text-slate-700 dark:text-slate-300">
              Skills
            </h3>
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
          <div>
            <ul>
              <li className="text-slate-600 text-sm dark:text-slate-300">
                React
              </li>
              <li className="text-slate-600 text-sm dark:text-slate-300">
                Remix.run
              </li>
              <li className="text-slate-600 text-sm dark:text-slate-300">
                Testing (Unit / Component / Integration)
              </li>
              <li className="text-slate-600 text-sm dark:text-slate-300">
                TailWindCss
              </li>
              <li className="text-slate-600 text-sm dark:text-slate-300">
                Shadcn
              </li>
              <li className="text-slate-600 text-sm dark:text-slate-300">
                Neo4j
              </li>
              <li className="text-slate-600 text-sm dark:text-slate-300">
                Postgress
              </li>
              <li className="text-slate-600 text-sm dark:text-slate-300">
                AWS / GCP
              </li>
              <li className="text-slate-600 text-sm dark:text-slate-300">
                Prisma
              </li>
              <li className="text-slate-600 text-sm dark:text-slate-300">
                NodeJs
              </li>
            </ul>
          </div>
        </section>
      </div>
    </HomeLayout>
  );
}
