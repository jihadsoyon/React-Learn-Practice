import { Accordion } from "./components/Accordion/Accordion";
import AccordionItem from "./components/Accordion/AccordionItem";

import {
  Dropdown,
  DropdownButton,
  DropdownMenu,
} from "./components/Dropdown/Dropdown";

import {
  Tabs,
  TabList,
  Tab,
  TabPanel,
} from "./components/Tabs/Tabs";

import Tooltip from "./components/Tooltip/Tooltip";

import "./components/Accordion/accordion.css";
import "./components/Dropdown/dropdown.css";
import "./components/Tabs/tabs.css";
import "./components/Tooltip/tooltip.css";

function App() {
  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "1000px",
        margin: "0 auto",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "50px",
        }}
      >
        Headless UI Component System
      </h1>

      {/* Accordion */}

      <section
        style={{
          marginBottom: "60px",
        }}
      >
        <h2>Accordion</h2>

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
            React helps build scalable applications.
          </AccordionItem>
        </Accordion>
      </section>

      {/* Dropdown */}

      <section
        style={{
          marginBottom: "60px",
        }}
      >
        <h2>Dropdown</h2>

        <Dropdown>
          <DropdownButton>
            Open Menu
          </DropdownButton>

          <DropdownMenu>
            <p>Profile</p>
            <p>Settings</p>
            <p>Logout</p>
          </DropdownMenu>
        </Dropdown>
      </section>

      {/* Tabs */}

      <section
        style={{
          marginBottom: "60px",
        }}
      >
        <h2>Tabs</h2>

        <Tabs>
          <TabList>
            <Tab index={0}>
              React
            </Tab>

            <Tab index={1}>
              Next.js
            </Tab>

            <Tab index={2}>
              TypeScript
            </Tab>
          </TabList>

          <TabPanel index={0}>
            React Content
          </TabPanel>

          <TabPanel index={1}>
            Next.js Content
          </TabPanel>

          <TabPanel index={2}>
            TypeScript Content
          </TabPanel>
        </Tabs>
      </section>

      {/* Tooltip */}

      <section>
        <h2>Tooltip</h2>

        <Tooltip text="This is a tooltip">
          <button>
            Hover Me
          </button>
        </Tooltip>
      </section>
    </div>
  );
}

export default App;