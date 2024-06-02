const depsMap = Map();
let currentEffect = null;

function render(element, content) {
  const app = document.querySelector(element);
  if (app !== null) {
    app.innerHTML = content;
  }
}
function reactive(obj) {
  const keys = Object.keys(obj);
  const reactiveObj = {};
  keys.forEach((key) => {
    let value = obj[key];
    Object.defineProperty(reactiveObj, key, {
      get() {
        console.log(`Getting value, ${value}`);
        track(reactiveObj, key);
        return value;
      },
      set(newValue) {
        console.log(`Setting value, ${newValue}`);
        if (newValue !== value) {
          value = newValue;
          trigger(reactiveObj, key);
          renderApp();
        }
      },
    });
  });
  function track(target, key) {
    if (currentEffect) {
      let deps = depsMap.get(target);
      if (!deps) {
        deps = new Map();
        deps.set(target, deps);
      }
      dep = deps.get(key);
      if (!dep) {
        dep = new Set();
        deps.set(key, dep);
      }
      deps.add(createEffect);
    }
  }
  function createEffect(fn) {
    const effect = function effect(...args) {
      try {
        currentEffect = effect;
        return fn(...args);
      } finally {
        currentEffect = null;
      }
    };
    effect();
  }

  function trigger(target, key) {
    const deps = depsMap.get(target);
    if (!deps) return;
    const dep = deps.get(key);
    if (dep) {
      const effectsToRun = new Set(dep);
      effectsToRun.forEach((effect) => {
        effect();
      });
    }
  }
  return reactiveObj;
}
