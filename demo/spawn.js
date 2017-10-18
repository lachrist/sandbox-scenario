(parent1, parent2) => {
  window.eval(parent1);
  return (path, script, argv) => {
    return new Worker(URL.createObjectURL(new Blob([
      "postMessage("+parent2+");",
      script
    ])));
  };
};