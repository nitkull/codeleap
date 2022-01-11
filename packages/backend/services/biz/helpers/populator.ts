import { ListParams } from '@app/models';
import { Service } from 'moleculer';
import { mapReduce } from 'utils/mapReduce';

type PopulateSourceType<TObjField extends string, TRefField extends string> = {
  [k in TObjField | TRefField]: any;
};

export const populate = <
  TObjField extends string,
  TRefField extends string,
  TRefFindField extends string,
  TObj extends PopulateSourceType<TObjField, TRefField>,
  TRef extends { [k in TRefFindField]: any }
>(options: {
  srcField: TObjField;
  refField: TRefFindField;
  populateField: TRefField;
  action: string;
  params: ListParams<TRef>;
}) =>
  async function (this: Service, values: any[], rows: TObj[]) {
    const { srcField, refField, populateField, action, params } = options;

    const fieldValues = [
      ...new Set(rows.map((item) => item[srcField]?.toString()).filter(Boolean))
    ];

    const refs = await this.broker.call<TRef[], ListParams<TRef>>(action, {
      ...params,
      query: {
        ...(params.query || {}),
        [refField]: { $in: fieldValues }
      }
    });

    const refMap = mapReduce(refs, refField as string, (item) => item);

    rows.forEach((row) => {
      row[populateField] = refMap[row[srcField]?.toString()] as any;
    });
        return rows;
  };
