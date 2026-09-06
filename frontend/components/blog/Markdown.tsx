import { Fragment } from 'react';

interface MarkdownProps {
  content: string;
}

function renderInline(text: string, key: number): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);
  return (
    <Fragment key={key}>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('*') && part.endsWith('*')) {
          return <em key={i}>{part.slice(1, -1)}</em>;
        }
        if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code
              key={i}
              className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-brand-700"
            >
              {part.slice(1, -1)}
            </code>
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </Fragment>
  );
}

export default function Markdown({ content }: MarkdownProps) {
  const lines = content.split('\n');
  const blocks: React.ReactNode[] = [];
  let listBuffer: string[] = [];

  const flushList = (key: number) => {
    if (listBuffer.length === 0) return;
    blocks.push(
      <ul key={key} className="my-4 space-y-2">
        {listBuffer.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
            <span>{renderInline(item, i)}</span>
          </li>
        ))}
      </ul>
    );
    listBuffer = [];
  };

  lines.forEach((rawLine, index) => {
    const line = rawLine.trim();

    if (!line) {
      flushList(index);
      return;
    }

    if (/^#{3}\s/.test(line)) {
      flushList(index);
      blocks.push(
        <h3 key={index} className="mt-6 text-xl font-bold text-slate-900">
          {renderInline(line.replace(/^#{3}\s/, ''), index)}
        </h3>
      );
      return;
    }

    if (/^#{2}\s/.test(line)) {
      flushList(index);
      blocks.push(
        <h2 key={index} className="mt-8 text-2xl font-bold text-slate-900">
          {renderInline(line.replace(/^#{2}\s/, ''), index)}
        </h2>
      );
      return;
    }

    if (/^[-*]\s/.test(line)) {
      listBuffer.push(line.replace(/^[-*]\s/, ''));
      return;
    }

    flushList(index);
    blocks.push(
      <p key={index} className="my-4 leading-relaxed text-slate-700">
        {renderInline(line, index)}
      </p>
    );
  });

  flushList(blocks.length + 1000);

  return <div className="text-[1.05rem]">{blocks}</div>;
}