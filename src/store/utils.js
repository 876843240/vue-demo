const utils = {
  interval(fn, ident) {
    if (!ident) {
      setTimeout(() => {
        interval(fn,ident);
      }, 20);
    }
  }
}
