import { PropertyFilterInput } from '../../src/property/inputs/propertyFilterInput';

export function filterProperties(filter: PropertyFilterInput) {
  const query: any = {};
  if (filter) {
    if (filter.title) query.title = filter.title;
    if (filter.tags) query.tags = { $in: filter.tags };
    if (filter.additionalConveniences)
      query.additionalConveniences = { $in: filter.additionalConveniences };
    if (filter.propertyFor) query.propertyFor = filter.propertyFor;
    if (filter.ownership) query.ownership = filter.ownership;
    if (filter.propertyArea) query.propertyArea = filter.propertyArea;
    if (filter.type) query.type = filter.type;

    // Fix for onSale filter
    if (filter.onSale?.isOnSale !== undefined) {
      query['onSale.isOnSale'] = filter.onSale.isOnSale;
    }

    if (filter.searchFor) {
      query.$text = { $search: filter.searchFor };
    }
  }
  const options = { where: query };
  if (filter?.limit) {
    options['take'] = filter.limit;
  }
  if (filter?.offset) {
    options['skip'] = filter.offset;
  }
  return options;
}
