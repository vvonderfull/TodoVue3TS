<template>
  <div
    :class="['item-category', isChosenCategory ? 'item-category__chosen' : '']"
    @click="choseCategory"
  >
    <p class="item-category__name">{{ category.name }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from "vue";
import Category from "@/types/Category";

export default defineComponent({
  props: {
    category: {
      type: Object as PropType<Category>,
      required: true
    },
    selectCategory: {
      type: Object as PropType<Category>,
      required: true
    }
  },
  setup(props, { emit }) {
    // TODO: For multiple
    // const isChosenCategory = computed(() => {
    //   return props.selectCategory.some(item => {
    //     return item._id === props.category._id;
    //   });
    // });
    const isChosenCategory = computed(() => {
      return props.selectCategory?._id
        ? props.selectCategory._id === props.category._id
        : false;
    });
    const choseCategory = () => {
      emit("choseCategory", props.category);
    };
    return {
      isChosenCategory,
      choseCategory
    };
  }
});
</script>

<style scoped lang="scss">
.item-category {
  display: flex;
  width: 100%;
  margin-bottom: 5px;
  padding: 5px 10px;
  cursor: pointer;
  &__chosen {
    background: #a88cc2 !important;
  }
  &__name {
  }
  &:hover {
    background: bisque;
  }
}
</style>
