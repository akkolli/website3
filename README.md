# Akshay Kolli's website

A Hugo site with an academic letterhead, research and writing collections,
software pages, professional updates, and a section-aware table of contents.

## Preview

Use Hugo v0.168.0 or later:

```sh
hugo server --port 1314 --disableFastRender
```

Open http://localhost:1314/. Draft posts are hidden by default. To deliberately
preview unpublished content, add `--buildDrafts`.

## Add content

```sh
hugo new content posts/my-note.md
hugo new content research/my-paper.md
hugo new content software/my-app.md
hugo new content updates/my-update.md
```

New content starts with `draft = true`. Set it to `false` when ready to publish.
Use `selected = true` to feature an item on the homepage, and the post's `label`
to distinguish technical notes and essays. Updates appear as text at the bottom
of the homepage.

## Build

Set `baseURL` in `hugo.toml` to the final site address before deployment; it
currently contains a placeholder. Then run:

```sh
hugo --minify --buildDrafts=false --cleanDestinationDir
```

The generated site is in `public/`. Generated files, caches, and local design
explorations are excluded from Git.

## Container

The container builds the Hugo source, excludes drafts, and serves the result
with nginx on port 80. Supply the final site address as a build argument:

```sh
docker build -f ContainerFile --build-arg BASE_URL=https://your-domain.example/ -t website3 .
docker run --rm -p 8080:80 website3
```
