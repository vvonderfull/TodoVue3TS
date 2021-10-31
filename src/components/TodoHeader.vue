<template>
  <header class="app-header">
    <div class="app-header__search">
      <div class="app-header__label">
        <label for="input-search">поиск:</label>
        <img src="../assets/add.svg" alt="add" @click="showAddTodo" />
      </div>
      <input
        @input="checkDebounce"
        v-model="searchValue"
        id="input-search"
        type="text"
      />
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "TodoHeader",
  props: {},
  setup(props, { emit }) {
    const searchValue = ref("");
    const timerId = ref(0);

    const showAddTodo = () => {
      emit("handleShowAddTodo", true);
    };

    const checkDebounce = () => {
      clearTimeout(timerId.value);
      timerId.value = setTimeout(() => {
        changeSearchValue();
      }, 300);
    };
    const changeSearchValue = () => {
      emit("changeSearchValue", searchValue.value);
    };

    return {
      searchValue,
      checkDebounce,
      changeSearchValue,
      showAddTodo
    };
  }
});
</script>

<style scoped lang="scss">
.app-header {
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 30px 0;
  &__label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 5px;
    padding: 0 20px;
    label {
      margin-bottom: 2px;
    }
    img {
      cursor: pointer;
      width: 14px;
    }
  }
  &__search {
    display: flex;
    width: 50%;
    flex-direction: column;
    input {
      width: 100%;
      height: 50px;
      background: snow;
      border: none;
      outline: none;
      border-radius: 20px;
      padding: 0 20px;
      font-size: 1.5rem;
    }
  }
}
</style>
