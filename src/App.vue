<template>
  <div class="app">
    <TodoHeader
      @handleShowAddTodo="handleShowAddTodo"
      @changeSearchValue="changeSearchValueTodo"
    />
    <TodosList
      :todosArray="todos"
      :order="order"
      @handleCLickTodo="handleCLickTodo"
    />
    <TodoAdd
      v-if="showAddTodo"
      @handleShowAddTodo="handleShowAddTodo"
      @updateTodoList="getTodoList"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import Todo from "@/types/Todo";
import TodosList from "@/components/TodosList.vue";
import Order from "@/types/Order";
import TodoHeader from "@/components/TodoHeader.vue";
import TodoAdd from "@/components/TodoAdd.vue";
import { ApiGetter, ApiUpdater } from "@/helpers/ApiConnecter";
import TodosArray from "./types/TodosArray";

export default defineComponent({
  name: "App",
  components: { TodoAdd, TodoHeader, TodosList },
  setup() {
    onMounted(() => {
      getTodoList();
    });

    const todos = ref<TodosArray[]>([]);
    const order = ref<Order>("name");
    const showAddTodo = ref(false);

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
        .map(todo => {
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
      showAddTodo.value = val;
    };
    const handleCLickTodo = (item: Todo) => {
      item.completed = !item.completed;
      new ApiUpdater("todo").update(item).then(() => {
        getTodoList();
      });
    };
    const handleCLickOrder = (valOrder: Order) => {
      order.value = valOrder;
    };

    return {
      todos,
      order,
      showAddTodo,
      getTodoList,
      changeTodoList,
      handleCLickOrder,
      handleCLickTodo,
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
