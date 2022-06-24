export const convertToFormSelect = (
  list: any[] | any = [],
  fieldForLabel: string | number | undefined = undefined,
  fieldForValue: string | number | undefined = undefined,
  noneOption: boolean | undefined = false,
) => {
  if (!fieldForLabel || !fieldForValue) {
    return [
      ...list.reduce((arr: any, el: any) => {
        return [...arr, { label: el, value: el }];
      }, []),
    ];
  }
  if (typeof list === `object` && list) {
    const listReturn = [
      ...list.reduce((arr: any, el: any) => {
        return [
          ...arr,
          {
            ...el,
            label: el[fieldForLabel] ?? `None`,
            value: el[fieldForValue] ?? ``,
          },
        ];
      }, []),
    ];

    if (noneOption) {
      return [{ label: `None`, value: `` }, ...listReturn];
    }
    return listReturn;
  }
  return [{ label: `None`, value: `` }, ...list];
};

export const getErrorMsg = (error: any) => {
  if (error?.response?.data?.error?.message) {
    return error.response.data.error.message;
  }

  if (error?.response?.data?.message) {
    return error?.response?.data?.message;
  }

  return `Something wrong!`;
};

export const encodeRefreshToken = (refreshToken = ``) => {
  return encodeURI(refreshToken);
};

export const decodeRefreshToken = (refreshTokenEncoded = ``) => {
  return decodeURI(refreshTokenEncoded);
};
