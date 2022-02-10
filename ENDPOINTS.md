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