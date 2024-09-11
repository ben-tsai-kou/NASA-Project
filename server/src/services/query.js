const DEFAULT_PAGE_NUMBER = 1;

// 在 mongoDB 裡面，如果 Page 給 0 的話，會回傳全部的資料，所以這邊要設定一個預設值
const DEFAULT_PAGE_LIMIT = 0;

const getPagination = ({ page: queryPage, limit: queryLimit }) => {
  // Math.abs => 取絕對值並轉換成 Number
  const page = Math.abs(queryPage) || DEFAULT_PAGE_NUMBER;
  const limit = Math.abs(queryLimit) || DEFAULT_PAGE_LIMIT;
  const skip = (page - 1) * limit;
  return { limit, skip };
};

module.exports = {
  getPagination,
};
