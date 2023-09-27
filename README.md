# Contrived LSP Issue

There appears to be an issue in how the neovim LSP is parsing certain types coming out of the `react-hook-form` library.

## Project Overview

In this contrived example, there are two `nx` workspace folders. The entire project is using Typescript for type safety.

The first folder is `apps` where a NextJS, App Directory based web project exists. 

The second folder is `libs` where a shared UI component library lives.

## The problem

In setting up controlled UI components, we need to pass the `control` object to each of those components in order for `react-hook-form` to be able to recognize those fields and "do its thing."

In keeping things type safe, we need to inform the component what exactly a `Control` is and why it's there as part of the group of props being passed through to the component library.

To do this, we're pulling-in the `Control` Type from `react-hook-form` and applying it to the type being generated using `zod.infer`. This can be seen in `/apps/web/validation/user.ts`. The problem is that as soon as we import that type for use in `/apps/web/app/page.tsx` it causes all Typescript types and validation break. 

I've checked `:LspLog` for any useful information with regard to logging related to this error to no avail. It seems that whatever is going on here is just swallowing all Typescript functionality within the `/apps/web/**/*` workspace and nothing, other than not importing and applying the types from `react-hook-form` inside that validation seems to bring it back.

Disclaimer: I know there are likely Typescript errors and that not everything in this contrived example is perfect, but it illustrates the issue I'm facing on the most-basic level I can come up with that still encompasses my project setup.


## Steps to reproduce

1. Open `/apps/web/app/page.tsx`.
2. Notice that there is a Typescript error on line `102` of the file, related to the `control` prop.
3. Open `/apps/web/validation/user.ts`.
4. un-comment lines `2`, `15-16`.
5. comment-out line `23`
6. Save the file after updating those comments.
8. Go back to `/apps/web/app/page.tsx`.
7. Run `:LspRestart`

You should now be at the broken LSP error state where you'll notice that there are no errors in the file anymore, and that LSP hover, and other LSP-related functionality no longer works.
