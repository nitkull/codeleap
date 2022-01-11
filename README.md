# CodeLeaP Homework

CodeLeaP-Simplify System

## How to development

> - Clone code from [git@github.com:nitkull/codeleap.git](https://github.com/nitkull/codeleap.git)
> - Read more about [yarn workspace](https://classic.yarnpkg.com/en/docs/workspaces/)

### Install dependencies

> Remember that you are installing dependencies at project root path.

```bash
cd /path/to/project/root/
yarn # Or yarn install
```

### Add or remove dependencies

```bash
yarn workspace {WORKSPACE_NAME} [add][remove] {PACKAGE_NAME}
```

Ex:

```bash
yarn workspace @app/backend add moleculer
```

### Setup Environment file

> Switch working directory to project root path

**Backend**

```bash
cp packages/backend/.env.default packages/backend/.env.dev
```

> For test Environment. Copy `.env.default` to `.env.test`

**Database**

```bash
cp packages/database/.env.default packages/database/.env.dev
```

### Execute development mode

> Remember that you are running at project root path.

#### Backend

```bash
yarn serve:backend
```

================================================================

# Cat API - Typescript Exercise

## Introduction

Everybody loves cats. To satisfy the large demand for beautiful images of cats we need to be able to deliver pictures of them at a moments notice, whenever someone wishes to receive them. The preferred method of doing this of course is via the internet. The key goal of this exercise is to structurize and build an API where people are able to upload and receive cute images of cats.

## Requirements

The API should fulfill the following requirements:

- Runs on NodeJS
- Written in Typescript
- Uses a Database to categorize cat images by breed
- Offers the possibility to upload cat images for a specific breed
- Retreive a specific number of random cat images for a specific breed
- Retreive a specific number of random cat images out of all breeds

# Tasks

Please document your thoughtprocess and answers in a seperate document.

## Task 1 - Structuring

Setup a new Typescript Project that uses any packages of your choice from the [npmjs]([https://www.npmjs.com/) repository to be able to react to http/s-requests and setup the Classes, Types and Models to be able to save Information on cat breeds and the respective images that can be uploaded for a specific breed.

```bash
---packages
    |
      --- backend
      --- database // mongodb
      --- models // mongodb
      --- types
    |
      --- provision // setup mongo, redis, nats
    | --- package.json

```

## Task 2 - Reading

Load the attached Dataset `.json` file into your Database to use as an initial frame.
`Run cmd:`

```bash
  yarn workspace @app/database seed
```

![Seed Data](/image/p1.png)

## Task 3 - Api Requests

Implement the following API-Requests

### Get Breeds

```
GET /api/breeds
```

http://localhost:3000/api/v1/auth/breeds

![Get All Data](/image/p2.png)

Retreives a list of breeds from the Database

> Extra Credit: \
> Add functionality to be able to order the results by a specific parameter

### Get specific Breed

```
GET /api/breeds/{breed_name}
```

http://localhost:3000/api/v1/auth/getBreedsByName?breed_name=name

![Get Data By Name](/image/p3.png)

Retrieves information on a specific breed, which is defined in place of `{breed_name}` using the `kebab-case` convention.

### Upload Image

```
POST /api/images
```
http://localhost:3000/api/v1/storage/upload

Link image upload: https://nit.sgp1.cdn.digitaloceanspaces.com//-20220112125754-cat001.jpeg

![Upload to S3](/image/p4.png)

Uploads an image. Add functionality to attach the Image to a specific Breed.

### Delete Image

```
DELETE /api/images/{image_id}
```
http://localhost:3000/api/v1/auth/removeById?id=<`id`>

Deletes an Image

![Upload to S3](/image/p5.png)

### Get Image

```
GET /api/images/{image_id}
```
http://localhost:3000/api/v1/auth/findByCode?code=<`code`>

![Upload to S3](/image/p6.png)

Returns an Image with a URL to view it.

### Get Random Images

```
GET /api/images/random
```
http://localhost:3000/api/v1/auth/getListImage?pageSize=20&page=1

![Upload to S3](/image/p7.png)

Retrieves a random list of images with their respective urls. Supports query parameter to specify amount of Images (max 20) and breed.

## Task 4 - Extra Credit

Implement something you consider this API should support.
