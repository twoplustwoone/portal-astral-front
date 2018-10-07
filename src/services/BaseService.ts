export default class BaseService {
  protected _store;

  gotStore() {
    // this is just an overideable placeholder
  }

  initializeStore(store) {
    this._store = store;
    this.gotStore();
  }

  dispatch = (action) => {
    if (!this._store) {
      console.error('[BaseService#dispatch] Store was not initialized on the service', this);
      return Promise.reject(null);
    }

    return this._store.dispatch(action);
  };

  getState = () => {
    if (!this._store) {
      console.error('[BaseService.state] Store was not initialized on the service', this);
      return undefined;
    }

    return this._store.getState();
  }
}