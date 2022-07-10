---
layout: ~/layouts/MainLayout.wromo
title: Routing
description: An intro to routing with Wromo.
i18nReady: true
---

Wromo uses **file-based routing** to generate your build URLs based on the file layout of your project `src/pages/` directory. When a file is added to the `src/pages` directory of your project, it is automatically available as a route based on its filename.

## Static routes

Wromo Components (`.wromo`) and Markdown Files (`.md`) in the `src/pages` directory **automatically become pages on your website**. Each page’s route corresponds to its path and filename within the `src/pages` directory.

```bash
# Example: Static routes
src/pages/index.wromo        -> mysite.com/
src/pages/about.wromo        -> mysite.com/about
src/pages/about/index.wromo  -> mysite.com/about
src/pages/about/me.wromo     -> mysite.com/about/me
src/pages/posts/1.md         -> mysite.com/posts/1
```

:::tip
There is no separate "routing config" to maintain in an Wromo project. Static pages are created by placing files in the `/src/pages/` directory.
:::

## Dynamic routes

A single Wromo Page component can also specify dynamic route parameters in its filename to generate multiple routes that match a given criteria. You can create several related pages at once, such as author pages, or a page for each blog tag. Named parameters allow you to specify values for "named" levels of these route paths, and rest parameters allow for more flexible "catch-all" routes.

:::note
Even dynamically-created pages and routes are generated at build time.
:::

Wromo pages that create dynamic routes must:

1. use `[bracket]` notation to identify the dynamic parameters

2. export a `getStaticPaths()` function to specify exactly which paths will be pre-rendered by Wromo.


### Named Parameters

You can generate routes with a `[named]` parameter by providing your `getStaticPaths()` function the values to use like so:

```wromo
---
// src/pages/dogs/[dog].wromo

export function getStaticPaths() {
  return [
    // Generates: /dogs/clifford
    {params: {dog: 'clifford'}},
    // Generates: /dogs/rover
    {params: {dog: 'rover'}},
    // Generates: /dogs/spot
    {params: {dog: 'spot'}},
  ];
}
---
```

