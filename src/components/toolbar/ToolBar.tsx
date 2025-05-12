import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  Image,
  Italic,
  Link,
  List,
  ListOrdered,
  MessageSquareQuote,
  Minus,
  Redo2,
  Underline,
  Undo2,
} from "lucide-react";
import { Toggle } from "../ui/toggle";
import { Editor } from "@tiptap/react";

export default function MenuBar({ editor }: { editor: Editor | null }) {
  if (!editor) {
    return null;
  }

  const Options = [
    {
      icon: <Heading1 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      pressed: editor.isActive("heading", { level: 1 }),
    },
    {
      icon: <Heading2 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      pressed: editor.isActive("heading", { level: 2 }),
    },
    {
      icon: <Heading3 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      pressed: editor.isActive("heading", { level: 3 }),
    },
    {
      icon: <Bold className="size-4" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      pressed: editor.isActive("bold"),
    },
    {
      icon: <Italic className="size-4" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      pressed: editor.isActive("italic"),
    },
    {
      icon: <Underline className="size-4" />,
      onClick: () => editor.chain().focus().toggleUnderline().run(),
      pressed: editor.isActive("underline"),
    },
    {
      icon: <Code className="size-4" />,
      onClick: () => editor.chain().focus().toggleCodeBlock().run(),
      pressed: editor.isActive("codeBlock"),
    },
    {
      icon: <MessageSquareQuote className="size-4" />,
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
      pressed: editor.isActive("blockquote"),
    },
    {
      icon: <Minus className="size-4" />,
      onClick: () => editor.chain().focus().setHorizontalRule().run(),
      // pressed: editor.isActive(""),
    },
    {
      icon: <Image className="size-4" />,
      onClick: () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = async () => {
          const file = input.files?.[0];
          if (!file) return;

          const reader = new FileReader();
          reader.onload = () => {
            const base64 = reader.result;
            if (typeof base64 === "string") {
              editor
                .chain()
                .focus()
                .setImage({ src: base64 }) // insert base64 as image src
                .run();
            }
          };
          reader.readAsDataURL(file); // converts to base64
        };
        input.click();
      },
      // pressed: editor.isActive(""),
    },
    {
      icon: <Undo2 className="size-4" />,
      onClick: () => editor.chain().focus().undo().run(),
      // pressed: editor.isActive(""),
    },
    {
      icon: <Redo2 className="size-4" />,
      onClick: () => editor.chain().focus().redo().run(),
      // pressed: editor.isActive(""),
    },
    {
      icon: <AlignLeft className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      pressed: editor.isActive({ textAlign: "left" }),
    },
    {
      icon: <AlignCenter className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      pressed: editor.isActive({ textAlign: "center" }),
    },
    {
      icon: <AlignRight className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      pressed: editor.isActive({ textAlign: "right" }),
    },
    {
      icon: <List className="size-4" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      pressed: editor.isActive("bulletList"),
    },
    {
      icon: <ListOrdered className="size-4" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      pressed: editor.isActive("orderedList"),
    },
    {
      icon: <Highlighter className="size-4" />,
      onClick: () => editor.chain().focus().toggleHighlight().run(),
      pressed: editor.isActive("highlight"),
    },
    {
      icon: <Link className="size-4" />,
      onClick: () => {
        const previousUrl = editor.getAttributes("link").href;
        const url = window.prompt("URL", previousUrl);

        if (url === null) {
          return; // Cancelled
        }

        // If there's no selection, return
        if (editor.state.selection.empty) {
          window.alert("Please select some text first");
          return;
        }

        if (url === "") {
          editor.chain().focus().extendMarkRange("link").unsetLink().run();
          return;
        }

        // Validate URL
        try {
          new URL(url.startsWith("http") ? url : `https://${url}`);
        } catch {
          window.alert("Please enter a valid URL");
          return;
        }

        editor
          .chain()
          .focus()
          .extendMarkRange("link")
          .setLink({
            href: url.startsWith("http") ? url : `https://${url}`,
          })
          .run();
      },
      pressed: editor.isActive("link"),
    },
  ];

  return (
    <div className="border rounded-md p-1 mb-1 bg-slate-50 space-x-2 z-50">
      {Options.map((option, index) => (
        <Toggle
          key={index}
          pressed={option.pressed}
          onPressedChange={option.onClick}
        >
          {option.icon}
        </Toggle>
      ))}
    </div>
  );
}
