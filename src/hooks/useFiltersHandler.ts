import React, { useCallback } from 'react';
import { cloneDeep } from 'lodash';
import { PaginationFilters } from 'interfaces/common';

function useFiltersHandler<T>(initialFilters: T & PaginationFilters) {
  const [filters, setFilters] = React.useState(initialFilters);

  const increasePage = useCallback(() => {
    setFilters((prev) => {
      const nextFilters = cloneDeep(prev);
      if (nextFilters) {
        nextFilters['page'] = (nextFilters?.['page'] || 0) + 1;
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