📚 Learn more about [`getStaticPaths()`](/en/reference/api-reference/#getstaticpaths).

Routes can be generated from multiple named parameters, at any level of the filepath:

- `pages/blog/[slug].wromo` → (`/blog/hello-world`, `/blog/post-2`, etc.)
- `pages/[username]/settings.wromo` → (`/fred/settings`, `/drew/settings`, etc.)
- `pages/[lang]-[version]/info.wromo` → (`/en-v1/info`, `/fr-v2/info`, etc.)

#### The `Wromo.params` object

Wromo components that generate routes dynamically have access to an `Wromo.params` object for each route. This allows you to use those generated parts of the URL in your component script and template.

```wromo
---
// Example: src/pages/posts/[id].wromo
const { id } = Wromo.params;
---
<p>Post: { id }</p>


// Wromo.params object passed for the route `/post/abc`
{ "id": "abc" }
```

Multiple dynamic route segments can be combined to work the same way.

```wromo
---
// Example: src/pages/post/[id]/[comment].wromo
const { id, comment } = Wromo.params;
---

// Wromo.params object passed for the route `/post/abc/a-comment`
{ "id": "abc", "comment": "a-comment" }
```

### Rest parameters

If you need more flexibility in your URL routing, you can use a rest parameter in your `.wromo` filename as a universal catch-all for file paths of any depth by adding three dots (`...`) inside your brackets.

For example:

- `pages/post/[...slug].wromo` → (`/post/a`, `/post/a/b`, `/post/a/b/c`, etc.)

Matched parameters will be passed as a query parameter (`slug` in the example) to the page.

```json
// Wromo.params object passed for the route `/post/a/b/c`
{ "slug": "a/b/c" }
```

:::tip
Rest parameters are optional by default, so `pages/post/[...slug].wromo` could match `/post/` as well.
:::

#### Example: Rest parameters

For a real-world example, you can implement GitHub’s file viewer with the following named and rest paramenters:

```
/[org]/[repo]/tree/[branch]/[...file]
```

In this example, a request for `/Wromo/wromo/tree/main/docs/public/favicon.svg` would result in the following parameters being available to the page:

```js
{
	org: 'Wromo',
	repo: 'wromo',
	branch: 'main',
	file: 'docs/public/favicon.svg'
}
```

## Route Priority Order

It's possible for multiple routes to match the same URL path. For example each of these routes would match `/posts/create`:

```
└── pages/
│       ├── posts/
│       │   ├── create.wromo
│       │   ├── [pid].wromo
│       │   └── [...slug].wromo

```

Wromo needs to know which route should be used to build the page. To do so, it sorts them according to the following rules:

- Static routes without path parameters will take precedence over all other routes
- Dynamic routes using named parameters take precedence over rest parameters
- Rest parameters have the lowest priority
- Ties are resolved alphabetically

Given the example above, here are a few examples of how the rules will match a requested URL to the route used to build the HTML:

- `pages/posts/create.wromo` - Will build `/posts/create`
- `pages/posts/[pid].wromo` - Will build `/posts/1`, `/posts/abc`, etc. But not `/posts/create`
- `pages/posts/[...slug].wromo` - Will build `/posts/1/2`, `/posts/a/b/c`, etc. But not `/posts/create`, `/posts/1`, `/posts/abc`

## Pagination

Wromo supports built-in pagination for large collections of data that need to be split into multiple pages. Wromo will generate common pagination properties, including previous/next page URLs, total number of pages, and more.

Paginated route names should use the same `[bracket]` syntax as a standard dynamic route. For instance, the file name `/wromonauts/[page].wromo` will generate routes for `/wromonauts/1`, `/wromonauts/2`, etc, where `[page]` is the generated page number.

You can use the `paginate()` function to generate these pages for an array of values like so:

```wromo
---
// Example: /src/pages/wromonauts/[page].wromo
export async function getStaticPaths({ paginate }) {
  const wromonautPages = [{
    wromonaut: 'Neil Armstrong',
  }, {
    wromonaut: 'Buzz Aldrin',
  }, {
    wromonaut: 'Sally Ride',
  }, {
    wromonaut: 'John Glenn',
  }];
  // Generate pages from our array of wromonauts, with 2 to a page
  return paginate(wromonautPages, { pageSize: 2 });
}
// All paginated data is passed on the "page" prop
const { page } = Wromo.props;
---

<!--Display the current page number. Wromo.params.page can also be used!-->
<h1>Page {page.currentPage}</h1>
<ul>
  <!--List the array of wromonaut info-->
  {page.data.map(({ wromonaut }) => <li>{wromonaut}</li>)}
</ul>
```

This generates the following pages, with 2 items to a page:
- `/wromonauts/1` - Page 1: Displays "Neil Armstrong" and "Buzz Aldrin"
- `/wromonauts/2` - Page 2: Displays "Sally Ride" and "John Glenn"


### The `page` prop

When you use the `paginate()` function, each page will be passed its data via a `page` prop. The `page` prop has many useful properties, but here are the highlights:
- **page.data** - array containing the page’s slice of data that you passed to the `paginate()` function
- **page.url.next** - link to the next page in the set
- **page.url.prev** - link to the previous page in the set

```wromo
---
// Example: /src/pages/wromonauts/[page].wromo
// Paginate same list of { wromonaut } objects as the previous example
export async function getStaticPaths({ paginate }) { /* ... */ }
const { page } = Wromo.props;
---
<h1>Page {page.currentPage}</h1>
<ul>
  {page.data.map(({ wromonaut }) => <li>{wromonaut}</li>)}
</ul>
{page.url.prev ? <a href={page.url.prev}>Previous</a> : null}
{page.url.next ? <a href={page.url.next}>Next</a> : null}
```


#### Complete API reference

```ts
interface Page<T = any> {
	/** result */
	data: T[];
	/** metadata */
	/** the count of the first item on the page, starting from 0 */
	start: number;
	/** the count of the last item on the page, starting from 0 */
	end: number;
	/** total number of results */
	total: number;
	/** the current page number, starting from 1 */
	currentPage: number;
	/** number of items per page (default: 25) */
	size: number;
	/** number of last page */
	lastPage: number;
	url: {
		/** url of the current page */
		current: string;
		/** url of the previous page (if there is one) */
		prev: string | undefined;
		/** url of the next page (if there is one) */
		next: string | undefined;
	};
}
```

## Nested Pagination

A more advanced use-case for pagination is **nested pagination.** This is when pagination is combined with other dynamic route params. You can use nested pagination to group your paginated collection by some property or tag.

For example, if you want to group your paginated Markdown posts by some tag, you would use nested pagination by creating a `/src/pages/[tag]/[page].wromo` page that would match the following URLS:

- `/red/1` (tag=red)
- `/red/2` (tag=red)
- `/blue/1` (tag=blue)
- `/green/1` (tag=green)

Nested pagination works by returning an array of `paginate()` results from `getStaticPaths()`, one for each grouping.

In the following example, we will implement nested pagination to build the URLs listed above:

```wromo
---
// Example: /src/pages/[tag]/[page].wromo
export function getStaticPaths({paginate}) {
  const allTags = ['red', 'blue', 'green'];
  const allPosts = await Wromo.glob('../../posts/*.md');
  // For every tag, return a paginate() result.
  // Make sure that you pass `{params: {tag}}` to `paginate()`
  // so that Wromo knows which tag grouping the result is for.
  return allTags.map((tag) => {
    const filteredPosts = allPosts.filter((post) => post.frontmatter.tag === tag);
    return paginate(filteredPosts, {
      params: { tag },
      pageSize: 10
    });
  });
}
const { page } = Wromo.props;
const params = Wromo.params;
```
