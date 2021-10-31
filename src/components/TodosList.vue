<template>
  <div class="todos-bg">
    <ul
      class="todos-bg__list"
      v-for="(todos, index) in todosArray"
      :key="index + todos.category"
    >
      <label class="todos-bg__label">{{ todos.category }}</label>
      <TodoItem
        v-for="todo in todos.items"
        :todo="todo"
        :key="todo._id"
        @handleCLickTodo="clickTodo"
      />
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Todo from "@/types/Todo";
import TodoItem from "@/components/TodoItem.vue";

export default defineComponent({
  components: { TodoItem },
  props: {
    todosArray: {
      type: Array as PropType<Todo[][]>,
      required: true
    }
  },
  setup(props, { emit }) {
    const clickTodo = (type: string, todo: Todo) => {
      emit("handleCLickTodo", type, todo);
    };
    return {
      clickTodo
    };
  }
});
</script>

<style scoped lang="scss">
.todos-bg {
  display: flex;
  justify-content: space-around;
  width: 95%;
  overflow: auto;
  padding-right: 10px;

  &__list {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 10px;
  }
  &__label {
    font-size: 1rem;
    margin-bottom: 10px;
    padding: 0 20px;
  }
}
</style>
