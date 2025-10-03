import type { Block } from 'payload'

export const EventsBlock: Block = {
  slug: 'eventsBlock',
  interfaceName: 'EventsBlock',
  labels: {
    singular: 'Events Block',
    plural: 'Events Blocks',
  },
  fields: [
    {
      name: 'introContent',
      type: 'richText',
      label: 'Intro Content',
    },
    {
      name: 'populateBy',
      type: 'select',
      defaultValue: 'collection',
      options: [
        {
          label: 'Collection',
          value: 'collection',
        },
        {
          label: 'Individual Selection',
          value: 'selection',
        },
      ],
    },
    {
      name: 'limit',
      type: 'number',
      label: 'Events per page',
      defaultValue: 6,
      min: 1,
      max: 20,
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
    },
    {
      name: 'selectedEvents',
      type: 'relationship',
      relationTo: 'events',
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'selection',
      },
    },
  ],
}