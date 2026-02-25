export default function ErrorBanner({
  message,
  onDismiss,
}: {
  message: string;
  onDismiss: () => void;
}) {
  return (
    <div className="mb-6 flex items-center justify-between rounded-lg border border-red-800 bg-red-950 px-4 py-3 text-red-300">
      <span>{message}</span>
      <button
        onClick={onDismiss}
        className="ml-4 text-red-400 hover:text-red-200"
      >
        Dismiss
      </button>
    </div>
  );
}
