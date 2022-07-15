import { FC, FormEvent, useContext, useRef, useState } from "react";
import { Auth } from "../../../App";
import { createChannel } from "../../../utils/dataFetching";
import "../../../styles/dashboard/createChannelModal.css";
import { HashLoader } from "react-spinners";

interface ModalProps {
  setOnModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedChannel: any[];
  setSelectedChannel: React.Dispatch<React.SetStateAction<any[]>>;
}

const Modal: FC<ModalProps> = ({ setOnModal, setSelectedChannel }) => {
  const { headerData, signInData } = useContext(Auth);
  const [error, setError] = useState("");
  const errorDiv = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const [createChannelInfo, setCreateChannelInfo] = useState({
    name: "",
    user_ids: [],
    description: "",
  });

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    errorDiv.current.classList.remove("animation");

    try {
      const fetch = await createChannel(headerData, createChannelInfo);
      setIsLoading(false);

      if (!fetch.errors) {
        setSelectedChannel((prevChannel: any) => [
          ...prevChannel,
          { name: fetch.data.name, id: "" },
        ]);

        setTimeout(() => {
          closeModal();
        }, 0);
      } else {
        errorDiv.current.classList.add("animation");
        setError(fetch.errors[0]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const closeModal = () => {
    setOnModal(false);
  };

  const clickHandler = (e: any) => {
    if (e.target.classList[0] === "createChannel") {
      closeModal();
    }
  };

  return (
    <div className="createChannel" onClick={(e) => clickHandler(e)}>
      <div className="createModal">
        <form>
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
            <button onClick={submitHandler} className="create-button">
              <div className="create-button-div">
                {isLoading ? <HashLoader size={18} color="white" /> : "Create"}
              </div>
            </button>
            <div className="error-create" ref={errorDiv}>
              {error}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
