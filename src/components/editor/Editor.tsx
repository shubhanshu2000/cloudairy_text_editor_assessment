import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ToolBar from "../toolbar/ToolBar";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import { Textarea } from "../ui/textarea";
import Link from "@tiptap/extension-link";
import { useEffect, useRef } from "react";
import "./editor.css";

const extensions = [
  StarterKit.configure({
    bulletList: {
      HTMLAttributes: {
        class: "list-disc ml-3",
      },
    },
    orderedList: {
      HTMLAttributes: {
        class: "list-decimal ml-3",
      },
    },
    history: {
      depth: 100,
      newGroupDelay: 500,
    },
  }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  Highlight,
  Underline.configure({
    HTMLAttributes: {
      class: "my-custom-class",
    },
  }),
  Image.configure({
    inline: true,
    allowBase64: true,
    HTMLAttributes: {
      class: "w-[400px]",
    },
  }),
  Link.configure({
    openOnClick: true,
    linkOnPaste: true,
    HTMLAttributes: {
      class: "text-blue-600 underline hover:text-blue-700",
      rel: "noopener noreferrer",
      target: "_blank", // Opens links in new tab
    },
    autolink: true,
    defaultProtocol: "https",
    protocols: ["http", "https"],
    isAllowedUri: (url, ctx) => {
      try {
        // construct URL
        const parsedUrl = url.includes(":")
          ? new URL(url)
          : new URL(`${ctx.defaultProtocol}://${url}`);

        // use default validation
        if (!ctx.defaultValidate(parsedUrl.href)) {
          return false;
        }

        // disallowed protocols
        const disallowedProtocols = ["ftp", "file", "mailto"];
        const protocol = parsedUrl.protocol.replace(":", "");

        if (disallowedProtocols.includes(protocol)) {
          return false;
        }

        // only allow protocols specified in ctx.protocols
        const allowedProtocols = ctx.protocols.map((p) =>
          typeof p === "string" ? p : p.scheme
        );

        if (!allowedProtocols.includes(protocol)) {
          return false;
        }

        // disallowed domains
        const disallowedDomains = [
          "example-phishing.com",
          "malicious-site.net",
        ];
        const domain = parsedUrl.hostname;

        if (disallowedDomains.includes(domain)) {
          return false;
        }

        // all checks have passed
        return true;
      } catch {
        return false;
      }
    },
    shouldAutoLink: (url) => {
      try {
        // construct URL
        const parsedUrl = url.includes(":")
          ? new URL(url)
          : new URL(`https://${url}`);

        // only auto-link if the domain is not in the disallowed list
        const disallowedDomains = [
          "example-no-autolink.com",
          "another-no-autolink.com",
        ];
        const domain = parsedUrl.hostname;

        return !disallowedDomains.includes(domain);
      } catch {
        return false;
      }
    },
  }),
];

const content = "<p>Hello World!</p>";

const Editor = () => {
  const editor = useEditor({
    extensions,
    content,
    editorProps: {
      attributes: {
        class: "min-h-[156px]  border rounded-md bg-slate-50 py-2 px-3",
      },
    },
  });
  const editorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleDrop = (event: DragEvent) => {
      event.preventDefault();
      const files = event.dataTransfer?.files;
      if (!files || files.length === 0) return;

      const file = files[0];
      if (!file.type.startsWith("image/")) return;

      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result;
        if (typeof base64 === "string") {
          editor?.chain().focus().setImage({ src: base64 }).run();
        }
      };
      reader.readAsDataURL(file);
    };

    const handleDragOver = (event: DragEvent) => {
      event.preventDefault(); // <-- required
    };

    const editorDOM = editorRef.current;
    if (editorDOM) {
      editorDOM.addEventListener("drop", handleDrop);
      editorDOM.addEventListener("dragover", handleDragOver);
    }

    return () => {
      if (editorDOM) {
        editorDOM.removeEventListener("drop", handleDrop);
        editorDOM.removeEventListener("dragover", handleDragOver);
      }
    };
  }, [editor]);

  return (
    <div ref={editorRef}>
      <ToolBar editor={editor} />
      <EditorContent editor={editor} />
      <p className="text-xs text-gray-500 mt-2 mb-1">Editor Output (HTML)</p>
      <Textarea value={editor?.getHTML()} disabled />
    </div>
  );
};

export default Editor;
