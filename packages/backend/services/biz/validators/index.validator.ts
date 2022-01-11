import { ActionParams } from 'moleculer';

const page = {
  type: 'number',
  integer: true,
  min: 1,
  optional: true,
  convert: true
};
const pageSize = {
  type: 'number',
  integer: true,
  min: 0,
  optional: true,
  convert: true
};
const limit = {
  type: 'number',
  integer: true,
  min: 0,
  optional: true,
  convert: true
};
const offset = {
  type: 'number',
  integer: true,
  min: 0,
  optional: true,
  convert: true
};
const sort = { type: 'string', optional: true };
const search = { type: 'string', optional: true };

const query = [{ type: 'object', optional: true }];

export const BreedsItemParams: ActionParams = {
  page,
  pageSize,
  sort,
  query,
  search
};
