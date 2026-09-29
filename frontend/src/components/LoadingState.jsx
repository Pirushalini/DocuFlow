import { LoaderCircle } from "lucide-react";

function LoadingState({ message = "Loading..." }) {
  return (
    <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-[#D9E2E8] bg-white p-8 text-center shadow-sm">
      <LoaderCircle
        size={36}
        strokeWidth={1.8}
        className="animate-spin text-[#1677B8]"
      />

      <p className="mt-4 text-sm font-medium text-[#123B5D]">
        {message}
      </p>

      <p className="mt-1 text-xs text-[#6B7280]">
        Please wait while we load the information.
      </p>
    </div>
  );
}

export default LoadingState;