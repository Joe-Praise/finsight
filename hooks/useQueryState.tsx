import { useQueryStates } from 'nuqs';

export const usePaginationQueries = () => {
  const [{ pageSize, page }, setParams] = useQueryStates(
    {
      pageSize: {
        defaultValue: '10',
        parse: Number,
      },
      page: {
        defaultValue: '0',
        parse: Number,
      },
    },
    {
      history: 'push',
      shallow: false,
    }
  );

  const setPageSize = (newPageSize: number) => {
    setParams({ pageSize: newPageSize });
  };
  const setPage = (newPage: number) => {
    setParams({ page: newPage });
  };

  return {
    pageSize,
    setPageSize,
    page,
    setPage,
    setPaginationQueries: setParams,
  };
};
