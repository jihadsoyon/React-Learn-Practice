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
    <div className="app-container">
      <header className="hero">
        <h1>Headless UI Component System</h1>

        <p>
          Reusable React Components built using
          Compound Component Architecture
        </p>
      </header>

      <div className="showcase-grid">
        {/* Accordion */}

        <div className="showcase-card">
          <h2>Accordion</h2>

          <Accordion>
            <AccordionItem
              index={0}
              title="What is React?"
            >
              React is a JavaScript library.
            </AccordionItem>

            <AccordionItem
              index={1}
              title="What is Vite?"
            >
              Vite is a fast build tool.
            </AccordionItem>

            <AccordionItem
              index={2}
              title="What is Headless UI?"
            >
              Reusable component architecture.
            </AccordionItem>
          </Accordion>
        </div>

        {/* Dropdown */}

        <div className="showcase-card">
          <h2>Dropdown</h2>

          <Dropdown>
            <DropdownButton>
              Open Menu
            </DropdownButton>

            <DropdownMenu>
              <p>Dashboard</p>
              <p>Profile</p>
              <p>Logout</p>
            </DropdownMenu>
          </Dropdown>
        </div>

        {/* Tabs */}

        <div className="showcase-card">
          <h2>Tabs</h2>

          <Tabs>
            <TabList>
              <Tab index={0}>React</Tab>
              <Tab index={1}>Next.js</Tab>
              <Tab index={2}>TypeScript</Tab>
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
        </div>

        {/* Tooltip */}

        <div className="showcase-card">
          <h2>Tooltip</h2>

          <Tooltip text="Reusable Tooltip Component">
            <button>
              Hover Me
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default App;