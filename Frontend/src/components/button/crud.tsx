import React from "react";
import { Button } from "antd";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

type GlobalActionsProps = {
  onEdit: () => void;
  onDelete: () => void;
};

export const CrudButtons: React.FC<GlobalActionsProps> = ({ onEdit, onDelete }) => {
  return (
    <div className="flex gap-2 flex-col w-max">
      <Button
        className="bg-sky-600 text-white hover:border-2 hover:border-sky-600 hover:text-sky-600 hover:bg-white flex gap-1"
        onClick={onEdit}
      >
        <FaEdit size={20} />
        Edit
      </Button>
      <Button
        className="bg-red-600 text-white hover:border-2 hover:border-red-600 hover:text-red-600 hover:bg-white flex gap-1"
        onClick={onDelete}
      >
        <MdDelete size={20} />
        Delete
      </Button>
    </div>
  );
};
