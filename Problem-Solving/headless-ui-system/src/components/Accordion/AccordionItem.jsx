import { useAccordion } from "./Accordion";

function AccordionItem({ index, title, children }) {
  const { activeIndex, setActiveIndex } = useAccordion();

  const isOpen = activeIndex === index;

  const handleToggle = () => {
    setActiveIndex(isOpen ? null : index);
  };

  return (
    <div className="accordion-item">
      <button
        className="accordion-header"
        onClick={handleToggle}
      >
        <span>{title}</span>
        <span>{isOpen ? "-" : "+"}</span>
      </button>

      {isOpen && (
        <div className="accordion-content">
          {children}
        </div>
      )}
    </div>
  );
}

export default AccordionItem;