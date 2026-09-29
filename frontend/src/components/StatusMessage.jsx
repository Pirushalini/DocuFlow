import {
  CheckCircle,
  AlertCircle,
  Info,
} from "lucide-react";

function StatusMessage({
  type = "success",
  message,
}) {
  const styles = {
    success: {
      wrapper:
        "border-[#BBF7D0] bg-[#F0FDF4] text-[#15803D]",
      icon: <CheckCircle size={18} />,
    },

    error: {
      wrapper:
        "border-[#FECACA] bg-[#FEF2F2] text-[#B91C1C]",
      icon: <AlertCircle size={18} />,
    },

    info: {
      wrapper:
        "border-[#BAE6FD] bg-[#F0F9FF] text-[#0369A1]",
      icon: <Info size={18} />,
    },
  };

  const currentStyle = styles[type] || styles.info;

  return (
    <div
      className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-sm font-medium ${currentStyle.wrapper}`}
    >
      {currentStyle.icon}

      <span>{message}</span>
    </div>
  );
}

export default StatusMessage;