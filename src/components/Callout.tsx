import { Lightbulb, Info, AlertTriangle } from "lucide-react";

interface CalloutProps {
  type?: "tip" | "info" | "warning";
  title?: string;
  children: React.ReactNode;
}

export function Callout({ type = "info", title, children }: CalloutProps) {
  const styles = {
    tip: {
      container: "border-emerald-200 bg-emerald-50/70 text-emerald-950",
      badge: "text-emerald-700 bg-emerald-100",
      icon: <Lightbulb className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />,
      defaultTitle: "Tip",
    },
    info: {
      container: "border-blue-200 bg-blue-50/70 text-blue-950",
      badge: "text-blue-700 bg-blue-100",
      icon: <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />,
      defaultTitle: "Note",
    },
    warning: {
      container: "border-amber-200 bg-amber-50/80 text-amber-950",
      badge: "text-amber-700 bg-amber-100",
      icon: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />,
      defaultTitle: "Important",
    },
  }[type];

  return (
    <div className={`my-4 flex items-start gap-3 rounded-xl border p-4 shadow-xs ${styles.container}`}>
      {styles.icon}
      <div className="flex-1 text-sm leading-relaxed">
        <p className="font-bold mb-1 text-slate-900">{title || styles.defaultTitle}</p>
        <div className="text-slate-700 font-normal">{children}</div>
      </div>
    </div>
  );
}
