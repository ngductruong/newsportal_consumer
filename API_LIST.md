Sport API Endpoint
=========
This file is for testing purpose with Savis Sport API Endpoint.

Version
----
1.0

API List
----
  - Category
  - News
  - Video
  - Gallery

API Key
----
- 96a309941b3ca378fb9ca9fed1e750be || Full access
- 360b3d3ff656df898e8d4f0865cb7e7b || Limited access

API Endpoint
--------------
```sh
api.biznews.com.vn
```

Category API
--
Parameters
- Id : ID of category item

```sh
/* Get all level 0 categories */
api/category/all/vi-VN

/* Get child categories */
api/category/{Id}/child
```
News API
--
Parameters
- Id : ID of news item
- CategoryId : ID of category item
- Count : number of records

```sh
/* Get latest news */
api/news/latest?count={Count}

/* Get latest news of a category */
api/news/latest?count={Count}&categoryId={CategoryId}

/* Get hot news */
api/news/hot?count={Count}

/* Get hot news of a category */
api/news/hot?count={Count}&categoryId={CategoryId}

/* Get news data (content) */
api/news/{Id}/data

/* Get news meta (content) */
api/news/{Id}/meta

/* Get next news */
api/news/{Id}/next?count={Count}&categoryId={CategoryId}

/* Get previous news */
api/news/{Id}/prev?count={Count}&categoryId={CategoryId}

```
