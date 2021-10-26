<template>
  <div class="todo-add">
    <div class="todo-add__form">
      <img src="../assets/add.svg" alt="close" @click="hideAddTodo" />
      <input
        v-model.trim="nameTodo"
        type="text"
        placeholder="введите название"
      />
      <textarea
        v-model.trim="descriptionTodo"
        type="text"
        placeholder="введите описание"
      ></textarea>
      <TodoCategory
        :selectCategory="selectCategory"
        @choseCategory="changeSelectCategory"
      />
      <button @click="createTodo">создать</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import TodoCategory from "@/components/TodoCategory/TodoCategory.vue";
import Category from "@/types/Category";
import { ApiCreator } from "@/helpers/ApiConnecter";

export default defineComponent({
  components: { TodoCategory },
  props: {},
  setup(props, { emit }) {
    const nameTodo = ref("");
    const descriptionTodo = ref("");
    const selectCategory = ref<Category | Object>({});

    const changeSelectCategory = (category: Category | Object) => {
      // TODO: For multiple
      // let isChosen = selectCategory.value.some(item => {
      //   return item._id === category._id;
      // });
      // if (!isChosen) {
      //   selectCategory.value.push(category);
      // } else {
      //   selectCategory.value = selectCategory.value.filter(item => {
      //     return item._id !== category._id;
      //   });
      // }
      selectCategory.value = category;
    };
    const hideAddTodo = () => {
      emit("handleShowAddTodo", false);
    };

    const createTodo = () => {
      if (
        !nameTodo.value ||
        !descriptionTodo.value ||
        !Object.entries(selectCategory.value).length
      )
        return false;
      new ApiCreator("todo")
        .create({
          name: nameTodo.value,
          description: descriptionTodo.value,
          completed: false,
          category: selectCategory.value
        })
        .then(() => {
          emit("updateTodoList");
          hideAddTodo();
        });
    };

    return {
      nameTodo,
      descriptionTodo,
      selectCategory,
      hideAddTodo,
      createTodo,
      changeSelectCategory
    };
  }
});
</script>

<style scoped lang="scss">
.todo-add {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  &__form {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 500px;
    background: snow;
    padding: 40px 30px 30px;
    border-radius: 15px;
    img {
      width: 14px;
      position: absolute;
      top: 10px;
      right: 10px;
      transform: rotate(45deg);
      cursor: pointer;
    }
    input {
      width: 100%;
      height: 50px;
      background: white;
      border: 2px solid #333;
      outline: none;
      border-radius: 10px;
      font-size: 1.5rem;
      padding: 0 20px;
      box-sizing: border-box;
      margin-bottom: 20px;
      flex-shrink: 0;
    }
    textarea {
      width: 100%;
      height: 100px;
      background: white;
      border: 2px solid #333;
      outline: none;
      border-radius: 10px;
      font-size: 1.5rem;
      padding: 10px 20px;
      box-sizing: border-box;
      margin-bottom: 20px;
      resize: none;
      flex-shrink: 0;
    }
    button {
      padding: 5px 10px;
      border: none;
      outline: none;
      border-radius: 10px;
      background: #e7cdc1;
      margin-top: 10px;
      cursor: pointer;
      &:hover {
        background: #a88cc2;
      }
    }
  }
}
</style>
