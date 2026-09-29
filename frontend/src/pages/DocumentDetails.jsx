import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Download } from "lucide-react";

function DocumentDetails() {
  const navigate = useNavigate();

  const [showRejectReason, setShowRejectReason] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [reviewStatus, setReviewStatus] = useState("Approved");

  const handleConfirmRejection = () => {
    if (!rejectReason.trim()) {
      alert("Please enter a rejection reason.");
      return;
    }

    setReviewStatus("Rejected");
    setShowRejectReason(false);
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#123B5D]">
            Document Details
          </h1>

          <p className="mt-1 text-sm text-[#6B7280]">
            View document information and activity.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/documents")}
          className="rounded-lg border border-[#D9E2E8] bg-white px-4 py-2.5
          text-sm font-medium text-[#263238]
          transition hover:bg-[#F4F7F9]"
        >
          ← Back to Documents
        </button>
      </div>

      {/* Document Card */}
      <div className="rounded-2xl border border-[#D9E2E8] bg-white shadow-sm">

        {/* Document Header */}
        <div className="flex items-center gap-4 border-b border-[#D9E2E8] p-6">

          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#F4F7F9] text-[#00A6A6]">
            <FileText size={28} strokeWidth={1.8} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#123B5D]">
              Project Report.pdf
            </h2>

            <p className="mt-1 text-sm text-[#6B7280]">
              PDF Document
            </p>
          </div>

          {/* Document Status */}
          <span
            className={`ml-auto inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
              reviewStatus === "Rejected"
                ? "bg-[#FEF2F2] text-[#B91C1C]"
                : "bg-[#ECFDF5] text-[#047857]"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                reviewStatus === "Rejected"
                  ? "bg-[#EF4444]"
                  : "bg-[#10B981]"
              }`}
            />

            {reviewStatus}
          </span>
        </div>

        {/* Information */}
        <div className="grid gap-6 p-6 md:grid-cols-2">

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-[#6B7280]">
              File Name
            </p>

            <p className="mt-1 text-sm font-medium text-[#263238]">
              Project Report.pdf
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-[#6B7280]">
              Category
            </p>

            <p className="mt-1 text-sm font-medium text-[#263238]">
              Finance
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-[#6B7280]">
              File Size
            </p>

            <p className="mt-1 text-sm font-medium text-[#263238]">
              2.4 MB
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-[#6B7280]">
              Uploaded
            </p>

            <p className="mt-1 text-sm font-medium text-[#263238]">
              Today
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-[#6B7280]">
              Uploaded By
            </p>

            <p className="mt-1 text-sm font-medium text-[#263238]">
              Admin User
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-[#6B7280]">
              Version
            </p>

            <p className="mt-1 text-sm font-medium text-[#263238]">
              v1
            </p>
          </div>

        </div>

        {/* Review & Approval */}
        <div className="border-t border-[#D9E2E8] p-6">

          <div>
            <h3 className="text-base font-semibold text-[#123B5D]">
              Review & Approval
            </h3>

            <p className="mt-1 text-sm text-[#6B7280]">
              Review the document and update its approval status.
            </p>

            {/* Current Status */}
            <div
              className={`mt-4 flex items-center gap-3 rounded-xl border px-4 py-3 ${
                reviewStatus === "Rejected"
                  ? "border-[#FECACA] bg-[#FEF2F2]"
                  : "border-[#D9E2E8] bg-[#F4F7F9]"
              }`}
            >

              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full ${
                  reviewStatus === "Rejected"
                    ? "bg-[#FEE2E2]"
                    : "bg-[#ECFDF5]"
                }`}
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    reviewStatus === "Rejected"
                      ? "bg-[#EF4444]"
                      : "bg-[#10B981]"
                  }`}
                />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-[#6B7280]">
                  Current Status
                </p>

                <p
                  className={`mt-0.5 text-sm font-semibold ${
                    reviewStatus === "Rejected"
                      ? "text-[#B91C1C]"
                      : "text-[#047857]"
                  }`}
                >
                  {reviewStatus}
                </p>
              </div>

            </div>
          </div>

          {/* Review Buttons */}
          {reviewStatus !== "Rejected" && (
            <div className="mt-5 flex flex-wrap gap-3">

              {/* Approve */}
              <button
                type="button"
                className="rounded-lg bg-[#00A6A6] px-4 py-2.5
                text-sm font-semibold text-white
                transition hover:bg-[#087F8C]"
              >
                Approve
              </button>

              {/* Reject */}
              <button
                type="button"
                onClick={() => setShowRejectReason(true)}
                className="rounded-lg border border-[#D9E2E8] bg-white
                px-4 py-2.5 text-sm font-semibold text-[#B91C1C]
                transition hover:bg-[#FEF2F2]"
              >
                Reject
              </button>

            </div>
          )}

          {/* Rejection Reason */}
          {showRejectReason && reviewStatus !== "Rejected" && (
            <div className="mt-5 rounded-xl border border-[#D9E2E8] bg-[#F4F7F9] p-4">

              <label
                htmlFor="rejection-reason"
                className="text-sm font-semibold text-[#123B5D]"
              >
                Rejection Reason
              </label>

              <textarea
                id="rejection-reason"
                rows="3"
                placeholder="Enter the reason for rejecting this document..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="mt-2 w-full rounded-lg border border-[#D9E2E8]
                bg-white px-3 py-2.5 text-sm text-[#263238]
                outline-none transition
                focus:border-[#1677B8] focus:ring-2 focus:ring-[#1677B8]/10"
              />

              <div className="mt-3 flex gap-3">

                {/* Confirm Rejection */}
                <button
                  type="button"
                  onClick={handleConfirmRejection}
                  className="rounded-lg bg-[#B91C1C] px-4 py-2
                  text-sm font-semibold text-white
                  transition hover:bg-[#991B1B]"
                >
                  Confirm Rejection
                </button>

                {/* Cancel */}
                <button
                  type="button"
                  onClick={() => setShowRejectReason(false)}
                  className="rounded-lg border border-[#D9E2E8] bg-white
                  px-4 py-2 text-sm font-medium text-[#263238]
                  transition hover:bg-[#F4F7F9]"
                >
                  Cancel
                </button>

              </div>

            </div>
          )}

          {/* Rejection Details */}
          {reviewStatus === "Rejected" && rejectReason && (
            <div className="mt-5 rounded-xl border border-[#FECACA] bg-[#FEF2F2] p-4">

              <p className="text-xs font-medium uppercase tracking-wide text-[#B91C1C]">
                Rejection Reason
              </p>

              <p className="mt-1 text-sm text-[#263238]">
                {rejectReason}
              </p>

            </div>
          )}

        </div>

        {/* Version History */}
        <div className="border-t border-[#D9E2E8] p-6">

            <div>
                <h3 className="text-base font-semibold text-[#123B5D]">
                Version History
                </h3>

                <p className="mt-1 text-sm text-[#6B7280]">
                View previous versions of this document.
                </p>
            </div>

            <div className="mt-5 space-y-3">

                {/* Version 1 */}
                <div className="flex items-center justify-between rounded-xl border border-[#D9E2E8] bg-[#F4F7F9] p-4">

                <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-[#00A6A6]">
                    <FileText size={20} strokeWidth={1.8} />
                    </div>

                    <div>
                    <p className="text-sm font-semibold text-[#123B5D]">
                        Version 1
                    </p>

                    <p className="mt-1 text-xs text-[#6B7280]">
                        Project Report.pdf • 2.4 MB
                    </p>
                    </div>

                </div>

                <div className="text-right">

                    <p className="text-xs font-medium text-[#263238]">
                    Today
                    </p>

                    <p className="mt-1 text-xs text-[#6B7280]">
                    Current Version
                    </p>

                </div>

                </div>

            </div>

        </div>

        {/* Actions */}
        <div className="flex gap-3 border-t border-[#D9E2E8] p-6">

          <button
            type="button"
            className="rounded-lg bg-[#1677B8] px-4 py-2.5
            text-sm font-semibold text-white
            transition hover:bg-[#3FA9D9]"
          >
            <span className="flex items-center gap-2">
              <Download size={17} strokeWidth={1.8} />
              Download
            </span>
          </button>

          <button
            type="button"
            onClick={() => navigate("/documents")}
            className="rounded-lg border border-[#D9E2E8] bg-white px-4 py-2.5
            text-sm font-medium text-[#263238]
            transition hover:bg-[#F4F7F9]"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}

export default DocumentDetails;
