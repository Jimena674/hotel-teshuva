import { useState } from "react";
import Button from "../common/Button";
import ModalRoomDetail from "../common/ModalRoomDetail";
import AlertMessage from "../common/AlertMessage";
const apiURL = import.meta.env.VITE_API_URL;

export default function RoomCard({ room }) {
  // Estados para abrir el modal y consultar la habitación

  const [messageType, setMessageType] = useState("");
  const [messageReadRoom, setMessageReadRoom] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showModalReadRoom, setShowModalReadRoom] = useState(false);

  /** Función para consultar la habitación */

  const readRoom = async (id_room) => {
    if (!id_room) {
      setMessageType("error");
      setMessageReadRoom("❌ No existe esta habitación.");
      console.log("No se puede leer el id_room.");
    }
    try {
      const res = await fetch(`${apiURL}/api/room/${id_room}`);
      const data = await res.json();
      console.log("🔄 Respuesta del backend:", data);

      if (res.ok) {
        setShowModalReadRoom(true);
        setSelectedRoom(data);
      } else {
        setMessageType("error");
        setMessageReadRoom(`❌ ${data.message || "Habitación no encontrada."}`);
      }
    } catch (error) {
      setMessageReadRoom("❌ Error al consultar los datos de la habitación.");
      setMessageType("error");
      console.error(error);
    }
  };

  return (
    <>
      <div className="card border-0">
        <img
          src={room.photo_path}
          alt={room.room_number}
          className="card-img-top card-img-vertical img-fluid rounded"
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
          }}
        />
        <div className="card-body px-0">
          <h5 className="card-title title-medium mb-3">
            {"Habitación " + room.room_number}
          </h5>

          <p className="card-text body-medium">{room.room_description}</p>

          <Button
            name="Ver más detalles"
            btnCustom="solid-btn-tertiary"
            btnText="label-small"
            onClick={() => readRoom(room.id_room)}
          />

          <AlertMessage type={messageType} message={messageReadRoom} />
        </div>
      </div>
      {/** Modal para mostrar los detalles de las habitaciones */}

      {showModalReadRoom && selectedRoom && (
        <ModalRoomDetail
          room={selectedRoom}
          onClose={() => setShowModalReadRoom(false)}
        />
      )}
    </>
  );
}
