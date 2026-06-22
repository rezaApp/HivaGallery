import { useTranslations } from "next-intl";
import type { ProductSpec } from "@/types";

interface ProductSpecsProps {
  specs: ProductSpec[];
}

export function ProductSpecs({ specs }: ProductSpecsProps) {
  const t = useTranslations("products.detail");

  if (specs.length === 0) return null;

  return (
    <div className="border-border/40 overflow-hidden rounded-xl border">
      <table className="w-full text-sm">
        <tbody>
          {specs.map((spec, idx) => (
            <tr
              key={spec.key}
              className={idx % 2 === 0 ? "bg-muted/30" : "bg-background"}
            >
              <td className="text-muted-foreground w-2/5 px-5 py-3 font-medium">
                {t(`specKeys.${spec.key}` as Parameters<typeof t>[0])}
              </td>
              <td className="text-foreground px-5 py-3">{spec.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
