import { PostLang } from "./type_def";

export function formatShowDate(lan: PostLang, date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  if (lan === "zh") {
    return (
      date
        .toLocaleDateString("zh-CN", options)
        .replace("/", "年")
        .replace("/", "月") + "日"
    );
  }

  return date.toLocaleDateString("en-US", options);
}

/**
 * 格式化时间
 *
 * @param date 待格式化时间
 * @returns 格式化后的时间(YYYY/MM/dd AM hh:mm)
 */
export function formatDate(date) {
  const formatDate = new Date(date);
  return formatDate.toLocaleString("zh", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
}

/**
 * 获取 URL 路径中的指定参数
 *
 * @param paramName 参数名
 * @returns 参数值
 */
export function getQueryParam(paramName) {
  const reg = new RegExp("(^|&)" + paramName + "=([^&]*)(&|$)");
  let value = decodeURIComponent(window.location.search.substr(1)).match(reg);
  if (value != null) {
    return unescape(value[2]);
  }
  return null;
}

/**
 * 跳转到指定链接
 *
 * @param paramName 参数名
 * @param paramValue 参数值
 */
export function goToLink(url, paramName, paramValue) {
  if (paramName) {
    window.location.href = url + "?" + paramName + "=" + paramValue;
  } else {
    window.location.href = url;
  }
}

/**
 * 获取生肖图标
 *
 * @param year 年份
 */
export function getChineseZodiac(year) {
  const arr = [
    "monkey",
    "rooster",
    "dog",
    "pig",
    "rat",
    "ox",
    "tiger",
    "rabbit",
    "dragon",
    "snake",
    "horse",
    "goat",
  ];
  return arr[year % 12];
}

/**
 * 获取生肖名称
 *
 * @param year 年份
 */
export function getChineseZodiacAlias(year) {
  const arr = [
    "猴年",
    "鸡年",
    "狗年",
    "猪年",
    "鼠年",
    "牛年",
    "虎年",
    "兔年",
    "龙年",
    "蛇年",
    "马年",
    "羊年",
  ];
  return arr[year % 12];
}

/**
 * 格式化数字
 * @param num 要格式化的数字
 * @returns 格式化后的字符串
 */
export function getFormatNumber(num: number): string {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + "w";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "k";
  }
  return num.toString();
}
