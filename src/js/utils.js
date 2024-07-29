'use strict'

// alternative: https://github.com/mdevils/html-entities
import { decodeHTML } from 'entities'

// if you need a fancier one, you could use https://github.com/sindresorhus/slugify
export function urlifyToken (s) {
  return s.toLowerCase().replaceAll(' ', '-')
}

// https://github.com/DylanPiercey/strip
const htmlReg = /<\/?([a-z][a-z0-9]*)\b[^>]*>?/gi
const commentReg = /<!--.+-->/gi
export function stripHTML (html = '') {
  return decodeHTML(html.replace(htmlReg, '').replace(commentReg, '')).trim()
}

export function sortedPosts (paths) {
  return paths
    .filter(p => !p.frontmatter.draft)
    .sort(
    (a, b) => new Date(b.frontmatter.date).valueOf() - new Date(a.frontmatter.date).valueOf()
  )
}

export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    timeZone: "UTC",
  })
}

export function formatBlogPosts(posts, {
  filterOutDrafts = true,
  filterOutFuturePosts = true,
  sortByDate = true,
  limit = undefined,
} = {}) {

  const filteredPosts = posts.reduce((acc, post) => {
    const { date, draft } = post.frontmatter;
    // filterOutDrafts if true
    if (filterOutDrafts && draft) return acc;

    // filterOutFuturePosts if true
    if (filterOutFuturePosts && new Date(date) > new Date()) return acc;

    // add post to acc
    acc.push(post)

    return acc;
  }, [])

  // sortByDate or randomize
  if (sortByDate) {
    filteredPosts.sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))
  } else {
    filteredPosts.sort(() => Math.random() - 0.5)
  }

  // limit if number is passed
  if (typeof limit === "number") {
    return filteredPosts.slice(0, limit);
  }
  return filteredPosts;

}

import MarkdownIt from "markdown-it";
import { convert } from "html-to-text";
const parser = new MarkdownIt();

export const createExcerpt = (body) => {
  const html = parser.render(body);
  const options = {
    wordwrap: true,
    selectors: [
      { selector: "a", options: { ignoreHref: true } },
      { selector: "img", format: "skip" },
      { selector: "figure", format: "skip" },
    ],
  };
  const text = convert(html, options);
  const distilled = convert(text, options);
  return distilled;
};