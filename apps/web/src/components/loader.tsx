import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
        <span className="font-medium text-gray-500 text-sm">Loading...</span>
      </div>
    </div>
  );
}
