"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button className="btn-primary no-print shrink-0" onClick={() => window.print()}>
      <Printer size={16} /> Print / Save as PDF
    </button>
  );
}
