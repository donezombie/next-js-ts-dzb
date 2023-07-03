import React, { useCallback } from "react";
import { cloneDeep } from "lodash";

function useFiltersHandler<T>(initialFilters: T & { page?: number }) {
  const [filters, setFilters] = React.useState(initialFilters);

  const increasePage = useCallback(() => {
    setFilters((prev) => {
      const nextFilters = cloneDeep(prev);
      if (nextFilters) {
        if ("page" in nextFilters) {
          nextFilters["page"] = (nextFilters?.["page"] || 0) + 1;
        }
      }
      return nextFilters;
    });
  }, []);

  const resetToInitialFilters = useCallback(() => {
    setFilters(cloneDeep(initialFilters));
  }, [initialFilters]);

  return {
    filters,
    setFilters,
    increasePage,
    resetToInitialFilters,
  };
}

export default useFiltersHandler;
