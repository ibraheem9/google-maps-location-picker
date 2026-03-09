/**
 * Geo Blueprint Design — ApiTable
 * Table component for displaying API methods and properties.
 */

interface ApiRow {
  name: string;
  type: string;
  description: string;
}

interface ApiTableProps {
  title: string;
  rows: ApiRow[];
}

export default function ApiTable({ title, rows }: ApiTableProps) {
  return (
    <div className="my-6 rounded-lg border overflow-hidden"
      style={{ borderColor: "oklch(0.88 0.015 250)" }}>
      <div className="px-5 py-3 border-b"
        style={{ background: "oklch(0.95 0.01 250)", borderColor: "oklch(0.88 0.015 250)" }}>
        <h4 className="text-sm font-bold uppercase tracking-wider"
          style={{ fontFamily: "Archivo, sans-serif", color: "oklch(0.35 0.03 250)" }}>
          {title}
        </h4>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: "oklch(0.97 0.005 250)" }}>
              <th className="text-left px-5 py-3 font-semibold border-b"
                style={{ fontFamily: "Archivo, sans-serif", color: "oklch(0.35 0.03 250)", borderColor: "oklch(0.9 0.01 250)" }}>
                Name
              </th>
              <th className="text-left px-5 py-3 font-semibold border-b"
                style={{ fontFamily: "Archivo, sans-serif", color: "oklch(0.35 0.03 250)", borderColor: "oklch(0.9 0.01 250)" }}>
                Type
              </th>
              <th className="text-left px-5 py-3 font-semibold border-b"
                style={{ fontFamily: "Archivo, sans-serif", color: "oklch(0.35 0.03 250)", borderColor: "oklch(0.9 0.01 250)" }}>
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b last:border-b-0"
                style={{ borderColor: "oklch(0.92 0.01 250)" }}>
                <td className="px-5 py-3 font-mono text-xs font-medium"
                  style={{ color: "oklch(0.55 0.15 250)" }}>
                  {row.name}
                </td>
                <td className="px-5 py-3">
                  <span className="inline-block px-2 py-0.5 rounded text-xs font-mono"
                    style={{ background: "oklch(0.95 0.02 250)", color: "oklch(0.45 0.03 250)" }}>
                    {row.type}
                  </span>
                </td>
                <td className="px-5 py-3" style={{ color: "oklch(0.4 0.02 250)" }}>
                  {row.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
