# Akshay Kolli's website

A Hugo site with an academic letterhead, a chronological list of posts with
clickable tags, professional updates, and a section-aware table of contents.

## Preview

Use Hugo v0.168.0 or later:

```sh
hugo server --port 1314 --disableFastRender
```

Open http://localhost:1314/. Draft posts are hidden by default. To deliberately
preview unpublished content, add `--buildDrafts`.

## Add content

```sh
hugo new content posts/my-post.md
hugo new content updates/my-update.md
```

New content starts with `draft = true`. Set it to `false` when ready to publish.
All published posts appear together, newest first. Add one or more tags in the
post's front matter, for example:

```toml
tags = ['Technical note', 'World models']
```

Tags appear beside post titles and in article headers. Each tag opens a list of
related posts. Use tags such as `Research`, `Technical note`, `Personal essay`,
and `Software` to distinguish types of content, and add topic tags as needed.

Existing content in `research/` and `software/` also appears in the combined
posts list with its original URLs. Their archetypes remain available and supply
a default tag. Posts can include `authors`, `venue`, `paper`, `code`, and
`website` fields when useful. Professional updates stay separate as plain text
at the bottom of the homepage.

## Build

Set `baseURL` in `hugo.toml` to the final site address before deployment; it
currently contains a placeholder. Then run:

```sh
hugo --minify --buildDrafts=false --cleanDestinationDir
```

The generated site is in `public/`. Generated files, caches, and local design
explorations are excluded from Git.

## Cloudflare Workers

Cloudflare's Git integration deploys this repository with `npx wrangler deploy`.
The checked-in Wrangler configuration runs `npm run build` first and uploads
only `public/`. Drafts are excluded. Hugo and Wrangler are pinned in
`package.json` and `package-lock.json`; the build does not use `npx hugo`.

Use Node.js 22 or later. To verify the same build locally without publishing:

```sh
npm ci
npx wrangler deploy --dry-run
```

In Cloudflare, leave the separate build command blank and keep the deploy
command as `npx wrangler deploy`. The build command is defined in
`wrangler.jsonc`. Set the build environment variable `HUGO_BASEURL` to the final
site address, or set `baseURL` in `hugo.toml`.

## Container

The container builds the Hugo source, excludes drafts, and serves the result
with nginx on port 80. Supply the final site address as a build argument:

```sh
docker build -f ContainerFile --build-arg BASE_URL=https://your-domain.example/ -t website3 .
docker run --rm -p 8080:80 website3
```
