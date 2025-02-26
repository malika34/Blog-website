"use client";
import React from "react";

interface OnThisPageProps {
  htmlContent: string;
}

const OnThisPage: React.FC<OnThisPageProps> = ({ htmlContent }) => {
  const extractHeadings = (html: string): { text: string; id: string }[] => {
    if (typeof window !== "undefined") {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const headings = Array.from(doc.querySelectorAll("h2"));
      return headings.map((heading) => ({
        text: heading.textContent || "",
        id: heading.id || "",
      }));
    }
    return [];
  };

  const headings = extractHeadings(htmlContent);

  return (
    <div className="on-this-page absolute top-36 right-[180px] hidden sm:block">
      <h2 className="text-md font-bold my-1">On This Page</h2>
      <ul className="text-sm space-y-2">
        {headings.map((heading, index) => (
          <li key={index}>
            <a href={`#${heading.id}`}>{heading.text}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OnThisPage;
