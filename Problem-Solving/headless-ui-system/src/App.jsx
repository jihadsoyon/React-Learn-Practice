import { Accordion } from "./components/Accordion/Accordion";
import AccordionItem from "./components/Accordion/AccordionItem";
import "./components/Accordion/accordion.css";

function App() {
  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          marginTop: "40px",
        }}
      >
        Headless UI Component System
      </h1>

      <Accordion>
        <AccordionItem
          index={0}
          title="What is React?"
        >
          React is a JavaScript library for building user interfaces.
        </AccordionItem>

        <AccordionItem
          index={1}
          title="What is a Component?"
        >
          Components are reusable pieces of UI.
        </AccordionItem>

        <AccordionItem
          index={2}
          title="Why use React?"
        >
          React helps build fast and scalable web applications.
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default App;