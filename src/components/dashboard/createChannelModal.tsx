import { FC, FormEvent, useContext, useRef, useState } from "react";
import { Auth } from "../../App";
import { createChannel } from "../../dataFetching";
import "../../styles/dashboard/createChannelModal.css";

interface ModalProps {
  setOnModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: FC<ModalProps> = ({ setOnModal }) => {
  const userData = useContext(Auth);
  const [error, setError] = useState("");
  const [newChannel, setNewChannel] = useState([]);

  const [createChannelInfo, setCreateChannelInfo] = useState({
    name: "",
    user_ids: [],
    description: "",
  });

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const fetch = await createChannel(userData, createChannelInfo);

      if (!fetch.errors) {
        setNewChannel((prevData) => [...prevData, ...fetch.data.name]);

        closeModal();
      } else {
        setError(fetch.errors[0]);
      }
    } catch (e) {
      console.error(e);
    }
    console.log(newChannel);
  };

  const closeModal = () => {
    setOnModal(false);
  };

  return (
    <div className="createChannel">
      <div className="createModal">
        <form onSubmit={submitHandler} action="">
          <div className="title-with-button">
            <h1 className="modal-title">Create a channel</h1>
            <button className="modal-button">
              <i className="fa-solid fa-xmark" onClick={closeModal}></i>
            </button>
          </div>
          <div className="modal-description">
            Channels are where your team communicates. They're best when
            organized around a topic - #marketing, for example.
          </div>
          <div className="create-channel-name">
            <input
              required
              type="text"
              placeholder="Channel Name"
              value={createChannelInfo.name}
              onChange={(e) =>
                setCreateChannelInfo({
                  ...createChannelInfo,
                  name: e.target.value,
                })
              }
            ></input>
          </div>
          <div className="create-channel-description">
            <input
              type="text"
              placeholder="(Optional)"
              value={createChannelInfo.description}
              onChange={(e) =>
                setCreateChannelInfo({
                  ...createChannelInfo,
                  description: e.target.value,
                })
              }
            ></input>
          </div>
          <div className="create-button-error">
            <input
              type="submit"
              value="Create"
              className="create-button"
            ></input>
            <div className="error-create">{error}</div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
