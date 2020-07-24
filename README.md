# Eazyfields block by [Superblocks](https://superblocks.at)

[Winner](https://devpost.com/software/superfields) in the [Airtable Blocks Contest](https://airtable.devpost.com/).

## Table of Contents

- [About this block](#about-this-block)
- [Screenshot](#screenshot)
- [Installation](#installation)
- [Contributions](#contributions)
- [License](#license)
- [Implementation details](#implementation-details)
- [Looking for help with custom blocks development?](#looking-for-help-with-custom-blocks-development?)
- [How to remix this block](#how-to-remix-this-block)

## About this block

Create Airtable fields with pre-populated options for:

- Country, month or weekday - **in any world language**

- Year - specifying the options range

- Time - specifying the options range and time gap between options

## Screenshot

![Eazyfields block](https://superblocks.at/eazyfields-block-screenshot-1/)

## Installation

1. This is a custom block. To install custom blocks, you need to join Airtable's custom blocks developer preview, by filling [this form](https://airtable.com/shrEvq5IlQqYxWkaS).

2. Follow the instructions [here](https://airtable.com/developers/blocks/guides/hello-world-tutorial#create-a-new-block) to create a new block - but in _Start from an example_, choose _Remix from GitHub_ and in _GitHub repository_, enter the URL for this repository:

https://github.com/superblocks-at/eazyfields-block

3. Install the block into your base by releasing it, using the following command:

```
block release
```

## Contributions

Are more than welcome. The goal is to have the community expand the block and it's field selection so that the entire Airtable community can benefit.

Some things that might benefit the community:

- Option to create the field as a linked record to a new table with the pre-populated values.

- Option to create the field as a multiple select field.

- Support for displaying different languages in different Airtable forms. If someone wants to add this, feel free to open an issue so I can suggest one possible way of implementing this.

## License

[MIT](LICENSE.md)

## Implementation details

This block uses:

1. Data from [CLDR](http://cldr.unicode.org/) (the unicode common locale data repository) for localized country, month and day names. The software library used to get CLDR data is the compact and performant [@phensley/cldr](@phensley/cldr) npm package.

2. The amazing [mobx library](https://mobx.js.org/README.html) for state management. Mobx promotes clear separation between view (react components), and state / view model (the data they depend on for rendering), which:

- Reduces code size and complexity.
- Allows for easier and faster testing.
- Creates components that re-render truly only when something they directly depend on in their rendering changes.

## Looking for help with custom blocks development?

We at [Superblocks](https://superblocks.at) have already developed quite a few [custom blocks](https://superblocks.at/#blocks) and more are coming soon. We also offer extremely quick and reliable [custom blocks development services](https://superblocks.at/#services). Feel free to [contact us](https://superblocks.at/#services).

## How to remix this block

1. Create a new base (or you can use an existing base).

2. Create a new block in your base (see Create a new block, selecting "Remix from Github" as your template.

3. From the root of your new block, run block run.
