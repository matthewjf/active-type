export default class Query {
  constructor(adapter, showQuery, listQuery) {
    this.adapter = adapter;
    this.listQuery = listQuery;
    this.showQuery = showQuery;
  }

  list(variables) {
    const { adapter, listQuery } = this;
    return adapter.execute(listQuery, variables);
  }

  show(variables) {
    const { adapter, showQuery } = this;
    return adapter.execute(showQuery, variables);
  }
};
