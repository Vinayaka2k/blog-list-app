# Blogs
The blogs endpoint exposes the `GET`, `POST`, `DELETE` and `PUT` methods for execution and consumption.

## `GET` 📖
There are *two* `GET` methods exposed for consumption, one is parameterless while the other has a single parameter.

### Parameterless
The first method is parameterless and should be expected to return *all* available blogs. It can be consumed at the following endpoint:

```
endpoint here
```

### Parameterized
The second method expects an `id` parameter and should be expected to return the blog associated with the specified `id`. If no blog is found, then a status code of `404` is returned. It can be consumed at the following endpoint:

```
endpoint here
```

## `POST` 📬
The `POST` method enables the creation of a blog post, assuming a valid bearer token is provided, using the following data model as the body content for the request:

```json
{
    "title": "My Fancy Dinner",
    "url": "https://myblog.com/my-fancy-dinner",
    "author": "tacosontitan",
    "likes": 9001
}
```

When the blog post is recorded successfully, a status code of `201` is returned along with the blog data above. The endpoint can be invoked at:

```
endpoint here
```

***Note**: If an invalid token is provided, then a status code of `401` will be returned.*

## `DELETE` ❌
The `DELETE` method allows the deletion of a blog by a specified `id` query parameter at the following endpoint:

```
endpoint here
```

This method returns a status code of `204`.

## `PUT` ♻️
The `PUT` method is utilized to update an existing blog post with the following body data:

```json
{
    "title": "My Fancy Dinner",
    "url": "https://myblog.com/my-fancy-dinner",
    "author": "tacosontitan",
    "likes": 9001
}
```

This method can be invoked from the following endpoint:

```
endpoint here
```