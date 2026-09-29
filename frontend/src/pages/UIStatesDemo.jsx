import { useState } from "react";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";
import ConfirmModal from "../components/ConfirmModal";
import StatusMessage from "../components/StatusMessage";
import LoadingState from "../components/LoadingState";

function UIStatesDemo() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const testLoading = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }, 1500);
  };

  const testDelete = () => {
    setModalOpen(false);
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen space-y-6">

      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#123B5D]">
          UI States
        </h1>

        <p className="mt-1 text-sm text-[#6B7280]">
          Test loading, empty, error, confirmation, and feedback states.
        </p>
      </div>

      {/* Success Message */}
      {success && (
        <StatusMessage
          type="success"
          message="Action completed successfully."
        />
      )}

      {/* Test Buttons */}
      <div className="rounded-2xl border border-[#D9E2E8] bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-[#123B5D]">
          Component Tests
        </h2>

        <div className="mt-5 flex flex-wrap gap-3">

          <button
            type="button"
            onClick={testLoading}
            className="rounded-lg bg-[#1677B8] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#3FA9D9]"
          >
            Test Loading
          </button>

          <button
            type="button"
            onClick={() => setError(true)}
            className="rounded-lg bg-[#DC2626] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#B91C1C]"
          >
            Test Error
          </button>

          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="rounded-lg bg-[#00A6A6] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#087F8C]"
          >
            Test Confirmation
          </button>

        </div>
      </div>

      {/* Loading */}
      {loading && (
        <LoadingState
          message="Loading document information..."
        />
      )}

      {/* Error */}
      {error && (
        <ErrorState
          title="Unable to load data"
          message="The requested information could not be loaded. Please try again."
          onRetry={() => setError(false)}
        />
      )}

      {/* Empty */}
      <EmptyState
        title="No documents available"
        message="There are currently no documents matching your selected criteria."
        actionLabel="Upload Document"
        onAction={() => alert("Upload Document clicked.")}
      />

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={modalOpen}
        title="Delete Document"
        message="Are you sure you want to delete this document? This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        danger={true}
        onConfirm={testDelete}
        onCancel={() => setModalOpen(false)}
      />

    </div>
  );
}

export default UIStatesDemo;