import { useGlobalState } from "@/Providers/GlobalStateProvider";
import { useEffect } from "react";
export default function useListMarkerColorSync(editor, elementId) {
  const { setElements } = useGlobalState();
  // const { editor, activeElementId } = useEditors();
  useEffect(() => {
    if (!editor) return;
    let timeout;
    const updateListMarkerColors = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const listItems = document.querySelectorAll(".editor-content li");
        listItems.forEach((li) => {
          let color = "";
          let foundSpan = null;
          // Find deepest span inside li (even inside p)
          const spans = li.querySelectorAll("span");
          if (spans.length > 0) {
            for (let i = spans.length - 1; i >= 0; i--) {
              const span = spans[i];
              if (span.style.color) {
                color = span.style.color;
                foundSpan = span;
                break;
              }
              const computed = getComputedStyle(span).color;
              if (computed && computed !== "inherit" && computed !== "") {
                color = computed;
                foundSpan = span;
                break;
              }
            }
          }
          // If no span, check for p
          if (!color) {
            const p = li.querySelector("p");
            if (p) {
              if (p.style.color) {
                color = p.style.color;
              } else {
                const computed = getComputedStyle(p).color;
                if (computed && computed !== "inherit" && computed !== "") {
                  color = computed;
                }
              }
            }
          }
          // Fallback: get computed color from li itself
          if (!color) {
            color = getComputedStyle(li).color || "inherit";
          }
          // Debug log
          // console.log(
          //   "LI:",
          //   li,
          //   "Found span:",
          //   foundSpan,
          //   "Color to set:",
          //   color
          // );
          li.style.color = color;
          console.log(editor, elementId);
          if (editor && elementId) {
            const html = editor.getHTML();
            // setElements((prev) =>
            //   prev.map((item) =>
            //     item.id === elementId
            //       ? { ...item, content: html === "<p></p>" ? "" : html }
            //       : item
            //   )
            // );
            setElements((prev) => {
              return prev.map((item) => {
                if (item.id === elementId) {
                  console.log("active itme:", item, "content", item.content);
                  // return { ...item, content: html === "<p></p>" ? "" : html };
                }
                return item;
              });
            });
          }
        });
      }, 0);
    };
    editor.on("update", updateListMarkerColors);
    editor.on("selectionUpdate", updateListMarkerColors);
    editor.on("transaction", updateListMarkerColors);
    updateListMarkerColors();
    return () => {
      clearTimeout(timeout);
      editor.off("update", updateListMarkerColors);
      editor.off("selectionUpdate", updateListMarkerColors);
      editor.off("transaction", updateListMarkerColors);
    };
  }, [editor]);
}
