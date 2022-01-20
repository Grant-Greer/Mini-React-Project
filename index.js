// The element declaration below is equivalent to the result of calling
// const element = React.createElement("h1", { title: "foo" }, "Hello");
// An element is essentially an object with two properties: type and props
const element = {
  // The type is a string that indicates the type of DOM node we want to pass to
  // document.createElement in order to create a HTML element
  type: "h1",
  props: {
    title: "foo",
    children: "Hello",
  },
};
const container = document.getElementById("root");
ReactDOM.render(element, container);
