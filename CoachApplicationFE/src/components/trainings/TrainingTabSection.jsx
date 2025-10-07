import { useState } from "react";
import TrainingList from "./TrainingList";


function TrainingTabsSection({ trainings, thisWeekTrainings, nextWeekTrainings }) {
  const [activeTab, setActiveTab] = useState("today");

  const renderActiveList = () => {
    switch (activeTab) {
      case "today":
        return <TrainingList trainings={trainings} header="Today’s Trainings" />;
      case "thisWeek":
        return <TrainingList trainings={thisWeekTrainings} header="This Week’s Trainings" />;
      case "nextWeek":
        return <TrainingList trainings={nextWeekTrainings} header="Next Week’s Trainings" />;
      default:
        return null;
    }
  };

  return (
    <div className="container mt-4">
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "today" ? "active" : ""}`}
            onClick={() => setActiveTab("today")}
          >
            Today
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "thisWeek" ? "active" : ""}`}
            onClick={() => setActiveTab("thisWeek")}
          >
            This Week
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "nextWeek" ? "active" : ""}`}
            onClick={() => setActiveTab("nextWeek")}
          >
            Next Week
          </button>
        </li>
      </ul>

      {/* Zobrazenie aktívneho tabu */}
      {renderActiveList()}
    </div>
  );
}

export default TrainingTabsSection;