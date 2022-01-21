/*// The element declaration below is equivalent to the result of calling
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
// Render is the method that changes the DOM
// ReactDOM.render(element, container), Below is a render equivalent.
// First we create a Node from the react element
// afterwards, we assign all of the element props to that node
const node = document.createElement(element.type);
node["title"] = element.props.title;

const text = document.createTextNode("");
text["nodeValue"] = element.props.children;

// textNode is appended to the H1 and the H1 to the container
node.appendChild(text);
container.appendChild(node); */

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === "object" ? child : createTextElement(child)
      ),
    },
  };
}

function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

function render(element, container) {
    const dom =
      element.type == "TEXT_ELEMENT"
        ? document.createTextNode("")
        : document.createElement(element.type)
  ​
    const isProperty = key => key !== "children"
    Object.keys(element.props)
      .filter(isProperty)
      .forEach(name => {
        dom[name] = element.props[name]
      })
  ​
    element.props.children.forEach(child =>
      render(child, dom)
    )
  ​
    container.appendChild(dom)
  }

  let nextUnitOfWork = null
​
function workLoop(deadline) {
  let shouldYield = false
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(
      nextUnitOfWork
    )
    shouldYield = deadline.timeRemaining() < 1
  }
  requestIdleCallback(workLoop)
}
​
requestIdleCallback(workLoop)
​
function performUnitOfWork(nextUnitOfWork) {
  // TODO
}

const Didact = {
  createElement,
  render,
};

/** @jsx Didact.createElement */
const element = (
  <div id="foo">
    <a>bar</a>
    <b />
  </div>
);

const container = document.getElementById("root");
Didact.render(element, container);
