"use client";
import { useEffect, useState } from "react";
import FadeText from "./FadeText";

export default function Page() {
  const [text, setText] = useState("about");

  setTimeout(() => {
    setText("skill");
  }, 3000);

  return (
    <main style={{ padding: "2rem" }}>
      <FadeText text={text} />
    </main>
  );
}
