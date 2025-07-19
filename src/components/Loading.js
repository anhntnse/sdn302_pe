export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[200px] w-full">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600 mr-3"></div>
      <span className="text-blue-600 font-medium text-lg">Loading...</span>
    </div>
  );
}
