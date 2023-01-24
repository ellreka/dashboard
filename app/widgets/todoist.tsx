import type { FC } from "react";
import SWR from "swr";
import type { TodoistTasks } from "~/types/todoist";
import { fetcher } from "~/utils/fetcher";

interface Props {
  projectId: string;
  title: string;
}

export const TodoistWidget: FC<Props> = ({ projectId, title }) => {
  const { data } = SWR<TodoistTasks>("/api/todoist", fetcher, {
    // 1 hour
    refreshInterval: 1000 * 60 * 60,
  });

  const todos = data
    ?.filter((item) => item.project_id === projectId)
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

  return (
    <div className="w-full h-full bg-slate-600 text-white rounded-md p-3 overflow-auto">
      <h2 className="text-xl text-center font-bold">{title}</h2>
      <ul className="divide-y divide-slate-100 divide-dotted">
        {todos?.map((item) => (
          <li key={item.id} className="py-1 text-sm text-slate-200">
            <span>{item.content}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
