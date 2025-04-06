import { createContentLoader } from "vitepress";
import { formatShowDate } from "./utils/index";
import { Post, PostLang } from "./type_def";
declare const data: Post[];
export { data };
export default createContentLoader(["feishupage/*.md", "/en/*.md"], {
  render: true, // 这里会渲染所有 markdown 内容
  excerpt: true, // 这里会提取所有文章摘要
  transform(raw): Post[] {
    return raw
      .filter(({ frontmatter }) => !frontmatter.hide)
      .map(({ url, frontmatter, excerpt }) => {
        // console.log("formater2", frontmatter.cover, url);
        const lan = url.startsWith("/en/") ? "en" : "zh";
        return {
          lanuage: lan,
          ...frontmatter,
          categories: frontmatter.categories || [],
          url,
          hit: 0,
          cover: frontmatter.cover || "/normal_cover.png",
          excerpt,
          date: formatDate(lan, frontmatter.create_time),
          edit_time: formatDate(lan, frontmatter.edit_time),
        } as Post;
      })
      .sort((a, b) => b.edit_time.time - a.edit_time.time);
  },
});

export function formatDate(lan: PostLang, create_time: number): Post["date"] {
  const date = new Date(create_time * 1000);
  date.setUTCHours(12);
  return {
    time: create_time,
    formatShowDate: formatShowDate(lan, date),
    string: date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };
}
