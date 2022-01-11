import { SERVICE_BREEDS, SERVICE_STORAGE } from 'utils/constants';

const { UPLOAD_FILE_LIMIT } = process.env;
export const routes: any[] = [
  {
    path: '/api/v1/auth',
    etag: true,
    camelCaseNames: true,
    authentication: false,
    autoAliases: false,
    aliases: {
      'GET /breeds': `v1.${SERVICE_BREEDS}.list`,
      'GET /getBreedsByName': `v1.${SERVICE_BREEDS}.getBreedsByName`,
      'GET /findByCode': `v1.${SERVICE_STORAGE}.findByCode`,
      'POST /removeById': `v1.${SERVICE_STORAGE}.removeById`,
      'GET /getListImage': `v1.${SERVICE_STORAGE}.list`
    }
  },
  {
    path: '/api/v1/storage/upload',
    authentication: false,
    bodyParsers: {
      json: false,
      urlencoded: { extended: false }
    },
    aliases: {
      'POST /': {
        type: 'multipart',
        // Action level busboy config
        busboyConfig: {
          limits: { files: UPLOAD_FILE_LIMIT || 3 }
        },
        action: `v1.${SERVICE_STORAGE}.actUpload`
      }
    }
  }
];
