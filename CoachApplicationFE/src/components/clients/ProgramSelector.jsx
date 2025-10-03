import { useEffect } from "react";
import { useState } from "react";
import {getUserPrograms} from "../../api/users"
import { useParams } from "react-router-dom";

function ProgramSelector ({handleInputChange, newProgram}){
    const { userId } = useParams();
    const [programs , setPrograms] = useState([""])
    const [showNewProgramInput, setShowNewProgramInput] = useState(false);
    const [newProgramType, setNewProgramType] = useState("");


    useEffect(()=> {
        const fetchPrograms = async () => {
            try{
                const data = await getUserPrograms(userId);
                setPrograms(data)
                console.log("Programs from backend: ", data)
            }catch(error){
                console.error("Error fetching programs",programs)
            }
        };

        fetchPrograms();
    },[userId]);

    const handleNewProgramTypeChange = (e) => {
        setNewProgramType(e.target.value);
    }


        const handleAddNewProgram = () => {
        const trimmed = newProgramType.trim();
        if (trimmed !== "" && !programs.includes(trimmed)) {
            // 1. Pridaj nový program do zoznamu
            setPrograms((prev) => [...prev, trimmed]);

            // 2. Skry input field
            setShowNewProgramInput(false);

            // 3. Vymaž input hodnotu
            setNewProgramType("");

            // 4. Nastav ako zvolený program
            handleInputChange({ target: { name: "program", value: trimmed } });
        }
        };

return (
  <>
    <div>
      <select
        name="program"
        id="program"
        value={newProgram || "default"}
        onChange={(e) => {
          if (e.target.value === "addNewProgram") {
            setShowNewProgramInput(true);
          } else {
            handleInputChange(e);
            setShowNewProgramInput(false);
          }
        }}
        className="form-select mb-3"
      >
        <option value="default" disabled>Select Program</option>
        <option value="addNewProgram">+ Add new program</option>
        {programs.map((type, index) => (
          <option key={index} value={type}>{type}</option>
        ))}
      </select>

      {showNewProgramInput && (
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter new program"
            value={newProgramType}
            onChange={handleNewProgramTypeChange}
          />
          <button
            className="btn btn-success"
            type="button"
            onClick={handleAddNewProgram}
          >
            ADD
          </button>
        </div>
      )}
    </div>
  </>
);
}

export default ProgramSelector;