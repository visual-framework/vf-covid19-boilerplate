# VF Covid19 Build Boilerplate

Guidance, documentation and portable CSS+JS to build a site based off the [Covid19DataPortal.org](https://www.covid19dataportal.org/) look and UX (a [Visual Framework 2.0](https://visual-framework.github.io/vf-core/) site).

```html
CSS and JS URL here
```

[View the documentation and guidance](https://visual-framework.github.io/vf-covid19-boilerplate/)

## Developing 

1. You'll need to [install npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
1. If you don't have `yarn`, install it
   - https://yarnpkg.com/lang/en/docs/install/
1. Install all the things
   - `yarn install`
1. Generate the site in `/build`
   - `gulp build` build static assets
   - `gulp dev` renders and serves
1. Deploy in Github Pages `/build` folder
   - `yarn deploy` build folder will get deployed to gh-pages branch

### Adding Visual Framework components

To add a component, use the command line or install it manually.

- by package: `yarn add @visual-framework/vf-logo`
    - updating components: `yarn upgrade-interactive --latest` (alias: `yarn run update-components`)
- Manual installation for customisation
    - Download a pattern
    - Copy it to `./src/components/vf-component-name`
- Create your own local component
    - You can add a custom VF-compatible component to `./src/components` and use it in your site.
    - `gulp vf-component`

## Troubleshooting

Having problems? See https://visual-framework.github.io/vf-core/troubleshooting/

## Footnotes

- Why `yarn` and not `npm`?
  For the particular structure of the Visual Framework components, Yarn is considerably
  faster at installing and does so more efficiently (about half the total file size). You'll
  also be able to use `yarn upgrade-interactive --latest`, which makes it easier to update
  VF components.
