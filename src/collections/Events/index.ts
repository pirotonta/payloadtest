import { CollectionConfig } from 'payload';

const Events: CollectionConfig = {
  slug: 'events',
  labels: {
    singular: 'Evento',
    plural: 'Eventos',
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Título',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Breve descripción',
      required: true,
    },
    {
      name: 'day',
      type: 'date',
      label: 'Día',
      required: true,
    },
    {
      name: 'time',
      type: 'text',
      label: 'Horario',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagen del evento',
      required: true,
    },
  ],
};

export default Events;