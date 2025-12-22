import { createMemo, createSignal } from "solid-js";
import { samples } from "~/data/samples";

export type CartItem = {
  sampleId: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

const STORAGE_KEY = "trndfy_cart_v1";

function safeParse(json: string | null): CartState | null {
  if (!json) return null;
  try {
    return JSON.parse(json) as CartState;
  } catch {
    return null;
  }
}

function loadInitialState(): CartState {
  if (typeof window === "undefined") return { items: [] };
  const parsed = safeParse(window.localStorage.getItem(STORAGE_KEY));
  if (!parsed || !Array.isArray(parsed.items)) return { items: [] };
  return parsed;
}

const [cartState, setCartState] = createSignal<CartState>(loadInitialState());

function persist(next: CartState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export function useCart() {
  const items = createMemo(() => cartState().items);

  const itemCount = createMemo(() =>
    items().reduce((acc, it) => acc + (it.quantity || 0), 0)
  );

  const subtotalCents = createMemo(() => {
    const sampleById = new Map(samples.map((s) => [s.id, s]));
    return items().reduce((acc, it) => {
      const s = sampleById.get(it.sampleId);
      if (!s) return acc;
      return acc + s.priceUsdCents * it.quantity;
    }, 0);
  });

  const addSample = (sampleId: number, quantity = 1) => {
    const existing = items().find((i) => i.sampleId === sampleId);
    const nextItems = existing
      ? items().map((i) =>
          i.sampleId === sampleId ? { ...i, quantity: i.quantity + quantity } : i
        )
      : [...items(), { sampleId, quantity }];
    const next = { items: nextItems };
    setCartState(next);
    persist(next);
  };

  const removeSample = (sampleId: number) => {
    const next = { items: items().filter((i) => i.sampleId !== sampleId) };
    setCartState(next);
    persist(next);
  };

  const setQuantity = (sampleId: number, quantity: number) => {
    const q = Math.max(1, Math.floor(quantity || 1));
    const next = {
      items: items().map((i) => (i.sampleId === sampleId ? { ...i, quantity: q } : i)),
    };
    setCartState(next);
    persist(next);
  };

  const clear = () => {
    const next = { items: [] as CartItem[] };
    setCartState(next);
    persist(next);
  };

  const isInCart = (sampleId: number) => items().some((i) => i.sampleId === sampleId);

  return {
    items,
    itemCount,
    subtotalCents,
    addSample,
    removeSample,
    setQuantity,
    clear,
    isInCart,
  };
}




