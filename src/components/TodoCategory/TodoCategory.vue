<template>
  <div class="todo-category">
    <div class="todo-category__header">
      <div class="todo-category__label">
        <p>выберите категорию</p>
        <img
          src="@/assets/add.svg"
          alt="add"
          @click="showAddCategory = !showAddCategory"
        />
      </div>
      <input
        v-if="showAddCategory"
        type="text"
        placeholder="создать категорию"
        v-model.trim="newCategoryName"
        @keyup.enter="createCategory"
      />
    </div>
    <div class="todo-category__main">
      <ItemCategory
        v-for="item in categories"
        :category="item"
        :selectCategory="selectCategory"
        :key="item._id"
        @choseCategory="choseCategory"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, PropType } from "vue";
import ItemCategory from "@/components/TodoCategory/ItemCategory.vue";
import { ApiCreator, ApiGetter } from "@/helpers/ApiConnecter";
import Category from "@/types/Category";

export default defineComponent({
  components: { ItemCategory },
  props: {
    selectCategory: {
      type: Object as PropType<Category>,
      required: true
    }
  },
  setup(props, { emit }) {
    onMounted(() => {
      getCategoriesList();
    });
    const categories = ref<Category[]>([]);
    const showAddCategory = ref(false);
    const newCategoryName = ref("");

    const changeCategoryList = (array: Category[]) => {
      categories.value = [...array, ...categories.value];
    };
    const getCategoriesList = () => {
      new ApiGetter("category").getAll().then((resp: any) => {
        changeCategoryList(resp.data);
      });
    };
    const createCategory = () => {
      if (!newCategoryName.value.length) return false;
      new ApiCreator("category")
        .create({
          name: newCategoryName.value
        })
        .then((resp: any) => {
          changeCategoryList([resp.data]);
          newCategoryName.value = "";
        });
    };
    const choseCategory = (item: Category) => {
      emit("choseCategory", item);
    };
    return {
      categories,
      showAddCategory,
      newCategoryName,
      createCategory,
      getCategoriesList,
      choseCategory
    };
  }
});
</script>

<style scoped lang="scss">
.todo-category {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  &__header {
    font-size: 1.2rem;
    margin-bottom: 10px;
    input {
      width: 100%;
      background: snow;
      outline: none;
      border-radius: 5px;
      font-size: 1rem;
      margin: 5px 0;
      border: 1px solid #333;
      padding: 2px 5px;
    }
  }
  &__label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      cursor: pointer;
      width: 14px;
    }
  }
  &__main {
    display: flex;
    flex-direction: column;
    height: 150px;
    overflow-y: auto;
  }
}
</style>
