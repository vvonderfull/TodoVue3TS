<template>
  <div class="app">
    <TodoHeader
      @handleShowAddTodo="handleShowAddTodo"
      @changeSearchValue="changeSearchValueTodo"
    />
    <TodosList :todosArray="todos" @handleCLickTodo="handleCLickTodo" />
    <TodoAdd
      v-if="showAddTodo"
      :editValue="editDataTodo"
      @handleShowAddTodo="handleShowAddTodo"
      @updateTodoList="getTodoList"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import Todo from "@/types/Todo";
import TodosList from "@/components/TodosList.vue";
import TodoHeader from "@/components/TodoHeader.vue";
import TodoAdd from "@/components/TodoAdd.vue";
import { ApiDeleter, ApiGetter, ApiUpdater } from "@/helpers/ApiConnecter";
import TodosArray from "./types/TodosArray";

export default defineComponent({
  name: "App",
  components: { TodoAdd, TodoHeader, TodosList },
  setup() {
    onMounted(() => {
      getTodoList();
    });

    const todos = ref<TodosArray[]>([]);
    const showAddTodo = ref<boolean>(false);
    const editDataTodo = ref<object | null>(null);

    const changeSearchValueTodo = (value: string) => {
      let todoApi = new ApiGetter("todo");
      todoApi
        .getAll({
          name: value,
          description: value
        })
        .then((resp: any) => {
          changeTodoList(resp.data);
        });
    };
    const getTodoList = () => {
      new ApiGetter("todo").getAll().then((resp: any) => {
        changeTodoList(resp.data);
      });
    };
    const changeTodoList = (items: Todo[]) => {
      todos.value = items
        .map((todo: Todo) => {
          return {
            //@ts-ignore
            category: todo.category.name,
            items: items.filter(
              item =>
                //@ts-ignore
                item.category.name === todo.category.name
            )
          };
        })
        .filter(
          (todos, index, array) =>
            index === array.findIndex(todo => todos.category === todo.category)
        );
    };
    const handleShowAddTodo = (val: boolean) => {
      if (!val) {
        handleEditDataTodo(null);
      }
      showAddTodo.value = val;
    };
    const handleEditDataTodo = (val: object | null) => {
      editDataTodo.value = val;
    };
    const handleCLickTodo = (type: string, item: Todo) => {
      switch (type) {
        case "check":
          item.completed = !item.completed;
          new ApiUpdater("todo").update(item).then(() => {
            getTodoList();
          });
          break;
        case "edit":
          handleEditDataTodo(item);
          handleShowAddTodo(true);
          break;
        case "delete":
          new ApiDeleter("todo").delete(item._id).then(() => {
            getTodoList();
          });
          break;
        default:
          return false;
      }
    };

    return {
      todos,
      showAddTodo,
      editDataTodo,
      getTodoList,
      changeTodoList,
      handleCLickTodo,
      handleEditDataTodo,
      handleShowAddTodo,
      changeSearchValueTodo
    };
  }
});
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background: linear-gradient(#a88cc2, #e7cdc1, #fcf9f7);
  overflow-y: auto;
}
</style>
