import { TodoistWidget } from "~/widgets/todoist";

export default function Index() {
  const handleRefresh = async () => {
    const response = await fetch("/api/clear", { method: "POST" });
    if (response.status === 200) {
      window.location.reload();
    }
  };
  return (
    <main className="bg-slate-200 h-screen overflow-hidden relative">
      <div className="grid grid-cols-2 gap-2 py-2 px-4 h-full">
        <TodoistWidget title="TODO" projectId="2247184740" />
        <TodoistWidget title="アイデア" projectId="2246816012" />
      </div>
      <button
        className="absolute left-5 bottom-3 bg-slate-300 rounded-full p-2 shadow-md shadow-black"
        onClick={handleRefresh}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-slate-800"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      </button>
    </main>
  );
}
