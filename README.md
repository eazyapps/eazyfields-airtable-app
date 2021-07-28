# Eazyfields airtable app by [Eazyapps](https://eazyapps.dev)

[Winner](https://devpost.com/software/superfields) of the [Airtable Apps Contest](https://airtable.devpost.com/).

## Table of Contents

- [About this app](#about-this-block)
- [Screenshot](#screenshot)
- [Installation](#installation)
- [Contributions](#contributions)
- [License](#license)
- [Implementation details](#implementation-details)
- [Looking for help with blocks development?](#looking-for-help-with-blocks-development?)
- [How to remix this block](#how-to-remix-this-block)

## About this app

Create Airtable fields with pre-populated options for:

- Country, month or day of week - **in any world language**

- Year - specifying the options range

- Time - specifying the options range and time gap between options

## Screenshot

![Eazyfields app](https://softr-prod.imgix.net/applications/9bfb7bc1-ef08-416a-acea-ed1eaedc2e1a/assets/3a67caa6-414a-4990-9891-839dc9b54669.png)

## Installation

you can install this app from the airtable marketplace [here](https://airtable.com/marketplace/blkwgLQGZ8K4ZE6d1/eazyfields).

## Contributions

Are more than welcome. The goal is to have the community expand the app and it's field selection so that the entire Airtable community can benefit.

Some things that might benefit the community:

- Option to create the field as a linked record to a new table with the pre-populated values.

- Option to create the field as a multiple select field.

- Support for displaying different languages in different Airtable forms. If someone wants to add this, feel free to open an issue so I can suggest one possible way of implementing this.

## License

[MIT](LICENSE.md)

## Implementation details

This app uses:

1. Data from [CLDR](http://cldr.unicode.org/) (the unicode common locale data repository) for localized country, month and day names. The software library used to get CLDR data is the compact and performant [@phensley/cldr](@phensley/cldr) npm package.

2. The amazing [mobx library](https://mobx.js.org/README.html) for state management. Mobx promotes clear separation between view (react components), and state / view model (the data they depend on for rendering), which:

- Reduces code size and complexity.
- Allows for easier and faster testing.
- Creates components that re-render truly only when something they directly depend on in their rendering changes.

## Looking for help with custom airtable app development?

We at [Eazyapps](https://eazyapps.dev) have already developed quite a few [airtable apps](https://www.eazyapps.dev/airtable) and more are coming soon. We also offer extremely quick and reliable [airtable app development services](https://www.eazyapps.dev/airtable/#services). Feel free to [contact us](https://www.eazyapps.dev/airtable-contact).

## How to remix this app

1. Create a new base (or you can use an existing base).

2. Create a new custom app in your base (see Create a new custom app, selecting "Remix from Github" as your template.

3. From the root of your new app, run block run.
