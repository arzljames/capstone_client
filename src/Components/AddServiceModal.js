import React, { useEffect, useState } from "react";
import { useClickOutside } from "../Hooks/useClickOutside";
import { motion } from "framer-motion";
import { formVariant, containerVariant } from "../Animations/Animations";
import useAuth from "../Hooks/useAuth";
import "./AddServiceModal.css";
import api from "../API/Api";

const AddServiceModal = ({ setModal, id, specArr }) => {
  const domNode = useClickOutside(() => {
    setModal(false);
  });
  const { facilities } = useAuth();

  const [spec, setSpec] = useState([]);

  useEffect(() => {
    let specState = facilities.filter(
      (e) => e._id === "623ec7fb80a6838424edaa29"
    )[0].specialization;

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
        window.location.reload();
      }
    } catch (error) {}
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
        {facilities
          .filter((e) => e._id === "623ec7fb80a6838424edaa29")[0]
          .specialization.map((g) => {
            return (
              <>
                <div className="service-container">
                  <input
                    onChange={(e) => {
                      let checked = e.target.checked;
                      setSpec(
                        spec.map((d) => {
                          if (g._id === d._id) {
                            d.select = checked;
                          }
                          return d;
                        })
                      );
                      console.log(spec);
                    }}
                    type="checkbox"
                    value={g._id}
                  />{" "}
                  {g.name}
                </div>
              </>
            );
          })}

        <div className="popup-modal-btns">
          <button onClick={() => setModal(false)} className="gray-cta">
            Cancel
          </button>
          <button onClick={() => handleSubmit()} className="green-cta">
            Save
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AddServiceModal;
