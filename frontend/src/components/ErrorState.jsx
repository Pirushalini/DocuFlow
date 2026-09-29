import { AlertCircle, RefreshCw } from "lucide-react";

function ErrorState({
  title = "Something went wrong",
  message = "We couldn't load this information. Please try again.",
  onRetry,
}) {
  return (
    <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-[#FECACA] bg-white p-8 text-center shadow-sm">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FEF2F2] text-[#DC2626]">
        <AlertCircle size={28} strokeWidth={1.7} />
      </div>

      <h3 className="mt-5 text-base font-semibold text-[#123B5D]">
        {title}
      </h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-[#6B7280]">
        {message}
      </p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-5 inline-flex items-center gap-2
          rounded-lg bg-[#1677B8] px-4 py-2.5
          text-sm font-semibold text-white
          transition hover:bg-[#3FA9D9]"
        >
          <RefreshCw size={16} />
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorState;