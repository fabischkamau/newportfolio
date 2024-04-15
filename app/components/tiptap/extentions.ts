import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import ImageResize from "tiptap-extension-resize-image";
import UnderLine from "@tiptap/extension-underline";
import FontFamily from "@tiptap/extension-font-family";
import PlaceHolder from "@tiptap/extension-placeholder";
export default [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ HTMLAttributes: ListItem }),
  UnderLine,
  FontFamily.configure({
    types: ["textStyle"],
  }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
  Link.configure({
    openOnClick: true,
    autolink: true,
  }),
  Image,
  ImageResize,
  Youtube.configure({
    allowFullscreen: false,
    enableIFrameApi: true,
    HTMLAttributes: {
      class: "aspect-video",
    },
  }),
  PlaceHolder.configure({
    placeholder: "Write your creative ideas",
    showOnlyWhenEditable: false,
  }),
];
