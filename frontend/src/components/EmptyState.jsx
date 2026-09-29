import { FileText } from "lucide-react";

function EmptyState({
  title = "No data found",
  message = "There is no information to display at the moment.",
  actionLabel,
  onAction,
}) {
  return (
    <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-[#D9E2E8] bg-white p-8 text-center shadow-sm">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EAF6FB] text-[#1677B8]">
        <FileText size={28} strokeWidth={1.7} />
      </div>

      <h3 className="mt-5 text-base font-semibold text-[#123B5D]">
        {title}
      </h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-[#6B7280]">
        {message}
      </p>

      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-5 rounded-lg bg-[#1677B8] px-4 py-2.5
          text-sm font-semibold text-white
          transition hover:bg-[#3FA9D9]"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export default EmptyState;