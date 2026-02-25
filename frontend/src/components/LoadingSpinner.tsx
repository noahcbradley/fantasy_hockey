export default function LoadingSpinner({ message }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-600 border-t-blue-500" />
      {message && <p className="mt-4 text-gray-400">{message}</p>}
    </div>
  );
}
