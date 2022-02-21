export function Initializer() {
  this.initComponents();
}

Initializer.prototype.initComponents = function () {
  this.getRoutes().forEach((route) => {
    document
      .querySelectorAll(`[data-component='${route.componentId}']`)
      // eslint-disable-next-line new-cap
      .forEach((el) => new route.module(el));
  });
};

Initializer.prototype.getRoutes = () => [{}];
