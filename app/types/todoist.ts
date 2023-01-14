export type TodoistTasks = {
  id: string;
  assigner_id?: any;
  assignee_id?: any;
  project_id: string;
  section_id?: any;
  parent_id?: any;
  order: number;
  content: string;
  description: string;
  is_completed: boolean;
  labels: any[];
  priority: number;
  comment_count: number;
  creator_id: string;
  created_at: string;
  due?: any;
  url: string;
}[];
