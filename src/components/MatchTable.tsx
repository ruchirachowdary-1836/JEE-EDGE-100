import { Inline } from "@/components/Rich";

type Lists = { left: string[]; right: string[] };

const isLists = (v: unknown): v is Lists =>
  !!v && typeof v === "object" && Array.isArray((v as Lists).left) && Array.isArray((v as Lists).right);

/** List-I (P, Q, R, S …) against List-II (1, 2, 3 …) for matching-list questions. */
export function MatchTable({ lists }: { lists: unknown }) {
  if (!isLists(lists)) return null;
  const rows = Math.max(lists.left.length, lists.right.length);
  const L = "PQRSTU";
  return (
    <div className="mt-3 overflow-x-auto">
      <table className="w-full min-w-[420px] border-collapse text-sm">
        <thead>
          <tr className="text-left text-xs">
            <th className="w-1/2 border-b border-[var(--border)] p-2">List-I</th>
            <th className="w-1/2 border-b border-[var(--border)] p-2">List-II</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }, (_, i) => (
            <tr key={i} className="align-top">
              <td className="border-b border-[var(--border)] p-2">{lists.left[i] !== undefined && <><strong>({L[i]})</strong> <Inline text={lists.left[i]} /></>}</td>
              <td className="border-b border-[var(--border)] p-2">{lists.right[i] !== undefined && <><strong>({i + 1})</strong> <Inline text={lists.right[i]} /></>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
