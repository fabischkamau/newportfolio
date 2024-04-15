import { EditorProvider, Editor } from "@tiptap/react";
import extentions from "./extentions";
import MenuBar from "./menu";
import { useDebouncedCallback } from "use-debounce";
import BubbleMenuBar from "./bublemenu";
import { UseFormSetValue } from "react-hook-form";

const Tiptap = ({
  setValue,
}: {
  setValue: UseFormSetValue<{
    title: string;
    description: string;
    categories: string;
    content: string;
  }>;
}) => {
  const debouncedUpdates = useDebouncedCallback(async (editor: Editor) => {
    setValue("content", editor.getHTML());
    console.log(editor.getHTML());
  }, 500);

  return (
    <EditorProvider
      slotBefore={<MenuBar />}
      extensions={extentions}
      editorProps={{
        attributes: {
          class:
            "prose relative prose-img:rounded-lg prose-p:text-base dark:prose-invert   prose-sm sm:prose-base max-w-6xl prose-a:text-sky-500 lg:prose-lg xl:prose-2xl border-2 border-t-0 rounded-lg border-slate-400 rounded-t-none focus:outline-none p-2 ",
        },
      }}
      onUpdate={({ editor }) => {
        debouncedUpdates(editor);
      }}
    >
      <BubbleMenuBar />
    </EditorProvider>
  );
};

export default Tiptap;
