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
    if (filter.onSale) query.onSale = filter.onSale;
    if (filter.searchFor) {
      query.$text = { $search: filter.searchFor };
    }
    if (filter.offset) {
      query.offset = filter.offset;
    }
  }
  return { where: query };
}
