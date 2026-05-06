export default function Spinner({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <div className="w-10 h-10 border-4 border-blue-200 dark:border-blue-900 border-t-blue-500 rounded-full animate-spin" />
      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
        {text}
      </p>
    </div>
  );
}