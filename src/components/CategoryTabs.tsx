import { For } from "solid-js";

interface CategoryTabsProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

export default function CategoryTabs(props: CategoryTabsProps) {
  return (
    <div class="category-tabs">
      <div class="category-tabs-container">
        <For each={props.categories}>
          {(category) => (
            <button
              class={`category-tab ${props.selected === category ? 'active' : ''}`}
              onClick={() => props.onSelect(category)}
            >
              {category}
            </button>
          )}
        </For>
      </div>
    </div>
  );
}


