import _ from "lodash";

export const paginate = (items, pageNo, pageSize) => {
    const indexStart = (pageNo - 1) * pageSize;
    return _(items).slice(indexStart).take(pageSize).value();
};
