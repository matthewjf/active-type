- need a way to create stores of objects
  - this will allow distant sibling components to use the same data
- need react bindings to connect components to updates
  - this will be how we trigger re-renders
- pagination???
  - relay
  - page/limit
- associations
- queries


- connectSource

CollectionSource
- all()
- where()
- props
  - records
  - loading
  - loaded
  - requested
  - type
- pagination
  - hasNextPage()
  - nextPage()
  - totalCount()
RecordSource
- find()
- update()
- create()
- destroy()
- props
  - record
  - loading
  - loaded
  - requested
  - type

Query
- path
- request
  - post()
  - get()
  - patch()
  - delete()
- execute()
