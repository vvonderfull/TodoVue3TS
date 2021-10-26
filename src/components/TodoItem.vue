<template>
  <li class="todo-item" @click="clickTodo">
    <div class="todo-item__checkbox">
      <img v-if="todo.completed" src="../assets/checked.svg" alt="checked" />
    </div>
    <div class="todo-item__info">
      <h2>{{ todo.name }}</h2>
      <p>{{ todo.description }}</p>
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Todo from "@/types/Todo";

export default defineComponent({
  props: {
    todo: {
      type: Object as PropType<Todo>,
      required: true
    }
  },
  setup(props, { emit }) {
    const clickTodo = () => {
      emit("handleCLickTodo", props.todo);
    };
    return { clickTodo };
  }
});
</script>

<style scoped lang="scss">
.todo-item {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100px;
  background: snow;
  border-radius: 20px;
  margin-bottom: 10px;
  padding: 0 20px;
  cursor: pointer;
  user-select: none;
  flex-shrink: 0;
  &:hover {
    background: white;
  }
  &__checkbox {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
    border: 2px solid black;
    border-radius: 10px;
    margin-right: 20px;
    img {
      width: 25px;
    }
  }
  &__info {
    display: flex;
    flex-direction: column;
  }
}
</style>
