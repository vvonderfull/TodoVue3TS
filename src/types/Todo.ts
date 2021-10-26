import Category from "@/types/Category";

interface Todo {
  _id: string;
  name: string;
  description: string;
  completed: boolean;
  category: Category | object;
}
export default Todo;
