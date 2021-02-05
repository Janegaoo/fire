/*
 * @Author: Jane
 * @Date: 2020-06-16 15:30:32
 * @LastEditors: Jane
 * @LastEditTime: 2020-06-16 15:45:33
 * @Descripttion:
 */

export default function pageInfo(pageChange, onShowSizeChange) {
  const obj = {
    size: 'small',
    current: 1,
    total: 0,
    pageSize: 10,
    showSizeChanger: true,
    onChange: pageChange,
    onShowSizeChange,
    showTotal: (total, range) => `第${range[0]}-${range[1]}条/总共${total}条`,
  };
  return obj;
}
