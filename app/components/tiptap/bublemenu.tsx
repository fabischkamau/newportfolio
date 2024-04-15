import { Listbox } from "@headlessui/react";
import { useCurrentEditor } from "@tiptap/react";
import clsx from "clsx";
import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Italic,
  Link,
  List,
  ListMinus,
  ListOrdered,
  Redo,
  SeparatorHorizontal,
  Strikethrough,
  Undo,
  SquareCode,
  MessageSquareQuote,
  Underline,
  Brush,
  CaseSensitive,
} from "lucide-react";
import { BubbleMenu } from "@tiptap/react";

import { useCallback, useEffect, useState } from "react";

export interface BubbleColorMenuItem {
  name: string;
  color: string;
}

export interface BubbleFontFamilyMenuItem {
  name: string;
  font: string;
}
const TEXT_COLORS: BubbleColorMenuItem[] = [
  {
    name: "Default",
    color: "#374151",
  },
  {
    name: "Purple",
    color: "#9333EA",
  },
  {
    name: "Red",
    color: "#E00000",
  },
  {
    name: "Yellow",
    color: "#EAB308",
  },
  {
    name: "Blue",
    color: "#2563EB",
  },
  {
    name: "Green",
    color: "#008A00",
  },
  {
    name: "Orange",
    color: "#FFA500",
  },
  {
    name: "Pink",
    color: "#BA4081",
  },
  {
    name: "Gray",
    color: "#A8A29E",
  },
];
const FONT_FAMILY: BubbleFontFamilyMenuItem[] = [
  {
    name: "Inter",
    font: "Inter",
  },
  {
    name: "Comic Sans MS",
    font: "Comic Sans MS, Comic Sans",
  },
  {
    name: "Serif",
    font: "serif",
  },
  {
    name: "Monospace",
    font: "monospace",
  },
  {
    name: "Cursive",
    font: "cursive",
  },
];
export default function MenuBar() {
  const { editor } = useCurrentEditor();
  const [select, setSelected] = useState(TEXT_COLORS[0]);
  const [fontFamily, setFontFamily] = useState(FONT_FAMILY[0]);
  if (!editor) {
    return null;
  }
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);
  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{ duration: 100 }}
      className="flex gap-2 p-2 divide-x  -top-20  bg-white shadow-lg absolute border-slate-400  text-slate-700 divide-slate-200 border-2 max-w-6xl rounded-lg items-center justify-between"
    >
      <div className="flex gap-2  items-center w-full">
        {" "}
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={clsx(
            editor.isActive("paragraph") ? "is-active" : "",
            "p-2 rounded-xl hover:bg-slate-200 group relative group"
          )}
        >
          <ListMinus />
          <span className="absolute -left-5  -top-10 hidden text-nowrap rounded-xl bg-black/70 p-2 text-xs font-semibold text-white group-hover:flex">
            paragraph
          </span>
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={clsx(
            editor.isActive("heading", { level: 1 }) ? "is-active" : "",
            "p-2 rounded-xl hover:bg-slate-200 group relative group"
          )}
        >
          <Heading1 className="size-5" />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={clsx(
            editor.isActive("heading", { level: 2 }) ? "is-active" : "",
            "p-2 rounded-xl hover:bg-slate-200 group relative group"
          )}
        >
          <Heading2 className="size-5" />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={clsx(
            editor.isActive("heading", { level: 3 }) ? "is-active" : "",
            "p-2 rounded-xl hover:bg-slate-200 group relative group"
          )}
        >
          <Heading3 className="size-5" />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={clsx(
            editor.isActive("heading", { level: 4 }) ? "is-active" : "",
            "p-2 rounded-xl hover:bg-slate-200 group relative group"
          )}
        >
          <Heading4 className="size-5" />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          className={clsx(
            editor.isActive("heading", { level: 5 }) ? "is-active" : "",
            "p-2 rounded-xl hover:bg-slate-200 group relative group"
          )}
        >
          <Heading5 className="size-5" />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          className={clsx(
            editor.isActive("heading", { level: 6 }) ? "is-active" : "",
            "p-2 rounded-xl hover:bg-slate-200 group relative group"
          )}
        >
          <Heading6 />
        </button>
        <div className="relative max-w-40 w-full mx-2">
          <Listbox
            value={fontFamily}
            onChange={(value) => {
              setFontFamily(value);
              editor.chain().focus().setFontFamily(value.font).run();
            }}
          >
            <Listbox.Button className={`flex gap-1 items-center text-nowrap`}>
              <CaseSensitive className="size-5" /> {fontFamily.name}
            </Listbox.Button>
            <Listbox.Options className="absolute  z-20 bg-white rounded-lg shadow-md w-32">
              {FONT_FAMILY.map((item, index) => (
                <Listbox.Option
                  key={index}
                  value={item}
                  className={` w-full px-2 cursor-pointer hover:bg-slate-200 group relative group`}
                >
                  {item.name}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        </div>
      </div>
      <div className="flex gap-2 justify-between items-center w-full">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={clsx(
            editor.isActive("bold") ? "is-active" : "",
            "p-2 rounded-xl hover:bg-slate-200 group relative group text-slate-800 font-bold hover:text-slate-600"
          )}
        >
          <Bold className="size-5 font-semibold" />
          <span className="absolute -left-5  -top-10 hidden  text-nowrap rounded-xl bg-black/70 p-2 text-xs font-semibold text-white group-hover:flex">
            bold
          </span>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={clsx(
            editor.isActive("italic") ? "is-active" : "",
            " font-bold hover:text-slate-600 p-2 rounded-lg hover:bg-slate-200 group relative group italic"
          )}
        >
          <Italic className="size-5" />
          <span className="absolute -left-5  -top-10 hidden text-nowrap rounded-xl bg-black/70 p-2 text-xs font-semibold text-white group-hover:flex">
            italic
          </span>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editor.can().chain().focus().toggleUnderline().run()}
          className={clsx(
            editor.isActive("underline") ? "is-active" : "",
            "p-2   hover:bg-slate-200 group relative group rounded-lg"
          )}
        >
          <Underline className="size-5" />
          <span className="absolute -left-5  -top-10 hidden text-nowrap rounded-xl bg-black/70 p-2 text-xs font-semibold text-white group-hover:flex">
            undeline
          </span>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={clsx(
            editor.isActive("strike") ? "is-active" : "",
            "p-2   hover:bg-slate-200 group relative group rounded-lg"
          )}
        >
          <Strikethrough className="size-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={clsx(
            editor.isActive("code") ? "is-active" : "",
            "p-2   hover:bg-slate-200 group relative group rounded-lg"
          )}
        >
          <Code className="size-5" />
          <span className="absolute -left-5  -top-10 hidden text-nowrap rounded-xl bg-black/70 p-2 text-xs font-semibold text-white group-hover:flex">
            code
          </span>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={clsx(
            editor.isActive("codeBlock") ? "is-active" : "",
            "p-2   hover:bg-slate-200 group relative group rounded-lg"
          )}
        >
          <SquareCode className="size-5" />
          <span className="absolute -left-5  -top-10 hidden text-nowrap rounded-xl bg-black/70 p-2 text-xs font-semibold text-white group-hover:flex">
            codeblock
          </span>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={clsx(
            editor.isActive("blockquote") ? "is-active" : "",
            "p-2   hover:bg-slate-200 group relative group rounded-lg"
          )}
        >
          <MessageSquareQuote className="size-5" />
          <span className="absolute -left-5  -top-10 hidden text-nowrap rounded-xl bg-black/70 p-2 text-xs font-semibold text-white group-hover:flex">
            blockquote
          </span>
        </button>

        <button
          onClick={() => setLink()}
          className="p-2 rounded-lg hover:bg-slate-200 group relative group"
        >
          <Link className="size-5" />
          <span className="absolute -left-5  -top-10 hidden text-nowrap rounded-xl bg-black/70 p-2 text-xs font-semibold text-white group-hover:flex">
            link
          </span>
        </button>
        <div className="relative max-w-40 w-full">
          <Listbox
            value={select}
            onChange={(value) => {
              setSelected(value);
              editor.chain().focus().setColor(value.color).run();
            }}
          >
            <Listbox.Button
              className={`text-[${select.color}] flex gap-1 items-center`}
            >
              <Brush className="size-5" /> {select.name}
            </Listbox.Button>
            <Listbox.Options className="absolute  z-20 bg-white rounded-lg shadow-md w-32">
              {TEXT_COLORS.map((item, index) => (
                <Listbox.Option
                  key={index}
                  value={item}
                  className={`text-[${item.color}] w-full px-2 cursor-pointer hover:bg-slate-200 group relative group`}
                >
                  {item.name}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        </div>
      </div>

      <div className="flex gap-2 items-center px-2">
        <button
          className="p-2 rounded-lg hover:bg-slate-200 group relative group"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <Undo className="size-5" />
          <span className="absolute -left-5  -top-10 hidden text-nowrap rounded-xl bg-black/70 p-2 text-xs font-semibold text-white group-hover:flex">
            undo
          </span>
        </button>
        <button
          className="p-2 rounded-lg hover:bg-slate-200 group relative group"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <Redo className="size-5" />
          <span className="absolute -left-5  -top-10 hidden text-nowrap rounded-xl bg-black/70 p-2 text-xs font-semibold text-white group-hover:flex">
            redo
          </span>
        </button>
      </div>
    </BubbleMenu>
  );
}
