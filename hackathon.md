## Inspiration

To be able to easily and quickly create frequently used field "types" in a way that:

1. Saves time

2. Prevents human errors

3. Allows users to create country, month and day fields in **any** world language with confidence, even if they are not familiar with the language.

## What it does

Allows the user to create Airtable fields with pre-populated options for:

- Country, month or day of week, with support for selecting any of the world's languages as the language for the field options

- For month and day of week, selecting the format (full or abbreviated) for the options

- Year - specifying the options range

- Time - specifying the options range and gap between options

## How I built it

This block uses:

1. Data from [CLDR](http://cldr.unicode.org/) (the unicode common locale data repository) for localized country, month and day names. The software library used to get CLDR data is the compact and performant [@phensley/cldr](@phensley/cldr) npm package.

2. The [mobx library](https://mobx.js.org/README.html) for state management. Mobx promotes clear separation between view (react components), and state / view model (the data they depend on for rendering), which:

- Reduces code size and complexity.

- Allows for easier and faster testing.

- Creates components that re-render truly only when something they directly depend on in their rendering changes.

## Challenges I ran into

Even though the [@phensley/cldr](@phensley/cldr) npm package is thoroughly documented, is was missing a _Getting started_ tutorial so there was a learning curve on how to use it and how to dynamically load language specific data, in order to minimize block loading time.

## Accomplishments that I'm proud of

1. That in a short period of time, I created something that can benefit a huge potential Airtable user base.

2. That in such a short period of time, using the expertise (and code) I acquired in developing other blocks, I was able to create a block that is already today ready for primetime use.

## What I learned

1. That there is a standards backed project that provides key building blocks for software to support all of the world's languages - the [Unicode CLDR Project](http://cldr.unicode.org/)

2. How to use the [@phensley/cldr](@phensley/cldr) npm package for dynamically loading CLDR data.

## What's next for Eazyfields by Superblocks.at

The goal is to have the community expand the block and it's field selection so that the entire Airtable community can benefit.

Some things that might benefit the community:

- Ability to create the field as a linked record to a new table with the options as records.

- Ability to create the field as a multiple select field.

- Support for displaying different languages in different Airtable forms while still being able to use a primary field that the different language specific fields are connected to.

## Notes

The block has been renamed to Eazyfields from Superfields. The video and Airtable base still use the old name.
