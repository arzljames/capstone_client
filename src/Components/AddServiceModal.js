import React, { useEffect, useState } from "react";
import { useClickOutside } from "../Hooks/useClickOutside";
import { motion } from "framer-motion";
import { formVariant, containerVariant } from "../Animations/Animations";
import useAuth from "../Hooks/useAuth";
import "./AddServiceModal.css";
import api from "../API/Api";

const AddServiceModal = ({ setModal, id, service, toast, toastContainer, subSpecialization }) => {
  const domNode = useClickOutside(() => {
    setModal(false);
  });
  const { specializations } = useAuth();
  const [isClick, setIsClick] = useState(false);
  const [spec, setSpec] = useState([]);

  useEffect(() => {
    let specState = specializations;

    setSpec(
      specState.map((d) => {
        return {
          select: false,
          _id: d._id,
          name: d.name,
        };
      })
    );
  }, []);

  const handleSubmit = async () => {
    setIsClick(true);
    try {
      const arr = [];
      spec.forEach((d) => {
        if (d.select) {
          arr.push(d._id);
        }
      });

      let response = await api.put(`/api/patient/case/update/${id}`, {
        specialization: arr,
      });

      if (response.data.ok) {
        setIsClick(false);
        window.location.reload();
        toast.success("Successfully updated case");
      }
    } catch (error) {
      setIsClick(false);
      toast.error(error.message);
    }
  };

  return (
    <motion.div
      variants={containerVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="modal-container"
    >
      <motion.div
        ref={domNode}
        variants={formVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="popup-modal"
      >
        <h1>Add Service Type</h1>
        

        {specializations.filter(e => e._id !== service)
        .map((item, index) => {
          return (
            <>
              <div key={index} className="service-container">
                <input 
                  onChange={(e) => {
                    let checked = e.target.checked;
                    setSpec(
                      spec.map((d) => {
                        if (item._id === d._id) {
                          d.select = checked;
                        }
                        return d;
                      })
                    );
                    console.log(spec);
                  }}
                  type="checkbox"
                  value={item._id}
                />{" "}
                {item.specialization}
              </div>
            </>
          );
        })}

        <div className="popup-modal-btns">
          <button onClick={() => setModal(false)} className="gray-cta">
            Cancel
          </button>
          <button
            onClick={() => handleSubmit()}
            className={isClick ? "green-cta-disable" : "green-cta"}
          >
            Save
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AddServiceModal;
