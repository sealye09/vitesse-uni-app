import type { MaybeRefOrGetter } from "vue";

import { onLoad } from "@dcloudio/uni-app";
import { computed, ref, toValue } from "vue";

export function useQuery(key?: MaybeRefOrGetter<string>) {
  const query = ref<AnyObject>({});

  onLoad((q) => {
    query.value = q || {};
  });

  const value = computed(() => (key ? query.value[toValue(key)] : null));
  return { query, value };
}
