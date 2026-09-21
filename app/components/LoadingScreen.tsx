"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 200);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return <div className="loader" role="status" aria-hidden="true" />;
}