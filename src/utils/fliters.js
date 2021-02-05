/*
 * @Author: Jane
 * @Date: 2020-06-15 14:50:53
 * @LastEditors: Yawen
 * @LastEditTime: 2020-07-13 16:12:10
 * @Descripttion:
 */
import moment from 'moment';

export function dateFormatShort(val) {
  if (moment(val).isValid()) {
    return moment(val).utcOffset(480).format('YYYY-MM-DD');
  }
  return '- -';
}

export function dateFormat(val) {
  if (moment(val).isValid()) {
    return moment(val).utcOffset(480).format('YYYY-MM-DD HH:mm:ss');
  }
  return '- -';
}
