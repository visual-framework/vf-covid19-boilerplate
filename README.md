# VF Covid19 Build Boilerplate

A mininimal implementation to build VF 2.0 components into static CSS and JS to build Covid19 portals.

> Looking for other ways to use Visual Framework 2.0 components?
> [See the guide](https://visual-framework.github.io/vf-welcome/building/)

## Creating a new project powered by vf-covid19-boilerplate

There are two methods you can use:

1. Use the interactive yarn template [RECOMMENDED]
    - If you don't have npm, [install it](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
    - The [`create-vf-project`](https://github.com/visual-framework/create-vf-project) allows you to interactively create a new site by typing<br/> `yarn create @visual-framework/vf-project your-new-site-name vf-build-boilerplate`
    - Follow the prompts
1. The GitHub template
    - Click the "[Use this template](https://help.github.com/en/articles/creating-a-repository-from-a-template)" method; quick url: https://github.com/visual-framework/vf-covid19-boilerplate/generate
    - Follow the prompts and then clone the new project to your local machine

## Configuring the build

- In `package.json` update `vfConfig`
- If you need any ad hoc CSS and JS, add it in `./src/components/vf-local-overrides`

Otherwise configure gulp like any other project.

## Building assets, developing 

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

Having problems? See https://visual-framework.github.io/vf-welcome/troubleshooting/

## Footnotes

- Why `yarn` and not `npm`?
  For the particular structure of the Visual Framework components, Yarn is considerably
  faster at installing and does so more efficiently (about half the total file size). You'll
  also be able to use `yarn upgrade-interactive --latest`, which makes it easier to update
  VF components.
