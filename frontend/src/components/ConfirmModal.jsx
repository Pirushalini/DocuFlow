import { AlertTriangle, X } from "lucide-react";

function ConfirmModal({
  isOpen,
  title = "Confirm Action",
  message = "Are you sure you want to continue?",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  danger = false,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B253A]/50 p-4">
      <div className="w-full max-w-md rounded-2xl border border-[#D9E2E8] bg-white shadow-xl">

        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#D9E2E8] p-6">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                danger
                  ? "bg-[#FEF2F2] text-[#DC2626]"
                  : "bg-[#EAF6FB] text-[#1677B8]"
              }`}
            >
              <AlertTriangle size={20} />
            </div>

            <h2 className="text-base font-semibold text-[#123B5D]">
              {title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onCancel}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#6B7280] transition hover:bg-[#F4F7F9] hover:text-[#263238]"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-sm leading-6 text-[#6B7280]">
            {message}
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-[#D9E2E8] bg-[#F8FAFB] p-5">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-[#D9E2E8] bg-white px-4 py-2.5 text-sm font-medium text-[#263238] transition hover:bg-[#F4F7F9]"
          >
            {cancelLabel}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className={`rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition ${
              danger
                ? "bg-[#DC2626] hover:bg-[#B91C1C]"
                : "bg-[#1677B8] hover:bg-[#3FA9D9]"
            }`}
          >
            {confirmLabel}
          </button>
        </div>

      </div>
    </div>
  );
}

export default ConfirmModal;