const {
  STORAGE_ENDPOINT,
  STORAGE_ACCESS_KEY,
  STORAGE_SECRET_KEY,
  STORAGE_DEFAULT_BUCKET_NAME,
  STORAGE_REGION
} = process.env;
export default {
  /*
   |--------------------------------------------------------------------------
   | Default Filesystem Disk
   |--------------------------------------------------------------------------
   |
   |
   |
   */
  default: 'local',

  disks: {
    local: {
      driver: 'local',
      root: process.cwd()
    },

    s3: {
      driver: 's3',
      key: 'AWS_ACCESS_KEY_ID',
      secret: 'AWS_SECRET_ACCESS_KEY',
      region: 'AWS_LOCALTION',
      bucket: 'AWS_BUCKET'
    },

    spaces: {
      driver: 'dos3',
      key: STORAGE_ACCESS_KEY,
      secret: STORAGE_SECRET_KEY,
      endpoint: STORAGE_ENDPOINT,
      bucket: STORAGE_DEFAULT_BUCKET_NAME,
      region: STORAGE_REGION
    },

    gcs: {
      driver: 'gcs',
      keyFilename: 'GCS_KEY',
      bucket: 'GCS_BUCKET'
    }
  }
};
