import sanitizeHTML from "sanitize-html";
//html을 없애고 내용이 길면 200자로 제한하는 함수
export const removeHtmlAndShorten = (body) => {
  const filtered = sanitizeHTML(body, {
    allowedTags: [],
  });
  return filtered.length < 200 ? filtered : `${filtered.slice(0, 200)}...`;
};

const sanitizeOption = {
  allowedTags: [
    "h1",
    "h2",
    "h3",
    "b",
    "i",
    "u",
    "s",
    "p",
    "ul",
    "ol",
    "li",
    "blockquote",
    "a",
    "img",
  ],
  allowedAttributes: {
    a: ["href", "name", "target"],
    img: ["src"],
    li: ["class"],
  },
  allowedSchemes: ["data", "http"],
};

export default sanitizeOption;