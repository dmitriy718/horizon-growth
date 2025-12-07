"use client";

import ReactMarkdown from "react-markdown";
import { Components } from "react-markdown";

interface ArticleContentProps {
  content: string;
}

// Custom components for better markdown rendering
const components: Components = {
  // Remove H1 since title is already in hero
  h1: ({ children }) => null,
  
  // Main section headings
  h2: ({ children }) => (
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6 pb-3 border-b-2 border-emerald-500/30">
      {children}
    </h2>
  ),
  
  // Subsection headings
  h3: ({ children }) => (
    <h3 className="text-xl md:text-2xl font-bold text-gray-800 mt-10 mb-4">
      {children}
    </h3>
  ),
  
  // Minor headings
  h4: ({ children }) => (
    <h4 className="text-lg font-bold text-gray-800 mt-8 mb-3">
      {children}
    </h4>
  ),
  
  // Paragraphs with proper spacing
  p: ({ children }) => (
    <p className="text-gray-700 leading-relaxed mb-6 text-lg">
      {children}
    </p>
  ),
  
  // Unordered lists
  ul: ({ children }) => (
    <ul className="my-6 ml-4 space-y-3">
      {children}
    </ul>
  ),
  
  // Ordered lists
  ol: ({ children }) => (
    <ol className="my-6 ml-4 space-y-3 list-decimal list-outside pl-4">
      {children}
    </ol>
  ),
  
  // List items with custom bullets
  li: ({ children }) => (
    <li className="text-gray-700 text-lg leading-relaxed pl-2 relative before:content-[''] before:absolute before:left-[-1rem] before:top-[0.7rem] before:w-2 before:h-2 before:bg-emerald-500 before:rounded-full list-none">
      {children}
    </li>
  ),
  
  // Strong/bold text
  strong: ({ children }) => (
    <strong className="font-bold text-gray-900">{children}</strong>
  ),
  
  // Emphasis/italic
  em: ({ children }) => (
    <em className="italic text-gray-800">{children}</em>
  ),
  
  // Links
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-[#1E3A5F] font-medium underline decoration-emerald-500 decoration-2 underline-offset-2 hover:text-emerald-600 hover:decoration-emerald-600 transition-colors"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  ),
  
  // Blockquotes
  blockquote: ({ children }) => (
    <blockquote className="my-8 pl-6 py-4 border-l-4 border-emerald-500 bg-emerald-50 rounded-r-lg italic text-gray-700">
      {children}
    </blockquote>
  ),
  
  // Code blocks
  code: ({ className, children }) => {
    const isInline = !className;
    if (isInline) {
      return (
        <code className="bg-slate-100 text-slate-800 px-2 py-1 rounded text-sm font-mono">
          {children}
        </code>
      );
    }
    return (
      <code className="block bg-slate-900 text-slate-100 p-6 rounded-xl my-6 overflow-x-auto text-sm font-mono">
        {children}
      </code>
    );
  },
  
  // Preformatted text
  pre: ({ children }) => (
    <pre className="bg-slate-900 text-slate-100 p-6 rounded-xl my-8 overflow-x-auto">
      {children}
    </pre>
  ),
  
  // Horizontal rules
  hr: () => (
    <hr className="my-12 border-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
  ),
  
  // Tables
  table: ({ children }) => (
    <div className="my-8 overflow-x-auto rounded-xl border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        {children}
      </table>
    </div>
  ),
  
  thead: ({ children }) => (
    <thead className="bg-slate-50">{children}</thead>
  ),
  
  tbody: ({ children }) => (
    <tbody className="divide-y divide-gray-200 bg-white">{children}</tbody>
  ),
  
  tr: ({ children }) => (
    <tr className="hover:bg-slate-50 transition-colors">{children}</tr>
  ),
  
  th: ({ children }) => (
    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wider">
      {children}
    </th>
  ),
  
  td: ({ children }) => (
    <td className="px-6 py-4 text-gray-700">{children}</td>
  ),
  
  // Images
  img: ({ src, alt }) => (
    <figure className="my-10">
      <img
        src={src}
        alt={alt || ""}
        className="w-full rounded-xl shadow-lg"
      />
      {alt && (
        <figcaption className="text-center text-sm text-gray-500 mt-3 italic">
          {alt}
        </figcaption>
      )}
    </figure>
  ),
};

export function ArticleContent({ content }: ArticleContentProps) {
  // Process content to improve formatting
  // Remove duplicate title (first # heading) if it exists
  const processedContent = content.replace(/^#\s+[^\n]+\n+/, "");

  return (
    <div className="article-content">
      <ReactMarkdown components={components}>{processedContent}</ReactMarkdown>
    </div>
  );
}

